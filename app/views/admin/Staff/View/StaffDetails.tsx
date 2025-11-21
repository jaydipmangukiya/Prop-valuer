import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getStaffById } from "@/app/api/staffService"; // Ensure you have this function
import { useToast } from "@/hooks/use-toast";
import { Loader2, Calendar, Building2 } from "lucide-react";

interface ViewStaffModalProps {
  open: boolean;
  onClose: () => void;
  staffId: string | null;
}

export default function ViewStaffModal({
  open,
  onClose,
  staffId,
}: ViewStaffModalProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [staffDetails, setStaffDetails] = useState<any>(null);

  useEffect(() => {
    if (!staffId || !open) return;

    const fetchStaffDetails = async () => {
      setLoading(true);
      try {
        const data = await getStaffById(staffId);
        setStaffDetails(data);
      } catch (err: any) {
        toast({
          title: "Failed to load staff details ❌",
          description: err.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStaffDetails();
  }, [staffId, open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Staff Details
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-600 mr-2" />
            <p className="text-slate-600">Loading staff details...</p>
          </div>
        ) : staffDetails ? (
          <div className="space-y-6 text-sm text-slate-800">
            {/* Basic Info */}
            <div className="bg-slate-50 rounded-md p-4 border">
              <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-emerald-600" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                <p>
                  <span className="font-medium">Name:</span> {staffDetails.name}
                </p>
                <p>
                  <span className="font-medium">Role:</span> {staffDetails.role}
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {staffDetails.phone}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {staffDetails.email}
                </p>
                <p>
                  <span className="font-medium">Is Verified:</span>{" "}
                  {staffDetails.is_verified ? "Yes" : "No"}
                </p>
                <p>
                  <span className="font-medium">Is Active:</span>{" "}
                  {staffDetails.is_active ? "Active" : "Inactive"}
                </p>
                <p>
                  <span className="font-medium">Is Paid:</span>{" "}
                  {staffDetails.is_paid ? "Yes" : "No"}
                </p>
              </div>
            </div>

            {/* Modules */}
            <div className="bg-slate-50 rounded-md p-4 border">
              <h3 className="font-semibold text-slate-700 mb-3">Modules</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                <p>
                  <span className="font-medium">Modules:</span>{" "}
                  {staffDetails.module?.join(", ") || "—"}
                </p>
              </div>
            </div>

            {/* Metadata */}
            <div className="bg-slate-50 rounded-md p-4 border">
              <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-600" />
                Metadata
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                <p>
                  <span className="font-medium">Created At:</span>{" "}
                  {new Date(staffDetails.createdAt).toLocaleString()}
                </p>
                <p>
                  <span className="font-medium">Updated At:</span>{" "}
                  {new Date(staffDetails.updatedAt).toLocaleString()}
                </p>
                <p>
                  <span className="font-medium">No of Reports:</span>{" "}
                  {staffDetails.no_of_report}
                </p>
                <p>
                  <span className="font-medium">Login Attempts:</span>{" "}
                  {staffDetails.login_attempts}
                </p>
                <p>
                  <span className="font-medium">No of PDFs:</span>{" "}
                  {staffDetails.no_of_pdf}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">
            No staff details found.
          </p>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
