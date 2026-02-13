import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.assetory.in";

const title = "Privacy Policy | Assetory";
const description =
  "Learn how Assetory collects, uses, and protects your personal data when you use our property valuation and  bank-seized property discovery platform.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "privacy policy",
    "data privacy",
    "personal data protection",
    "privacy information",
    "data collection",
    "privacy rights",
    "information protection",
    "user privacy",
    "property valuation privacy",
    "GDPR compliance",
    "data security",
    "privacy protection",
    "personal information",
    "privacy statement",
  ],
  openGraph: {
    type: "website",
    url: `${SITE_URL}/privacy-policy`,
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
    canonical: `${SITE_URL}/privacy-policy`,
  },
};
