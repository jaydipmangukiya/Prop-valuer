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
import { Users, CreditCard as Edit, Loader2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Pagination } from "@/components/common/Pagination";
import { rowPerPage } from "@/lib/constant";
import { getPropertyInterests } from "@/app/api/interestedProperty";
import InterestStatusModal from "./Form/InterestStatusModal";

const InterestedPropertyList = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [interests, setInterests] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState(null);

  useEffect(() => {
    fetchInterests();
  }, [currentPage]);

  const fetchInterests = async () => {
    setLoading(true);
    try {
      const skip = (currentPage - 1) * rowPerPage;
      const response = await getPropertyInterests(rowPerPage, skip);
      setInterests(response.data || []);
      setTotalItems(response?.pagination?.totalCount || 0);
    } catch (err: any) {
      toast({
        title: "Failed to load interests ❌",
        description: err,
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
          <h1 className="text-3xl font-bold text-slate-800">
            Interested Properties (User Requests)
          </h1>
        </div>
      </div>

      {/* Interest Property Table */}
      <Card>
        <CardHeader>
          <CardTitle>Interest Property Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Table */}
          <div className="rounded-md border">
            {loading ? (
              <div className="flex items-center justify-center min-h-[200px]">
                <div className="text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mx-auto mb-4" />
                  <p className="text-slate-600">Loading interests..</p>
                </div>
              </div>
            ) : interests.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                <Users className="h-10 w-10 mb-2" />
                <p>No interested user data found.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Company
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Submitted On
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {interests?.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell className="font-semibold">
                        {item.name}
                      </TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.mobile}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>{item.companyName || "-"}</TableCell>
                      <TableCell>
                        {new Date(item.createdAt).toLocaleString()}
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              setSelectedInterest(item);
                              setOpenStatusModal(true);
                            }}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-3 w-3" />
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
      {openStatusModal && (
        <InterestStatusModal
          open={openStatusModal}
          interest={selectedInterest}
          onClose={(updated) => {
            setOpenStatusModal(false);
            if (updated) fetchInterests();
          }}
        />
      )}
    </div>
  );
};
export default InterestedPropertyList;
