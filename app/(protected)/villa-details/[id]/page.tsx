"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  IndianRupee,
  TrendingUp,
  Home,
  Ruler,
  Calendar,
  MapPin,
  ArrowLeft,
  Download,
  FileText,
  BarChart3,
  Loader,
  Building,
  User,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import MapComponent from "@/components/MapComponent";
import { getReportById } from "@/app/api/apartment";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateReportPDF } from "@/components/DownloadPDF";

export default function VillaDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [mapUrls, setMapUrls] = useState<any>({
    normal: null,
    satellite: null,
  });

  /** -----------------------------
   *  FORMAT ₹ NUMBER
   * ------------------------------ */
  const price = (num: any) =>
    new Intl.NumberFormat("en-IN").format(Number(num || 0));

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getReportById(`${id}`);
        const data = res.report;
        console.log(data, "data");
        setReportData(data);

        if (data.latitude && data.longitude) {
          const lat = data.latitude;
          const lon = data.longitude;
          const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

          setMapUrls({
            normal: `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=16&size=600x600&maptype=roadmap&key=${KEY}&markers=color:red%7C${lat},${lon}`,
            satellite: `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=16&size=600x600&maptype=satellite&key=${KEY}&markers=color:red%7C${lat},${lon}`,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="w-full">
      <Header />
      <div className="max-w-7xl mx-auto py-5 px-4 space-y-8">
        {loading && (
          <div className="flex justify-center items-center h-80">
            <Loader2 className="animate-spin h-10 w-10 text-emerald-600" />
          </div>
        )}
        {!loading && !reportData && (
          <div className="flex flex-col justify-center items-center h-80">
            <AlertTriangle className="h-12 w-12 text-red-600 mb-3" />
            <p className="text-xl font-semibold text-gray-700">
              Report Not Found
            </p>
            <Button
              onClick={() => router.push("/")}
              className="mt-4"
              variant="outline"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Go Back
            </Button>
          </div>
        )}
        {!loading && reportData && (
          <>
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => router.push("/")}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
            </div>
            {/* VALUATION */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* FINAL VALUATION */}
              <Card className="bg-gradient-to-br from-blue-50 to-emerald-50 border-2 border-emerald-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <IndianRupee className="h-6 w-6 text-emerald-700" />
                    Final Market Valuation
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="flex space-x-2 justify-center items-center">
                    <span className="text-5xl font-bold text-emerald-700">
                      ₹ {price(reportData.final_valuation)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-lg">
                    Comprehensive Property Valuation
                  </p>
                </CardContent>
              </Card>
              {/* DOWNLOAD PDF */}
              <Card className="bg-gradient-to-r from-blue-50 to-emerald-50 border-2 border-emerald-200">
                <CardContent className="p-6 text-center">
                  <FileText className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold">
                    Download Full Report
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Get detailed valuation, maps, market trends & more.
                  </p>
                  <button
                    onClick={() => generateReportPDF(reportData, mapUrls)}
                    className="px-5 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                  >
                    Download PDF
                  </button>
                </CardContent>
              </Card>

              {/* VALUE BREAKDOWN */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-700" />
                    Value Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-gray-600">
                        Distress Value
                      </span>
                    </div>
                    <span className="font-semibold text-red-700">
                      ₹ {price(reportData.DV)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-600">
                        Realizable Value
                      </span>
                    </div>
                    <span className="font-semibold text-green-700">
                      ₹ {price(reportData.RV)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-blue-700" />
                    <div>
                      <p className="text-sm text-gray-600">
                        Case Reference No.
                      </p>
                      <p className="font-semibold text-lg">
                        {reportData.case_ref_no}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-blue-700" />
                    <div>
                      <p className="text-sm text-gray-600">Report Date</p>
                      <p className="font-semibold text-lg">
                        {reportData.report_date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Building className="h-5 w-5 text-blue-700" />
                    <div>
                      <p className="text-sm text-gray-600">Property Type</p>
                      <p className="font-semibold text-lg">
                        {reportData.type_of_property}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* OWNER INFORMATION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-700" />
                    Owner Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Owner Name</p>
                    <p className="font-semibold text-lg">
                      {reportData.owner_name}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Owner Address</p>
                    <p className="font-semibold">{reportData.owner_address}</p>
                  </div>
                </CardContent>
              </Card>

              {/* PROPERTY LOCATION DETAILS */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-700" />
                    Location Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Property Address
                    </p>
                    <p className="font-semibold">
                      {reportData.property_address}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Nearest Landmark
                    </p>
                    <p className="font-semibold">
                      {reportData.nearest_landmark}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Latitude</p>
                    <p className="font-semibold">{reportData.latitude}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Longitude</p>
                    <p className="font-semibold">{reportData.longitude}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* MAP + SUMMARY */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-700" />
                    Property Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {reportData.latitude && reportData.longitude && (
                    <div className="h-[450px] w-full">
                      <MapComponent
                        initialLatitude={reportData.latitude}
                        initialLongitude={reportData.longitude}
                        isDraggable={false}
                        setIsDraggable={() => { }}
                        setOpen={() => { }}
                        readonly={true}
                      />
                    </div>
                  )}

                  <p className="mt-4 text-gray-700">
                    {reportData.property_address}
                  </p>
                </CardContent>
              </Card>

              {/* SUMMARY CARD */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-blue-700" />
                    Property Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Ruler className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          Property Land Area
                        </span>
                      </div>
                      <span className="font-semibold">
                        {reportData.property_land_area} sq ft
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Ruler className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Land Area</span>
                      </div>
                      <span className="font-semibold">
                        {reportData.land_area} sq ft
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Ruler className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          ConstructionArea
                        </span>
                      </div>
                      <span className="font-semibold">
                        {
                          reportData.built_up_area_carpet_area_super_built_up_area
                        }{" "}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Ruler className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          Built Up Area Carpet Area / Super Built Up Area
                        </span>
                      </div>
                      <span className="font-semibold">
                        {
                          reportData.built_up_area_carpet_area_super_built_up_area
                        }
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          Property Age
                        </span>
                      </div>
                      <span className="font-semibold">
                        {reportData.age_of_property} yrs
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-blue-700" />
                    Parking & Interior Details
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Open Parking</span>
                      <span className="font-semibold">
                        {reportData.open_parking ?? 0}
                      </span>
                    </div>

                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Covered Parking</span>
                      <span className="font-semibold">
                        {reportData.covered_parking ?? 0}
                      </span>
                    </div>

                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Interior Age</span>
                      <span className="font-semibold">
                        {reportData.interior_age || "—"}
                      </span>
                    </div>

                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Interior Spend</span>
                      <span className="font-semibold">
                        {reportData.interior_spend
                          ? `₹ ${price(reportData.interior_spend)}`
                          : "—"}
                      </span>
                    </div>

                  </div>
                </CardContent>
              </Card>
              {reportData?.additional_details && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Home className="h-5 w-5 text-blue-700" />
                      Additional Property Details
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Facing</span>
                        <span className="font-semibold">
                          {reportData.additional_details.facing || "—"}
                        </span>
                      </div>

                      <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Overlooking</span>
                        <span className="font-semibold">
                          {reportData.additional_details.overlooking || "—"}
                        </span>
                      </div>

                      <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Possession Status</span>
                        <span className="font-semibold">
                          {reportData.additional_details.possession_status || "—"}
                        </span>
                      </div>

                      <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Bathrooms</span>
                        <span className="font-semibold">
                          {reportData.additional_details.bathroom || "—"}
                        </span>
                      </div>

                      <div className="flex justify-between p-3 bg-gray-50 rounded-lg md:col-span-2">
                        <span className="text-sm text-gray-600">Furnishing Status</span>
                        <span className="font-semibold">
                          {reportData.additional_details.furnishing_status || "—"}
                        </span>
                      </div>

                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
