"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Mail,
  Phone,
  Loader2,
  UserCheck,
  UserX,
  Eye,
} from "lucide-react";
import { deleteStaff, getStaffs, Staff } from "@/app/api/staffService";
import { useToast } from "@/hooks/use-toast";
import { Pagination } from "@/components/common/Pagination";
import { rowPerPage } from "@/lib/constant";
import StatusBadge from "@/components/common/StatusBadge";
import DeleteDialog from "@/components/common/DeleteDialog";
import StaffForm from "./Form/StaffForm";
import ViewStaffModal from "./View/StaffDetails";

const StaffList = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalStaff, setTotalStaff] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
  const [viewId, setViewId] = useState<string | null>(null);

  useEffect(() => {
    fetchStaffs();
  }, [currentPage]);

  const fetchStaffs = async () => {
    setLoading(true);
    try {
      const skip = (currentPage - 1) * rowPerPage;
      const response = await getStaffs(rowPerPage, skip);

      setStaff(response.users);
      setTotalStaff(response.total);
    } catch (err: any) {
      toast({
        title: "Failed to load Staff ❌",
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

  const handleDeleteClick = (membersId: string) => {
    setStaffToDelete(membersId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!staffToDelete) return;

    try {
      await deleteStaff(staffToDelete);

      toast({
        title: "Success! ✅",
        description: "Staff deleted successfully.",
        variant: "default",
      });

      fetchStaffs();
    } catch (err: any) {
      toast({
        title: "Failed to delete staff ❌",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setStaffToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Staff Management
          </h1>
          <p className="text-slate-600">Manage team members and their roles</p>
        </div>
        <Button
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Staf Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-slate-600">Total Staff</p>
                <p className="text-xl font-bold">{totalStaff}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserCheck className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-sm text-slate-600">Active Staff</p>
                <p className="text-xl font-bold">
                  {staff?.filter((s) => s.is_active === true).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserX className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-slate-600">Inactive Staff</p>
                <p className="text-xl font-bold">
                  {staff?.filter((s) => s.is_active === false).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Members</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Table */}
          <div className="rounded-md border">
            {loading ? (
              <div className="flex items-center justify-center min-h-[200px]">
                <div className="text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mx-auto mb-4" />
                  <p className="text-slate-600">Loading staff members...</p>
                </div>
              </div>
            ) : staff.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                <Users className="h-10 w-10 mb-2" />
                <p>No staff members available.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Email
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Phone
                    </TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staff?.map((member) => (
                    <TableRow key={member._id}>
                      <TableCell className="font-medium">
                        <div className="font-semibold">{member.name}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center space-x-1">
                          <Mail className="h-3 w-3 text-slate-400" />
                          <span className="text-sm">{member.email}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center space-x-1">
                          <Phone className="h-3 w-3 text-slate-400" />
                          <span className="text-sm">{member.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            "bg-blue-100 text-blue-800 hover:bg-blue-200"
                          }
                        >
                          {member.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <StatusBadge isActive={member?.is_active} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => setViewId(member._id)}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              setSelectedStaffId(member._id);
                            }}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteClick(member._id)}
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
            totalItems={totalStaff}
            itemsPerPage={rowPerPage}
            onPageChange={handlePageChange}
          />
        </CardContent>
      </Card>
      {isAddModalOpen && (
        <StaffForm
          open={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={fetchStaffs}
        />
      )}

      <StaffForm
        open={!!selectedStaffId}
        onClose={() => setSelectedStaffId(null)}
        onSuccess={fetchStaffs}
        staffId={selectedStaffId}
      />

      <DeleteDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Are you sure want to Delete?"
        description="Are you sure want to delete this Staff? This action cannot be undone."
      />

      <ViewStaffModal
        open={!!viewId}
        onClose={() => setViewId(null)}
        staffId={viewId}
      />
    </div>
  );
};
export default StaffList;
