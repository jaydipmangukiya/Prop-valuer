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
  ScatterChart,
  Scatter,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuctionProperties } from "@/app/api/auctionProperty";
import { useToast } from "@/hooks/use-toast";

interface AuctionChartData {
  propertyTypeData: Array<{ name: string; count: number }>;
  possessionStatusData: Array<{ name: string; count: number }>;
  actionTypeData: Array<{ name: string; count: number }>;
  bankData: Array<{ name: string; count: number }>;
  ownershipTypeData: Array<{ name: string; count: number }>;
  stateData: Array<{ state: string; count: number }>;
  priceByPropertyType: Array<{
    propertyType: string;
    avgPrice: number;
    count: number;
  }>;
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
  "#06b6d4",
  "#84cc16",
];

export default function AuctionPropertyCharts() {
  const [chartData, setChartData] = useState<AuctionChartData>({
    propertyTypeData: [],
    possessionStatusData: [],
    actionTypeData: [],
    bankData: [],
    ownershipTypeData: [],
    stateData: [],
    priceByPropertyType: [],
  });
  const [loading, setLoading] = useState(true);
  const [totalAuctions, setTotalAuctions] = useState(0);
  const [totalAuctionValue, setTotalAuctionValue] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAndProcessAuctionData = async () => {
      try {
        setLoading(true);
        // Fetch auction properties with a large limit
        const response = await getAuctionProperties(5000, 0);

        if (response && response.data) {
          const properties = response.data;
          setTotalAuctions(properties.length);

          // Initialize data maps
          const propertyTypeMap = new Map<string, number>();
          const possessionStatusMap = new Map<string, number>();
          const actionTypeMap = new Map<string, number>();
          const bankMap = new Map<string, number>();
          const ownershipTypeMap = new Map<string, number>();
          const stateMap = new Map<string, number>();
          const priceByTypeMap = new Map<
            string,
            { total: number; count: number }
          >();

          let totalValue = 0;

          properties.forEach((property) => {
            // Property Type Distribution
            const propertyType = property.type_of_property || "Unknown";
            propertyTypeMap.set(
              propertyType,
              (propertyTypeMap.get(propertyType) || 0) + 1,
            );

            // Possession Status Distribution
            const possessionStatus = property.possessionStatus || "Unknown";
            possessionStatusMap.set(
              possessionStatus,
              (possessionStatusMap.get(possessionStatus) || 0) + 1,
            );

            // Action Type Distribution
            const actionType = property.actionType || "Unknown";
            actionTypeMap.set(
              actionType,
              (actionTypeMap.get(actionType) || 0) + 1,
            );

            // Bank Distribution
            const bankName = property.bankName || "Unknown";
            bankMap.set(bankName, (bankMap.get(bankName) || 0) + 1);

            // Ownership Type Distribution
            const ownershipType = property.ownershipType || "Unknown";
            ownershipTypeMap.set(
              ownershipType,
              (ownershipTypeMap.get(ownershipType) || 0) + 1,
            );

            // State Distribution
            const state = property.state || "Unknown";
            stateMap.set(state, (stateMap.get(state) || 0) + 1);

            // Price by Property Type
            if (property.price) {
              const existing = priceByTypeMap.get(propertyType) || {
                total: 0,
                count: 0,
              };
              existing.total += property.price;
              existing.count += 1;
              priceByTypeMap.set(propertyType, existing);
              totalValue += property.price;
            }
          });

          setTotalAuctionValue(totalValue);

          setChartData({
            propertyTypeData: Array.from(propertyTypeMap).map(
              ([name, count]) => ({
                name,
                count,
              }),
            ),
            possessionStatusData: Array.from(possessionStatusMap).map(
              ([name, count]) => ({
                name,
                count,
              }),
            ),
            actionTypeData: Array.from(actionTypeMap).map(([name, count]) => ({
              name,
              count,
            })),
            bankData: Array.from(bankMap)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 8)
              .map(([name, count]) => ({
                name,
                count,
              })),
            ownershipTypeData: Array.from(ownershipTypeMap).map(
              ([name, count]) => ({
                name,
                count,
              }),
            ),
            stateData: Array.from(stateMap)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 10)
              .map(([state, count]) => ({
                state,
                count,
              })),
            priceByPropertyType: Array.from(priceByTypeMap).map(
              ([propertyType, data]) => ({
                propertyType,
                avgPrice: Math.round(data.total / data.count),
                count: data.count,
              }),
            ),
          });
        }
      } catch (error: any) {
        toast({
          title: "Failed to load auction data",
          description: error?.message || "Failed to fetch auction properties",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAndProcessAuctionData();
  }, [toast]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6 h-96 bg-slate-200" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Auction Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-slate-600">Total Auction Properties</p>
              <p className="text-3xl font-bold text-slate-800">
                {totalAuctions.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-slate-600">Total Auction Value</p>
              <p className="text-3xl font-bold text-emerald-600">
                ₹{(totalAuctionValue / 10000000).toFixed(1)}Cr
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Property Type Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Auction Property Type Distribution
          </CardTitle>
          <p className="text-sm text-slate-600 mt-2">
            Breakdown of auction property types including residential,
            commercial, and other property categories
          </p>
        </CardHeader>
        <CardContent>
          {chartData.propertyTypeData.length > 0 ? (
            <ResponsiveContainer width="100%" height={340}>
              <PieChart margin={{ top: 8, right: 32, left: 8, bottom: 8 }}>
                <Pie
                  data={chartData.propertyTypeData}
                  cx="45%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={110}
                  paddingAngle={2}
                  labelLine={false}
                  label={({ name, value, percent }) =>
                    percent >= 0.05 ? `${name}: ${value}` : ""
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
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
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
        {/* Possession Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Possession Status Distribution
            </CardTitle>
            <p className="text-sm text-slate-600 mt-1">
              Properties categorized by possession status (Vacant, Occupied,
              etc.)
            </p>
          </CardHeader>
          <CardContent>
            {chartData.possessionStatusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={chartData.possessionStatusData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-30}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-280 flex items-center justify-center text-slate-500">
                No data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Auction Action Type Distribution
            </CardTitle>
            <p className="text-sm text-slate-600 mt-1">
              Properties categorized by action type (Sale, Lease, etc.)
            </p>
          </CardHeader>
          <CardContent>
            {chartData.actionTypeData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={chartData.actionTypeData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-30}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-280 flex items-center justify-center text-slate-500">
                No data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ownership Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Ownership Type Distribution
            </CardTitle>
            <p className="text-sm text-slate-600 mt-1">
              Properties by ownership type (Individual, Corporate, etc.)
            </p>
          </CardHeader>
          <CardContent>
            {chartData.ownershipTypeData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={chartData.ownershipTypeData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-30}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-280 flex items-center justify-center text-slate-500">
                No data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Banks by Auction Count */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Top Banks by Auction Count
            </CardTitle>
            <p className="text-sm text-slate-600 mt-1">
              Banks with most properties in auction
            </p>
          </CardHeader>
          <CardContent>
            {chartData.bankData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={chartData.bankData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 50 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-280 flex items-center justify-center text-slate-500">
                No data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top States by Auction Count */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Top States by Auction Count
            </CardTitle>
            <p className="text-sm text-slate-600 mt-1">
              States with highest number of auction properties
            </p>
          </CardHeader>
          <CardContent>
            {chartData.stateData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={chartData.stateData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="state"
                    angle={-30}
                    textAnchor="end"
                    height={90}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#ec4899" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-300 flex items-center justify-center text-slate-500">
                No data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Average Price by Property Type */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Average Auction Price by Property Type
            </CardTitle>
            <p className="text-sm text-slate-600 mt-1">
              Average property values across different auction property types
            </p>
          </CardHeader>
          <CardContent>
            {chartData.priceByPropertyType.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={chartData.priceByPropertyType}
                  margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="propertyType"
                    angle={-30}
                    textAnchor="end"
                    height={90}
                    tickMargin={12}
                  />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => `₹${value.toLocaleString()}`}
                  />
                  <Bar
                    dataKey="avgPrice"
                    fill="#14b8a6"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-300 flex items-center justify-center text-slate-500">
                No data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
