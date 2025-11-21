"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  MapPin,
  Building2,
  Calendar,
  Layers,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { getUnListedPropertyById } from "@/app/api/unListedPropertyService";

interface ViewUnlistedPropertyModalProps {
  open: boolean;
  onClose: () => void;
  unlistedpropertyId?: string | null;
}

export default function UnlistedPropertyDetails({
  open,
  onClose,
  unlistedpropertyId,
}: ViewUnlistedPropertyModalProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [unlistedProperty, setUnlistedProperty] = useState<any>(null);

  useEffect(() => {
    if (!unlistedpropertyId || !open) return;

    const fetchUnlistedProperty = async () => {
      setLoading(true);
      try {
        const data = await getUnListedPropertyById(unlistedpropertyId);
        setUnlistedProperty(data);
      } catch (err: any) {
        toast({
          title: "Failed to load Unlisted Property ❌",
          description: err.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUnlistedProperty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlistedpropertyId, open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Unlisted Property Details
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-600 mr-2" />
            <p className="text-slate-600">
              Loading Unlisted property details...
            </p>
          </div>
        ) : unlistedProperty ? (
          // <div className="overflow-y-auto max-h-[85vh]">
          <div className="space-y-6 text-sm text-slate-800">
            {/* BASIC INFO */}
            <div className="bg-slate-50 rounded-md p-4 border">
              <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-emerald-600" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                <p>
                  <span className="font-medium">Owner name:</span>{" "}
                  {unlistedProperty.owner_name || "—"}
                </p>
                <p>
                  <span className="font-medium">Type of Property:</span>{" "}
                  {unlistedProperty.type_of_property || "—"}
                </p>
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {unlistedProperty.address || "—"}
                </p>
                <p>
                  <span className="font-medium">Owner Address:</span>{" "}
                  {unlistedProperty.owner_address || "—"}
                </p>
                <p>
                  <span className="font-medium">Active:</span>{" "}
                  {unlistedProperty.is_active ? (
                    <span className="text-green-600 font-medium flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" /> Active
                    </span>
                  ) : (
                    <span className="text-red-500 font-medium flex items-center gap-1">
                      <XCircle className="h-4 w-4" /> Inactive
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* LOCATION */}
            <div className="bg-slate-50 rounded-md p-4 border">
              <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                Location
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                <p>
                  <span className="font-medium">Latitude:</span>{" "}
                  {unlistedProperty?.latitude ?? "—"}
                </p>
                <p>
                  <span className="font-medium">Longitude:</span>{" "}
                  {unlistedProperty?.longitude ?? "—"}
                </p>
              </div>
            </div>

            {/* PROPERTY DETAILS */}
            <div className="bg-slate-50 rounded-md p-4 border">
              <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Layers className="h-4 w-4 text-orange-600" />
                Property Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                <p>
                  <span className="font-medium">Carpet Area:</span>{" "}
                  {unlistedProperty.carpet_area ?? "—"}
                </p>
                <p>
                  <span className="font-medium">Age of the Property:</span>{" "}
                  {unlistedProperty.age_of_property ?? "—"}
                </p>
                <p>
                  <span className="font-medium">Super Built-Up Area:</span>{" "}
                  {unlistedProperty.super_built_up_area ?? "—"}
                </p>
                <p>
                  <span className="font-medium">Distance:</span>{" "}
                  {unlistedProperty.distance ?? "—"}
                </p>
                <p>
                  <span className="font-medium">No Of Floor:</span>{" "}
                  {unlistedProperty.no_of_floor ?? "—"}
                </p>
                <p>
                  <span className="font-medium">Floor Of Unit:</span>{" "}
                  {unlistedProperty.floor_of_unit ?? "—"}
                </p>
                <p>
                  <span className="font-medium">Flat No:</span>{" "}
                  {unlistedProperty.flat_no ?? "—"}
                </p>
              </div>
            </div>

            {/* META */}
            <div className="bg-slate-50 rounded-md p-4 border">
              <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-600" />
                Metadata
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                <p>
                  <span className="font-medium">Created At:</span>{" "}
                  {new Date(unlistedProperty.createdAt).toLocaleString()}
                </p>
                <p>
                  <span className="font-medium">Updated At:</span>{" "}
                  {new Date(unlistedProperty.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </DialogFooter>
          </div>
        ) : (
          // </div>
          <p className="text-center text-gray-500 py-10">
            No Unlisted Property data found.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
