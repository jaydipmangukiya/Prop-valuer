"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { getUserById, User } from "@/app/api/userService";
import StatusBadge from "@/components/common/StatusBadge";
import {
  Mail,
  Calendar,
  Shield,
  FileText,
  CheckCircle,
  XCircle,
  Loader2,
  User as UserIcon,
  Phone,
  FileDigit,
  IdCard,
  CreditCard,
} from "lucide-react";

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
}

const UserDetailsModal = ({
  isOpen,
  onClose,
  userId,
}: UserDetailsModalProps) => {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && userId) {
      fetchUserDetails();
    } else {
      // Reset state when modal closes
      setUser(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, userId]);

  const fetchUserDetails = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const userData = await getUserById(userId);
      setUser(userData);
    } catch (err: any) {
      toast({
        title: "Failed to load user details ❌",
        description: err.message || "Something went wrong",
        variant: "destructive",
      });
      onClose();
    } finally {
      setLoading(false);
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
      hour: "2-digit",
      minute: "2-digit",
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

  const getSubscriptionStatus = (subscriptions_id: string | null) => {
    if (!subscriptions_id) {
      return {
        text: "No Subscription",
        badgeClass: "bg-gray-100 text-gray-800",
        icon: <XCircle className="h-4 w-4" />,
      };
    }
    return {
      text: "Active Subscription",
      badgeClass: "bg-green-100 text-green-800",
      icon: <CheckCircle className="h-4 w-4" />,
    };
  };

  if (!userId) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Complete information about the selected user
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mx-auto mb-4" />
              <p className="text-slate-600">Loading user details...</p>
            </div>
          </div>
        ) : user ? (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-semibold">
                {getUserInitials(user.email, user.name)}
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  {user.name || "No Name Provided"}
                </h3>
                <p className="text-slate-600">{user.email}</p>
                <p className="text-sm text-slate-500">ID: {user._id}</p>
              </div>
            </div>

            {/* User Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-800">
                  Basic Information
                </h4>

                <div className="space-y-3">
                  {user.phone && (
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-600">Phone</p>
                        <p className="font-medium text-sm">{user.phone}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-3">
                    <Shield className="h-4 w-4 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-600">Role</p>
                      <div className="mt-1">{getRoleBadge(user.role)}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-600">Joined Date</p>
                      <p className="font-medium">
                        {formatDate(user.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-600">Last Updated</p>
                      <p className="font-medium">
                        {formatDate(user.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Status */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-800">Account Status</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">
                      Active Status
                    </span>
                    <StatusBadge isActive={user.is_active} />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Verification</span>
                    {user.is_verified ? (
                      <div className="flex items-center space-x-1 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Verified</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 text-red-600">
                        <XCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          Not Verified
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Subscription</span>
                    <Badge
                      variant="outline"
                      className={
                        user.is_paid
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {user.is_paid ? "Premium" : "Free"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">
                      Reports Generated
                    </span>
                    <div className="flex items-center space-x-1">
                      <FileText className="h-4 w-4 text-slate-400" />
                      <span className="font-medium">{user.no_of_report}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">
                      PDFs Processed
                    </span>
                    <div className="flex items-center space-x-1">
                      <FileDigit className="h-4 w-4 text-slate-400" />
                      <span className="font-medium">{user.no_of_pdf || 0}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">
                      Subscription ID
                    </span>
                    <div className="flex items-center space-x-1">
                      <IdCard className="h-4 w-4 text-slate-400" />
                      <span className="font-medium text-xs">
                        {user.subscriptions_id || "No Subscription"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">
                      Subscription Status
                    </span>
                    <div className="flex items-center space-x-1">
                      <CreditCard className="h-4 w-4 text-slate-400" />
                      <Badge
                        variant="outline"
                        className={
                          getSubscriptionStatus(user.subscriptions_id)
                            .badgeClass
                        }
                      >
                        {getSubscriptionStatus(user.subscriptions_id).text}
                      </Badge>
                    </div>
                  </div>
                  <div className=""></div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-slate-500">
            <UserIcon className="h-10 w-10 mb-2" />
            <p>User not found.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsModal;
