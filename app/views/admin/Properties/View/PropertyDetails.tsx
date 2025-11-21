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
import { getPropertyById } from "@/app/api/properties";
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

interface ViewPropertyModalProps {
  open: boolean;
  onClose: () => void;
  propertyId?: string | null;
}

export default function ViewPropertyModal({
  open,
  onClose,
  propertyId,
}: ViewPropertyModalProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [property, setProperty] = useState<any>(null);

  useEffect(() => {
    if (!propertyId || !open) return;

    const fetchProperty = async () => {
      setLoading(true);
      try {
        const data = await getPropertyById(propertyId);
        setProperty(data);
      } catch (err: any) {
        toast({
          title: "Failed to load property ❌",
          description: err.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyId, open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Property Details
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-600 mr-2" />
            <p className="text-slate-600">Loading property details...</p>
          </div>
        ) : property ? (
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
                  <span className="font-medium">Type of Property:</span>{" "}
                  {property.type_of_property || "—"}
                </p>
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {property.address || "—"}
                </p>
                <p>
                  <span className="font-medium">Verified:</span>{" "}
                  {property.is_verified ? (
                    <span className="text-green-600 font-medium flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" /> Yes
                    </span>
                  ) : (
                    <span className="text-red-500 font-medium flex items-center gap-1">
                      <XCircle className="h-4 w-4" /> No
                    </span>
                  )}
                </p>
                <p>
                  <span className="font-medium">Active:</span>{" "}
                  {property.is_active ? (
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
                  {property.location?.coordinates?.[0] ?? "—"}
                </p>
                <p>
                  <span className="font-medium">Longitude:</span>{" "}
                  {property.location?.coordinates?.[1] ?? "—"}
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
                  {property.carpet_area ?? "—"}
                </p>
                <p>
                  <span className="font-medium">
                    Property Sub Classification:
                  </span>{" "}
                  {property.property_sub_classification ?? "—"}
                </p>
                <p>
                  <span className="font-medium">Age of the Property:</span>{" "}
                  {property.age_of_the_property ?? "—"}
                </p>
                <p>
                  <span className="font-medium">Type of Construction:</span>{" "}
                  {property.type_of_construction ?? "—"}
                </p>
                <p>
                  <span className="font-medium">Land Area (Sq. Yrd):</span>{" "}
                  {property.land_area_sq_mtr_sq_yrd ?? "—"}
                </p>
                <p>
                  <span className="font-medium">Super Built-Up Area:</span>{" "}
                  {property.super_built_up_area ?? "—"}
                </p>
                <p>
                  <span className="font-medium">Land Rate per Sq. Yard:</span> ₹{" "}
                  {property.land_rate_per_sq_mtr_Sq_yard ?? "—"}
                </p>
                <p>
                  <span className="font-medium">
                    Area Rate Considered Per Sq Ft:
                  </span>{" "}
                  ₹ {property.area_rate_considered_per_sq_ft ?? "—"}
                </p>
                <p className="sm:col-span-2">
                  <span className="font-medium">Area Rate Considered On:</span>{" "}
                  {property.area_rate_considered_on ?? "—"}
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
                  {new Date(property.createdAt).toLocaleString()}
                </p>
                <p>
                  <span className="font-medium">Updated At:</span>{" "}
                  {new Date(property.updatedAt).toLocaleString()}
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
            No property data found.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
