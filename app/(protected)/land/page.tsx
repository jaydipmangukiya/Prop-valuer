"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { nearestLocationReport } from "@/app/api/apartment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/authentication/AuthProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubscriptionModal from "@/app/views/subscription/SubscriptionModal";
import { areaMeasurementOptions } from "@/lib/constant";

const Land = () => {
  const router = useRouter();
  const { user: userData } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pendingSubmitValues, setPendingSubmitValues] = useState<any>(null);

  const validationSchema = yup.object({
    landArea: yup
      .number()
      .typeError("Land Area is required")
      .required("Land Area is required")
      .min(1, "Land Area must be positive"),

    mesurment: yup.string().required("Mesurment is required"),
    location: yup.string().required("Land  Location is required"),
    address: yup.string().required("Owner Address is required"),
    owner: yup.string().required("Owner Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      landArea: "",
      mesurment: "",
      location: "",
      owner: "",
      address: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      // If user has report quota
      if (
        userData?.subscriptions_id?._id &&
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
      // toast({
      //   title: "Purchase Required",
      //   description: "Please buy a plan to generate a report.",
      //   variant: "destructive",
      // });

      // setTimeout(() => setOpen(true), 800);
    },
  });

  const { values, errors, touched, handleChange, handleBlur } = formik;

  const convertArea = (value: number, measurementType: string) => {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      return 0;
    }
    switch (measurementType) {
      case "sqmt":
        return Math.round(numValue * 10.76391042);
      case "yard area":
        return Math.round(numValue * 9);
      case "sqft":
      default:
        return Math.round(numValue);
    }
  };

  const submitForm = async (values: any) => {
    try {
      setLoading(true);
      const distance = values.location === "City" ? 2000 : 10000;
      const landAreaInSqft = convertArea(
        Number(values.landArea),
        values.mesurment
      );

      const data = {
        land_area: landAreaInSqft,
        land_location: values.location,
        type_of_property: "Land",

        latitude: Number(localStorage.getItem("latitude")),
        longitude: Number(localStorage.getItem("longitude")),
        distance: distance,
        address: localStorage.getItem("fullAddress"),
        owner_name: values.owner,
        owner_address: values.address,
        user_id: userData?._id,
      };

      const res = await nearestLocationReport(data);
      if (res?.status === 200 && res?.data?.report_id) {
        toast({
          title: "Success",
          description: "Report generated successfully.",
          variant: "default",
        });
        localStorage.removeItem("propertyType");
        router.push(`/land-details/${res?.data?.report_id}`);
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
    if (
      pendingSubmitValues &&
      userData?.is_paid &&
      userData?.subscriptions_id?._id &&
      userData?.no_of_report > 0
    ) {
      submitForm(pendingSubmitValues);
      setPendingSubmitValues(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, pendingSubmitValues]);

  return (
    <div className="w-full">
      {/* {loading && (
        <div className="absolute inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50">
          <Loader />
        </div>
      )} */}
      <Header />
      <Card className="max-w-4xl mx-auto shadow-xl my-6">
        <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-emerald-50">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Land / Plot
          </CardTitle>
          <p className="text-gray-600">
            Fill in your property details for accurate valuation
          </p>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="flex pb-2">Owner Name</Label>
                <Input
                  name="owner"
                  type="text"
                  value={values.owner}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter owner name"
                  className="border-b p-3 w-full"
                />
                {touched.owner && errors.owner && (
                  <p className="text-red-500 text-sm">{errors.owner}</p>
                )}
              </div>
              <div>
                <Label className="flex pb-2">Owner Address</Label>
                <Input
                  name="address"
                  type="text"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter owner address"
                  className="border-b p-3 w-full"
                />
                {touched.address && errors.address && (
                  <p className="text-red-500 text-sm">{errors.address}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <Label className="flex pb-2">Land Area</Label>
                <Input
                  id="landArea"
                  name="landArea"
                  type="number"
                  value={values.landArea}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border-b p-3 w-full"
                  placeholder="Enter land area"
                />
                {touched.landArea && errors.landArea && (
                  <p className="text-red-500 text-sm">{errors.landArea}</p>
                )}
              </div>
              <div>
                <Label className="flex pb-2" htmlFor="mesurment">
                  Measurement
                </Label>
                <select
                  name="mesurment"
                  value={values.mesurment}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border rounded-md p-2 w-full"
                >
                  <option value="">Select measurement</option>
                  {areaMeasurementOptions?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {touched.mesurment && errors.mesurment && (
                  <p className="text-red-500 text-sm">{errors.mesurment}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label className="flex pb-2" htmlFor="land_area">
                  Select Location
                </Label>
                <select
                  name="location"
                  value={values.location}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-full"
                >
                  <option value="">Select location</option>
                  <option value="City">City</option>
                  <option value="Village">Village</option>
                </select>
                {touched.location && errors.location && (
                  <p className="text-red-500 text-sm">{errors.location}</p>
                )}
              </div>
            </div>

            {/* UNIT SIZE */}

            <div className="flex justify-center mt-8">
              <Button
                type="submit"
                disabled={loading}
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

export default Land;
