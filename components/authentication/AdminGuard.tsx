"use client";

import { useRouter, usePathname } from "next/navigation";
import { usePermission } from "@/hooks/usePermission";
import { ADMIN_ROUTE_PERMISSION_MAP } from "@/lib/permissions";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "./AuthProvider";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const { canAccess } = usePermission(ADMIN_ROUTE_PERMISSION_MAP[pathname]);

  useEffect(() => {
    if (!isLoading && !canAccess) {
      router.replace("/");
    }
  }, [isLoading, canAccess, router]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-10 w-10" />
      </div>
    );
  }

  return canAccess ? <>{children}</> : null;
}
