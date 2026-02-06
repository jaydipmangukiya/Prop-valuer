import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.asstory.in";

const title = "Privacy Policy | Asstory";
const description =
  "Learn how Asstory collects, uses, and protects your personal data when you use our property valuation and auction discovery platform.";

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
    siteName: "Asstory",
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
