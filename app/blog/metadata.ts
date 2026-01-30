import type { Metadata } from "next";

const title = "Asstory Blog | Property Valuation Insights & Market Updates";
const description =
  "Expert insights on property valuation, real estate market trends, investment strategies, and auction property updates tailored for Indian real estate professionals.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://prop-valuer-v3b2.vercel.app/blog",
  },
  keywords: [
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
    url: "https://prop-valuer-v3b2.vercel.app/blog",
    type: "website",
    siteName: "Asstory",
    images: [
      {
        url: "https://prop-valuer-v3b2.vercel.app/assets/images/og-image.png",
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
    images: ["https://prop-valuer-v3b2.vercel.app/assets/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};
