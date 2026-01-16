import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import SubscriptionPlans from "../views/subscription/SubscriptionPlans";
import Link from "next/link";
import { additionalServices, auctionServices } from "@/lib/siteContent";

const title = "Property Valuation & Auction Services | PropValuer";
const description =
  "Get professional property valuations, bank auction listings, and real estate insights. Comprehensive services for homebuyers, investors, and financial institutions.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://prop-valuer-v3b2.vercel.app/services",
  },
  keywords: [
    "property valuation services",
    "bank auction listings",
    "real estate valuation",
    "property investment",
    "commercial property valuation",
    "residential property valuation",
    "auction property services",
  ],
  openGraph: {
    title,
    description,
    url: "https://prop-valuer-v3b2.vercel.app/services",
    type: "website",
    siteName: "PropValuer",
    images: [
      {
        url: "https://prop-valuer-v3b2.vercel.app/assets/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "PropValuer services preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://prop-valuer-v3b2.vercel.app/assets/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Our Services
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Comprehensive property intelligence solutions for valuations and
            investment opportunities.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-800 mb-4">
              Valuation Services
            </h2>
            <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto">
              Choose the right valuation service for your property needs
            </p>
          </div>
          <SubscriptionPlans />
        </div>
      </section>

      {/* Additional Services */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center gap-3 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1">
              Property Valuation Services
            </h2>
            <p className="text-base sm:text-xl text-slate-600 mx-auto">
              Comprehensive real estate solutions beyond property valuation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {additionalServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="p-6 hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
                >
                  <CardContent className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Icon className="h-8 w-8 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-slate-600">{service.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="mt-10 p-8 bg-emerald-600/10 rounded-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-emerald-600 mb-2">
                  Why Choose Our Valuation Services?
                </h3>
                <ul className="space-y-2">
                  {[
                    "95% accuracy backed by AI and market data",
                    "Accepted by 500+ financial institutions",
                    "Instant digital reports with professional formatting",
                    "Compliance-ready for RBI and legal requirements",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-emerald-600"
                    >
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/property-valuation">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Valuation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Auction Services Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1">
              Auction & Distressed Property Intelligence
            </h2>
            <p className="text-base sm:text-xl text-slate-600">
              Discover smart investment opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {auctionServices.map((service, index) => (
              <div
                key={index}
                className="group p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-accentyellowish/10 flex items-center justify-center mb-4 group-hover:bg-accentyellowish/20 transition-colors">
                  <service.icon className="h-6 w-6 text-accentyellowish" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-8 bg-emerald-600/10 rounded-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-secondary-foreground mb-2">
                  Find Your Next Investment Opportunity
                </h3>
                <ul className="space-y-2">
                  {[
                    "Curated bank auction properties",
                    "Valuation comparison for every listing",
                    "Real-time auction schedule updates",
                    "Investment analysis and insights",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-secondary-foreground/80"
                    >
                      <CheckCircle className="h-4 w-4 text-accentyellowish" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/property-auction-list">
                <Button
                  size="lg"
                  variant="default"
                  className="w-full justify-start bg-accentyellowish"
                >
                  Explore Auctions
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      {/* <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Simple, transparent, and accurate - here&#39;s how we value your
              property
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ourProcess.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-xl font-bold shadow-lg">
                  {step.step}
                </div>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-800 mb-6">
                Why Our Services Stand Out
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">
                      Instant Results
                    </h3>
                    <p className="text-slate-600">
                      Get property valuations in seconds, not days or weeks
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Shield className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">
                      95% Accuracy
                    </h3>
                    <p className="text-slate-600">
                      Industry-leading accuracy backed by comprehensive data
                      analysis
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <TrendingUp className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">
                      Market Insights
                    </h3>
                    <p className="text-slate-600">
                      Detailed market analysis and investment recommendations
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full h-[400px]">
              <Image
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Property analysis dashboard"
                fill
                className="rounded-2xl shadow-2xl object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="pb-10">
        <div className="bg-gradient-to-br from-emerald-600 via-teal-700 to-blue-800 text-white text-center max-w-7xl mx-auto py-12 rounded-2xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-bold mb-6">
            Two Powerful Tools. One Smart Property Platform.
          </h2>
          <p className="text-base sm:text-xl mb-8 max-w-2xl mx-auto">
            Get an instant AI-powered property valuation or explore verified
            auction properties with complete insights — choose your next step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/property-valuation">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Free Valuation
              </Button>
            </Link>
            <Link href="/property-auction-list">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-slate-800 hover:bg-white hover:text-slate-800 font-semibold px-8 py-4 rounded-xl transition-all duration-300"
              >
                Auction Property
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
