"use client";

import { useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ADMIN_ROUTE_PERMISSION_MAP, hasAccess } from "@/lib/permissions";
import { UserContext } from "./UserProvider";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userData } = useContext(UserContext)!;
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!userData) return;

    const requiredPermission = ADMIN_ROUTE_PERMISSION_MAP[pathname];

    if (
      requiredPermission &&
      !hasAccess(userData.permissions, requiredPermission, userData.role)
    ) {
      // redirect to first allowed admin page
      const firstAllowedRoute = Object.entries(ADMIN_ROUTE_PERMISSION_MAP).find(
        ([_, perm]) => hasAccess(userData.permissions, perm, userData.role)
      );

      router.replace(firstAllowedRoute?.[0] || "/");
    }
  }, [userData, pathname]);

  return children;
}
