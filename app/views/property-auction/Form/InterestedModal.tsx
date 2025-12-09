import {
  DialogContent,
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addPropertyInterest } from "@/app/api/auctionProperty";

const InterestedModal = ({ open, onClose, propertyId }: any) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      companyName: "",
      email: "",
      mobile: "",
      consent: false,
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is Required"),
      email: Yup.string().email("Invalid").required("Email is Required"),
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Enter valid 10 digit mobile")
        .required("Mobile Number Required"),
      consent: Yup.boolean().oneOf([true], "You must provide consent"),
    }),

    onSubmit: async (values) => {
      setLoading(true);
      try {
        const payload = { ...values, propertyId };
        const response = await addPropertyInterest(payload);
        if (response?.success) {
          toast({
            title: "Success",
            description: response.message || "Your interest was submitted.",
          });

          formik.resetForm();
          onClose();
        } else {
          toast({
            title: "Something went wrong",
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
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Interested for Property
          </DialogTitle>

          <div className="bg-yellow-100 border border-yellow-300 text-yellow-700 p-3 rounded-md text-sm">
            Please enter your details to get notified once the auction is
            published for this property.
          </div>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* NAME */}
          <div>
            <Label>Name *</Label>
            <Input
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-600 text-xs">{formik.errors.name}</p>
            )}
          </div>

          {/* COMPANY */}
          <div>
            <Label>Company Name</Label>
            <Input
              name="companyName"
              value={formik.values.companyName}
              onChange={formik.handleChange}
            />
          </div>

          {/* EMAIL */}
          <div>
            <Label>Email ID *</Label>
            <Input
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-600 text-xs">{formik.errors.email}</p>
            )}
          </div>

          {/* MOBILE */}
          <div>
            <Label>Mobile No. *</Label>
            <Input
              name="mobile"
              type="text"
              value={formik.values.mobile}
              onChange={formik.handleChange}
            />
            {formik.touched.mobile && formik.errors.mobile && (
              <p className="text-red-600 text-xs">{formik.errors.mobile}</p>
            )}
          </div>

          {/* CONSENT */}
          <div className="flex gap-3 items-start">
            <input
              type="checkbox"
              name="consent"
              checked={formik.values.consent}
              onChange={formik.handleChange}
              className="mt-1"
            />
            <p className="text-sm text-slate-600">
              Please provide your consent to share the details with the
              concerned bank.
            </p>
          </div>

          {formik.touched.consent && formik.errors.consent && (
            <p className="text-red-600 text-xs">{formik.errors.consent}</p>
          )}

          {/* SUBMIT BUTTON */}
          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              {loading ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                "Submit"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InterestedModal;
