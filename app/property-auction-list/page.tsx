import type { Metadata } from "next";
import PropertyauctionList from "@/app/views/property-auction";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.asstory.in";

const title =
  "Bank Auction Properties India | Property Auction Listings & Valuations";
const description =
  "Discover verified bank auction properties across India. Browse residential, commercial, land & villa auctions with accurate valuations, location filters & detailed property information.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}/property-auction-list`,
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
    url: `${SITE_URL}/property-auction-list`,
    type: "website",
    siteName: "Asstory",
    images: [
      {
        url: `${SITE_URL}/assets/images/og-image.png`,
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
    images: [`${SITE_URL}/assets/images/og-image.png`],
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
            url: `${SITE_URL}`,
            logo: `${SITE_URL}/assets/logo.png`,
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
            url: `${SITE_URL}/property-auction-list`,
            mainEntity: {
              "@type": "ItemList",
              name: "Auction Properties",
              itemListElement: [
                {
                  "@type": "RealEstateAgent",
                  name: "Property Auction Listings",
                  url: `${SITE_URL}/property-auction-list`,
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
                item: `${SITE_URL}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: `${SITE_URL}/services`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Auction Properties",
                item: `${SITE_URL}/property-auction-list`,
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
