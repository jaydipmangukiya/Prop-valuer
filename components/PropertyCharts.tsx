"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProperties } from "@/app/api/properties";
import { useToast } from "@/hooks/use-toast";

interface ChartData {
  propertyTypeData: Array<{ name: string; count: number }>;
  statusData: Array<{ name: string; count: number }>;
  priceRangeData: Array<{ name: string; count: number }>;
  monthlyCreationData: Array<{ month: string; count: number }>;
  averagePriceByType: Array<{ type: string; avgPrice: number }>;
}

const colors = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
];

export default function PropertyCharts() {
  const [chartData, setChartData] = useState<ChartData>({
    propertyTypeData: [],
    statusData: [],
    priceRangeData: [],
    monthlyCreationData: [],
    averagePriceByType: [],
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        setLoading(true);
        // Fetch all properties with a large limit to get complete data
        const response = await getProperties(20000, 0, "");

        if (response && response.allProperty) {
          const properties = response.allProperty;

          // Process Property Type Distribution
          const propertyTypeMap = new Map<string, number>();
          const priceByType = new Map<
            string,
            { total: number; count: number }
          >();
          const priceRangeMap = new Map<string, number>();
          const monthlyMap = new Map<string, number>();

          properties.forEach((property) => {
            const rawType = property.type_of_property || "Unknown";
            const type = rawType
              .trim()
              .toLowerCase()
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");

            propertyTypeMap.set(type, (propertyTypeMap.get(type) || 0) + 1);

            // Average Price by Type
            if (property.area_rate_considered_per_sq_ft) {
              const existing = priceByType.get(type) || { total: 0, count: 0 };
              existing.total += property.area_rate_considered_per_sq_ft;
              existing.count += 1;
              priceByType.set(type, existing);
            }

            // Price Range Distribution
            if (property.area_rate_considered_per_sq_ft) {
              const price = property.area_rate_considered_per_sq_ft;
              let range = "Unknown";
              if (price < 50) range = "< ₹50/sq.ft";
              else if (price < 100) range = "₹50-100";
              else if (price < 200) range = "₹100-200";
              else if (price < 500) range = "₹200-500";
              else range = "> ₹500";

              priceRangeMap.set(range, (priceRangeMap.get(range) || 0) + 1);
            }

            // Monthly Creation Distribution
            if (property.createdAt) {
              const date = new Date(property.createdAt);
              const monthKey = `${date.getFullYear()}-${String(
                date.getMonth() + 1,
              ).padStart(2, "0")}`;
              monthlyMap.set(monthKey, (monthlyMap.get(monthKey) || 0) + 1);
            }
          });

          // Status Distribution
          const verified = properties.filter((p) => p.is_verified).length;
          const unverified = properties.filter((p) => !p.is_verified).length;
          const active = properties.filter((p) => p.is_active).length;
          const inactive = properties.filter((p) => !p.is_active).length;

          setChartData({
            propertyTypeData: Array.from(propertyTypeMap).map(
              ([name, count]) => ({
                name,
                count,
              }),
            ),
            statusData: [
              { name: "Verified", count: verified },
              { name: "Unverified", count: unverified },
              { name: "Active", count: active },
              { name: "Inactive", count: inactive },
            ],
            priceRangeData: Array.from(priceRangeMap).map(([name, count]) => ({
              name,
              count,
            })),
            monthlyCreationData: Array.from(monthlyMap)
              .sort(([a], [b]) => a.localeCompare(b))
              .slice(-12) // Last 12 months
              .map(([month, count]) => ({
                month: new Date(month + "-01").toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                }),
                count,
              })),
            averagePriceByType: Array.from(priceByType).map(([type, data]) => ({
              type,
              avgPrice: Math.round(data.total / data.count),
            })),
          });
        }
      } catch (error: any) {
        toast({
          title: "Failed to load chart data",
          description: error?.message || "Failed to fetch properties",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAndProcessData();
  }, [toast]);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6 h-96 bg-slate-200" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Property Type Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Property Type Distribution Analytics
          </CardTitle>
          <p className="text-sm text-slate-600 mt-2">
            Breakdown of property types across our listings including
            residential flats, commercial shops, plots, and more
          </p>
        </CardHeader>
        <CardContent>
          {chartData.propertyTypeData.length > 0 ? (
            <ResponsiveContainer width="100%" height={isMobile ? 420 : 340}>
              <PieChart margin={{ top: 8, right: 32, left: 8, bottom: 8 }}>
                <Pie
                  data={chartData.propertyTypeData}
                  cx="45%"
                  cy={isMobile ? "40%" : "50%"}
                  innerRadius={50}
                  outerRadius={isMobile ? 80 : 110}
                  paddingAngle={2}
                  labelLine={false}
                  label={
                    !isMobile
                      ? ({ name, value, percent }) =>
                          percent >= 0.05 ? `${name}: ${value}` : ""
                      : false
                  }
                  dataKey="count"
                >
                  {chartData.propertyTypeData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(val: number) => val.toLocaleString()} />
                <Legend
                  layout={isMobile ? "horizontal" : "vertical"}
                  verticalAlign={isMobile ? "bottom" : "middle"}
                  align={isMobile ? "center" : "right"}
                  wrapperStyle={{
                    fontSize: isMobile ? 12 : 14,
                    paddingTop: isMobile ? 20 : 0,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-300 flex items-center justify-center text-slate-500">
              No data available
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Property Verification & Active Status
            </CardTitle>
            <p className="text-sm text-slate-600 mt-1">
              Track verified and active properties in our listings
            </p>
          </CardHeader>
          <CardContent>
            {chartData.statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={chartData.statusData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-250 flex items-center justify-center text-slate-500">
                No data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Price Range Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Property Price Range Analysis
            </CardTitle>
            <p className="text-sm text-slate-600 mt-1">
              Distribution of properties by price per sq.ft to help identify
              market segments
            </p>
          </CardHeader>
          <CardContent>
            {chartData.priceRangeData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={chartData.priceRangeData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-250 flex items-center justify-center text-slate-500">
                No data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Property Creation Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Monthly Property Listing Growth Trend
            </CardTitle>
            <p className="text-sm text-slate-600 mt-1">
              Track property listings added each month to monitor platform
              growth
            </p>
          </CardHeader>
          <CardContent>
            {chartData.monthlyCreationData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart
                  data={chartData.monthlyCreationData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={{ fill: "#f59e0b", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-250 flex items-center justify-center text-slate-500">
                No data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Average Price by Property Type */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Average Property Valuation by Type
            </CardTitle>
            <p className="text-sm text-slate-600 mt-1">
              Compare average property prices per sq.ft across different
              property types
            </p>
          </CardHeader>
          <CardContent>
            {chartData.averagePriceByType.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={chartData.averagePriceByType}
                  margin={{ top: 20, right: 30, left: 40, bottom: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="type"
                    angle={-30}
                    textAnchor="end"
                    height={90}
                    tickMargin={12}
                  />
                  <YAxis />
                  <Tooltip formatter={(value) => `₹${value}`} />
                  <Bar
                    dataKey="avgPrice"
                    fill="#8b5cf6"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-250 flex items-center justify-center text-slate-500">
                No data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
