import { useAuth } from "@/components/authentication/AuthProvider";

export function usePermission(requiredPermission?: string, requiredRole?: string) {
  const { user } = useAuth();

  const hasPermission = () => {
    if (!user) return false;

    // Admins have all permissions
    if (user.role === "SUPER_ADMIN" || user.role === "ADMIN") return true;

    // Check specific permission
    if (requiredPermission) {
      return user.permissions?.includes(requiredPermission) ?? false;
    }

    // Check specific role
    if (requiredRole) {
      return user.role === requiredRole;
    }

    return true;
  };

  return {
    canAccess: hasPermission(),
    user,
    isAdmin: user?.role === "ADMIN" || user?.role === "SUPER_ADMIN",
  };
}
