import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Gavel } from "lucide-react";
import { termsSections } from "@/lib/siteContent";
import Head from "next/head";

export default function TermsPage() {
  // Structured Data - Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Asstory",
    url: "https://asstory.com",
    logo: "https://asstory.com/logo.png",
    description:
      "Free property valuation and auction service platform in India",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-98765-43210",
      contactType: "Customer Service",
      email: "support@asstory.com",
    },
  };

  // Structured Data - WebPage Schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms & Conditions",
    description: "Terms and conditions for Asstory property valuation services",
    url: "https://asstory.com/terms",
    publisher: {
      "@type": "Organization",
      name: "Asstory",
      logo: {
        "@type": "ImageObject",
        url: "https://asstory.com/logo.png",
      },
    },
  };

  // Structured Data - BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://asstory.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Terms & Conditions",
        item: "https://asstory.com/terms",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>
      <Header />

      {/* Hero Section */}
      <section
        className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
        aria-label="Terms and conditions header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <FileText className="h-8 w-8 sm:h-12 sm:w-12 mr-4" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Terms & Conditions
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Please read these terms carefully before using our property
            valuation services.
          </p>
          <p className="text-base sm:text-lg md:text-xl mt-4 opacity-90">
            Last updated: January 15, 2024
          </p>
        </div>
      </section>

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">
        Terms and Conditions - Property Valuation Service Agreement | Asstory
      </h1>

      {/* Introduction */}
      <section
        className="py-16"
        aria-label="Introduction to terms and conditions"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8">
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                Welcome to Asstory. These Terms and Conditions
                (&quot;Terms&quot;) govern your use of our website and property
                valuation services. By accessing or using our services, you
                agree to be bound by these Terms and our Privacy Policy.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                If you do not agree with any part of these terms, please do not
                use our services. We reserve the right to update these Terms at
                any time, and continued use of our services constitutes
                acceptance of any changes.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Sections */}
      <section
        className="py-16 bg-white"
        aria-label="Key terms and conditions sections"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {termsSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <Icon className={`h-6 w-6 ${section.colorClass}`} />
                      <span className="text-xl sm:text-2xl">
                        {section.title}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-start space-x-3"
                        >
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-slate-700 leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Terms */}
      <section className="py-16" aria-label="Additional terms details">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Gavel className="h-6 w-6 text-purple-600" />
                <span className="text-xl sm:text-2xl">
                  Payment and Billing Terms
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">
                  Payment Processing
                </h4>
                <p className="text-slate-700">
                  All payments are processed securely through our trusted
                  payment partners. We accept major credit cards, debit cards,
                  and digital payment methods.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">
                  Billing Cycles
                </h4>
                <p className="text-slate-700">
                  Premium services are billed according to the selected plan.
                  Free services remain free with usage limitations as specified.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">
                  Price Changes
                </h4>
                <p className="text-slate-700">
                  We reserve the right to modify our pricing with 30 days
                  advance notice to existing users.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">
                Account Termination
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-700">
                Either party may terminate the service agreement at any time. We
                reserve the right to suspend or terminate accounts that violate
                these Terms or engage in fraudulent activities.
              </p>
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">
                  Grounds for Termination
                </h4>
                <ul className="space-y-1 text-red-700 text-sm">
                  <li>• Violation of these Terms and Conditions</li>
                  <li>• Fraudulent or illegal use of our services</li>
                  <li>• Non-payment of premium service fees</li>
                  <li>• Abuse of our support systems or staff</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">
                Governing Law and Disputes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 mb-4">
                These Terms are governed by the laws of India. Any disputes
                arising from the use of our services will be subject to the
                exclusive jurisdiction of the courts in Surat, Gujarat.
              </p>
              <div className="space-y-2 text-slate-700">
                <p>
                  <strong>Contact for Legal Matters:</strong>
                </p>
                <p>Email: legal@asstory.com</p>
                <p>Address: Surat, Gujarat, 395003, India</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
