import type { Metadata } from "next";
import PropertyauctionList from "@/app/views/property-auction";

const title =
  "Bank Auction Properties India | Property Auction Listings & Valuations";
const description =
  "Discover verified bank auction properties across India. Browse residential, commercial, land & villa auctions with accurate valuations, location filters & detailed property information.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://asstory.vercel.app/property-auction-list",
  },
  keywords: [
    "property auction",
    "auction properties",
    "auction properties India",
    "bank auction properties",
    "property auction listings",
    "auction property listings",
    "residential auction",
    "commercial auction",
    "land auction",
    "villa auction",
    "property auction valuations",
    "bank auction listings India",
    "auction property values",
    "property auction sites",
  ],
  openGraph: {
    title,
    description,
    url: "https://asstory.vercel.app/property-auction-list",
    type: "website",
    siteName: "Asstory",
    images: [
      {
        url: "https://asstory.vercel.app/assets/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Asstory auction property listings",
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

export default function PropertyAuctionListPage() {
  return (
    <div className="w-full">
      {/* Structured Data for Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Asstory",
            url: "https://asstory.vercel.app",
            logo: "https://asstory.vercel.app/assets/logo.png",
            description:
              "Free property auction listings and valuations across India",
          }),
        }}
      />

      {/* Structured Data for Auction Property Listings */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Auction Property Listings",
            description:
              "Bank auction properties across India with verified valuations",
            url: "https://asstory.vercel.app/property-auction-list",
            mainEntity: {
              "@type": "ItemList",
              name: "Auction Properties",
              itemListElement: [
                {
                  "@type": "RealEstateAgent",
                  name: "Property Auction Listings",
                  url: "https://asstory.vercel.app/property-auction-list",
                },
              ],
            },
          }),
        }}
      />

      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://asstory.vercel.app",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: "https://asstory.vercel.app/services",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Auction Properties",
                item: "https://asstory.vercel.app/property-auction-list",
              },
            ],
          }),
        }}
      />

      <h1 className="sr-only">
        Bank Auction Properties in India - Property Auction Listings &
        Valuations
      </h1>
      <PropertyauctionList />
    </div>
  );
}
