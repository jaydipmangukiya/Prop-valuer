"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const remarksText = [
  "1. We have not verified any legal/technical documents or approved plans for this property.",
  "2. No engineering survey has been conducted at the site.",
  "3. The validity of this Desktop Valuation Report is 45 days from the date of generation.",
  "4. Accuracy of this Desktop Valuation Report is lower compared to a valuation done through physical inspection and legal document verification.",
  "5. The predicted valuation is based on market survey data and system-generated algorithmic calculations. Actual fair market valuation may vary.",
];

const addCenteredImage = (doc, img, startY, maxWidth, maxHeight) => {
  const imgWidth = img.width;
  const imgHeight = img.height;

  const ratio = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);

  const displayWidth = imgWidth * ratio;
  const displayHeight = imgHeight * ratio;

  // center horizontally
  const centerX = (doc.internal.pageSize.getWidth() - displayWidth) / 2;

  doc.addImage(img, "PNG", centerX, startY, displayWidth, displayHeight);

  return startY + displayHeight;
};

const addFooter = (doc) => {
  const pageCount = doc.internal.getNumberOfPages();

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);

    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(10);
    doc.setTextColor(120);

    doc.text(
      "info@propvaluer.com  |  +91 78945 64444  |  propvaluer.com",
      pageWidth / 2,
      pageHeight - 14,
      { align: "center" }
    );

    // Page Number
    doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 6, {
      align: "center",
    });
  }
};

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
        ["Owner Name", reportData.owner_name],
        ["Owner Address", reportData.owner_address],
        ["Report Date", reportData.report_date],
        ["Case Ref No", reportData.case_ref_no],
        ["Property Address", reportData.property_address],
        ["Nearest Landmark", reportData.nearest_landmark],
        ["Type of Property", reportData.type_of_property],
      ],
      headStyles: {
        fillColor: [4, 120, 87],
        textColor: 255,
        fontStyle: "bold",
      },
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Valuation", "Amount (INR)"]],
      body: [
        ["Final Valuation", `Rs. ${format(reportData.final_valuation)}`],
        ["Final Valuation in Word", `${reportData?.final_valuation_in_word}`],
        ["Realizable Value (RV)", `Rs. ${format(reportData.RV)}`],
        ["Distress Value (DV)", `Rs. ${format(reportData.DV)}`],
      ],
      headStyles: {
        fillColor: [4, 120, 87],
        textColor: 255,
        fontStyle: "bold",
      },
    });
    const unitRateLabel =
      reportData?.type_of_property !== "Independent"
        ? "Unit Rate considered for CA / SBA"
        : "Unit Rate considered for CA / BUA";

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Specification", "Value"]],
      body: [
        [
          "Property Land Area",
          reportData.property_land_area
            ? `${reportData.property_land_area} sqft`
            : "-",
        ],
        ["Carpet Area", reportData.carpet_area || "0"],
        ["Super Built Up Area", reportData.super_built_up_area || "0"],
        ["Property Age", `${reportData.age_of_property} years`],
        [
          "Land Area",
          reportData.land_area ? `${reportData.land_area} sqft` : "-",
        ],
        ["Land Value", reportData.land_value || "0"],
        [
          "Unit Rate considered for Land",
          reportData?.unit_rate_considered_for_land || "-",
        ],
        ["Building Value", reportData?.building_value || "-"],
        ["Loading", reportData.loading || "N/A"],
        [
          unitRateLabel,
          `Rs. ${reportData.unit_rate_considered_for_ca_bua_sba}/-`,
        ],
      ],
      headStyles: {
        fillColor: [4, 120, 87],
        textColor: 255,
        fontStyle: "bold",
      },
    });

    doc.addPage();

    /** ---------------------------------
     * PAGE 2 → MAPS PAGE
     * ---------------------------------- */
    doc.setFontSize(18);
    doc.text("Location Maps", 14, 15);

    // ROAD MAP
    doc.text("Road Map", 14, 25);
    const road = await loadImage(mapUrls.normal);
    // doc.addImage(road, "PNG", 14, 30, 100, 70);
    addCenteredImage(doc, road, 30, 170, 100); //

    // SATELLITE MAP
    doc.text("Satellite Map", 14, 140);
    const sat = await loadImage(mapUrls.satellite);
    // doc.addImage(sat, "PNG", 14, 125, 100, 70);
    addCenteredImage(doc, sat, 150, 170, 100);

    doc.addPage();

    /** ---------------------------------
     * PAGE 4 → REMARKS PAGE
     * ---------------------------------- */
    doc.setFontSize(14);
    doc.text("Remarks", 14, 20);
    const pageWidth = doc.internal.pageSize.getWidth();
    const boxX = 12;
    const boxY = 30;
    const boxWidth = pageWidth - 24; // consistent margins
    const padding = 6;

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    let cursorY = boxY + padding + 4;
    let totalHeight = 0;

    remarksText.forEach((line) => {
      const wrapped = doc.splitTextToSize(line, boxWidth - padding * 2);
      totalHeight += wrapped.length * 6; // approx line height
    });

    const boxHeight = totalHeight + padding * 2 + 6;

    doc.setDrawColor(120);
    doc.setLineWidth(0.5);
    doc.rect(boxX, boxY, boxWidth, boxHeight, "S");
    cursorY = boxY + padding + 4;

    remarksText.forEach((line, index) => {
      const wrapped = doc.splitTextToSize(line, boxWidth - padding * 2);
      doc.text(wrapped, boxX + padding, cursorY);
      cursorY += wrapped.length * 6;
    });
    addFooter(doc);
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
