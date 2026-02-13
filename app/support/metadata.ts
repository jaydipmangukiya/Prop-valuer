import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.assetory.in";

const title =
  "Support Center | Assetory – Valuation &  Bank-Seized Property Help";
const description =
  "Get expert support for property valuation and verified bank-seized property services. Contact Assetory for technical help, billing queries, account issues, and general assistance.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}/support`,
  },
  keywords: [
    "Assetory support",
    "property valuation support",
    "bank-seized property support",
    "bank-seized listing help",
    "customer support",
    "technical support",
    "valuation service help",
    "property valuation queries",
    "billing support",
    "account help",
  ],
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/support`,
    type: "website",
    siteName: "Assetory",
    images: [
      {
        url: `${SITE_URL}/assets/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Assetory support center preview",
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
