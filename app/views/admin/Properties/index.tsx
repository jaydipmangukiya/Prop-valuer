"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
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
  Building2,
  Plus,
  Trash2,
  Eye,
  MapPin,
  Loader2,
  Pencil,
  Search,
} from "lucide-react";
import {
  deleteProperty,
  getProperties,
  Properties,
  uploadBulkProperty,
} from "@/app/api/properties";
import { useToast } from "@/hooks/use-toast";
import { Pagination } from "@/components/common/Pagination";
import { PERMISSIONS, rowPerPage } from "@/lib/constant";
import StatusBadge from "@/components/common/StatusBadge";
import DeleteDialog from "@/components/common/DeleteDialog";
import { useAuth } from "@/components/authentication/AuthProvider";
import { hasAccess } from "@/lib/permissions";
import { Input } from "@/components/ui/input";

// Dynamically import forms to reduce initial bundle size
const PropertyForm = dynamic(() => import("./Form/PropertyForm"), {
  loading: () => <div>Loading form...</div>,
  ssr: false,
});

const ViewPropertyModal = dynamic(() => import("./View/PropertyDetails"), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});

const BulkPropertyUpload = dynamic(
  () => import("../Auction-Property/Form/BulkPropertyUpload"),
  {
    loading: () => <div>Loading...</div>,
    ssr: false,
  }
);

const PropertiesList = () => {
  const { toast } = useToast();
  const { user: userData } = useAuth();
  const perms = userData?.permissions || [];
  const role = userData?.role;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalProperties, setTotalProperties] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [properties, setProperties] = useState<Properties[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [propertiesToDelete, setPropertiesToDelete] = useState<string | null>(
    null
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [viewId, setViewId] = useState<string | null>(null);

  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [bulkUploading, setBulkUploading] = useState(false);

  const canDelete = hasAccess(perms, PERMISSIONS.PROPERTY.actions.DELETE, role);
  const canAdd = hasAccess(perms, PERMISSIONS.PROPERTY.actions.ADD, role);
  const canEdit = hasAccess(perms, PERMISSIONS.PROPERTY.actions.EDIT, role);

  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const skip = (currentPage - 1) * rowPerPage;
      const response = await getProperties(rowPerPage, skip, searchTerm);
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

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProperties();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [currentPage, searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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

  const handleBulkUpload = async () => {
    if (!bulkFile) {
      toast({
        title: "File required",
        description: "Please select an Excel (.xlsx) file",
        variant: "destructive",
      });
      return;
    }

    try {
      setBulkUploading(true);
      await uploadBulkProperty(bulkFile);

      toast({
        title: "Upload Started ✅",
        description: "File is processing in background",
      });

      setBulkModalOpen(false);
      setBulkFile(null);
      fetchProperties();
    } catch (err: any) {
      toast({
        title: "Upload Failed ❌",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setBulkUploading(false);
    }
  };

  const handleBulkModalClose = () => {
    setBulkModalOpen(false);
    setBulkFile(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Property Management
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Manage property listings and uploads
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <Button
            disabled={!canAdd}
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={() => setBulkModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Bulk Property
          </Button>
          <Button
            disabled={!canAdd}
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </div>
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
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search properties by title, location, or owner..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

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
                    <TableHead className="hidden md:table-cell">
                      Address
                    </TableHead>
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
                        <TableCell>{property.type_of_property}</TableCell>
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
                              disabled={!canEdit}
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                              onClick={() => setEditId(property._id)}
                            >
                              <Pencil className="h-3 w-3" />
                            </Button>
                            <Button
                              disabled={!canDelete}
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
      <BulkPropertyUpload
        open={bulkModalOpen}
        onClose={handleBulkModalClose}
        onUpload={handleBulkUpload}
        loading={bulkUploading}
        onFileSelect={setBulkFile}
      />
    </div>
  );
};
export default PropertiesList;
