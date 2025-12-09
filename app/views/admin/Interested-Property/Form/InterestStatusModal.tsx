"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updatePropertyInterest } from "@/app/api/interestedProperty";

const InterestStatusModal = ({ open, onClose, interest }: any) => {
  const { toast } = useToast();

  const formik = useFormik({
    initialValues: {
      status: interest?.status || "New",
      reason: interest?.reason || "",
    },

    enableReinitialize: true,

    validationSchema: Yup.object({
      status: Yup.string().required(),
      reason: Yup.mixed().when("status", {
        is: (val: string) => val === "Not Interested",
        then: () =>
          Yup.string()
            .trim()
            .required("Reason is required for Not Interested status"),
        otherwise: () => Yup.string().nullable(),
      }),
    }),

    onSubmit: async (values) => {
      try {
        const payload = {
          status: values.status,
          reason: values.status === "Not Interested" ? values.reason : "",
        };

        const response = await updatePropertyInterest(interest._id, payload);
        if (response?.success) {
          toast({
            title: "Updated Successfully",
            description: "Lead status updated.",
          });
          onClose(true);
        } else {
          toast({
            title: "Failed to update",
            description: response?.message || "Unknown error",
            variant: "destructive",
          });
        }
      } catch (err: any) {
        toast({
          title: "Failed",
          description: err.message,
          variant: "destructive",
        });
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={() => onClose(false)}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Lead Status Update
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-5 mt-4">
          {/* STATUS DROPDOWN */}
          <div>
            <Label>Status</Label>
            <select
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Interested">Interested</option>
              <option value="Not Interested">Not Interested</option>
            </select>
          </div>

          {/* REASON only if Not Interested */}
          {formik.values.status === "Not Interested" && (
            <div>
              <Label>Reason *</Label>
              <Input
                name="reason"
                value={formik.values.reason}
                onChange={formik.handleChange}
              />
              {formik.touched.reason && formik.errors.reason && (
                <p className="text-red-600 text-xs">
                  {String(formik.errors.reason)}
                </p>
              )}
            </div>
          )}

          <DialogFooter>
            <Button type="submit" className="w-full bg-emerald-600 text-white">
              Update Status
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InterestStatusModal;
