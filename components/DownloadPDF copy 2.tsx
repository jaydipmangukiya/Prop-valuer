"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface DownloadPDFProps {
  reportData: any;
  mapUrls: any;
}

export default function DownloadPDF({ reportData, mapUrls }: DownloadPDFProps) {
  const [generating, setGenerating] = useState(false);

  const price = (num: any) =>
    new Intl.NumberFormat("en-IN").format(Number(num || 0));

  const generatePDF = async () => {
    setGenerating(true);
    try {
      const pdf = new jsPDF("p", "mm", "a4");
      let currentPage = 1;

      // Page 1: Cover Page
      pdf.setFillColor(59, 130, 246);
      pdf.rect(0, 0, 210, 297, "F");

      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(32);
      pdf.text("PROPERTY VALUATION REPORT", 105, 120, { align: "center" });

      pdf.setFontSize(18);
      pdf.text(`Case Reference: ${reportData.case_ref_no}`, 105, 150, {
        align: "center",
      });
      pdf.text(`Date: ${reportData.report_date}`, 105, 170, {
        align: "center",
      });

      pdf.setFontSize(14);
      pdf.text("Confidential Document", 105, 250, { align: "center" });

      // Page 2: Executive Summary
      pdf.addPage();
      currentPage++;
      addHeader(pdf, currentPage);

      pdf.setFontSize(20);
      pdf.setTextColor(59, 130, 246);
      pdf.text("EXECUTIVE SUMMARY", 20, 40);

      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);

      const summaryContent = [
        `Owner Name: ${reportData.owner_name}`,
        `Property Type: ${reportData.type_of_property}`,
        `Property Address: ${reportData.property_address}`,
        `Final Market Valuation: ₹ ${price(reportData.final_valuation)}`,
        `Realizable Value: ₹ ${price(reportData.RV)}`,
        `Distress Value: ₹ ${price(reportData.DV)}`,
      ];

      summaryContent.forEach((line, index) => {
        pdf.text(line, 20, 60 + index * 15);
      });

      // Page 3: Property Details
      pdf.addPage();
      currentPage++;
      addHeader(pdf, currentPage);

      pdf.setFontSize(20);
      pdf.setTextColor(59, 130, 246);
      pdf.text("PROPERTY DETAILS", 20, 40);

      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);

      const propertyDetails = [
        `Case Reference No.: ${reportData.case_ref_no}`,
        `Report Date: ${reportData.report_date}`,
        `Owner Name: ${reportData.owner_name}`,
        `Owner Address: ${reportData.owner_address}`,
        `Property Address: ${reportData.property_address}`,
        `Nearest Landmark: ${reportData.nearest_landmark}`,
        `Property Type: ${reportData.type_of_property}`,
        `Property Land Area: ${price(reportData.property_land_area)} sq ft`,
        `Land Location: ${reportData.land_location}`,
      ];

      propertyDetails.forEach((line, index) => {
        pdf.text(line, 20, 60 + index * 12);
      });

      // Page 4: Area Specifications
      pdf.addPage();
      currentPage++;
      addHeader(pdf, currentPage);

      pdf.setFontSize(20);
      pdf.setTextColor(59, 130, 246);
      pdf.text("AREA SPECIFICATIONS", 20, 40);

      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);

      const areaSpecs = [
        `Property Land Area: ${price(reportData.property_land_area)} sq ft`,
        `Built Up Area: ${price(
          reportData.built_up_area_carpet_area_super_built_up_area
        )} sq ft`,
        `Land Value: ₹ ${price(reportData.land_value)}`,
        `Unit Rate Considered for Land: ₹ ${price(
          reportData.unit_rate_considered_for_land
        )} per sq ft`,
        `Building Value: ₹ ${price(reportData.building_value)}`,
      ];

      areaSpecs.forEach((line, index) => {
        pdf.text(line, 20, 60 + index * 15);
      });

      // Page 5: Valuation Details
      pdf.addPage();
      currentPage++;
      addHeader(pdf, currentPage);

      pdf.setFontSize(20);
      pdf.setTextColor(59, 130, 246);
      pdf.text("VALUATION ANALYSIS", 20, 40);

      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);

      // Final Valuation Box
      pdf.setFillColor(34, 197, 94);
      pdf.rect(20, 60, 170, 25, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(16);
      pdf.text("FINAL MARKET VALUATION", 105, 70, { align: "center" });
      pdf.setFontSize(20);
      pdf.text(`₹ ${price(reportData.final_valuation)}`, 105, 85, {
        align: "center",
      });

      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(12);

      // Value Breakdown
      pdf.text("Value Breakdown:", 20, 120);

      // Realizable Value
      pdf.setFillColor(220, 252, 231);
      pdf.rect(20, 130, 80, 20, "F");
      pdf.setTextColor(0, 0, 0);
      pdf.text("Realizable Value", 25, 140);
      pdf.text(`₹ ${price(reportData.RV)}`, 25, 150);

      // Distress Value
      pdf.setFillColor(254, 226, 226);
      pdf.rect(110, 130, 80, 20, "F");
      pdf.text("Distress Value", 115, 140);
      pdf.text(`₹ ${price(reportData.DV)}`, 115, 150);

      pdf.text(
        `Valuation in Words: ${reportData.final_valuation_in_word}`,
        20,
        180
      );

      // Page 6: Maps
      pdf.addPage();
      currentPage++;
      addHeader(pdf, currentPage);

      pdf.setFontSize(20);
      pdf.setTextColor(59, 130, 246);
      pdf.text("LOCATION MAPS", 20, 40);

      // Add roadmap image if available
      if (mapUrls.normal) {
        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0);
        pdf.text("Road Map View:", 20, 60);

        try {
          const imgData = await getImageData(mapUrls.normal);
          pdf.addImage(imgData, "JPEG", 20, 65, 170, 100);
        } catch (error) {
          pdf.text("Map image not available", 20, 70);
        }
      }

      // Page 7: Satellite View
      pdf.addPage();
      currentPage++;
      addHeader(pdf, currentPage);

      pdf.setFontSize(20);
      pdf.setTextColor(59, 130, 246);
      pdf.text("SATELLITE VIEW", 20, 40);

      // Add satellite image if available
      if (mapUrls.satellite) {
        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0);
        pdf.text("Satellite View:", 20, 60);

        try {
          const imgData = await getImageData(mapUrls.satellite);
          pdf.addImage(imgData, "JPEG", 20, 65, 170, 100);
        } catch (error) {
          pdf.text("Satellite image not available", 20, 70);
        }
      }

      // Page 8: Additional Information
      pdf.addPage();
      currentPage++;
      addHeader(pdf, currentPage);

      pdf.setFontSize(20);
      pdf.setTextColor(59, 130, 246);
      pdf.text("ADDITIONAL INFORMATION", 20, 40);

      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);

      const additionalInfo = [
        `Distance from Landmark: ${price(reportData.distance)} meters`,
        `Property Status: ${
          reportData.is_verified ? "Verified" : "Unverified"
        }`,
        `Valuation Method: Comparative Market Analysis`,
        `Report Generated On: ${new Date().toLocaleDateString()}`,
        `Coordinates: ${reportData.latitude}, ${reportData.longitude}`,
      ];

      additionalInfo.forEach((line, index) => {
        pdf.text(line, 20, 60 + index * 15);
      });

      // Save the PDF
      pdf.save(`Property_Valuation_Report_${reportData.case_ref_no}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const addHeader = (pdf: jsPDF, pageNumber: number) => {
    // Header background
    pdf.setFillColor(59, 130, 246);
    pdf.rect(0, 0, 210, 20, "F");

    // Header text
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(14);
    pdf.text("PROPERTY VALUATION REPORT", 105, 12, { align: "center" });

    // Page number
    pdf.setFontSize(10);
    pdf.text(`Page ${pageNumber}`, 190, 290);

    // Reset text color
    pdf.setTextColor(0, 0, 0);
  };

  const getImageData = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  };

  return (
    <Button
      onClick={generatePDF}
      disabled={generating}
      className="bg-emerald-600 hover:bg-emerald-700 text-white"
    >
      {generating ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <Download className="h-4 w-4 mr-2" />
      )}
      {generating ? "Generating PDF..." : "Download PDF Report"}
    </Button>
  );
}
