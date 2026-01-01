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
  IndianRupee,
} from "lucide-react";
import { getReportById } from "@/app/api/apartment";

interface ViewReportModalProps {
  open: boolean;
  onClose: () => void;
  reportId?: string | null;
}

export default function ViewReportModal({
  open,
  onClose,
  reportId,
}: ViewReportModalProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    if (!reportId || !open) return;

    const fetchReport = async () => {
      setLoading(true);
      try {
        const data = await getReportById(reportId);
        setReport(data?.report);
      } catch (err: any) {
        toast({
          title: "Failed to load report ❌",
          description: err.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportId, open]);

  const safe = (val?: any) =>
    val === undefined || val === null || val === "" ? "—" : val;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Valuation Report Details
          </DialogTitle>
        </DialogHeader>

        {/* LOADING */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-600 mr-2" />
            <p className="text-slate-600">Loading report...</p>
          </div>
        ) : report ? (
          <div className="space-y-6 text-sm text-slate-800">
            {/* BASIC INFO */}
            <div className="bg-slate-50 rounded-md p-4 border">
              <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-emerald-600" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                <p>
                  <span className="font-medium">Customer Name: </span>
                  {report.name_of_the_customers}
                </p>
                <p>
                  <span className="font-medium">Owner Name: </span>
                  {report.owner_name}
                </p>
                <p>
                  <span className="font-medium">Case Ref No: </span>
                  {report.case_ref_no}
                </p>
                <p>
                  <span className="font-medium">Report Date: </span>
                  {report.report_date}
                </p>
                <p>
                  <span className="font-medium">Owner Address:</span>{" "}
                  {report.owner_address || "—"}
                </p>
                <p>
                  <span className="font-medium">Customer Address:</span>{" "}
                  {report.address || "—"}
                </p>
                <p className="sm:col-span-2">
                  <span className="font-medium">Property Address: </span>
                  {report.property_address}
                </p>
              </div>
            </div>

            {/* STATUS */}
            <div className="bg-slate-50 rounded-md p-4 border">
              <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Status
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                <p>
                  <span className="font-medium">Verified:</span>{" "}
                  {report.is_verified ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" /> Yes
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center gap-1">
                      <XCircle className="h-4 w-4" /> No
                    </span>
                  )}
                </p>

                <p>
                  <span className="font-medium">Active:</span>{" "}
                  {report.is_active ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" /> Active
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center gap-1">
                      <XCircle className="h-4 w-4" /> Inactive
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* VALUATION DETAILS */}
            <div className="bg-slate-50 rounded-md p-4 border">
              <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <IndianRupee className="h-4 w-4 text-orange-600" />
                Valuation Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                <p>
                  <span className="font-medium">Type of Property:</span>{" "}
                  {report.type_of_property}
                </p>

                <p>
                  <span className="font-medium">Final Valuation:</span> ₹{" "}
                  {report.final_valuation.toLocaleString()}
                </p>

                <p>
                  <span className="font-medium">Valuation (in words):</span>{" "}
                  {report.final_valuation_in_word}
                </p>

                <p>
                  <span className="font-medium">Land Value:</span> ₹{" "}
                  {report.land_value.toLocaleString()}
                </p>

                <p>
                  <span className="font-medium">
                    Unit Rate (Land per sq. yard):
                  </span>{" "}
                  ₹ {report.unit_rate_considered_for_land}
                </p>

                <p>
                  <span className="font-medium">RV Value:</span> ₹ {report.RV}
                </p>
                <p>
                  <span className="font-medium">DV Value:</span> ₹ {report.DV}
                </p>

                <p>
                  <span className="font-medium">Land Area:</span>{" "}
                  {report.land_area}
                </p>

                <p>
                  <span className="font-medium">Land Location:</span>{" "}
                  {report.land_location}
                </p>
              </div>
            </div>

            {/* LOCATION */}
            <div className="bg-slate-50 rounded-md p-4 border">
              <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                Coordinates
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                <p>
                  <span className="font-medium">Latitude:</span>{" "}
                  {report.latitude}
                </p>
                <p>
                  <span className="font-medium">Longitude:</span>{" "}
                  {report.longitude}
                </p>
                <p>
                  <span className="font-medium">Distance Considered:</span>{" "}
                  {report.distance} meters
                </p>
              </div>
            </div>

            {/* ADDITIONAL DETAILS */}
            <div className="bg-slate-50 rounded-md p-4 border">
              <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Layers className="h-4 w-4 text-indigo-600" />
                Property Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                <p>
                  <span className="font-medium">Nearest Landmark:</span>{" "}
                  {report.nearest_landmark || "—"}
                </p>

                <p>
                  <span className="font-medium">Property Land Area:</span>{" "}
                  {report.property_land_area || "—"}
                </p>

                <p>
                  <span className="font-medium">
                    Built-up / Carpet / Super Built-up:
                  </span>{" "}
                  {report.built_up_area_carpet_area_super_built_up_area || "—"}
                </p>

                <p>
                  <span className="font-medium">Unit Rate (CA/BUA/SBA):</span>{" "}
                  {report.unit_rate_considered_for_ca_bua_sba || "—"}
                </p>

                <p>
                  <span className="font-medium">Building Value:</span>{" "}
                  {report.building_value || "—"}
                </p>
              </div>
            </div>

            {/* META */}
            <div className="bg-slate-50 rounded-md p-4 border">
              <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-600" />
                Metadata
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                <p>
                  <span className="font-medium">Created At:</span>{" "}
                  {new Date(report.createdAt).toLocaleString()}
                </p>
                <p>
                  <span className="font-medium">Updated At:</span>{" "}
                  {new Date(report.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>

            {report.additional_details && (
              <div className="bg-slate-50 rounded-md p-4 border">
                <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <Layers className="h-4 w-4 text-indigo-600" />
                  Additional Property Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">

                  {/* BASIC */}
                  <p><span className="font-medium">Facing:</span> {safe(report.additional_details.facing)}</p>
                  <p><span className="font-medium">Overlooking:</span> {safe(report.additional_details.overlooking)}</p>
                  <p><span className="font-medium">Possession Status:</span> {safe(report.additional_details.possession_status)}</p>
                  <p><span className="font-medium">Bathrooms:</span> {safe(report.additional_details.bathroom)}</p>
                  <p><span className="font-medium">Furnishing Status:</span> {safe(report.additional_details.furnishing_status)}</p>

                  {/* AREA */}
                  <p><span className="font-medium">Area Classification:</span> {safe(report.additional_details.area_classification)}</p>
                  <p><span className="font-medium">Area Type:</span> {safe(report.additional_details.area_type)}</p>
                  <p><span className="font-medium">Tenament No:</span> {safe(report.additional_details.tenament_no)}</p>
                  <p><span className="font-medium">Occupied By:</span> {safe(report.additional_details.occupied_by)}</p>

                  {/* INFRA / ENV */}
                  <p><span className="font-medium">Flooding Possibility:</span> {safe(report.additional_details.flooding_possibility)}</p>
                  <p><span className="font-medium">Road Facility:</span> {safe(report.additional_details.road_facility)}</p>
                  <p><span className="font-medium">Water Potentiality:</span> {safe(report.additional_details.water_potentiality)}</p>
                  <p><span className="font-medium">Power Supply:</span> {safe(report.additional_details.power_supply)}</p>

                  <p>
                    <span className="font-medium">Plot Shape:</span>{" "}
                    {safe(report.additional_details.plot_shape)}
                  </p>

                  <p>
                    <span className="font-medium">Road Width:</span>{" "}
                    {safe(report.additional_details.road_width)}
                  </p>

                  <p>
                    <span className="font-medium">Land Use Type:</span>{" "}
                    {safe(report.additional_details.land_use_type)}
                  </p>

                  {/* BUILDING */}
                  <p><span className="font-medium">Building Exterior:</span> {safe(report.additional_details.building_exterior)}</p>
                  <p><span className="font-medium">Building Interior:</span> {safe(report.additional_details.building_interior)}</p>

                  {/* AMENITIES */}
                  <div className="sm:col-span-2">
                    <span className="font-medium">Civic Amenities:</span>{" "}
                    {Array.isArray(report.additional_details.civic_amenities) &&
                      report.additional_details.civic_amenities.length > 0 ? (
                      <span className="ml-1">
                        {report.additional_details.civic_amenities.join(", ")}
                      </span>
                    ) : (
                      "—"
                    )}
                  </div>

                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">
            No report data found.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
