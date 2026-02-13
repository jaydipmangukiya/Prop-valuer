import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.assetory.in";

const title = "Assetory Blog – Real Estate Insights, Valuation & Market Trends";
const description =
  "Expert insights on property valuation, real estate market trends, investment strategies, and bank-seized property updates tailored for Indian real estate professionals.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  keywords: [
    "Assetory blog",
    "property valuation blog",
    "real estate market insights",
    "property investment tips",
    "bank-seized property updates",
    "real estate news India",
    "valuation methodology",
  ],
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/blog`,
    type: "website",
    siteName: "Assetory",
    images: [
      {
        url: `${SITE_URL}/assets/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Assetory blog preview",
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
