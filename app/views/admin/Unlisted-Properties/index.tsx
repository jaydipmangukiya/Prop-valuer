"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Trash2,
  MapPin,
  Ruler,
  Loader2,
  EyeOff,
  Search,
  Eye,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  deleteUnlistedProperties,
  getUnListedProperty,
  unListedProperty,
} from "@/app/api/unListedPropertyService";
import { Pagination } from "@/components/common/Pagination";
import { rowPerPage } from "@/lib/constant";
import StatusBadge from "@/components/common/StatusBadge";
import DeleteDialog from "@/components/common/DeleteDialog";
import UnlistedPropertyDetails from "./View/UnlistedPropertiesUserDetails";

const UnlistedPropertiesList = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<unListedProperty[]>([]);
  const [totalProperties, setTotalProperties] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);
  const [viewId, setViewId] = useState<string | null>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const skip = (currentPage - 1) * rowPerPage;
      const response = await getUnListedProperty(rowPerPage, skip, searchTerm);
      setProperties(response?.allUnListedProperty || []);
      setTotalProperties(response.total || 0);
    } catch (err: any) {
      toast({
        title: "Failed to load properties ❌",
        description: err.message,
        variant: "destructive",
      });
      setProperties([]);
      setTotalProperties(0);
    } finally {
      setTimeout(() => setLoading(false), 600);
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

  const handleDeleteClick = (propertyId: string) => {
    setPropertyToDelete(propertyId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!propertyToDelete) return;

    try {
      await deleteUnlistedProperties(propertyToDelete);

      toast({
        title: "Success! ✅",
        description: "Unlisted Properties deleted successfully.",
        variant: "default",
      });

      fetchProperties();
    } catch (err: any) {
      toast({
        title: "Failed to delete Unlisted Properties ❌",
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
            Unlisted Properties
          </h1>
          <p className="text-slate-600">
            Manage properties that are not publicly listed
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-slate-600">Total Unlisted</p>
                <p className="text-xl font-bold">{totalProperties}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-slate-600">Documentation Issues</p>
                <p className="text-xl font-bold">
                  {/* {
                    properties.filter((p) => p.status.includes("Documentation"))
                      .length
                  } */}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-slate-600">Under Construction</p>
                <p className="text-xl font-bold">
                  {/* {
                    properties.filter((p) => p.status.includes("Construction"))
                      .length
                  } */}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-slate-600">Legal Issues</p>
                <p className="text-xl font-bold">
                  {/* {properties.filter((p) => p.status.includes("Legal")).length} */}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Properties Table */}
      <Card>
        <CardHeader>
          <CardTitle>Unlisted Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search users by address or type property..."
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
                <EyeOff className="h-10 w-10 mb-2" />
                <p>No Unlisted Properties available.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type Property</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Address
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Carpet Area
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Super Built Up Area
                    </TableHead>
                    <TableHead>Property Age</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden xl:table-cell">
                      Owner
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {properties?.map((property) => (
                    <TableRow key={property._id}>
                      <TableCell>
                        <div className="font-semibold text-sm">
                          {property.type_of_property}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3 text-slate-400" />
                          <span className="text-sm">{property.address}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center space-x-1">
                          <Ruler className="h-3 w-3 text-slate-400" />
                          <span className="text-sm">
                            {property.carpet_area}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span className="text-sm">
                          {property.super_built_up_area}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-emerald-600">
                          {property.age_of_property}
                        </span>
                      </TableCell>
                      <TableCell>
                        <StatusBadge isActive={property?.is_active} />
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">
                        <span className="text-sm">{property.owner_name}</span>
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
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteClick(property._id)}
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

      <DeleteDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Are you sure want to Delete?"
        description="Are you sure want to delete this Unlisted Properties? This action cannot be undone."
      />

      <UnlistedPropertyDetails
        open={!!viewId}
        onClose={() => setViewId(null)}
        unlistedpropertyId={viewId}
      />
    </div>
  );
};
export default UnlistedPropertiesList;
