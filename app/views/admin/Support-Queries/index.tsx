"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Pencil, HandshakeIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Pagination } from "@/components/common/Pagination";
import { PERMISSIONS, rowPerPage } from "@/lib/constant";
import { getSupportQueries } from "@/app/api/support";
import { Button } from "@/components/ui/button";
import UpdateStatusModal from "./Form/UpdateStatusModal";
import { hasAccess } from "@/lib/permissions";
import { useAuth } from "@/components/authentication/AuthProvider";

const SupportQueriesList = () => {
  const { toast } = useToast();
  const { user: userData } = useAuth();
  const perms = userData?.permissions || [];
  const role = userData?.role;
  const [loading, setLoading] = useState(false);

  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [supportQueries, setSupportQueries] = useState<any[]>([]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState<any>(null);
  const canEdit = hasAccess(
    perms,
    PERMISSIONS.SUPPORT_QUERIES.actions.EDIT,
    role
  );

  useEffect(() => {
    fetchSupportQueries();
  }, [currentPage]);

  const fetchSupportQueries = async () => {
    setLoading(true);
    try {
      const skip = (currentPage - 1) * rowPerPage;
      const response = await getSupportQueries(rowPerPage, skip);
      setSupportQueries(response.data || []);
      setTotalItems(response?.total || 0);
    } catch (err: any) {
      toast({
        title: "Failed to load support queries ❌",
        description: err?.message,
        variant: "destructive",
      });
    } finally {
      setTimeout(() => setLoading(false), 400);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Support Queries (User Requests)
          </h1>
        </div>
      </div>

      {/* Support Queries Table */}
      <Card>
        <CardHeader>
          <CardTitle> Support Queries Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Table */}
          <div className="rounded-md border">
            {loading ? (
              <div className="flex items-center justify-center min-h-[200px]">
                <div className="text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mx-auto mb-4" />
                  <p className="text-slate-600">Loading Support Queries..</p>
                </div>
              </div>
            ) : supportQueries.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                <HandshakeIcon className="h-10 w-10 mb-2" />
                <p>No Support Queries data found.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Submitted On
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {supportQueries?.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell className="font-semibold">
                        {item.firstName} {item.lastName}
                      </TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.phone}</TableCell>
                      <TableCell>{item.subject}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            item.status === "resolved"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(item.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            disabled={!canEdit}
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              setSelectedQuery(item);
                              setOpenModal(true);
                            }}
                          >
                            <Pencil className="h-3 w-3" />
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
            totalItems={totalItems}
            itemsPerPage={rowPerPage}
            onPageChange={handlePageChange}
          />
        </CardContent>
      </Card>
      {openModal && selectedQuery && (
        <UpdateStatusModal
          open={openModal}
          query={selectedQuery}
          onClose={(updated: any) => {
            setOpenModal(false);
            setSelectedQuery(null);
            if (updated) fetchSupportQueries();
          }}
        />
      )}
    </div>
  );
};
export default SupportQueriesList;
