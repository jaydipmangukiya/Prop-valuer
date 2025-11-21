"use client";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export default function DownloadPDF({ reportData, mapUrls }) {
  const pdfRef = useRef(null);

  const download = async () => {
    const pdf = new jsPDF("p", "pt", "a4");

    const element = pdfRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);

    pdf.save(`PropValuer_Report_${reportData.case_ref_no}.pdf`);
  };

  return (
    <>
      <div className="hidden">
        <div ref={pdfRef} className="p-6 w-[800px]">
          {/* ---------------- HEADER ---------------- */}
          <div className="text-center mb-6">
            <img src="/logo.png" alt="" className="h-16 mx-auto" />
            <h1 className="text-3xl font-bold mt-2">PropValuer</h1>
            <p className="text-lg font-semibold">Property Valuation Report</p>
            <p className="text-sm text-gray-600">
              Generated on {reportData.report_date}
            </p>
          </div>

          {/* ---------- PROPERTY SUMMARY ---------- */}
          <div className="p-5 rounded-xl bg-gray-100 mb-6">
            <h2 className="text-xl font-bold mb-4">Property Summary</h2>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <p>
                <b>Location:</b> {reportData.property_address}
              </p>
              <p>
                <b>Bedrooms:</b> {reportData.bedrooms || "-"}
              </p>

              <p>
                <b>Property Type:</b> {reportData.type_of_property}
              </p>
              <p>
                <b>Bathrooms:</b> {reportData.bathrooms || "-"}
              </p>

              <p>
                <b>Area:</b> {reportData.property_land_area} sq ft
              </p>
              <p>
                <b>Age:</b> {reportData.age_of_property || "-"}
              </p>

              <p className="col-span-2">
                <b>Amenities:</b> Parking, Gym, Swimming Pool, Security
              </p>
            </div>
          </div>

          {/* ---------- MARKET VALUE ---------- */}
          <div className="rounded-xl p-6 text-center bg-green-50 mb-6">
            <h2 className="text-xl font-bold mb-2">Estimated Market Value</h2>
            <p className="text-4xl font-extrabold text-green-600">
              ₹ {reportData.final_valuation}
            </p>
            <p className="text-sm mt-2 text-red-500">
              ↓ 10% decrease vs last year
            </p>

            <div className="grid grid-cols-2 mt-6">
              <div>
                <p className="text-lg font-bold">₹7,568</p>
                <p className="text-gray-500 text-sm">Price per sq ft</p>
              </div>
              <div>
                <p className="text-lg font-bold">88%</p>
                <p className="text-gray-500 text-sm">Confidence Score</p>
              </div>
            </div>
          </div>

          {/* ---------- STATIC MAP IMAGES ---------- */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <img src={mapUrls.normal} className="rounded-lg shadow" />
            <img src={mapUrls.satellite} className="rounded-lg shadow" />
          </div>

          {/* ---------- PRICE RANGE ---------- */}
          <div className="p-4 rounded-xl bg-gray-50 mb-6">
            <h3 className="font-bold mb-3">Estimated Price Range</h3>
            <div className="w-full h-3 bg-gradient-to-r from-yellow-400 to-green-500 rounded-full"></div>

            <div className="flex justify-between text-sm mt-2">
              <p>
                <b>Minimum Value</b>
                <br />
                ₹68.11 L
              </p>
              <p>
                <b>Maximum Value</b>
                <br />
                ₹83.25 L
              </p>
            </div>
          </div>

          {/* ---------- COMPARABLE PROPERTIES ---------- */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Comparable Properties</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <p>
                  1100 sq ft apartment
                  <br />
                  <span className="text-gray-500 text-xs">0.2 km away</span>
                </p>
                <p className="font-bold text-green-700">₹80.68 L</p>
              </div>

              <div className="flex justify-between">
                <p>
                  950 sq ft apartment
                  <br />
                  <span className="text-gray-500 text-xs">0.5 km away</span>
                </p>
                <p className="font-bold text-green-700">₹72.68 L</p>
              </div>

              <div className="flex justify-between">
                <p>
                  1200 sq ft apartment
                  <br />
                  <span className="text-gray-500 text-xs">0.8 km away</span>
                </p>
                <p className="font-bold text-green-700">₹83.86 L</p>
              </div>
            </div>
          </div>

          {/* ---------- MARKET ANALYSIS ---------- */}
          <div className="p-4 bg-yellow-100 rounded-lg mb-4">
            <h2 className="text-lg font-bold mb-2">Market Analysis</h2>
            <p className="text-sm">
              Based on trends, the area shows a <b>10% decrease</b> in value.
              Current conditions indicate a <b>cautious</b> environment for
              investments.
            </p>
          </div>

          {/* ---------- DISCLAIMER ---------- */}
          <div className="p-4 bg-red-100 rounded-lg mb-10">
            <h2 className="text-lg font-bold text-red-700 mb-2">
              Important Disclaimer
            </h2>
            <p className="text-sm text-red-700">
              This valuation is an estimate based on available data. Actual
              value may vary.
            </p>
          </div>
        </div>
      </div>

      <Button onClick={download} className="mt-4">
        Download PDF
      </Button>
    </>
  );
}
