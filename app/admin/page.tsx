"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, FileText, TrendingUp, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { getDashboardStats } from "../api/dashboard";
import { useToast } from "@/hooks/use-toast";
import { UserContext } from "@/components/authentication/UserProvider";
import { PERMISSIONS } from "@/lib/constant";
import { hasAccess } from "@/lib/permissions";

export default function AdminDashboard() {
  const recentActivities = [
    {
      type: "user",
      message: "New user registered: john@example.com",
      time: "2 minutes ago",
    },
    {
      type: "property",
      message: "Property added in Mumbai, Bandra West",
      time: "15 minutes ago",
    },
    {
      type: "valuation",
      message: "Valuation completed for ₹2.5 Cr property",
      time: "1 hour ago",
    },
    {
      type: "user",
      message: "User updated profile: sarah@example.com",
      time: "2 hours ago",
    },
  ];
  const { toast } = useToast();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { userData } = useContext(UserContext)!;

  useEffect(() => {
    if (
      !hasAccess(
        userData?.permissions,
        PERMISSIONS.DASHBOARD.actions.VIEW,
        userData?.role
      )
    ) {
      return;
    }
    fetchStats();
  }, [userData]);

  const fetchStats = async () => {
    try {
      const res = await getDashboardStats();
      setStats(res.data);
    } catch (err: any) {
      toast({
        title: "Failed to load dashboard data ❌",
        description: err?.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const cards = stats
    ? [
        {
          title: "Total Users",
          value: stats.totalUsers.toLocaleString(),
          icon: <Users className="h-6 w-6" />,
          color: "text-blue-600",
        },
        {
          title: "Properties Listed",
          value: stats.propertiesListed.toLocaleString(),
          icon: <Building2 className="h-6 w-6" />,
          color: "text-emerald-600",
        },
        {
          title: "Valuations Today",
          value: stats.valuationsToday,
          icon: <FileText className="h-6 w-6" />,
          color: "text-orange-600",
        },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-600">Welcome to PropValuer Admin Panel</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <StatCardSkeleton key={i} />
            ))
          : cards.map((stat, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-slate-800">
                        {stat.value}
                      </p>
                    </div>
                    <div className={stat.color}>{stat.icon}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "user"
                        ? "bg-blue-500"
                        : activity.type === "property"
                        ? "bg-emerald-500"
                        : "bg-orange-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-slate-800">{activity.message}</p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/users">
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Manage Users
              </Button>
            </Link>
            <Link href="/admin/properties">
              <Button variant="outline" className="w-full justify-start">
                <Building2 className="h-4 w-4 mr-2" />
                View Properties
              </Button>
            </Link>
            <Link href="/admin/valuations">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Review Valuations
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="outline" className="w-full justify-start">
                <Eye className="h-4 w-4 mr-2" />
                System Settings
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const StatCardSkeleton = () => {
  return (
    <Card className="animate-pulse">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-4 w-24 bg-slate-200 rounded" />
            <div className="h-7 w-16 bg-slate-300 rounded" />
          </div>
          <div className="h-6 w-6 bg-slate-200 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
};
