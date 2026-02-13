import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.assetory.in";

const title =
  "Contact Assetory | Property Valuation &  Bank-Seized Property Experts";
const description =
  "Contact Assetory for property valuation support, verified bank-seized property inquiries, demos, partnerships, and sales. Speak with our real estate experts today.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  keywords: [
    "contact assetory",
    "property valuation services india",
    "bank-seized property support",
    "bank-seized property consultation",
    "real estate valuation experts",
    "property valuation consultation",
    "property valuation support",
    "property valuation demo",
    "verified bank-seized properties india",
    "commercial property valuation",
    "residential property valuation",
    "real estate valuation company",
  ],
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/contact`,
    type: "website",
    siteName: "Assetory",
    images: [
      {
        url: `${SITE_URL}/assets/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Assetory contact page preview",
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
