"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { nearestLocationReport } from "@/app/api/apartment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/authentication/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubscriptionModal from "@/app/views/subscription/SubscriptionModal";

const Commercial = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { userData } = useAuth();

  const [area, setArea] = useState<number>();
  const [selectArea, setSelectArea] = useState<string>("Carpet");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [pendingSubmitValues, setPendingSubmitValues] = useState<any>(null);

  const validationSchema = yup.object({
    unit_size: yup
      .number()
      .typeError("Unit Size is required")
      .required("Unit Size is required")
      .min(1, "Unit Size must be positive"),
    areaMesurment: yup.string().required("Area measurement is required"),
    age_of_property: yup
      .number()
      .typeError("Age of Property is required")
      .required("Age of Property is required"),
    no_of_floor: yup
      .number()
      .typeError("Number of Floors is required")
      .required("Number of Floors is required")
      .min(0, "Number of Floors must be a positive number"),
    floor_of_unit: yup
      .number()
      .typeError("Floor of Unit is required")
      .required("Floor of Unit is required")
      .min(0, "Floor of Unit must be a positive number"),

    flat_no: yup
      .number()
      .typeError("Flat Number is required")
      .required("Flat Number is required"),
    owner: yup.string().required("Owner Name is required"),
    address: yup.string().required("Owner Address is required"),
  });

  const formik = useFormik({
    initialValues: {
      owner: "",
      address: "",
      unit_size: 0,
      areaMesurment: "",
      age_of_property: 0,
      loading: 35,
      no_of_floor: 0,
      floor_of_unit: 0,
      flat_no: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      // If user has report quota
      if (
        userData?.subscriptions_id &&
        userData?.no_of_report > 0 &&
        userData?.is_paid === true
      ) {
        await submitForm(values);
      } else {
        setPendingSubmitValues(values);
        toast({
          title: "Purchase Required",
          description: "Please buy a plan to generate a report.",
          variant: "destructive",
        });
        setTimeout(() => setOpen(true), 800);
      }
    },
  });

  const { values, errors, touched, handleChange, handleBlur } = formik;

  const checkArea = (sqft: number) => {
    const v = Number(sqft);

    if (values.areaMesurment === "sqmt") return Math.round(v * 10.76391042);
    if (values.areaMesurment === "yard area") return Math.round(v * 9);

    return Math.round(v); // sqft default
  };

  const submitForm = async (values: any) => {
    try {
      setLoading(true);

      const data = {
        carpet_area:
          selectArea === "Carpet" ? checkArea(values.unit_size) : area,
        super_built_up_area:
          selectArea === "Carpet" ? area : checkArea(values.unit_size),

        type_of_property: "Commercial",
        no_of_floor: Number(values.no_of_floor),
        floor_of_unit: Number(values.floor_of_unit),
        flat_no: Number(values.flat_no),
        loading: values.loading,
        age_of_property: Number(values.age_of_property),

        latitude: Number(localStorage.getItem("latitude")),
        longitude: Number(localStorage.getItem("longitude")),
        distance: Number(localStorage.getItem("distance")),
        address: localStorage.getItem("fullAddress"),

        owner_address: values.address,
        owner_name: values.owner,

        user_id: userData?._id,
      };

      const res = await nearestLocationReport(data);
      if (res?.status === 200) {
        toast({
          title: "Success",
          description: "Report generated successfully.",
          variant: "default",
        });
        localStorage.removeItem("propertyType");
        router.push(`/commercial-details/${res?.data?.report_id}`);
      } else {
        toast({
          title: "Failed",
          description: res?.data?.message || "Unable to generate report.",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const age = Number(values.age_of_property);

    if (!age && age !== 0) return;

    if (age < 3) formik.setFieldValue("loading", 45);
    else if (age < 8) formik.setFieldValue("loading", 40);
    else if (age < 12) formik.setFieldValue("loading", 35);
    else formik.setFieldValue("loading", 30);
  }, [values.age_of_property]);

  useEffect(() => {
    if (!values.unit_size) return;

    const sqft = checkArea(values.unit_size);
    const reduction = sqft * (values.loading / 100);

    if (selectArea === "Carpet") {
      setArea(Math.floor(sqft / ((100 - values.loading) / 100)));
    } else {
      setArea(Math.floor(sqft - reduction));
    }
  }, [selectArea, values.unit_size, values.loading, values.areaMesurment]);

  useEffect(() => {
    if (
      pendingSubmitValues &&
      userData?.is_paid &&
      userData?.subscriptions_id?._id &&
      userData?.no_of_report > 0
    ) {
      submitForm(pendingSubmitValues);
      setPendingSubmitValues(null);
    }
  }, [userData, pendingSubmitValues]);

  return (
    <div className="w-full">
      {loading && (
        <div className="absolute inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}
      <Header />
      <Card className="max-w-4xl mx-auto shadow-xl my-6">
        <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-emerald-50">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Commercial/Office
          </CardTitle>
          <p className="text-gray-600">
            Fill in your property details for accurate valuation
          </p>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={formik.handleSubmit}>
            {/* OWNER FIELDS */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="flex pb-2">Owner Name</Label>
                <Input
                  id="owner"
                  name="owner"
                  type="text"
                  value={values.owner}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="p-3 w-full"
                  placeholder="Enter owner name"
                />
                {touched.owner && errors.owner && (
                  <p className="text-red-500 text-sm">{errors.owner}</p>
                )}
              </div>

              <div>
                <Label className="flex pb-2" htmlFor="address">
                  Owner Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="p-3 w-full"
                  placeholder="Enter owner address"
                />
                {touched.address && errors.address && (
                  <p className="text-red-500 text-sm">{errors.address}</p>
                )}
              </div>
            </div>

            {/* AREA FIELDS */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <Label className="flex pb-2">Select Type Of Area</Label>
                <select
                  value={selectArea}
                  onChange={(e) => setSelectArea(e.target.value)}
                  className="border p-2 w-full rounded-md"
                >
                  <option value="Carpet">Carpet</option>
                  <option value="Super Built-Up">Super Built-Up</option>
                </select>
              </div>

              <div>
                <Label className="flex pb-2">Input Area Measurement</Label>
                <select
                  name="areaMesurment"
                  value={values.areaMesurment}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border p-2 w-full rounded-md"
                >
                  <option value="">Choose</option>
                  <option value="sqmt">SQMT</option>
                  <option value="yard area">Yard Area</option>
                  <option value="sqft">SQFT</option>
                </select>
                {touched.areaMesurment && errors.areaMesurment && (
                  <p className="text-red-500 text-sm">{errors.areaMesurment}</p>
                )}
              </div>
            </div>

            {/* UNIT SIZE */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <Label className="flex pb-2">Unit Size</Label>
                <Input
                  name="unit_size"
                  type="number"
                  value={values.unit_size}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border-b p-3 w-full"
                  placeholder="Enter unit size"
                />
                {touched.unit_size && errors.unit_size && (
                  <p className="text-red-500 text-sm">{errors.unit_size}</p>
                )}
              </div>

              <div>
                <Label className="flex pb-2">
                  {selectArea === "Carpet"
                    ? "Super Built-Up (sqft)"
                    : "Carpet (sqft)"}
                </Label>
                <Input
                  type="number"
                  value={area || ""}
                  disabled
                  className="bg-gray-100"
                  placeholder={
                    selectArea === "Carpet"
                      ? "Super Built-Up (sqft)"
                      : "Carpet (sqft)"
                  }
                />
              </div>
            </div>

            {/* FLOORS */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <Label className="flex pb-2">Total No. of Floors</Label>
                <Input
                  type="number"
                  name="no_of_floor"
                  value={values.no_of_floor}
                  onChange={handleChange}
                  placeholder="Enter your no of floor"
                  onBlur={handleBlur}
                />
                {touched.no_of_floor && errors.no_of_floor && (
                  <p className="text-red-500 text-sm">{errors.no_of_floor}</p>
                )}
              </div>

              <div>
                <Label className="flex pb-2">Floor of Unit</Label>
                <Input
                  type="number"
                  name="floor_of_unit"
                  value={values.floor_of_unit}
                  onChange={handleChange}
                  placeholder="Enter your floor of the unit"
                  onBlur={handleBlur}
                />
                {touched.floor_of_unit && errors.floor_of_unit && (
                  <p className="text-red-500 text-sm">{errors.floor_of_unit}</p>
                )}
              </div>
            </div>

            {/* EXTRA */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <Label className="flex pb-2">Office No. / Shop No.</Label>
                <Input
                  type="number"
                  name="flat_no"
                  value={values.flat_no}
                  onChange={handleChange}
                  placeholder="Enter your flat no"
                  onBlur={handleBlur}
                />
                {touched.flat_no && errors.flat_no && (
                  <p className="text-red-500 text-sm">{errors.flat_no}</p>
                )}
              </div>

              <div>
                <Label className="flex pb-2">Loading %</Label>
                <Input
                  value={values.loading}
                  disabled
                  className="bg-gray-100"
                />
              </div>

              <div>
                <Label className="flex pb-2">Age of Property</Label>
                <Input
                  type="number"
                  name="age_of_property"
                  value={values.age_of_property}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your age of property"
                />
                {touched.age_of_property && errors.age_of_property && (
                  <p className="text-red-500 text-sm">
                    {errors.age_of_property}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-700 to-emerald-700 hover:from-blue-800 hover:to-emerald-800 text-lg py-6"
              >
                Get Property Valuation
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Footer />
      {open && (
        <SubscriptionModal open={open} handleClose={() => setOpen(false)} />
      )}
    </div>
  );
};

export default Commercial;
