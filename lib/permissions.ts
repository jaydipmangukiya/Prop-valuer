import { PERMISSIONS } from "./constant";

export const ADMIN_ROUTE_PERMISSION_MAP: Record<string, string> = {
  "/admin": PERMISSIONS.DASHBOARD.actions.VIEW,
  "/admin/users": PERMISSIONS.USER.actions.VIEW,
  "/admin/properties": PERMISSIONS.PROPERTY.actions.VIEW,
  "/admin/unlisted-properties": PERMISSIONS.UNLISTED_PROPERTY.actions.VIEW,
  "/admin/valuations": PERMISSIONS.VALUATION.actions.VIEW,
  "/admin/auction-property": PERMISSIONS.AUCTION_PROPERTY.actions.VIEW,
  "/admin/interested-property": PERMISSIONS.INTERESTED_PROPERTY.actions.VIEW,
  "/admin/staff": PERMISSIONS.STAFF.actions.VIEW,
  "/admin/support-queries": PERMISSIONS.SUPPORT_QUERIES.actions.VIEW,
  "/admin/settings": PERMISSIONS.SETTINGS.actions.VIEW,
};

export const hasAccess = (
  userPermissions: string[] = [],
  requiredPermission?: string,
  role?: string
) => {
  if (role === "SUPER_ADMIN" || role === "ADMIN") return true;
  if (!requiredPermission) return true;
  return userPermissions.includes(requiredPermission);
};

export function getFirstAllowedAdminRoute(userData: {
  permissions?: string[];
  role?: string;
}) {
  if (!userData) return "/";

  const entry = Object.entries(ADMIN_ROUTE_PERMISSION_MAP).find(([_, perm]) =>
    hasAccess(userData.permissions, perm, userData.role)
  );

  return entry?.[0] || "/";
}
