import type { Metadata } from "next";

const title = "Contact PropValuer | Talk to Property Valuation Experts";
const description =
  "Contact PropValuer for property valuation support, demos, partnerships, and sales inquiries. Call, email, or book a consultation with our team.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://prop-valuer-v3b2.vercel.app/contact",
  },
  keywords: [
    "contact propvaluer",
    "property valuation services india",
    "real estate valuation experts",
    "property valuation consultation",
    "property valuation support",
    "property valuation demo",
    "commercial property valuation",
    "residential property valuation",
    "real estate valuation company",
  ],
  openGraph: {
    title,
    description,
    url: "https://prop-valuer-v3b2.vercel.app/contact",
    type: "website",
    siteName: "PropValuer",
    images: [
      {
        url: "https://prop-valuer-v3b2.vercel.app/assets/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "PropValuer contact page preview",
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
