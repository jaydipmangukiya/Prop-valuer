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
import { addStaff, getStaffById, updateStaff } from "@/app/api/staffService";
import { Loader2 } from "lucide-react";

interface AddStaffFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  staffId?: string | null;
}

const accessOptions = [
  "User",
  "Staff",
  "Property",
  "Add Property",
  "Edit Property",
  "Delete Property",
  "Unlisted Property",
];

const getValidationSchema = (isEditMode: boolean) => {
  return Yup.object({
    role: Yup.string().required("Role is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    name: Yup.string().required("Name is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits"),
    password: Yup.string().when([], {
      is: () => !isEditMode,
      then: (schema) =>
        schema
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    module: Yup.array().when([], {
      is: () => !isEditMode,
      then: (schema) =>
        schema
          .min(1, "At least one access must be selected")
          .required("At least one access must be selected"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });
};

const StaffForm = ({
  open,
  onClose,
  onSuccess,
  staffId,
}: AddStaffFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const isEditMode = !!staffId;

  const initialValues = {
    module: [] as string[],
    role: "",
    email: "",
    name: "",
    phone: "",
    password: "",
    isEditMode,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: getValidationSchema(isEditMode),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const payload = {
          module: values.module,
          role: values.role,
          email: values.email,
          name: values.name,
          phone: values.phone,
          ...(isEditMode ? {} : { password: values.password }),
        };
        if (isEditMode && staffId) {
          await updateStaff(staffId, payload);
          toast({
            title: "Success ✅",
            description: "Staff details updated successfully",
            variant: "default",
          });
        } else {
          await addStaff(payload);
          toast({
            title: "Created ✅",
            description: "New staff member added successfully",
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
    enableReinitialize: true,
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    setValues,
    resetForm,
  } = formik;

  useEffect(() => {
    if (isEditMode && staffId && open) {
      const fetchStaff = async () => {
        try {
          setFetching(true);
          const data = await getStaffById(staffId);
          setValues({
            role: data?.role || "",
            email: data?.email || "",
            name: data?.name || "",
            phone: data?.phone || "",
            module: Array.isArray(data?.module) ? data.module : [],
            password: "",
            isEditMode: true,
          });
        } catch (err: any) {
          toast({
            title: "Failed to load staff ❌",
            description: err.message,
            variant: "destructive",
          });
        } finally {
          setFetching(false);
        }
      };
      fetchStaff();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staffId, open]);

  const handleCheckboxChange = (value: string) => {
    if (values.module.includes(value)) {
      setFieldValue(
        "module",
        values.module.filter((item) => item !== value)
      );
    } else {
      setFieldValue("module", [...values.module, value]);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {isEditMode ? "Edit Staff Member" : "Add Newf Staff"}
          </DialogTitle>
        </DialogHeader>
        {fetching ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 text-emerald-600 animate-spin mr-2" />
            <p className="text-slate-600">Loading property data...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Role */}
              <div>
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-2 outline-none focus:border-[#003f32]"
                >
                  <option value="">Select Role</option>
                  <option value="VALUER">VALUER</option>
                  <option value="BANKER">BANKER</option>
                  <option value="PROPERTY_MANAGER">PROPERTY MANAGER</option>
                </select>
                {touched.role && errors.role && (
                  <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
                {touched.email && errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                />
                {touched.name && errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  placeholder="Enter phone"
                />
                {touched.phone && errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Access */}
            {!isEditMode && (
              <div>
                <Label>Access</Label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {accessOptions.map((access, idx) => (
                    <label key={idx} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        value={access}
                        checked={values.module.includes(access)}
                        onChange={() => handleCheckboxChange(access)}
                      />
                      {access}
                    </label>
                  ))}
                </div>
                {touched.module && errors.module && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.module as string}
                  </p>
                )}
              </div>
            )}

            {/* Password */}
            {!isEditMode && (
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                />
                {touched.password && errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
            )}

            <DialogFooter className="pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#003f32] text-white"
              >
                {loading
                  ? isEditMode
                    ? "Updating..."
                    : "Adding..."
                  : isEditMode
                  ? "Update Staff"
                  : "Add Staff"}
              </Button>
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={loading}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StaffForm;
