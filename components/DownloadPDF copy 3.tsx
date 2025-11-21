"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import jsPDF from "jspdf";

interface DownloadPDFProps {
  reportData: any;
  mapUrls: any;
}

export default function DownloadPDF({ reportData, mapUrls }: DownloadPDFProps) {
  const [generating, setGenerating] = useState(false);

  const price = (num: any) =>
    new Intl.NumberFormat("en-IN").format(Number(num || 0));

  const formatToLakhs = (num: any) => {
    const value = Number(num || 0);
    const inLakhs = value / 100000;
    return inLakhs.toFixed(2) + " L";
  };

  const formatPricePerSqFt = (num: any) => {
    const value = Number(num || 0);
    return `₹${price(Math.round(value))}`;
  };

  const generatePDF = async () => {
    setGenerating(true);
    try {
      const pdf = new jsPDF("p", "mm", "a4");

      // Set default font
      pdf.setFont("helvetica");

      // ===== PAGE 1 =====
      // Header with Logo/Title
      pdf.setFillColor(59, 130, 246);
      pdf.rect(0, 0, 210, 25, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(20);
      pdf.setFont("helvetica", "bold");
      pdf.text("PropValuer", 20, 17);

      // Report Title
      pdf.setFontSize(16);
      pdf.text("Property Valuation Report", 105, 40, { align: "center" });

      // Generation Date
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      const formattedDate =
        now.toLocaleDateString("en-IN", options) +
        " at " +
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

      pdf.setFontSize(10);
      pdf.text(`Generated on ${formattedDate}`, 105, 48, { align: "center" });

      // Divider line
      pdf.setDrawColor(200, 200, 200);
      pdf.line(20, 55, 190, 55);

      // Property Summary Section
      pdf.setFontSize(14);
      pdf.setTextColor(59, 130, 246);
      pdf.setFont("helvetica", "bold");
      pdf.text("Property Summary", 20, 65);

      // Property Summary Table
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      pdf.setFont("helvetica", "normal");

      const summaryData = [
        [
          "Location:",
          reportData.property_address || "N/A",
          "Bedrooms:",
          "1 BHK",
        ],
        [
          "Property Type:",
          reportData.type_of_property || "Land",
          "Bathrooms:",
          "3",
        ],
        [
          "Area:",
          `${price(reportData.property_land_area)} sq ft`,
          "Age:",
          `${reportData.age_of_property || "N/A"} years`,
        ],
      ];

      let yPos = 75;
      summaryData.forEach((row) => {
        pdf.text(row[0], 20, yPos);
        pdf.setFont("helvetica", "bold");
        pdf.text(row[1], 50, yPos);
        pdf.setFont("helvetica", "normal");
        pdf.text(row[2], 120, yPos);
        pdf.setFont("helvetica", "bold");
        pdf.text(row[3], 150, yPos);
        pdf.setFont("helvetica", "normal");
        yPos += 8;
      });

      // Amenities
      pdf.text("Amenities:", 20, yPos + 5);
      pdf.setFont("helvetica", "bold");
      pdf.text(
        "Parking, Gym, Swimming Pool, Security, Power Backup",
        45,
        yPos + 5
      );
      pdf.setFont("helvetica", "normal");

      // Divider
      pdf.line(20, yPos + 12, 190, yPos + 12);

      // Estimated Market Value Section
      yPos += 25;
      pdf.setFontSize(14);
      pdf.setTextColor(59, 130, 246);
      pdf.setFont("helvetica", "bold");
      pdf.text("Estimated Market Value", 20, yPos);

      // Main Value
      yPos += 15;
      pdf.setFontSize(24);
      pdf.setTextColor(0, 0, 0);
      pdf.setFont("helvetica", "bold");

      // Calculate price per sq ft
      const pricePerSqFt =
        reportData.final_valuation / reportData.property_land_area;
      const marketValue = formatToLakhs(reportData.final_valuation);

      pdf.text(`₹${marketValue}`, 105, yPos, { align: "center" });

      // Market trend
      yPos += 10;
      pdf.setFontSize(10);
      pdf.setTextColor(239, 68, 68);
      pdf.text("10% decrease vs last year", 105, yPos, { align: "center" });

      // Price per sq ft and Confidence Score
      yPos += 15;
      pdf.setTextColor(0, 0, 0);

      const pricePerSqFtBox = formatPricePerSqFt(pricePerSqFt);
      const confidenceScore = "88%";

      // Price per sq ft
      pdf.setFillColor(240, 249, 255);
      pdf.rect(40, yPos, 60, 20, "F");
      pdf.text(pricePerSqFtBox, 70, yPos + 8, { align: "center" });
      pdf.setFontSize(8);
      pdf.text("Price per sq ft", 70, yPos + 14, { align: "center" });

      // Confidence Score
      pdf.setFillColor(240, 255, 244);
      pdf.rect(110, yPos, 60, 20, "F");
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.text(confidenceScore, 140, yPos + 8, { align: "center" });
      pdf.setFontSize(8);
      pdf.setFont("helvetica", "normal");
      pdf.text("Confidence Score", 140, yPos + 14, { align: "center" });

      // Estimated Price Range
      yPos += 35;
      pdf.setFontSize(14);
      pdf.setTextColor(59, 130, 246);
      pdf.setFont("helvetica", "bold");
      pdf.text("Estimated Price Range", 20, yPos);

      yPos += 15;
      const minValue = formatToLakhs(reportData.DV);
      const maxValue = formatToLakhs(reportData.RV);

      // Minimum Value
      pdf.setFillColor(255, 243, 243);
      pdf.rect(20, yPos, 80, 25, "F");
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text("Minimum Value", 25, yPos + 8);
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.setFont("helvetica", "bold");
      pdf.text(`₹${minValue}`, 60, yPos + 18, { align: "center" });

      // Maximum Value
      pdf.setFillColor(243, 255, 243);
      pdf.rect(110, yPos, 80, 25, "F");
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.setFont("helvetica", "normal");
      pdf.text("Maximum Value", 115, yPos + 8);
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.setFont("helvetica", "bold");
      pdf.text(`₹${maxValue}`, 150, yPos + 18, { align: "center" });

      // Comparable Properties
      yPos += 45;
      pdf.setFontSize(14);
      pdf.setTextColor(59, 130, 246);
      pdf.setFont("helvetica", "bold");
      pdf.text("Comparable Properties", 20, yPos);

      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.setFont("helvetica", "normal");
      pdf.text("Similar properties in your area", 20, yPos + 8);

      // Comparable properties data
      const comparableProperties = [
        {
          area: "1100 sq ft apartment",
          distance: "0.2 km away",
          price: "₹80.68 L",
          rate: "₹7,334/sq ft",
        },
        {
          area: "950 sq ft apartment",
          distance: "0.5 km away",
          price: "₹72.68 L",
          rate: "₹7,650/sq ft",
        },
        {
          area: "1200 sq ft apartment",
          distance: "0.8 km away",
          price: "₹83.68 L",
          rate: "₹6,072/sq ft",
        },
      ];

      yPos += 20;
      comparableProperties.forEach((prop, index) => {
        const itemY = yPos + index * 25;

        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(0, 0, 0);
        pdf.text(prop.area, 20, itemY);

        pdf.setFontSize(8);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(100, 100, 100);
        pdf.text(prop.distance, 20, itemY + 5);

        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(0, 0, 0);
        pdf.text(prop.price, 150, itemY, { align: "right" });

        pdf.setFontSize(8);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(100, 100, 100);
        pdf.text(prop.rate, 150, itemY + 5, { align: "right" });

        if (index < comparableProperties.length - 1) {
          pdf.setDrawColor(200, 200, 200);
          pdf.line(20, itemY + 10, 190, itemY + 10);
        }
      });

      // ===== PAGE 2 =====
      pdf.addPage();

      // Header
      pdf.setFillColor(59, 130, 246);
      pdf.rect(0, 0, 210, 25, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(20);
      pdf.setFont("helvetica", "bold");
      pdf.text("PropValuer", 20, 17);

      // Market Analysis Title
      pdf.setFontSize(18);
      pdf.setTextColor(0, 0, 0);
      pdf.text("Market Analysis", 20, 50);

      // Market Analysis Content
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "normal");
      const marketAnalysisText = [
        "Based on our comprehensive analysis of recent transactions, market trends, and location",
        "factors, property values in Surat, Gujarat, India have shown a 10% decrease over the",
        "past year. The current market conditions indicate a cautious environment for property",
        "investments in this area.",
      ];

      let analysisY = 65;
      marketAnalysisText.forEach((line) => {
        pdf.text(line, 20, analysisY);
        analysisY += 8;
      });

      // Disclaimer Section
      analysisY += 20;
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text("Important Disclaimer", 20, analysisY);

      analysisY += 10;
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");

      const disclaimerText = [
        "This valuation is an estimate based on available market data and algorithmic analysis.",
        "Actual property values may vary based on current market conditions, property condition,",
        "and other factors. This report should not be considered as a substitute for professional",
        "property appraisal. PropValuer is not liable for any decisions made based on this report.",
      ];

      disclaimerText.forEach((line) => {
        pdf.text(line, 20, analysisY);
        analysisY += 6;
      });

      // Footer
      analysisY = 270;
      pdf.setDrawColor(200, 200, 200);
      pdf.line(20, analysisY, 190, analysisY);

      analysisY += 10;
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text(
        "Generated by PropValuer - India's Leading Property Valuation Platform",
        105,
        analysisY,
        { align: "center" }
      );

      analysisY += 5;
      pdf.text(
        "For support: support@propvaluer.com | +91 98765 43210",
        105,
        analysisY,
        { align: "center" }
      );

      // Save PDF
      const fileName = `Property_Valuation_Report_${reportData.property_address.replace(
        /[^a-zA-Z0-9]/g,
        "_"
      )}_${reportData.report_date.replace(/-/g, "_")}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Button
      onClick={generatePDF}
      disabled={generating}
      className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3"
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
