"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function DownloadPDF({ reportData, mapUrls }) {
  const generatePDF = async () => {
    const doc = new jsPDF("p", "mm", "a4");

    /** ---------------------------------
     * PAGE 1 → REPORT SUMMARY
     * ---------------------------------- */
    doc.setFontSize(20);
    doc.text("Property Valuation Report", 14, 20);

    doc.setFontSize(12);
    autoTable(doc, {
      startY: 30,
      head: [["Field", "Details"]],
      body: [
        ["Case Ref No", reportData.case_ref_no],
        ["Report Date", reportData.report_date],
        ["Type of Property", reportData.type_of_property],
        ["Owner Name", reportData.owner_name],
        ["Owner Address", reportData.owner_address],
        ["Property Address", reportData.property_address],
        ["Nearest Landmark", reportData.nearest_landmark],
      ],
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Valuation", "Amount (INR)"]],
      body: [
        ["Final Valuation", `₹ ${format(reportData.final_valuation)}`],
        ["Realizable Value (RV)", `₹ ${format(reportData.RV)}`],
        ["Distress Value (DV)", `₹ ${format(reportData.DV)}`],
      ],
    });

    doc.addPage();

    /** ---------------------------------
     * PAGE 2 → MAPS PAGE
     * ---------------------------------- */
    doc.setFontSize(18);
    doc.text("Location Maps", 14, 15);

    // ROAD MAP
    const road = await loadImage(mapUrls.normal);
    doc.text("Road Map", 14, 25);
    doc.addImage(road, "PNG", 14, 30, 180, 80);

    // SATELLITE MAP
    const sat = await loadImage(mapUrls.satellite);
    doc.text("Satellite Map", 14, 120);
    doc.addImage(sat, "PNG", 14, 125, 180, 80);

    doc.addPage();

    /** ---------------------------------
     * PAGE 3 → PROPERTY SPECIFICATIONS
     * ---------------------------------- */
    doc.setFontSize(18);
    doc.text("Property Specifications", 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [["Specification", "Value"]],
      body: [
        ["Property Land Area", `${reportData.property_land_area} sq ft`],
        [
          "BUA / Carpet / SBA",
          reportData.built_up_area_carpet_area_super_built_up_area || "0",
        ],
        ["Carpet Area", reportData.carpet_area || "0"],
        ["Super Built Up Area", reportData.super_built_up_area || "0"],
        ["Loading", reportData.loading || "N/A"],
        ["Property Age", `${reportData.age_of_property} years`],
      ],
    });

    doc.addPage();

    /** ---------------------------------
     * PAGE 4 → REMARKS PAGE
     * ---------------------------------- */
    doc.setFontSize(18);
    doc.text("Remarks", 14, 20);

    doc.setFontSize(12);
    doc.text(
      `This valuation has been prepared based on available data,   
location coordinates, property conditions & standard valuation methods.  
Figures are approximate and for assessment purposes only.`,
      14,
      35
    );

    doc.save(`Valuation_Report_${reportData.case_ref_no}.pdf`);
  };

  /** -------------------------------
   * HELPERS
   * ------------------------------- */
  const loadImage = (url: string) =>
    new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.src = url;
    });

  const format = (value: any) =>
    new Intl.NumberFormat("en-IN").format(Number(value || 0));

  return (
    <button
      onClick={generatePDF}
      className="px-5 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
    >
      Download PDF
    </button>
  );
}
