import type { Metadata } from "next";
import PropertyauctionList from "@/app/views/property-auction";

const title = "Auction Properties in India | Verified Listings & Valuations";
const description =
  "Browse bank auction properties across India with verified valuations, detailed data, and location filters. Discover residential, commercial, land, and villa auctions.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://prop-valuer-v3b2.vercel.app/property-auction-list",
  },
  keywords: [
    "auction properties India",
    "bank auction property listings",
    "property auction valuations",
    "residential auction properties",
    "commercial auction properties",
    "land auction India",
    "villa auction listings",
  ],
  openGraph: {
    title,
    description,
    url: "https://prop-valuer-v3b2.vercel.app/property-auction-list",
    type: "website",
    siteName: "PropValuer",
    images: [
      {
        url: "https://prop-valuer-v3b2.vercel.app/assets/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "PropValuer auction property listings",
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

export default function PropertyAuctionListPage() {
  return <PropertyauctionList />;
}
