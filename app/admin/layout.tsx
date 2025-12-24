"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  Users,
  FileText,
  Settings,
  ChartBar as BarChart3,
  Shield,
  LogOut,
  Menu,
  X,
  UserCheck,
  EyeOff,
  HandshakeIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/authentication/LogoutButton";
import { useAuth } from "@/components/authentication/AuthProvider";
import { ADMIN_ROUTE_PERMISSION_MAP, hasAccess } from "@/lib/permissions";
import { AdminGuard } from "@/components/authentication/AdminGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname();

  const allNavigation = [
    { name: "Dashboard", href: "/admin", icon: BarChart3 },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Properties", href: "/admin/properties", icon: Building2 },
    {
      name: "Unlisted Properties",
      href: "/admin/unlisted-properties",
      icon: EyeOff,
    },
    { name: "Valuations", href: "/admin/valuations", icon: FileText },
    {
      name: "Auction Property",
      href: "/admin/auction-property",
      icon: Building2,
    },
    {
      name: "Interested Property",
      href: "/admin/interested-property",
      icon: Building2,
    },
    { name: "Staff", href: "/admin/staff", icon: UserCheck },
    {
      name: "Support Queries",
      href: "/admin/support-queries",
      icon: HandshakeIcon,
    },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const navigation = useMemo(() => {
    if (!user) return [];

    return allNavigation.filter((item) =>
      hasAccess(
        user.permissions,
        ADMIN_ROUTE_PERMISSION_MAP[item.href],
        user.role
      )
    );
  }, [user]);

  const homeHref = navigation.length > 0 ? navigation[0].href : "/";

  return (
    <AdminGuard>
      <div className="min-h-screen bg-slate-100 flex">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:static lg:inset-0`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200">
              <Link href={homeHref} className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-emerald-600" />
                <span className="text-xl font-bold text-slate-800">
                  PropValuer Admin
                </span>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="flex-1 mt-8 px-4">
              <ul className="space-y-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? "bg-emerald-100 text-emerald-700 font-medium"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="p-4 border-t border-slate-200">
              <Link href="/">
                <Button variant="outline" className="w-full justify-start">
                  <LogOut className="h-4 w-4 mr-2" />
                  Back to Website
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-emerald-600" />
                    <span className="text-sm font-medium text-slate-600">
                      Admin Panel
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-700 font-medium">
                  Admin
                </span>
                <LogoutButton />
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-full mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
