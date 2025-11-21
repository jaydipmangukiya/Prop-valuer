"use client";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { PropertyData } from "@/app/valuation/page";

interface PDFGeneratorProps {
  propertyData: PropertyData;
  valuationData: {
    estimatedValue: number;
    pricePerSqFt: number;
    confidenceScore: number;
    marketTrend: string;
    trendPercentage: number;
    comparableProperties: Array<{
      area: number;
      price: number;
      distance: string;
    }>;
  };
}

export class PDFGenerator {
  static async generateValuationReport(
    props: PDFGeneratorProps
  ): Promise<Blob> {
    const { propertyData, valuationData } = props;

    // Create a temporary div for PDF content
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.left = "-9999px";
    tempDiv.style.width = "800px";
    tempDiv.style.backgroundColor = "white";
    tempDiv.style.padding = "40px";
    tempDiv.style.fontFamily = "Arial, sans-serif";

    const formatPrice = (price: number) => {
      if (price >= 10000000) {
        return `₹${(price / 10000000).toFixed(2)} Cr`;
      } else if (price >= 100000) {
        return `₹${(price / 100000).toFixed(2)} L`;
      } else {
        return `₹${price.toLocaleString()}`;
      }
    };

    tempDiv.innerHTML = `
      <div style="max-width: 800px; margin: 0 auto; background: white;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 40px; border-bottom: 3px solid #059669; padding-bottom: 20px;">
          <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
            <div style="width: 40px; height: 40px; background: #059669; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
              <span style="color: white; font-size: 20px; font-weight: bold;">🏠</span>
            </div>
            <h1 style="color: #059669; font-size: 32px; font-weight: bold; margin: 0;">PropValuer</h1>
          </div>
          <h2 style="color: #1e293b; font-size: 24px; margin: 0;">Property Valuation Report</h2>
          <p style="color: #64748b; margin: 10px 0 0 0;">Generated on ${new Date().toLocaleDateString(
            "en-IN",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }
          )}</p>
        </div>

        <!-- Property Summary -->
        <div style="background: #f8fafc; padding: 25px; border-radius: 12px; margin-bottom: 30px; border-left: 5px solid #059669;">
          <h3 style="color: #1e293b; font-size: 20px; margin: 0 0 20px 0; font-weight: bold;">Property Summary</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
              <p style="margin: 8px 0; color: #475569;"><strong>Location:</strong> ${
                propertyData.location
              }</p>
              <p style="margin: 8px 0; color: #475569;"><strong>Property Type:</strong> ${
                propertyData.propertyType
              }</p>
              <p style="margin: 8px 0; color: #475569;"><strong>Area:</strong> ${
                propertyData.area
              } sq ft</p>
            </div>
            <div>
              <p style="margin: 8px 0; color: #475569;"><strong>Bedrooms:</strong> ${
                propertyData.bedrooms
              } BHK</p>
              <p style="margin: 8px 0; color: #475569;"><strong>Bathrooms:</strong> ${
                propertyData.bathrooms
              }</p>
              <p style="margin: 8px 0; color: #475569;"><strong>Age:</strong> ${
                propertyData.age || "New"
              } years</p>
            </div>
          </div>
          ${
            propertyData.amenities.length > 0
              ? `
            <div style="margin-top: 15px;">
              <p style="margin: 8px 0; color: #475569;"><strong>Amenities:</strong> ${propertyData.amenities.join(
                ", "
              )}</p>
            </div>
          `
              : ""
          }
        </div>

        <!-- Valuation Results -->
        <div style="text-align: center; background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); padding: 30px; border-radius: 12px; margin-bottom: 30px;">
          <h3 style="color: #1e293b; font-size: 20px; margin: 0 0 20px 0; font-weight: bold;">Estimated Market Value</h3>
          <div style="font-size: 48px; font-weight: bold; color: #059669; margin: 20px 0;">
            ${formatPrice(valuationData.estimatedValue)}
          </div>
          <div style="display: flex; justify-content: center; align-items: center; margin: 15px 0;">
            <span style="color: ${
              valuationData.marketTrend === "up" ? "#059669" : "#dc2626"
            }; font-weight: bold;">
              ${valuationData.marketTrend === "up" ? "↗" : "↘"} ${
      valuationData.trendPercentage
    }% ${
      valuationData.marketTrend === "up" ? "increase" : "decrease"
    } vs last year
            </span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 25px;">
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <div style="font-size: 24px; font-weight: bold; color: #1e293b;">₹${valuationData.pricePerSqFt.toLocaleString()}</div>
              <div style="color: #64748b; font-size: 14px;">Price per sq ft</div>
            </div>
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <div style="font-size: 24px; font-weight: bold; color: #1e293b;">${
                valuationData.confidenceScore
              }%</div>
              <div style="color: #64748b; font-size: 14px;">Confidence Score</div>
            </div>
          </div>
        </div>

        <!-- Price Range -->
        <div style="background: #f1f5f9; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
          <h3 style="color: #1e293b; font-size: 18px; margin: 0 0 15px 0; font-weight: bold;">Estimated Price Range</h3>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <p style="color: #64748b; margin: 0; font-size: 14px;">Minimum Value</p>
              <p style="color: #1e293b; margin: 5px 0 0 0; font-size: 18px; font-weight: bold;">${formatPrice(
                valuationData.estimatedValue * 0.9
              )}</p>
            </div>
            <div style="flex: 1; height: 8px; background: linear-gradient(to right, #fbbf24, #059669, #10b981); margin: 0 20px; border-radius: 4px;"></div>
            <div>
              <p style="color: #64748b; margin: 0; font-size: 14px;">Maximum Value</p>
              <p style="color: #1e293b; margin: 5px 0 0 0; font-size: 18px; font-weight: bold;">${formatPrice(
                valuationData.estimatedValue * 1.1
              )}</p>
            </div>
          </div>
        </div>

        <!-- Comparable Properties -->
        <div style="margin-bottom: 30px;">
          <h3 style="color: #1e293b; font-size: 18px; margin: 0 0 20px 0; font-weight: bold;">Comparable Properties</h3>
          <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
            <div style="background: #f8fafc; padding: 15px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #1e293b;">
              Similar properties in your area
            </div>
            ${valuationData.comparableProperties
              .map(
                (property, index) => `
              <div style="padding: 15px; border-bottom: ${
                index < valuationData.comparableProperties.length - 1
                  ? "1px solid #e2e8f0"
                  : "none"
              }; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <p style="margin: 0; font-weight: bold; color: #1e293b;">${
                    property.area
                  } sq ft ${propertyData.propertyType}</p>
                  <p style="margin: 5px 0 0 0; color: #64748b; font-size: 14px;">${
                    property.distance
                  } away</p>
                </div>
                <div style="text-align: right;">
                  <p style="margin: 0; font-weight: bold; color: #059669;">${formatPrice(
                    property.price
                  )}</p>
                  <p style="margin: 5px 0 0 0; color: #64748b; font-size: 14px;">₹${Math.floor(
                    property.price / property.area
                  ).toLocaleString()}/sq ft</p>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>

