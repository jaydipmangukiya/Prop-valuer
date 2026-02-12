import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, TriangleAlert as AlertTriangle } from "lucide-react";
import { privacySections } from "@/lib/siteContent";
import Head from "next/head";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.assetory.in";

export default function PrivacyPolicyPage() {
  // Structured Data - Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Assetory",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: "Property valuation and auction discovery platform in India",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-98765-43210",
      contactType: "Customer Service",
      email: "info@assetory.in",
    },
  };

  // Structured Data - WebPage Schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    description:
      "Privacy policy explaining how Assetory collects, uses, and protects your personal data",
    url: `${SITE_URL}/privacy-policy`,
    publisher: {
      "@type": "Organization",
      name: "Assetory",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
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
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Privacy Policy",
        item: `${SITE_URL}/privacy-policy`,
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
        aria-label="Privacy policy header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-8 w-8 sm:h-12 sm:w-12 mr-4" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Privacy Policy
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us. This policy explains how we
            collect, use, and protect your information.
          </p>
          <p className="text-base sm:text-lg md:text-xl mt-4 opacity-90">
            Last updated: January 15, 2024
          </p>
        </div>
      </section>

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">
        Privacy Policy - How Assetory Protects Your Data and Personal
        Information
      </h1>

      {/* Introduction */}
      <section className="py-16" aria-label="Introduction to privacy policy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8">
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                {/* At Assetory, we are committed to protecting your privacy and
                ensuring the security of your personal information. This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website or use our property
                valuation and auction property services. */}
                At Assetory, we are committed to protecting your privacy and
                ensuring the security of your personal information. This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website or use our property
                valuation services.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                {/* By using our services, you agree to the collection and use of
                information in accordance with this policy. If you do not agree
                with our policies and practices, please do not use our services. */}
                By using our services, you agree to the collection and use of
                information in accordance with this policy. If you do not agree
                with our policies and practices, please do not use our services
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Sections */}
      <section
        className="py-16 bg-white"
        aria-label="Key privacy protection sections"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {privacySections.map((section, index) => {
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

      {/* Additional Sections */}
      <section className="py-16" aria-label="Additional privacy information">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
                <span className="text-xl sm:text-2xl">
                  Your Rights and Choices
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">
                  Access and Update
                </h4>
                <p className="text-slate-700">
                  You have the right to access, update, or delete your personal
                  information at any time through your account settings.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">
                  Data Portability
                </h4>
                <p className="text-slate-700">
                  You can request a copy of your data in a structured,
                  machine-readable format.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">
                  Marketing Communications
                </h4>
                <p className="text-slate-700">
                  You can opt-out of marketing communications at any time by
                  clicking the unsubscribe link in our emails.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 mb-4">
                If you have any questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <div className="space-y-2 text-slate-700">
                <p>
                  <strong>Email:</strong> info@assetory.in
                </p>
                <p>
                  <strong>Phone:</strong> +91 78782 83414
                </p>
                <p>
                  <strong>Address:</strong> Surat, Gujarat, 395003, India
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
