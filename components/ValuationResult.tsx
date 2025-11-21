"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
  MapPin,
  Chrome as Home,
  Ruler,
  Calendar,
  ArrowLeft,
  IndianRupee,
  ChartBar as BarChart3,
  Download,
  FileText,
} from "lucide-react";
import { PropertyData } from "@/app/page";
import { PDFGenerator } from "@/components/PDFGenerator";

interface ValuationResultProps {
  propertyData: PropertyData;
  onNewSearch: () => void;
}

export function ValuationResult({
  propertyData,
  onNewSearch,
}: ValuationResultProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  // Mock calculation - in real app, this would call an API
  const basePrice = Math.floor(Math.random() * 5000 + 3000);
  const estimatedValue = Math.floor(
    propertyData.area * basePrice * (1 + Math.random() * 0.4)
  );
  const pricePerSqFt = Math.floor(estimatedValue / propertyData.area);
  const marketTrend = Math.random() > 0.5 ? "up" : "down";
  const trendPercentage = Math.floor(Math.random() * 10 + 1);

  const confidenceScore = Math.floor(Math.random() * 20 + 80);

  const comparableProperties = [
    {
      area: propertyData.area + 100,
      price: estimatedValue + 500000,
      distance: "0.2 km",
    },
    {
      area: propertyData.area - 50,
      price: estimatedValue - 300000,
      distance: "0.5 km",
    },
    {
      area: propertyData.area + 200,
      price: estimatedValue + 800000,
      distance: "0.8 km",
    },
  ];

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} L`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const valuationData = {
        estimatedValue,
        pricePerSqFt,
        confidenceScore,
        marketTrend,
        trendPercentage,
        comparableProperties,
      };

      const pdfBlob = await PDFGenerator.generateValuationReport({
        propertyData,
        valuationData,
      });

      const filename = `Property_Valuation_Report_${propertyData.location.replace(
        /[^a-zA-Z0-9]/g,
        "_"
      )}_${new Date().toISOString().split("T")[0]}.pdf`;

      PDFGenerator.downloadPDF(pdfBlob, filename);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF report. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onNewSearch}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>New Search</span>
        </Button>

        <Button
          onClick={handleDownloadPDF}
          disabled={isGeneratingPDF}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
        >
          {isGeneratingPDF ? (
            <>Generating PDF...</>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </>
          )}
        </Button>

        <div className="text-right">
          <p className="text-sm text-gray-600">Valuation Date</p>
          <p className="font-semibold">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Property Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Home className="h-5 w-5 text-blue-700" />
            <span>Property Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-semibold">{propertyData.location}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Home className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Type</p>
                <p className="font-semibold capitalize">
                  {propertyData.propertyType}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Ruler className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Area</p>
                <p className="font-semibold">{propertyData.area} sq ft</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Age</p>
                <p className="font-semibold">
                  {propertyData.age || "New"} years
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Valuation Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Property Valuation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-lg">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <IndianRupee className="h-8 w-8 text-blue-700" />
                  <span className="text-4xl font-bold text-gray-900">
                    {formatPrice(estimatedValue)}
                  </span>
                </div>
                <p className="text-lg text-gray-600 mb-4">
                  Estimated Market Value
                </p>

                <div className="flex items-center justify-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    {marketTrend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span
                      className={
                        marketTrend === "up"
                          ? "text-emerald-600"
                          : "text-red-600"
                      }
                    >
                      {trendPercentage}%{" "}
                      {marketTrend === "up" ? "increase" : "decrease"}
                    </span>
                  </div>
                  <span className="text-gray-400">vs last year</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{pricePerSqFt.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Price per sq ft</p>
                </div>

                <div className="text-center p-4 border rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">
                    {confidenceScore}%
                  </p>
                  <p className="text-sm text-gray-600">Confidence Score</p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    Valuation Confidence
                  </span>
                  <span className="text-sm font-medium">
                    {confidenceScore}%
                  </span>
                </div>
                <Progress value={confidenceScore} className="w-full" />
              </div>
            </CardContent>
          </Card>

          {/* PDF Download Card */}
          <Card className="bg-gradient-to-r from-blue-50 to-emerald-50 border-2 border-emerald-200">
            <CardContent className="p-6 text-center">
              <FileText className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Download Detailed Report
              </h3>
              <p className="text-slate-600 mb-4">
                Get a comprehensive PDF report with detailed analysis and market
                insights
              </p>
              <Button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
              >
                {isGeneratingPDF
                  ? "Generating..."
                  : "Click here to download report"}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Price Range */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Price Range</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Minimum</span>
                  <span className="font-semibold">
                    {formatPrice(estimatedValue * 0.9)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Maximum</span>
                  <span className="font-semibold">
                    {formatPrice(estimatedValue * 1.1)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Market Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Badge
                  variant={marketTrend === "up" ? "default" : "destructive"}
                  className="w-full justify-center"
                >
                  Market is {marketTrend === "up" ? "Rising" : "Declining"}
                </Badge>
                <p className="text-sm text-gray-600">
                  Property values in {propertyData.location} have shown a{" "}
                  {trendPercentage}%
                  {marketTrend === "up" ? " increase" : " decrease"} over the
                  past year.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
