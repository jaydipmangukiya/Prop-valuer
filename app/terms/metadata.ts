import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.assetory.in";

const title =
  "Terms & Conditions | Valuation &  Bank-Seized Property Services | Assetory";
const description =
  "Read Assetory’s Terms & Conditions governing the use of our property valuation and bank-seized property discovery services, including user responsibilities, limitations, and legal terms.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "terms and conditions",
    "terms of service",
    "bank-seized property terms",
    "property valuation terms",
    "service terms",
    "user agreement",
    "legal terms",
    "conditions of use",
    "property services terms",
    "valuation service terms",
    "terms Assetory",
    "service agreement",
    "user terms",
  ],
  openGraph: {
    type: "website",
    url: `${SITE_URL}/terms`,
    title,
    description,
    siteName: "Assetory",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
};
