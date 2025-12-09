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
  Plus,
  CreditCard as Edit,
  Trash2,
  Loader2,
  Eye,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Pagination } from "@/components/common/Pagination";
import { rowPerPage } from "@/lib/constant";
import DeleteDialog from "@/components/common/DeleteDialog";
import AuctionPropertyForm from "./Form/AuctionPropertyForm";
import {
  AuctionProperty,
  deleteAuctionProperty,
  getAuctionProperties,
} from "@/app/api/auctionProperty";
import { useRouter } from "next/navigation";

const AuctionPropertyList = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [auctionproperties, setAuctionProperties] = useState<AuctionProperty[]>(
    []
  );
  const [totalProperties, setTotalProperties] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    fetchProperties();
  }, [currentPage]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const skip = (currentPage - 1) * rowPerPage;
      const response = await getAuctionProperties(rowPerPage, skip);
      setAuctionProperties(response.data || []);
      setTotalProperties(response?.pagination?.totalCount || 0);
    } catch (err: any) {
      toast({
        title: "Failed to load properties ❌",
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

  const handleDeleteClick = (membersId: string) => {
    setPropertyToDelete(membersId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!propertyToDelete) return;

    try {
      await deleteAuctionProperty(propertyToDelete);

      toast({
        title: "Deleted Successfully ✅",
        description: "Auction property removed.",
        variant: "default",
      });

      fetchProperties();
    } catch (err: any) {
      toast({
        title: "Delete Failed ❌",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setPropertyToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Auction Property Management
          </h1>
        </div>
        <Button
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Auction Property
        </Button>
      </div>

      {/* Auction Property Table */}
      <Card>
        <CardHeader>
          <CardTitle>Auction Property</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Table */}
          <div className="rounded-md border">
            {loading ? (
              <div className="flex items-center justify-center min-h-[200px]">
                <div className="text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mx-auto mb-4" />
                  <p className="text-slate-600">Loading auction property...</p>
                </div>
              </div>
            ) : auctionproperties.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                <Users className="h-10 w-10 mb-2" />
                <p>No auction property available.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">
                      State
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">City</TableHead>
                    <TableHead>Bank</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Auction Start</TableHead>
                    <TableHead>Auction End</TableHead>
                    <TableHead>Images</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auctionproperties?.map((properties) => (
                    <TableRow key={properties._id}>
                      <TableCell className="font-medium">
                        <div className="font-semibold">{properties.title}</div>
                      </TableCell>
                      <TableCell>{properties.state}</TableCell>
                      <TableCell>{properties.city}</TableCell>
                      <TableCell>{properties.bankName}</TableCell>
                      <TableCell>
                        ₹ {properties.price?.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {new Date(properties.auctionStart).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {new Date(properties.auctionEnd).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {properties.images && properties.images.length > 0 ? (
                          <img
                            src={properties.images[0].url}
                            alt="property"
                            className="h-24 w-30 object-cover rounded-md border"
                          />
                        ) : (
                          <span className="text-gray-400 text-sm">
                            No image
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() =>
                              router.push(
                                `/admin/auction-property/${properties._id}`
                              )
                            }
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              setSelectedPropertyId(properties._id);
                            }}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteClick(properties._id)}
                          >
                            <Trash2 className="h-3 w-3" />
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
            totalItems={totalProperties}
            itemsPerPage={rowPerPage}
            onPageChange={handlePageChange}
          />
        </CardContent>
      </Card>
      {isAddModalOpen && (
        <AuctionPropertyForm
          open={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={fetchProperties}
        />
      )}

      <AuctionPropertyForm
        open={!!selectedPropertyId}
        onClose={() => setSelectedPropertyId(null)}
        onSuccess={fetchProperties}
        propertyId={selectedPropertyId}
      />

      <DeleteDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Are you sure want to Delete?"
        description="Are you sure want to delete this Auction Property? This action cannot be undone."
      />
    </div>
  );
};
export default AuctionPropertyList;