        <!-- Market Analysis -->
        <div style="background: #fefce8; padding: 25px; border-radius: 12px; margin-bottom: 30px; border-left: 5px solid #eab308;">
          <h3 style="color: #1e293b; font-size: 18px; margin: 0 0 15px 0; font-weight: bold;">Market Analysis</h3>
          <p style="color: #713f12; margin: 0; line-height: 1.6;">
            Based on our comprehensive analysis of recent transactions, market trends, and location factors, 
            property values in ${propertyData.location} have shown a <strong>${
      valuationData.trendPercentage
    }% ${valuationData.marketTrend === "up" ? "increase" : "decrease"}</strong> 
            over the past year. The current market conditions indicate a 
            <strong>${
              valuationData.marketTrend === "up" ? "favorable" : "cautious"
            }</strong> environment for property investments in this area.
          </p>
        </div>

        <!-- Disclaimer -->
        <div style="background: #fef2f2; padding: 20px; border-radius: 8px; border-left: 5px solid #ef4444;">
          <h4 style="color: #dc2626; font-size: 16px; margin: 0 0 10px 0; font-weight: bold;">Important Disclaimer</h4>
          <p style="color: #7f1d1d; margin: 0; font-size: 14px; line-height: 1.5;">
            This valuation is an estimate based on available market data and algorithmic analysis. Actual property values may vary 
            based on current market conditions, property condition, and other factors. This report should not be considered as a 
            substitute for professional property appraisal. PropValuer is not liable for any decisions made based on this report.
          </p>
        </div>

        <!-- Footer -->
        <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #e2e8f0;">
          <p style="color: #64748b; margin: 0; font-size: 14px;">
            Generated by PropValuer - India's Leading Property Valuation Platform<br>
            For support: support@propvaluer.com | +91 98765 43210
          </p>
        </div>
      </div>
    `;

    document.body.appendChild(tempDiv);

    try {
      // Convert HTML to canvas
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
      });

      // Create PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        0,
        position,
        imgWidth,
        imgHeight
      );
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(
          canvas.toDataURL("image/png"),
          "PNG",
          0,
          position,
          imgWidth,
          imgHeight
        );
        heightLeft -= pageHeight;
      }

      // Clean up
      document.body.removeChild(tempDiv);

      return pdf.output("blob");
    } catch (error) {
      document.body.removeChild(tempDiv);
      throw error;
    }
  }

  static downloadPDF(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
