import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.asstory.in";

const title = "Contact Asstory | Property Valuation & Auction Property Experts";
const description =
  "Contact Asstory for property valuation support, verified auction property inquiries, demos, partnerships, and sales. Speak with our real estate experts today.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  keywords: [
    "contact asstory",
    "property valuation services india",
    "auction property support",
    "auction property consultation",
    "real estate valuation experts",
    "property valuation consultation",
    "property valuation support",
    "property valuation demo",
    "verified auction properties india",
    "commercial property valuation",
    "residential property valuation",
    "real estate valuation company",
  ],
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/contact`,
    type: "website",
    siteName: "Asstory",
    images: [
      {
        url: `${SITE_URL}/assets/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Asstory contact page preview",
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
