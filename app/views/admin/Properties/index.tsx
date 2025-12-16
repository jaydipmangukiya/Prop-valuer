"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Building2,
  Plus,
  Trash2,
  Eye,
  MapPin,
  Loader2,
  Pencil,
} from "lucide-react";
import {
  deleteProperty,
  getProperties,
  Properties,
} from "@/app/api/properties";
import { useToast } from "@/hooks/use-toast";
import { Pagination } from "@/components/common/Pagination";
import { rowPerPage } from "@/lib/constant";
import StatusBadge from "@/components/common/StatusBadge";
import DeleteDialog from "@/components/common/DeleteDialog";
import PropertyForm from "./Form/PropertyForm";
import ViewPropertyModal from "./View/PropertyDetails";

const PropertiesList = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalProperties, setTotalProperties] = useState(0);
  const [properties, setProperties] = useState<Properties[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [propertiesToDelete, setPropertiesToDelete] = useState<string | null>(
    null
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [viewId, setViewId] = useState<string | null>(null);

  useEffect(() => {
    fetchProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const skip = (currentPage - 1) * rowPerPage;
      const response = await getProperties(rowPerPage, skip);
      setProperties(response.allProperty);
      setTotalProperties(response.total);
    } catch (err: any) {
      toast({
        title: "Failed to load Properties ❌",
        description: err?.message,
        variant: "destructive",
      });
    } finally {
      setTimeout(() => setLoading(false), 400);
    }
  };

  const handleDeleteProperty = (userId: string) => {
    setPropertiesToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!propertiesToDelete) return;
    try {
      await deleteProperty(propertiesToDelete);

      toast({
        title: "Success ✅",
        description: "Property deleted successfully",
        variant: "default",
      });

      fetchProperties();
      setPropertiesToDelete(null);
    } catch (err: any) {
      toast({
        title: "Failed to delete property ❌",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setPropertiesToDelete(null);
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
            Property Management
          </h1>
          <p className="text-slate-600">Manage property listings and uploads</p>
        </div>
        <Button
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-slate-600">Total Properties</p>
                <p className="text-xl font-bold">{totalProperties}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-sm text-slate-600">Active Listings</p>
                <p className="text-xl font-bold">
                  {properties.filter((property) => property.is_active).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-slate-600">This Month</p>
                <p className="text-xl font-bold">9</p>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>

      {/* Properties Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Properties</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search properties by title, location, or owner..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div> */}

          {/* Table */}
          <div className="rounded-md border">
            {loading ? (
              <div className="flex items-center justify-center min-h-[200px]">
                <div className="text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mx-auto mb-4" />
                  <p className="text-slate-600">Loading Properties...</p>
                </div>
              </div>
            ) : properties.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                <Building2 className="h-10 w-10 mb-2" />
                <p>No Properties available.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Address</TableHead>
                    <TableHead>Property Type</TableHead>
                    <TableHead>Longitude</TableHead>
                    <TableHead>Latitude</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {properties.map((property) => {
                    const longitude =
                      property?.location?.coordinates?.[0] ?? "—";
                    const latitude =
                      property?.location?.coordinates?.[1] ?? "—";
                    return (
                      <TableRow key={property._id}>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3 text-slate-400" />
                            <span className="text-sm">{property.address}</span>
                          </div>
                        </TableCell>
                        <TableCell className="sm:table-cell">
                          {property.type_of_property}
                        </TableCell>
                        <TableCell>{longitude}</TableCell>
                        <TableCell>{latitude}</TableCell>
                        <TableCell>
                          <StatusBadge isActive={property?.is_active} />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                              onClick={() => setViewId(property._id)}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                              onClick={() => setEditId(property._id)}
                            >
                              <Pencil className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteProperty(property._id)}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
      <DeleteDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Are you sure want to Delete?"
        description="Are you sure want to delete this Properties? This action cannot be undone."
      />
      {isAddModalOpen && (
        <PropertyForm
          open={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={fetchProperties}
        />
      )}

      <PropertyForm
        open={!!editId}
        onClose={() => setEditId(null)}
        onSuccess={fetchProperties}
        propertyId={editId}
      />

      <ViewPropertyModal
        open={!!viewId}
        onClose={() => setViewId(null)}
        propertyId={viewId}
      />
    </div>
  );
};
export default PropertiesList;
