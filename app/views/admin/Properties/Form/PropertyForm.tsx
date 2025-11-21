"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {
  createProperty,
  getPropertyById,
  updateProperty,
} from "@/app/api/properties";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const validationSchema = Yup.object().shape({
  type_of_property: Yup.string().required("Property type is required"),
  address: Yup.string().required("Address is required"),
  latitude: Yup.number()
    .typeError("Latitude must be a number")
    .required("Latitude is required"),
  longitude: Yup.number()
    .typeError("Longitude must be a number")
    .required("Longitude is required"),
  area_rate_considered_per_sq_ft: Yup.string().when("type_of_property", {
    is: (val: string) =>
      ["Residential Flat", "Commercial Shop", "Office"].includes(val),
    then: (schema) =>
      schema.required("Area rate per sq ft is required for this type"),
    otherwise: (schema) => schema.notRequired(),
  }),
  land_rate_per_sq_mtr_Sq_yard: Yup.string().when("type_of_property", {
    is: (val: string) =>
      [
        "Residential Plot",
        "Residential House",
        "Industrial Plot",
        "Agricultural Land",
        "NA Land",
      ].includes(val),
    then: (schema) =>
      schema.required("Land rate per sq yard is required for this type"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const initialValues = {
  type_of_property: "",
  address: "",
  latitude: "",
  longitude: "",
  area_rate_considered_per_sq_ft: "",
  land_rate_per_sq_mtr_Sq_yard: "",
  location: { type: "Point", coordinates: [0, 0] },

  //   fields for edit mode only
  area_rate_considered_on: "",
  super_built_up_area: "",
  land_area_sq_mtr_sq_yrd: "",
  type_of_construction: "",
  age_of_the_property: "",
  property_sub_classification: "",
  carpet_area: "",
};

interface PropertyFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  propertyId?: string | null;
}

export default function PropertyForm({
  open,
  onClose,
  onSuccess,
  propertyId,
}: PropertyFormProps) {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const { toast } = useToast();
  const isEditMode = !!propertyId;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const payload = {
          ...values,
          type_of_property: values.type_of_property + " ",
          //   land_rate_per_sq_mtr_Sq_yard: parseInt(
          //     (
          //       parseInt(values.land_rate_per_sq_mtr_Sq_yard.toString()) / 9
          //     ).toString()
          //   ),
          land_rate_per_sq_mtr_Sq_yard: values.land_rate_per_sq_mtr_Sq_yard
            ? parseInt(
                (
                  parseInt(values.land_rate_per_sq_mtr_Sq_yard.toString()) / 9
                ).toString()
              )
            : "",
          location: {
            type: "Point",
            coordinates: [
              parseFloat(values.latitude.toString()),
              parseFloat(values.longitude.toString()),
            ],
          },
        };
        if (isEditMode && propertyId) {
          await updateProperty(propertyId, payload);
          toast({
            title: "Updated ✅",
            description: "Property updated successfully",
            variant: "default",
          });
        } else {
          await createProperty(payload);
          toast({
            title: "Success! ✅",
            description: "Property created successfully",
            variant: "default",
          });
        }
        formik.resetForm();
        onSuccess?.();
        onClose();
      } catch (err: any) {
        toast({
          title: "Failed ❌",
          description:
            err?.response?.data?.message ||
            err.message ||
            "Something went wrong",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const { values, handleChange, handleSubmit, errors, touched, setValues } =
    formik;

  useEffect(() => {
    if (isEditMode && propertyId && open) {
      const fetchProperty = async () => {
        try {
          setFetching(true);
          const data = await getPropertyById(propertyId);
          setValues({
            ...initialValues,
            ...data,
            latitude: data?.location?.coordinates?.[0] ?? "",
            longitude: data?.location?.coordinates?.[1] ?? "",
          });
        } catch (err: any) {
          toast({
            title: "Failed to load property ❌",
            description: err.message,
            variant: "destructive",
          });
        } finally {
          setFetching(false);
        }
      };
      fetchProperty();
    } else {
      setValues(initialValues);
    }
  }, [propertyId, open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="my-3">
            {isEditMode ? "Edit Property" : "Add New Property"}
          </DialogTitle>
        </DialogHeader>
        {fetching ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 text-emerald-600 animate-spin mr-2" />
            <p className="text-slate-600">Loading property data...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Type of Property */}
                <div>
                  <Label htmlFor="type_of_property" className="mb-2 flex">
                    Type of Property
                  </Label>
                  <select
                    id="type_of_property"
                    name="type_of_property"
                    className="w-full rounded border px-3 py-2"
                    onChange={handleChange}
                    value={values.type_of_property}
                    disabled={isEditMode}
                  >
                    <option value="">Select Property Type</option>
                    <option value="Residential Flat">Residential Flat</option>
                    <option value="Residential Plot">Residential Plot</option>
                    <option value="Residential House">Residential House</option>
                    <option value="Industrial Plot">Industrial Plot</option>
                    <option value="Commercial Shop">Commercial Shop</option>
                    <option value="Office">Office</option>
                    <option value="Agricultural Land">Agricultural Land</option>
                    <option value="NA Land">NA Land</option>
                  </select>
                  {errors.type_of_property && touched.type_of_property && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.type_of_property}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <Label htmlFor="address" className="mb-2 flex">
                    Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    placeholder="Property Address"
                  />
                  {errors.address && touched.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>

              {/* Latitude & Longitude */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="latitude" className="mb-2 flex">
                    Latitude
                  </Label>
                  <Input
                    id="latitude"
                    name="latitude"
                    value={values.latitude}
                    onChange={handleChange}
                    placeholder="Latitude"
                  />
                  {errors.latitude && touched.latitude && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.latitude}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="longitude" className="mb-2 flex">
                    Longitude
                  </Label>
                  <Input
                    id="longitude"
                    name="longitude"
                    value={values.longitude}
                    onChange={handleChange}
                    placeholder="Longitude"
                  />
                  {errors.longitude && touched.longitude && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.longitude}
                    </p>
                  )}
                </div>
              </div>

              {/* Conditional Fields */}
              {(values.type_of_property === "Residential Flat" ||
                values.type_of_property === "Commercial Shop" ||
                values.type_of_property === "Office") && (
                <div>
                  <Label
                    htmlFor="area_rate_considered_per_sq_ft"
                    className="mb-2 flex"
                  >
                    Area Rate Considered Per Sq Ft
                  </Label>
                  <Input
                    id="area_rate_considered_per_sq_ft"
                    name="area_rate_considered_per_sq_ft"
                    value={values.area_rate_considered_per_sq_ft}
                    onChange={handleChange}
                    placeholder="Area Rate"
                  />
                  {errors.area_rate_considered_per_sq_ft &&
                    touched.area_rate_considered_per_sq_ft && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.area_rate_considered_per_sq_ft}
                      </p>
                    )}
                </div>
              )}

              {(values.type_of_property === "Residential Plot" ||
                values.type_of_property === "Residential House" ||
                values.type_of_property === "Industrial Plot" ||
                values.type_of_property === "Agricultural Land" ||
                values.type_of_property === "NA Land") && (
                <div>
                  <Label
                    htmlFor="land_rate_per_sq_mtr_Sq_yard"
                    className="mb-2 flex"
                  >
                    Land Rate Per Sq Yard
                  </Label>
                  <Input
                    id="land_rate_per_sq_mtr_Sq_yard"
                    name="land_rate_per_sq_mtr_Sq_yard"
                    value={values.land_rate_per_sq_mtr_Sq_yard}
                    onChange={handleChange}
                    placeholder="Land Rate"
                  />
                  {errors.land_rate_per_sq_mtr_Sq_yard &&
                    touched.land_rate_per_sq_mtr_Sq_yard && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.land_rate_per_sq_mtr_Sq_yard}
                      </p>
                    )}
                </div>
              )}
              {isEditMode && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="carpet_area">Carpet Area</Label>
                      <Input
                        type="number"
                        id="carpet_area"
                        name="carpet_area"
                        value={values.carpet_area}
                        onChange={handleChange}
                        placeholder="Carpet Area"
                      />
                    </div>
                    <div>
                      <Label htmlFor="property_sub_classification">
                        Property Sub Classification
                      </Label>
                      <Input
                        id="property_sub_classification"
                        name="property_sub_classification"
                        value={values.property_sub_classification}
                        onChange={handleChange}
                        placeholder="Property Sub Classification"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="age_of_the_property">
                        Age of The Property
                      </Label>
                      <Input
                        type="number"
                        id="age_of_the_property"
                        name="age_of_the_property"
                        value={values.age_of_the_property}
                        onChange={handleChange}
                        placeholder="Age of The Property"
                      />
                    </div>
                    <div>
                      <Label htmlFor="type_of_construction">
                        Type of Construction
                      </Label>
                      <Input
                        id="type_of_construction"
                        name="type_of_construction"
                        value={values.type_of_construction}
                        onChange={handleChange}
                        placeholder="Type of Construction"
                      />
                    </div>
                    <div>
                      <Label htmlFor="land_area_sq_mtr_sq_yrd">
                        Land Area Sq mtr / Sq yrd
                      </Label>
                      <Input
                        id="land_area_sq_mtr_sq_yrd"
                        name="land_area_sq_mtr_sq_yrd"
                        value={values.land_area_sq_mtr_sq_yrd}
                        onChange={handleChange}
                        placeholder="Land Area"
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="super_built_up_area">
                        Super Built-up Area
                      </Label>
                      <Input
                        type="number"
                        id="super_built_up_area"
                        name="super_built_up_area"
                        value={values.super_built_up_area}
                        onChange={handleChange}
                        placeholder="Super Built-up Area"
                      />
                    </div>
                    <div>
                      <Label htmlFor="area_rate_considered_on">
                        Area Rate Considered On
                      </Label>
                      <Input
                        id="area_rate_considered_on"
                        name="area_rate_considered_on"
                        value={values.area_rate_considered_on}
                        onChange={handleChange}
                        placeholder="Area Rate Considered On"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* <div>
              {" "}
              <Label>Property Images</Label>{" "}
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                {" "}
                <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />{" "}
                <p className="text-slate-600 mb-2">
                  {" "}
                  Drag and drop images here, or click to browse{" "}
                </p>{" "}
                <Button type="button" variant="outline">
                  {" "}
                  Choose Files{" "}
                </Button>{" "}
              </div>{" "}
            </div> */}

              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-[#003f32] text-white"
                  disabled={loading}
                >
                  {loading
                    ? isEditMode
                      ? "Updating..."
                      : "Adding..."
                    : isEditMode
                    ? "Update Property"
                    : "Add Property"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </DialogFooter>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
