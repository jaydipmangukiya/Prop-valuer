import type { Metadata } from "next";
import PropertyauctionList from "@/app/views/property-auction";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.assetory.in";

const title =
  "Bank-Seized Properties India | Bank-Seized Listings & Valuations";
const description =
  "Discover verified bank bank-seized and bank-seized properties across India. Browse residential, commercial, land & villa Bank-Seized with accurate valuations, market value analysis, location filters & detailed property information.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}/property-list`,
  },
  keywords: [
    "property bank-seized listings",
    "bank-seized properties",
    "bank-seized properties India",
    "property bank-seized listings",
    "bank-seized property listings",
    "residential bank-seized",
    "commercial bank-seized",
    "land bank-seized",
    "villa bank-seized",
    "property bank-seized valuations",
    "bank-seized listings India",
    "bank-seized property values",
    "property bank-seized sites",
  ],
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/property-list`,
    type: "website",
    siteName: "Assetory",
    images: [
      {
        url: `${SITE_URL}/assets/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Assetory bank-seized property listings",
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
            name: "Assetory",
            url: `${SITE_URL}`,
            logo: `${SITE_URL}/assets/logo.png`,
            description:
              "Free property bank-seized listings and valuations across India",
          }),
        }}
      />

      {/* Structured Data for bank-seized Property Listings */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Bank-Seized Property Listings",
            description:
              "Bank-seized properties across India with verified valuations",
            url: `${SITE_URL}/property-list`,
            mainEntity: {
              "@type": "ItemList",
              name: "Bank-Seized Properties",
              itemListElement: [
                {
                  "@type": "RealEstateAgent",
                  name: "Property Bank-Seized Listings",
                  url: `${SITE_URL}/property-list`,
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
                name: "Bank-Seized Properties",
                item: `${SITE_URL}/property-list`,
              },
            ],
          }),
        }}
      />

      <h1 className="sr-only">
        Bank Seized Properties in India - Property Bank-Seized Listings &
        Valuations
      </h1>
      <PropertyauctionList />
    </div>
  );
}
