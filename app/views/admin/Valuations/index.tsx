"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  Loader2,
  UserCheck,
  UserX,
  Eye,
  FileText,
  Download,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Pagination } from "@/components/common/Pagination";
import { PERMISSIONS, rowPerPage } from "@/lib/constant";
import StatusBadge from "@/components/common/StatusBadge";
import { getReports, ValuationReport } from "@/app/api/valuationService";
import ViewReportModal from "./View/ViewReportModal";
import { generateReportPDF } from "@/components/DownloadPDF";
import { getReportById } from "@/app/api/apartment";
import { useAuth } from "@/components/authentication/AuthProvider";
import { hasAccess } from "@/lib/permissions";

const ValuationsList = () => {
  const { toast } = useToast();
  const { user: userData } = useAuth();
  const perms = userData?.permissions || [];
  const role = userData?.role;
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState<ValuationReport[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalReports, setTotalReports] = useState(0);
  const [reportId, setReportId] = useState<string | null>(null);
  const canEdit = hasAccess(perms, PERMISSIONS.VALUATION.actions.EDIT, role);

  useEffect(() => {
    fetchReports();
  }, [currentPage]);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const skip = (currentPage - 1) * rowPerPage;
      const response = await getReports(rowPerPage, skip);

      setReports(response?.allReport);
      setTotalReports(response.total);
    } catch (err: any) {
      toast({
        title: "Failed to load reports ❌",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setTimeout(() => setLoading(false), 400);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDownload = async (report: ValuationReport) => {
    try {
      let mapUrls: { normal: string; satellite: string } | undefined;

      if (report.latitude && report.longitude) {
        const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

        mapUrls = {
          normal: `https://maps.googleapis.com/maps/api/staticmap?center=${report.latitude},${report.longitude}&zoom=16&size=600x600&maptype=roadmap&key=${key}&markers=color:red%7C${report.latitude},${report.longitude}`,
          satellite: `https://maps.googleapis.com/maps/api/staticmap?center=${report.latitude},${report.longitude}&zoom=16&size=600x600&maptype=satellite&key=${key}&markers=color:red%7C${report.latitude},${report.longitude}`,
        };
      }

      await generateReportPDF(report, mapUrls);
    } catch (err) {
      console.error("PDF generation failed", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Valuation Reports
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Manage all valuation requests
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-slate-600">Total Reports</p>
                <p className="text-xl font-bold">{totalReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserCheck className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-sm text-slate-600">Verified</p>
                <p className="text-xl font-bold">
                  {reports?.filter((r) => r.is_verified).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Valution Table */}
      <Card>
        <CardHeader>
          <CardTitle>Reports List</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Table */}
          <div className="rounded-md border">
            {loading ? (
              <div className="flex items-center justify-center min-h-[200px]">
                <div className="text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mx-auto mb-4" />
                  <p className="text-slate-600">Loading reports...</p>
                </div>
              </div>
            ) : reports.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                <FileText className="h-10 w-10 mb-2" />
                <p>No reports available.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Case Ref No</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Valuation</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports?.map((r) => (
                    <TableRow key={r._id}>
                      <TableCell className="font-medium">
                        <div className="font-semibold">{r.case_ref_no}</div>
                      </TableCell>
                      <TableCell>
                        <p className="font-semibold">
                          {r.name_of_the_customers}
                        </p>
                        <p className="text-sm text-slate-500">{r.owner_name}</p>
                      </TableCell>
                      <TableCell className="max-w-[250px]">
                        <p className="truncate">{r.property_address}</p>
                        <p className="text-xs text-slate-500">
                          {r.type_of_property}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="font-semibold text-emerald-600">
                          ₹ {r.final_valuation.toLocaleString()}
                        </p>
                      </TableCell>
                      <TableCell>
                        <StatusBadge isActive={r?.is_verified} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => setReportId(r._id)}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            disabled={!canEdit}
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => handleDownload(r)}
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalItems={totalReports}
            itemsPerPage={rowPerPage}
            onPageChange={handlePageChange}
          />
        </CardContent>
      </Card>
      <ViewReportModal
        open={!!reportId}
        reportId={reportId}
        onClose={() => setReportId(null)}
      />
    </div>
  );
};
export default ValuationsList;
