import type { Metadata } from "next";

const title =
  "Free Property Valuation Tool | Accurate Property Values in India";
const description =
  "Get instant property valuations for residential, commercial, land & villa properties in India. Our AI-powered tool provides accurate market values using location, size & condition.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://prop-valuer-v3b2.vercel.app/property-valuation",
  },
  keywords: [
    "property valuation",
    "property valuation tool",
    "free property valuation",
    "property value calculator",
    "residential property valuation",
    "commercial property valuation",
    "land valuation",
    "villa valuation",
    "property market value India",
    "property appraisal",
    "accurate property valuation",
    "property worth calculator",
    "online property valuation",
    "property price estimation",
  ],
  openGraph: {
    title,
    description,
    url: "https://prop-valuer-v3b2.vercel.app/property-valuation",
    type: "website",
    siteName: "Asstory",
    images: [
      {
        url: "https://prop-valuer-v3b2.vercel.app/assets/images/og-valuation.png",
        width: 1200,
        height: 630,
        alt: "Free Property Valuation Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [
      "https://prop-valuer-v3b2.vercel.app/assets/images/og-valuation.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};
