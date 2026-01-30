import type { Metadata } from "next";

const title = "Support Center | Asstory - Get Help with Property Valuation";
const description =
  "Get expert support for property valuation services. Contact Asstory team for technical help, billing queries, account issues, and general assistance.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://asstory.vercel.app/support",
  },
  keywords: [
    "Asstory support",
    "property valuation help",
    "customer support",
    "technical support",
    "valuation service help",
    "Asstory contact",
    "property valuation queries",
    "billing support",
    "account help",
  ],
  openGraph: {
    title,
    description,
    url: "https://asstory.vercel.app/support",
    type: "website",
    siteName: "Asstory",
    images: [
      {
        url: "https://asstory.vercel.app/assets/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Asstory support center preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://asstory.vercel.app/assets/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};
