import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.asstory.in";

export const metadata: Metadata = {
  title: "Property Valuation | Instant Real Estate Price Estimate | Asstory",
  description:
    "Get instant property valuation and real estate price estimates for apartments, villas, commercial properties, and land in India. Fast, accurate, and professional property assessment.",
  alternates: {
    canonical: `${SITE_URL}/property-valuation`,
  },
  openGraph: {
    title: "Property Valuation | Get Real Estate Price Estimates",
    description:
      "Instant property valuations for apartments, villas, land, and commercial properties across India.",
    url: `${SITE_URL}/property-valuation`,
    siteName: "Asstory",
    type: "website",
    images: [
      {
        url: "/assets/images/property-valuation.png",
        width: 1200,
        height: 630,
        alt: "Property Valuation in India",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PropertyValuationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
