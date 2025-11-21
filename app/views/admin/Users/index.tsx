/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
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
  Eye,
  Loader2,
} from "lucide-react";
import { deleteUser, getUsers, User } from "@/app/api/userService";
import { useToast } from "@/hooks/use-toast";
import { Pagination } from "@/components/common/Pagination";
import { rowPerPage } from "@/lib/constant";
import StatusBadge from "@/components/common/StatusBadge";
import UserDetailsModal from "./View/UserDetails";
import UserForm from "./Form/UserForm";
import DeleteDialog from "@/components/common/DeleteDialog";

const UsersList = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(false);
  const [addEditOpen, setAddEditOpen] = useState(false);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const skip = (currentPage - 1) * rowPerPage;
      const response = await getUsers(rowPerPage, skip);
      setUsers(response.users);
      setTotalUsers(response.total);
    } catch (err: any) {
      toast({
        title: "Failed to load users ❌",
        description: err,
        variant: "destructive",
      });
    } finally {
      setTimeout(() => setLoading(false), 600);
    }
  };

  const handleViewUser = (userId: string) => {
    setSelectedUserId(userId);
    setIsViewModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsViewModalOpen(false);
    setSelectedUserId(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCloseAddEditModal = () => {
    setAddEditOpen(false);
  };

  const handleDeleteClick = (userId: string) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser(userToDelete);

      toast({
        title: "Success! ✅",
        description: "User deleted successfully",
        variant: "default",
      });

      fetchUsers();
    } catch (err: any) {
      toast({
        title: "Failed to delete user ❌",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const getRoleBadge = (role: string) => {
    const roleColors = {
      Admin: "bg-purple-100 text-purple-800 hover:bg-purple-200",
      Premium: "bg-orange-100 text-orange-800 hover:bg-orange-200",
      User: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    };

    return (
      <Badge
        variant="outline"
        className={roleColors[role as keyof typeof roleColors]}
      >
        {role}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getUserInitials = (email: string, name?: string) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">User Management</h1>
          <p className="text-slate-600">
            Manage registered users and their accounts
          </p>
        </div>
        <Button
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={() => setAddEditOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-slate-600">Total Users</p>
                <p className="text-xl font-bold">{totalUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-sm text-slate-600">Active Users</p>
                <p className="text-xl font-bold">
                  {users.filter((user) => user.is_active).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-slate-600">Premium Users</p>
                <p className="text-xl font-bold">
                  {users.filter((user) => user.is_paid).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-slate-600">Verified Users</p>
                <p className="text-xl font-bold">
                  {users.filter((user) => user.is_verified).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Usersss</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search users by name or email..."
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
                  <p className="text-slate-600">Loading users...</p>
                </div>
              </div>
            ) : users.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                <Users className="h-10 w-10 mb-2" />
                <p>No users available.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead className="hidden sm:table-cell">Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Subscription
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Reports
                    </TableHead>
                    <TableHead className="hidden xl:table-cell">
                      Join Date
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            {getUserInitials(user.email, user.name)}
                          </div>
                          <div>
                            <div className="font-semibold">{user.email}</div>
                            <div className="text-sm text-slate-500 md:hidden">
                              {user.role}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {getRoleBadge(user.role)}
                      </TableCell>
                      <TableCell>
                        <StatusBadge isActive={user?.is_active} />
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Badge
                          variant="outline"
                          className={
                            user.is_paid
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {user.is_paid ? "Paid" : "Free"}
                        </Badge>
                      </TableCell>

                      <TableCell className="hidden lg:table-cell">
                        <span className="text-sm font-medium">
                          {user.no_of_report}
                        </span>
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">
                        <span className="text-sm text-slate-600">
                          {formatDate(user.createdAt)}
                        </span>
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => handleViewUser(user._id)}
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
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteClick(user._id)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
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
          <Pagination
            currentPage={currentPage}
            totalItems={totalUsers}
            itemsPerPage={rowPerPage}
            onPageChange={handlePageChange}
          />
        </CardContent>
      </Card>
      {isViewModalOpen && (
        <UserDetailsModal
          isOpen={isViewModalOpen}
          onClose={handleCloseModal}
          userId={selectedUserId}
        />
      )}
      {addEditOpen && (
        <UserForm
          isOpen={addEditOpen}
          onClose={handleCloseAddEditModal}
          getUserList={fetchUsers}
        />
      )}

      <DeleteDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Are you sure want to Delete?"
        description="Are you sure want to delete this User? This action cannot be undone."
      />
    </div>
  );
};
export default UsersList;
