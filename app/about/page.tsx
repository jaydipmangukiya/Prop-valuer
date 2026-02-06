import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { stats, teamMember } from "@/lib/siteContent";
import { ArrowRight, Quote, Shield, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.asstory.in";

const title = "About Asstory – Data-Driven Real Estate Intelligence Platform";
const description =
  "Learn how Asstory combines verified data, AI, and valuation expertise to deliver transparent property insights and auction discovery across India.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  keywords: [
    "asstory about",
    "property valuation platform",
    "real estate data India",
    "auction property discovery",
    "AI property valuation",
    "transparent real estate insights",
    "real estate valuation company India",
  ],
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/about`,
    type: "website",
    siteName: "Asstory",
    images: [
      {
        url: `${SITE_URL}/assets/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Asstory about page preview",
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

const values = [
  {
    icon: Target,
    title: "Data-Driven Precision",
    description:
      "Every valuation and listing is backed by verified data, market analytics, and rigorous methodology.",
  },
  {
    icon: Shield,
    title: "Transparency",
    description:
      "Clear reporting, honest assessments,verified listings, and no hidden agendas. We show you exactly how we arrive at our conclusions.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Innovation",
    description:
      "We constantly refine our algorithms and expand our data sources to deliver increasingly accurate insights.",
  },
];

const testimonials = [
  {
    quote:
      "Asstory helped me understand the realistic market value of my property in Surat. The valuation breakdown was clear and easy to trust.",
    author: "Property Owner",
    role: "Residential Seller",
    company: "Surat, Gujarat",
  },
  {
    quote:
      "Finding auction properties with proper value clarity was difficult earlier. Asstory made the process much simpler for local investments.",
    author: "Local Investor",
    role: "Real Estate Investor",
    company: "Surat",
  },
  {
    quote:
      "The valuation reports are well-structured and useful for documentation and client discussions. It saves a lot of manual effort.",
    author: "Legal Consultant",
    role: "Property Law Advisor",
    company: "Surat",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Asstory",
            url: `${SITE_URL}`,
            description:
              "India’s data-driven real estate intelligence platform for transparent property valuation and verified market insights",
            areaServed: {
              "@type": "Country",
              name: "India",
            },
            knowsAbout: [
              "Property Valuation",
              "Real Estate Analytics",
              "Market Price Estimation",
              "Auction Property Intelligence",
            ],
            sameAs: [],
          }),
        }}
      />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            About Asstory
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            India&apos;s most trusted property intelligence platform, helping
            professionals make data-driven valuation and auction decisions.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                One Platform. Two Powerful Capabilities.
              </h2>
              <p className="text-muted-foreground mb-4">
                Asstory began as India&apos;s trusted property valuation
                platform. Today, we&apos;ve evolved into a comprehensive real
                estate intelligence solution that combines AI-powered valuations
                with verified auction property discovery.
              </p>
              <p className="text-muted-foreground mb-4">
                This isn&apos;t two separate products — it&apos;s a unified
                platform designed for anyone who needs accurate property
                insights: homebuyers seeking fair prices, investors identifying
                opportunities, banks assessing collateral, and legal
                professionals requiring reliable documentation.
              </p>
              <p className="text-muted-foreground">
                Our technology-driven approach ensures every valuation is
                data-backed, every listing is verified, and every decision you
                make is informed.
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-600/10 to-accentyellowish/10 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-slate-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="pb-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Our Principles
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              The standards we hold ourselves to in everything we build
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white rounded-2xl border border-border"
              >
                <div className="w-16 h-16 mx-auto rounded-xl bg-emerald-600/10 flex items-center justify-center mb-6">
                  <value.icon className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">
                Our Mission
              </h2>
              <p className="text-base sm:text-lg text-slate-600 mb-6 leading-relaxed">
                We&apos;re building the infrastructure for transparent,
                data-driven property decisions in India. Our goal is simple:
                give every stakeholder — from first-time homebuyers to
                institutional investors — access to the same quality of property
                intelligence, including fair valuations and verified auction
                opportunities.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                As we grow, we&apos;re expanding our data coverage, refining our
                algorithms, and adding new capabilities. But our core commitment
                remains unchanged: accuracy, transparency, and reliability in
                every insight we deliver.
              </p>
            </div>
            <div className="relative">
              <Image
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Modern office building"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Why Choose Asstory?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We combine technology, data, and expertise to deliver the most
              accurate property valuations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="text-center p-8 hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
                >
                  <CardContent className="space-y-4">
                    <div className="flex justify-center">
                      <Icon className={`h-12 w-12 ${feature.colorClass}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section> */}

      {/* Team Section */}
      <section className="py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto">
              Industry experts and technology leaders working together to
              transform real estate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMember.map((member, index) => (
              <Card
                key={index}
                className="text-center overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-emerald-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-slate-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="pt-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-6 text-center">
            What Our Clients Say
          </h2>
          <p className="text-base sm:text-xl mb-8 max-w-2xl mx-auto">
            Trusted by leading banks, investors, and professionals across India
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="rounded-2xl border border-border p-8 relative shadow-lg"
              >
                <Quote className="absolute -top-4 -left-4 h-12 w-12 text-emerald-600/20" />
                <p className="text-muted-foreground mb-6 italic relative z-10">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-card-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                  <p className="text-sm text-card-foreground">
                    {testimonial.company}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16">
        <div className="bg-gradient-to-br from-emerald-600 via-teal-700 to-blue-800 text-white max-w-7xl mx-auto py-12 rounded-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-base sm:text-xl mb-8 max-w-2xl mx-auto">
            Whether you need a property valuation or want to explore auction
            opportunities, we&apos;re here to help.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/property-valuation">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent hover:bg-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:text-white"
              >
                Get Property Valuation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/property-auction-list">
              <Button
                size="lg"
                className="w-full justify-start bg-accentyellowish hover:bg-accentyellowish/90 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explore Auction Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
