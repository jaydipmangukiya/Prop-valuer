"use client";

import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  getCookieConsentStats,
  getCookieConsentRecords,
  exportCookieConsentData,
  CookieConsentStatsResponse,
  CookieConsentListResponse,
} from "@/app/api/cookieConsent";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  XCircle,
  Settings2,
  Download,
  RefreshCw,
} from "lucide-react";

export default function CookieConsentAnalytics() {
  const { toast } = useToast();
  const [stats, setStats] = useState<CookieConsentStatsResponse["data"] | null>(
    null,
  );
  const [records, setRecords] = useState<
    CookieConsentListResponse["data"] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const fetchStats = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getCookieConsentStats();
      if (response.status) {
        setStats(response.data);
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to fetch statistics",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.message || "Failed to fetch cookie consent statistics",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const fetchRecords = useCallback(async () => {
    try {
      const response = await getCookieConsentRecords(1, 50);
      if (response.status) {
        setRecords(response.data);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch records",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const blob = await exportCookieConsentData();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cookie-consent-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast({
        title: "Success",
        description: "Cookie consent data exported successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to export data",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchRecords();
  }, [fetchStats, fetchRecords]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No cookie consent data available</p>
      </div>
    );
  }

  // Prepare pie chart data for consent status
  const consentStatusData = [
    { name: "Accepted All", value: stats.acceptedAll, color: "#10b981" },
    { name: "Rejected", value: stats.rejectedAll, color: "#ef4444" },
    { name: "Custom", value: stats.customPreferences, color: "#f59e0b" },
  ];

  // Prepare data for consent types
  const consentTypesData = [
    {
      name: "Analytics",
      accepted: stats.analyticsAccepted,
      rejected: stats.analyticsRejected,
    },
    {
      name: "Marketing",
      accepted: stats.marketingAccepted,
      rejected: stats.marketingRejected,
    },
  ];

  // Timeline data
  const timelineData = stats.analyticsByDay || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Cookie Consent Analytics
          </h1>
          <p className="text-gray-600 mt-1">
            Track user cookie preferences and compliance
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              fetchStats();
              fetchRecords();
            }}
            disabled={isLoading}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button
            size="sm"
            onClick={handleExport}
            disabled={isExporting}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Download className="h-4 w-4 mr-2" />
            {isExporting ? "Exporting..." : "Export CSV"}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Responses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalResponses}</div>
            <p className="text-xs text-gray-600">User consent submissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Acceptance Rate
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.acceptancePercentage.toFixed(1)}%
            </div>
            <p className="text-xs text-gray-600">
              {stats.acceptedAll} accepted all
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejections</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rejectedAll}</div>
            <p className="text-xs text-gray-600">
              {((stats.rejectedAll / stats.totalResponses) * 100).toFixed(1)}%
              of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Custom Choices
            </CardTitle>
            <Settings2 className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.customPreferences}</div>
            <p className="text-xs text-gray-600">
              {((stats.customPreferences / stats.totalResponses) * 100).toFixed(
                1,
              )}
              % of total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consent Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Consent Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={consentStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percent }) =>
                    `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {consentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cookie Types Acceptance */}
        <Card>
          <CardHeader>
            <CardTitle>Cookie Type Acceptance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={consentTypesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="accepted" fill="#10b981" name="Accepted" />
                <Bar dataKey="rejected" fill="#ef4444" name="Rejected" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      {timelineData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Consent Submissions Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#10b981"
                  name="Total Submissions"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="acceptedCount"
                  stroke="#3b82f6"
                  name="Accepted All"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="rejectedCount"
                  stroke="#ef4444"
                  name="Rejected"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Recent Records Table */}
      {records && records.records.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Showing {records.records.length} of {records.total} total records
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="text-left py-2 px-3">Date</th>
                    <th className="text-left py-2 px-3">Status</th>
                    <th className="text-center py-2 px-3">Necessary</th>
                    <th className="text-center py-2 px-3">Analytics</th>
                    <th className="text-center py-2 px-3">Marketing</th>
                  </tr>
                </thead>
                <tbody>
                  {records.records.map((record, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-3">
                        {new Date(record.createdAt).toLocaleString()}
                      </td>
                      <td className="py-2 px-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            record.status === "accepted_all"
                              ? "bg-green-100 text-green-800"
                              : record.status === "rejected_all"
                                ? "bg-red-100 text-red-800"
                                : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {record.status.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-center">
                        {record.necessary ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600 mx-auto" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600 mx-auto" />
                        )}
                      </td>
                      <td className="py-2 px-3 text-center">
                        {record.analytics ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600 mx-auto" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600 mx-auto" />
                        )}
                      </td>
                      <td className="py-2 px-3 text-center">
                        {record.marketing ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600 mx-auto" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
