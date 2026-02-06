import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.asstory.in";

const title = "Asstory Blog – Real Estate Insights, Valuation & Market Trends";
const description =
  "Expert insights on property valuation, real estate market trends, investment strategies, and auction property updates tailored for Indian real estate professionals.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  keywords: [
    "Asstory blog",
    "property valuation blog",
    "real estate market insights",
    "property investment tips",
    "auction property updates",
    "real estate news India",
    "valuation methodology",
  ],
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/blog`,
    type: "website",
    siteName: "Asstory",
    images: [
      {
        url: `${SITE_URL}/assets/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Asstory blog preview",
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
