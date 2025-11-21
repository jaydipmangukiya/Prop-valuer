"use client";

import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Safe helper
const safe = (v: any) => (v === null || v === undefined || v === "" ? "-" : v);

export default function DownloadPDF({
  reportData,
  mapUrls,
}: {
  reportData: any;
  mapUrls: any;
}) {
  const pdfRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!pdfRef.current) return;

    // ------ FIX: No hidden element ------
    pdfRef.current.style.display = "block";

    const element = pdfRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");

    const imgWidth = 595.28;
    const pageHeight = 841.89;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`Property_Valuation_Report_${Date.now()}.pdf`);

    // Hide after render
    pdfRef.current.style.display = "none";
  };

  return (
    <>
      <button
        onClick={generatePDF}
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg shadow-md"
      >
        Download Report (PDF)
      </button>

      {/* ---------- OFFSCREEN RENDER AREA ---------- */}
      <div
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          width: "800px",
          background: "#fff",
        }}
      >
        <div ref={pdfRef} style={{ padding: "30px" }}>
          {/* ---------------------------------------------------- */}
          {/* PAGE 1 – HEADER + BASIC DETAILS */}
          {/* ---------------------------------------------------- */}
          <div style={{ borderBottom: "3px solid #0A6847", paddingBottom: 20 }}>
            <h1 style={{ fontSize: 28, marginBottom: 5 }}>
              Property Valuation Report
            </h1>
            <p style={{ fontSize: 14, color: "#555" }}>
              Generated on {safe(reportData.report_date)}
            </p>
          </div>

          <h2 style={{ fontSize: 20, marginTop: 25, marginBottom: 10 }}>
            Basic Information
          </h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <tbody>
              {[
                ["Case Reference No.", safe(reportData.case_ref_no)],
                ["Owner Name", safe(reportData.owner_name)],
                ["Owner Address", safe(reportData.owner_address)],
                ["Property Address", safe(reportData.property_address)],
                ["Nearest Landmark", safe(reportData.nearest_landmark)],
                ["Type of Property", safe(reportData.type_of_property)],
              ].map(([label, value], idx) => (
                <tr key={idx}>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      fontWeight: 600,
                      background: "#F7F7F7",
                      width: "40%",
                    }}
                  >
                    {label}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ---------------------------------------------------- */}
          {/* PAGE BREAK */}
          {/* ---------------------------------------------------- */}
          <div style={{ pageBreakAfter: "always" }}></div>

          {/* ---------------------------------------------------- */}
          {/* PAGE 2 – PROPERTY AREA INFORMATION */}
          {/* ---------------------------------------------------- */}
          <h2 style={{ fontSize: 20, marginBottom: 10 }}>Area Details</h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <tbody>
              {[
                [
                  "Property Land Area",
                  safe(reportData.property_land_area) + " Sq.ft",
                ],
                [
                  "Built-up / Carpet / SBA",
                  safe(
                    reportData.built_up_area_carpet_area_super_built_up_area
                  ) + " Sq.ft",
                ],
                ["Loading", safe(reportData.loading)],
                [
                  "Age of Property",
                  safe(reportData.age_of_property) + " Years",
                ],
              ].map(([label, value], idx) => (
                <tr key={idx}>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      fontWeight: 600,
                      background: "#F7F7F7",
                      width: "40%",
                    }}
                  >
                    {label}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ---------------------------------------------------- */}
          {/* PAGE BREAK */}
          {/* ---------------------------------------------------- */}
          <div style={{ pageBreakAfter: "always" }}></div>

          {/* ---------------------------------------------------- */}
          {/* PAGE 3 – VALUATION SUMMARY */}
          {/* ---------------------------------------------------- */}
          <h2 style={{ fontSize: 20, marginBottom: 10 }}>Valuation Summary</h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: 20,
            }}
          >
            <tbody>
              {[
                ["Distress Value (DV)", "₹ " + safe(reportData.DV)],
                ["Realizable Value (RV)", "₹ " + safe(reportData.RV)],
                [
                  "Final Market Valuation",
                  "₹ " + safe(reportData.final_valuation),
                ],
              ].map(([label, value], idx) => (
                <tr key={idx}>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      background: "#F7F7F7",
                      fontWeight: 600,
                    }}
                  >
                    {label}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ---------------------------------------------------- */}
          {/* PAGE BREAK */}
          {/* ---------------------------------------------------- */}
          <div style={{ pageBreakAfter: "always" }}></div>

          {/* ---------------------------------------------------- */}
          {/* PAGE 4 – MAPS */}
          {/* ---------------------------------------------------- */}

          <h2 style={{ fontSize: 20, marginBottom: 20 }}>Location Maps</h2>

          <div>
            <h3 style={{ marginBottom: 10 }}>Road Map</h3>
            {mapUrls.normal && (
              <img
                src={mapUrls.normal}
                style={{ width: "100%", borderRadius: 8, marginBottom: 30 }}
              />
            )}

            <h3 style={{ marginBottom: 10 }}>Satellite Map</h3>
            {mapUrls.satellite && (
              <img
                src={mapUrls.satellite}
                style={{ width: "100%", borderRadius: 8 }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
