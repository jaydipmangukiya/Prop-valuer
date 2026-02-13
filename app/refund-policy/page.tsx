import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  RefreshCw,
  Clock,
  CreditCard,
  CircleAlert as AlertCircle,
  CircleCheck as CheckCircle,
  Phone,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.assetory.in";

const title = "Refund Policy | Assetory";
const description =
  "Learn how Assetory handles refund requests for paid services, including property valuation and bank-seized property discovery features, with eligibility, timelines, and contact details.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}/refund-policy`,
  },
  keywords: [
    "Assetory refund policy",
    "property valuation refund",
    "bank-seized property refund",
    "paid service refunds",
    "refund terms Assetory",
  ],
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/refund-policy`,
    type: "article",
    siteName: "Assetory",
    images: [
      {
        url: `${SITE_URL}/assets/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Assetory refund policy preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${SITE_URL}/assets/images/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RefundPolicyPage() {
  const refundConditions = [
    {
      icon: <CheckCircle className="h-6 w-6 text-emerald-600" />,
      title: "Eligible for Full Refund",
      conditions: [
        "Technical issues preventing report generation within 24 hours",
        "Significant errors in valuation data due to system malfunction",
        "Service unavailability for more than 48 hours",
        "Duplicate charges for the same valuation request",
      ],
    },
    {
      icon: <AlertCircle className="h-6 w-6 text-orange-600" />,
      title: "Partial Refund Eligible",
      conditions: [
        "Minor discrepancies in property details that don't affect overall valuation",
        "Delayed report delivery between 24-72 hours",
        "Incomplete amenity information in the final report",
        "Partial refunds are assessed case-by-case depending on impact and service delivered.",
      ],
    },
    {
      icon: <CreditCard className="h-6 w-6 text-red-600" />,
      title: "Non-Refundable",
      conditions: [
        "Successfully delivered valuation reports",
        "User error in providing incorrect property information",
        "Change of mind after report generation",
        "Market fluctuations affecting property values",
        "Access to recovery property listings or investment insights once provided",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <RefreshCw className="h-8 w-8 sm:h-12 sm:w-12 mr-4" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Refund Policy
            </h1>
          </div>

          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto opacity-95 leading-relaxed">
            We strive for complete customer satisfaction. Learn everything about
            our refund terms and eligibility.
          </p>

          <p className="text-base sm:text-lg md:text-lg mt-4 opacity-90">
            Effective from: January 15, 2024
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8">
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                At Assetory, we are committed to providing accurate and reliable
                property valuation services bank-seized property discovery
                features. This Refund Policy outlines the terms and conditions
                under which refunds may be processed for our premium valuation
                services.
                {/* At Assetory, we are committed to providing accurate and reliable
                property valuation services features. This Refund Policy
                outlines the terms and conditions under which refunds may be
                processed for our premium valuation services. */}
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Please read this policy carefully before making any payment for
                our services. By using our paid services, you agree to the terms
                outlined in this refund policy.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      {/* Refund Conditions */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-3 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Refund Conditions
            </h2>
            <p className="text-base sm:text-xl text-slate-600">
              Understanding when refunds are applicable
            </p>
          </div>

          <div className="space-y-8">
            {refundConditions.map((category, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    {category.icon}
                    <span className="text-xl sm:text-2xl">
                      {category.title}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.conditions.map((condition, conditionIndex) => (
                      <li
                        key={conditionIndex}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-slate-700 leading-relaxed">
                          {condition}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Refund Process */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Clock className="h-6 w-6 text-emerald-600" />
                <span className="text-xl sm:text-2xl">
                  Refund Process & Timeline
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">
                    How to Request a Refund
                  </h4>
                  <ol className="space-y-2 text-slate-700">
                    <li>1. Contact our support team within 7 days</li>
                    <li>2. Provide your transaction ID and reason</li>
                    <li>3. Submit any supporting documentation</li>
                    <li>4. Wait for our team to review your request</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">
                    Processing Timeline
                  </h4>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Review: 2-3 business days</li>
                    <li>• Approval notification: 1 business day</li>
                    <li>
                      • Refund processing: 5-10 business days (depending on
                      payment method)
                    </li>
                    <li>• Bank credit: depends on your bank / card issuer</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-amber-800 mb-2">
                  Important Notes
                </h4>
                <ul className="space-y-1 text-amber-700 text-sm">
                  <li>
                    • Refunds will be processed to the original payment method
                  </li>
                  <li>• Processing fees (if any) are non-refundable</li>
                  <li>
                    • Refund requests must be made within 7 days of service
                    delivery
                  </li>
                  <li>
                    • Refund decisions are made based on this policy and
                    applicable laws
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl border-0 bg-gradient-to-r from-emerald-50 to-teal-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Phone className="h-6 w-6 text-emerald-600" />
                <span className="text-xl sm:text-2xl">
                  Need Help with Refunds?
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 mb-6">
                Our customer support team is here to help you with any
                refund-related queries. Contact us through any of the following
                channels:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">
                    Contact Information
                  </h4>
                  <div className="space-y-2 text-slate-700">
                    <p>
                      <strong>Email:</strong> info@assetory.in
                    </p>
                    <p>
                      <strong>Phone:</strong> +91 78782 83414
                    </p>
                    <p>
                      <strong>Support Hours:</strong> Mon-Sat, 9 AM - 7 PM
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">
                    What to Include
                  </h4>
                  <ul className="space-y-1 text-slate-700 text-sm">
                    <li>• Transaction ID or receipt number</li>
                    <li>• Date of service purchase</li>
                    <li>• Detailed reason for refund request</li>
                    <li>• Screenshots or documentation (if applicable)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
