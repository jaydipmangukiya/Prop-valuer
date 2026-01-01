/* eslint-disable react-hooks/exhaustive-deps */
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
import { areaClassOptions, areaMeasurementOptions, areaTypeOptions, bathroomOptions, buildingConditionOptions, civicAmenityOptions, facingOptions, furnishingStatusOptions, occupiedByOptions, overlookingOptions, possessionStatusOptions, yesNoOptions } from "@/lib/constant";

const Apartment = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { user: userData } = useAuth();

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
      .required("Number of Floors is required"),
    floor_of_unit: yup
      .number()
      .typeError("Floor of Unit is required")
      .required("Floor of Unit is required"),

    flat_no: yup
      .number()
      .typeError("Flat Number is required")
      .required("Flat Number is required"),
    owner: yup.string().required("Owner Name is required"),
    address: yup.string().required("Owner Address is required"),

    open_parking: yup.number().min(0),
    covered_parking: yup.number().min(0),

    interior_age: yup.string().nullable(),

    interior_spend: yup.string().when("interior_age", {
      is: (val: string) => !!val,
      then: (schema) =>
        schema.required("Please enter interior spend amount"),
      otherwise: (schema) => schema.notRequired(),
    }),
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

      open_parking: 0,
      covered_parking: 0,
      interior_age: "",
      interior_spend: "",
      additional_details: {
        facing: "",
        overlooking: "",
        possession_status: "",
        bathroom: "",
        furnishing_status: "",

        area_classification: "",
        area_type: "",
        tenament_no: "",
        occupied_by: "",

        flooding_possibility: "",
        civic_amenities: [] as string[],

        road_facility: "",
        water_potentiality: "",
        power_supply: "",

        building_exterior: "",
        building_interior: ""
      },
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
    },
  });

  const { values, errors, touched, handleChange, handleBlur } = formik;

  const checkArea = (sqft: number) => {
    const v = Number(sqft);

    if (values.areaMesurment === "sqmt") return Math.round(v * 10.7639);
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

        type_of_property: "Apartment",
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

        open_parking: Number(values.open_parking),
        covered_parking: Number(values.covered_parking),
        interior_age: values.interior_age,
        interior_spend: values.interior_spend,
        additional_details: values.additional_details,


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
        router.push(`/apartment-details/${res?.data?.report_id}`);
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
            Apartment(Flat)
          </CardTitle>
          <p className="text-gray-600">
            Fill in your property details for accurate valuation
          </p>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={formik.handleSubmit}>
            {/* OWNER FIELDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="flex pb-2">Owner Name</Label>
                <Input
                  id="owner"
                  name="owner"
                  type="text"
                  value={values.owner}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border-b p-3 w-full"
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
                  className="border-b p-3 w-full"
                  placeholder="Enter owner address"
                />
                {touched.address && errors.address && (
                  <p className="text-red-500 text-sm">{errors.address}</p>
                )}
              </div>
            </div>

            {/* AREA FIELDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
                  {areaMeasurementOptions?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {touched.areaMesurment && errors.areaMesurment && (
                  <p className="text-red-500 text-sm">{errors.areaMesurment}</p>
                )}
              </div>
            </div>

            {/* UNIT SIZE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div>
                <Label className="flex pb-2">Flat No</Label>
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
            <div className="mt-4">
              <Label className="pb-2 block">Parking</Label>

              <div className="grid grid-cols-2 gap-4">
                {/* OPEN */}
                <div className="flex items-center justify-between border rounded-md px-3 py-2">
                  <span>Open</span>
                  <div className="flex items-center gap-3">
                    <Button
                      className="px-3"
                      type="button"
                      variant="outline"
                      onClick={() =>
                        formik.setFieldValue(
                          "open_parking",
                          Math.max(0, Number(values.open_parking) - 1)
                        )
                      }
                    >
                      −
                    </Button>
                    <span className="min-w-[20px] text-center">
                      {Number(values.open_parking)}
                    </span>
                    <Button
                      className="px-3"
                      type="button"
                      variant="outline"
                      onClick={() =>
                        formik.setFieldValue(
                          "open_parking",
                          Number(values.open_parking) + 1
                        )
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* COVERED */}
                <div className="flex items-center justify-between border rounded-md px-3 py-2">
                  <span>Covered</span>
                  <div className="flex items-center gap-3">
                    <Button
                      className="px-3"
                      type="button"
                      variant="outline"
                      onClick={() =>
                        formik.setFieldValue(
                          "covered_parking",
                          Math.max(0, Number(values.covered_parking) - 1)
                        )
                      }
                    >
                      −
                    </Button>
                    <span className="min-w-[20px] text-center">
                      {Number(values.covered_parking)}
                    </span>
                    <Button
                      type="button"
                      className="px-3"
                      variant="outline"
                      onClick={() =>
                        formik.setFieldValue(
                          "covered_parking",
                          Number(values.covered_parking) + 1
                        )
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Label className="pb-2 block">Interiors</Label>

              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Less than 1 yr", value: "<1" },
                  { label: "1 - 3 yrs", value: "1-3" },
                  { label: "3 - 5 yrs", value: "3-5" },
                  { label: "5 - 10 yrs", value: "5-10" },
                  { label: ">10 yrs", value: ">10" },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.value}
                    onClick={() =>
                      formik.setFieldValue("interior_age", item.value)
                    }
                    className={`px-4 py-2 rounded-full border transition ${values.interior_age === item.value
                      ? "bg-emerald-100 border-emerald-600"
                      : "bg-white"
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {values.interior_age && (
              <div className="mt-4">
                <Label className="pb-2 block">
                  How much did you spend on it?
                </Label>

                <Input
                  name="interior_spend"
                  value={values.interior_spend}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="₹ Enter amount"
                />

                {touched.interior_spend && errors.interior_spend && (
                  <p className="text-red-500 text-sm">
                    {errors.interior_spend}
                  </p>
                )}
              </div>
            )}

            <div className="mt-6">
              <Label className="text-lg font-semibold">Additional Details (Optional)</Label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                {/* Facing */}
                <div>
                  <Label>Facing</Label>
                  <select
                    name="additional_details.facing"
                    value={values.additional_details.facing}
                    onChange={handleChange}
                    className="border p-2 w-full rounded-md"
                  >
                    <option value="">Select</option>
                    {facingOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                {/* Overlooking */}
                <div>
                  <Label>Overlooking</Label>
                  <select
                    name="additional_details.overlooking"
                    value={values.additional_details.overlooking}
                    onChange={handleChange}
                    className="border p-2 w-full rounded-md"
                  >
                    <option value="">Select</option>
                    {overlookingOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Possession Status */}
                <div>
                  <Label>Possession Status</Label>
                  <select
                    name="additional_details.possession_status"
                    value={values.additional_details.possession_status}
                    onChange={handleChange}
                    className="border p-2 w-full rounded-md"
                  >
                    <option value="">Select</option>
                    {possessionStatusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Bathroom */}
                <div>
                  <Label>Bathroom</Label>
                  <select
                    name="additional_details.bathroom"
                    value={values.additional_details.bathroom}
                    onChange={handleChange}
                    className="border p-2 w-full rounded-md"
                  >
                    <option value="">Select</option>
                    {bathroomOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Furnishing Status */}
                <div>
                  <Label>Furnishing Status</Label>
                  <select
                    name="additional_details.furnishing_status"
                    value={values.additional_details.furnishing_status}
                    onChange={handleChange}
                    className="border p-2 w-full rounded-md"
                  >
                    <option value="">Select</option>
                    {furnishingStatusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

              </div>
            </div>

            <div className="mt-4">
              <p className="font-medium text-gray-700 mb-2">Locality & Surroundings</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select name="additional_details.area_classification" onChange={handleChange} className="border p-2 rounded-md">
                  <option value="">Area Classification</option>
                  {areaClassOptions.map(v => <option key={v}>{v}</option>)}
                </select>

                <select name="additional_details.area_type" onChange={handleChange} className="border p-2 rounded-md">
                  <option value="">Area Type</option>
                  {areaTypeOptions.map(v => <option key={v}>{v}</option>)}
                </select>

                <Input
                  name="additional_details.tenament_no"
                  placeholder="Tenament No"
                  onChange={handleChange}
                />

                <select name="additional_details.occupied_by" onChange={handleChange} className="border p-2 rounded-md">
                  <option value="">Occupied By</option>
                  {occupiedByOptions.map(v => <option key={v}>{v}</option>)}
                </select>
              </div>
            </div>

            <div className="mt-6">
              <p className="font-medium text-gray-700 mb-2">Infrastructure & Utilities</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select name="additional_details.flooding_possibility" onChange={handleChange} className="border p-2 rounded-md">
                  <option value="">Flooding / Submerging</option>
                  {yesNoOptions.map(v => <option key={v}>{v}</option>)}
                </select>

                <select name="additional_details.road_facility" onChange={handleChange} className="border p-2 rounded-md">
                  <option value="">Road Facilities</option>
                  {areaClassOptions.map(v => <option key={v}>{v}</option>)}
                </select>

                <select name="additional_details.water_potentiality" onChange={handleChange} className="border p-2 rounded-md">
                  <option value="">Water Potentiality</option>
                  {areaClassOptions.map(v => <option key={v}>{v}</option>)}
                </select>

                <select name="additional_details.power_supply" onChange={handleChange} className="border p-2 rounded-md">
                  <option value="">Power Supply Available</option>
                  {yesNoOptions.map(v => <option key={v}>{v}</option>)}
                </select>
              </div>

              {/* Civic Amenities – Multi Select */}
              <div className="mt-3">
                <Label>Civic Amenities Nearby</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {civicAmenityOptions.map((amenity) => (
                    <button
                      type="button"
                      key={amenity}
                      onClick={() => {
                        const arr = values.additional_details.civic_amenities as string[];
                        formik.setFieldValue(
                          "additional_details.civic_amenities",
                          arr.includes(amenity)
                            ? arr.filter((a: string) => a !== amenity)
                            : [...arr, amenity]
                        );
                      }}
                      className={`px-3 py-1 rounded-full border ${values.additional_details.civic_amenities?.includes(amenity)
                        ? "bg-emerald-100 border-emerald-600"
                        : ""
                        }`}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="font-medium text-gray-700 mb-2">Condition of the Building</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  name="additional_details.building_exterior"
                  onChange={handleChange}
                  className="border p-2 rounded-md"
                >
                  <option value="">Exterior Condition</option>
                  {buildingConditionOptions.map(v => <option key={v}>{v}</option>)}
                </select>

                <select
                  name="additional_details.building_interior"
                  onChange={handleChange}
                  className="border p-2 rounded-md"
                >
                  <option value="">Interior Condition</option>
                  {buildingConditionOptions.map(v => <option key={v}>{v}</option>)}
                </select>
              </div>
            </div>


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

export default Apartment;
