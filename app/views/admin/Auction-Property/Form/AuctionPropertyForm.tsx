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
import { useFormik } from "formik";
import * as Yup from "yup";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  addAuctionProperty,
  getAuctionPropertyById,
  updateAuctionProperty,
} from "@/app/api/auctionProperty";
import { getStates, getCitiesByState } from "@/lib/locationService";

interface AddStaffFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  propertyId?: string | null;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  possessionStatus: Yup.string().required("Possession is required"),
  actionType: Yup.string().required("Action type is required"),

  stateId: Yup.number().required("State is required"),
  state: Yup.string().required("State name required"),

  cityId: Yup.number().required("City is required"),
  city: Yup.string().required("City name required"),

  auctionStart: Yup.string().required("Auction start date required"),
  auctionEnd: Yup.string().required("Auction end date required"),
  emdEnd: Yup.string().required("EMD end date required"),
  auctionId: Yup.string().required("Auction ID is required"),
  builtUpArea: Yup.number().typeError("Invalid").nullable(),
  carpetArea: Yup.number().typeError("Invalid").nullable(),

  bankName: Yup.string().required("Bank Name required"),
  price: Yup.number()
    .typeError("Price must be a valid number")
    .required("Price is required")
    .min(1, "Price must be at least 1"),
});

const AuctionPropertyForm = ({
  open,
  onClose,
  onSuccess,
  propertyId,
}: AddStaffFormProps) => {
  const { toast } = useToast();
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [images, setImages] = useState<File[]>([]);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const isEditMode = !!propertyId;
  const [existingImages, setExistingImages] = useState<any[]>([]);
  const [removedImagePublicIds, setRemovedImagePublicIds] = useState<string[]>(
    []
  );

  const [existingPdf, setExistingPdf] = useState<any | null>(null);
  const [removeExistingPdf, setRemoveExistingPdf] = useState(false);
  const [pdfError, setPdfError] = useState("");
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    if (open) {
      setStates(getStates());
    }
  }, [open]);

  const initialValues = {
    title: "",
    possessionStatus: "",
    actionType: "",

    stateId: "",
    state: "",
    cityId: "",
    city: "",

    auctionId: "",
    auctionStart: "",
    auctionEnd: "",
    emdEnd: "",
    builtUpArea: 0,
    carpetArea: 0,

    bankName: "",
    price: 0,
    propertyId: "",

    // NEW FIELDS
    pinCode: "",
    ownershipOfProperty: "",
    propertyAddress: "",
    ownershipType: "",
    coBorrowerNames: "",
    registeredAddressOfBorrower: "",
    borrowerName: "",
    titleDeedType: "",
    nearestTransportStation: "",
    usps: "",
    ageOfConstruction: 0,
    nearbyEducationalInstitutes: "",
    nearbyShoppingCenters: "",
    nearbyLocalities: "",
    nearbyCommercialHub: "",
    facing: "",
    saleNoticePdf: null as File | null,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // const payload = {
        //   ...values,
        //   price: Number(values.price),
        //   propertyId: values.propertyId,
        //   ageOfConstruction: Number(values.ageOfConstruction),
        // };
        const formData = new FormData();

        Object.keys(values).forEach((key) => {
          if (key !== "saleNoticePdf") {
            formData.append(key, (values as any)[key]);
          }
        });
        images.forEach((img) => {
          formData.append("images", img);
        });

        if (removedImagePublicIds.length > 0) {
          formData.append(
            "removedImagePublicIds",
            JSON.stringify(removedImagePublicIds)
          );
        }

        if (values.saleNoticePdf) {
          formData.append("saleNoticePdf", values.saleNoticePdf);
        }

        // flag to tell backend to remove existing pdf
        if (removeExistingPdf) {
          formData.append("removeSaleNoticePdf", "true");
        }
        if (isEditMode) {
          await updateAuctionProperty(propertyId!, formData);
          toast({
            title: "Success ✅",
            description: "Auction property updated successfully",
            variant: "default",
          });
        } else {
          await addAuctionProperty(formData);
          toast({
            title: "Created",
            description: "Auction property added successfully",
          });
        }
        onSuccess?.();
        setImages([]);
        setExistingImages([]);
        setRemovedImagePublicIds([]);
        setExistingPdf(null);
        setRemoveExistingPdf(false);
        onClose();
        formik.resetForm();
      } catch (err: any) {
        toast({
          title: "Failed ❌",
          description:
            err?.response?.data?.error ||
            err?.message ||
            "Something went wrong",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    enableReinitialize: true,
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
    resetForm,
  } = formik;

  useEffect(() => {
    if (!isEditMode || !propertyId || !open) return;

    const loadProperty = async () => {
      setFetching(true);
      try {
        const data = await getAuctionPropertyById(propertyId);
        const selectedState = states.find((s) => s.id === data.stateId);
        const cityList = getCitiesByState(selectedState?.isoCode);
        setCities(cityList);

        setValues({
          title: data.title,
          possessionStatus: data.possessionStatus,
          actionType: data.actionType,
          stateId: data.stateId,
          state: data.state,
          cityId: data.cityId,
          city: data.city,
          auctionId: data.auctionDetails?.auctionId || "",
          auctionStart: formatDate(data.auctionDetails?.auctionStart),
          auctionEnd: formatDate(data.auctionDetails?.auctionEnd),
          emdEnd: formatDate(data.auctionDetails?.emdEnd),

          builtUpArea: data.builtUpArea || 0,
          carpetArea: data.carpetArea || 0,
          bankName: data.bankName,
          price: data.price,
          propertyId: data.propertyId,

          pinCode: data.pinCode || "",
          ownershipOfProperty: data.ownershipOfProperty || "",
          propertyAddress: data.propertyAddress || "",
          ownershipType: data.ownershipType || "",
          coBorrowerNames: data.coBorrowerNames || "",
          registeredAddressOfBorrower: data.registeredAddressOfBorrower || "",
          borrowerName: data.borrowerName || "",
          titleDeedType: data.titleDeedType || "",
          nearestTransportStation: data.nearestTransportStation || "",
          usps: data.usps || "",
          ageOfConstruction: data.ageOfConstruction,
          nearbyEducationalInstitutes: data.nearbyEducationalInstitutes || "",
          nearbyShoppingCenters: data.nearbyShoppingCenters || "",
          nearbyLocalities: data.nearbyLocalities || "",
          nearbyCommercialHub: data.nearbyCommercialHub || "",
          facing: data.facing || "",
          saleNoticePdf: null,
        });
        setExistingImages(data.images || []);
        setExistingPdf(data.saleNoticePdf || null);
        setRemovedImagePublicIds([]);
        setRemoveExistingPdf(false);
        setImages([]);
      } catch (err: any) {
        toast({
          title: "Load failed❌",
          description: err.message,
          variant: "destructive",
        });
      } finally {
        setFetching(false);
      }
    };
    loadProperty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyId, open]);

  const handleClose = () => {
    resetForm();
    setExistingImages([]);
    setRemovedImagePublicIds([]);
    setExistingPdf(null);
    setRemoveExistingPdf(false);
    setImageError("");
    setPdfError("");
    onClose();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().slice(0, 16);
  };

  const handleNewImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const validImages: File[] = [];
    let err = "";

    files.forEach((file) => {
      if (!["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
        err = "Only PNG, JPG, and JPEG images are allowed.";
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        err = "Each image must be less than 5 MB.";
        return;
      }

      validImages.push(file);
    });

    if (err) {
      setImageError(err);
      e.target.value = "";
      return;
    }
    setImageError("");
    setImages(validImages);
  };

  const handleRemoveNewImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveExistingImage = (publicId: string) => {
    setExistingImages((prev) =>
      prev.filter((img) => img.public_id !== publicId)
    );
    setRemovedImagePublicIds((prev) =>
      prev.includes(publicId) ? prev : [...prev, publicId]
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {isEditMode ? "Edit Auction Property" : "Add Auction Property"}
          </DialogTitle>
        </DialogHeader>
        {fetching ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 text-emerald-600 animate-spin mr-2" />
          </div>
        ) : (
          <div className="max-h-[70vh] overflow-y-auto">
            <form
              id="auctionForm"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title" className="mb-2 flex">
                    Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    placeholder="Property Title"
                  />
                  {errors.title && touched.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                  )}
                </div>
                <div>
                  <Label className="mb-2 flex">Possession Status</Label>
                  <Input
                    id="possessionStatus"
                    name="possessionStatus"
                    value={values.possessionStatus}
                    onChange={handleChange}
                    placeholder="Possession Status"
                  />
                  {touched.possessionStatus && errors.possessionStatus && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.possessionStatus}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label className="mb-2 flex">Type of Action</Label>
                  <Input
                    id="actionType"
                    name="actionType"
                    value={values.actionType}
                    onChange={handleChange}
                    placeholder="Action Type"
                  />
                  {touched.actionType && errors.actionType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.actionType}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="mb-2 flex">State</Label>
                  <select
                    className="border rounded p-2 w-full"
                    value={values.stateId}
                    onChange={(e) => {
                      const numericId = Number(e.target.value);

                      const selected = states.find((s) => s.id === numericId);

                      setFieldValue("stateId", numericId);
                      setFieldValue("state", selected?.name || "");

                      const cityList = getCitiesByState(selected.isoCode);
                      setCities(cityList);
                    }}
                  >
                    <option value="">Select State</option>
                    {states.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  {touched.stateId && errors.stateId && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.stateId}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="mb-2 flex">City</Label>
                  <select
                    className="border rounded p-2 w-full"
                    value={values.cityId}
                    onChange={(e) => {
                      const numericId = Number(e.target.value);
                      const selected = cities.find((c) => c.id === numericId);

                      setFieldValue("cityId", numericId);
                      setFieldValue("city", selected?.name || "");
                    }}
                  >
                    <option value="">Select City</option>
                    {cities.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {touched.cityId && errors.cityId && (
                    <p className="text-red-500 text-sm mt-1">{errors.cityId}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label>Auction ID</Label>
                  <Input
                    id="auctionId"
                    name="auctionId"
                    type="number"
                    value={values.auctionId}
                    onChange={handleChange}
                    placeholder="Enter Auction ID"
                  />
                  {touched.auctionId && errors.auctionId && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.auctionId}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="mb-2 flex">Auction Start Date</Label>
                  <Input
                    id="auctionStart"
                    type="datetime-local"
                    name="auctionStart"
                    value={values.auctionStart}
                    onChange={handleChange}
                    placeholder="Auction Start Date"
                  />
                  {touched.auctionStart && errors.auctionStart && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.auctionStart}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="mb-2 flex">Auction End Date</Label>
                  <Input
                    id="auctionEnd"
                    type="datetime-local"
                    name="auctionEnd"
                    value={values.auctionEnd}
                    onChange={handleChange}
                    placeholder="Auction End Date"
                  />
                  {touched.auctionEnd && errors.auctionEnd && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.auctionEnd}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label className="mb-2 flex">EMD End Date</Label>
                  <Input
                    id="emdEnd"
                    type="datetime-local"
                    name="emdEnd"
                    value={values.emdEnd}
                    onChange={handleChange}
                    className="w-full"
                  />
                  {touched.emdEnd && errors.emdEnd && (
                    <p className="text-red-500 text-sm mt-1">{errors.emdEnd}</p>
                  )}
                </div>
                <div>
                  <Label>Built-Up Area (sqft)</Label>
                  <Input
                    type="number"
                    name="builtUpArea"
                    value={values.builtUpArea}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label>Carpet Area (sqft)</Label>
                  <Input
                    type="number"
                    name="carpetArea"
                    value={values.carpetArea}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* State */}
                <div>
                  <Label className="mb-2 flex">Bank Name</Label>
                  <Input
                    id="bankName"
                    name="bankName"
                    value={values.bankName}
                    onChange={handleChange}
                    placeholder="bankName"
                    type="string"
                  />
                  {touched.bankName && errors.bankName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.bankName}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="mb-2 flex">Price</Label>
                  <Input
                    type="number"
                    id="price"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    placeholder="Price"
                  />
                  {touched.price && errors.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                  )}
                </div>
                <div>
                  <Label>Pincode</Label>
                  <Input
                    name="pinCode"
                    value={values.pinCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label>Ownership of Property</Label>
                  <Input
                    name="ownershipOfProperty"
                    value={values.ownershipOfProperty}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Property Address</Label>
                  <Input
                    name="propertyAddress"
                    value={values.propertyAddress}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Ownership Type</Label>
                  <Input
                    name="ownershipType"
                    value={values.ownershipType}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label>Co-Borrower Names</Label>
                  <Input
                    name="coBorrowerNames"
                    value={values.coBorrowerNames}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Registered Address of Borrower</Label>
                  <Input
                    name="registeredAddressOfBorrower"
                    value={values.registeredAddressOfBorrower}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Borrower Name</Label>
                  <Input
                    name="borrowerName"
                    value={values.borrowerName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label>Title Deed Type</Label>
                  <Input
                    name="titleDeedType"
                    value={values.titleDeedType}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label>Nearest Airport / Railway / Bus / Metro</Label>
                  <Input
                    name="nearestTransportStation"
                    value={values.nearestTransportStation}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label>USPs</Label>
                  <Input
                    name="usps"
                    value={values.usps}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label>Age of Construction</Label>
                  <Input
                    type="number"
                    name="ageOfConstruction"
                    value={values.ageOfConstruction}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label>Nearby Educational Institutes</Label>
                  <Input
                    name="nearbyEducationalInstitutes"
                    value={values.nearbyEducationalInstitutes}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label>Nearby Shopping Centers</Label>
                  <Input
                    name="nearbyShoppingCenters"
                    value={values.nearbyShoppingCenters}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label>Nearby Localities</Label>
                  <Input
                    name="nearbyLocalities"
                    value={values.nearbyLocalities}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label>Nearby Commercial Hub</Label>
                  <Input
                    name="nearbyCommercialHub"
                    value={values.nearbyCommercialHub}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label>Facing</Label>
                  <Input
                    name="facing"
                    value={values.facing}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label className="font-medium">Property Images</Label>
                <label
                  htmlFor="propertyImages"
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-600 transition"
                >
                  <span className="text-gray-600 text-sm">
                    Click or Drop images here
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    PNG, JPG — Multiple allowed
                  </span>
                </label>
                <Input
                  id="propertyImages"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleNewImagesChange}
                />
                {imageError && (
                  <p className="text-red-600 text-xs mt-1">{imageError}</p>
                )}
                {existingImages.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-medium mb-2">Existing Images</p>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                      {existingImages.map((img: any, idx: number) => (
                        <div
                          key={img.public_id || idx}
                          className="relative rounded-lg overflow-hidden border shadow-sm group"
                        >
                          <img
                            src={img.url}
                            alt={`Property ${idx + 1}`}
                            className="h-28 w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveExistingImage(img.public_id)
                            }
                            className="absolute top-1 right-1 bg-black/60 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {images.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-medium mb-2">New Images</p>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                      {images.map((file, idx) => (
                        <div
                          key={idx}
                          className="relative rounded-lg overflow-hidden border shadow-sm group"
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`New ${idx + 1}`}
                            className="h-28 w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveNewImage(idx)}
                            className="absolute top-1 right-1 bg-black/60 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-3 mt-6">
                <Label className="font-medium">Sale Notice PDF</Label>
                <label
                  htmlFor="saleNoticePdf"
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-600 transition"
                >
                  <span className="text-gray-600 text-sm">
                    Click or Drop PDF here
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    Only PDF allowed
                  </span>
                </label>
                <Input
                  id="saleNoticePdf"
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    setPdfError("");
                    if (file.type !== "application/pdf") {
                      setPdfError("Only PDF files are allowed.");
                      e.target.value = "";
                      return;
                    }

                    // Validate size < 5 MB
                    const maxSize = 5 * 1024 * 1024;
                    if (file.size > maxSize) {
                      setPdfError("PDF must be less than 5 MB.");
                      e.target.value = "";
                      return;
                    }
                    setExistingPdf(null);
                    setRemoveExistingPdf(true);
                    setFieldValue("saleNoticePdf", file);
                  }}
                />
                {pdfError && (
                  <p className="text-red-600 text-xs mt-1">{pdfError}</p>
                )}
                {existingPdf && !removeExistingPdf && (
                  <div className="flex items-center justify-between bg-gray-100 p-3 rounded border">
                    <div className="flex items-center gap-3">
                      <div className="bg-red-600 text-white text-sm px-2 py-1 rounded">
                        PDF
                      </div>
                      <a
                        href={existingPdf.url}
                        target="_blank"
                        className="text-blue-600 underline text-sm"
                      >
                        {existingPdf.originalName}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setRemoveExistingPdf(true);
                        setExistingPdf(null);
                      }}
                      className="text-red-600 text-xs font-medium"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {/* New PDF file info */}
                {values.saleNoticePdf && (
                  <div className="flex items-center justify-between bg-gray-100 p-3 rounded border">
                    <div className="flex items-center gap-3">
                      <div className="bg-red-600 text-white text-sm px-2 py-1 rounded">
                        PDF
                      </div>
                      <span>{values.saleNoticePdf?.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFieldValue("saleNoticePdf", null)}
                      className="text-red-600 text-xs font-medium"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        )}
        <DialogFooter className="pt-4 gap-2">
          <Button
            type="submit"
            form="auctionForm"
            disabled={loading}
            className="bg-[#003f32] text-white"
          >
            {loading
              ? isEditMode
                ? "Updating..."
                : "Adding..."
              : isEditMode
              ? "Update"
              : "Add"}
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
      </DialogContent>
    </Dialog>
  );
};

export default AuctionPropertyForm;
