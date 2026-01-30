import type { Metadata } from "next";

const title = "Privacy Policy | Data Protection & Your Information | Asstory";
const description =
  "Our Privacy Policy explains how Asstory collects, uses, and protects your personal data. Learn about your privacy rights and how we safeguard your information.";

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
    url: "https://asstory.com/privacy-policy",
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
    canonical: "https://asstory.com/privacy-policy",
  },
};
