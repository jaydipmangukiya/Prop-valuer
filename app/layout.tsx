import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { AuthProvider } from "@/components/authentication/AuthProvider";
import RazorpayScriptLoader from "./views/subscription/RazorpayScriptLoader";
import NavigationInitializer from "@/components/navigation/NavigationInitializer";
// import CookieBanner from "@/components/CookieConsent/CookieBanner";
// import ConsentScriptManager from "@/components/CookieConsent/ConsentScriptManager";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL || "https://www.assetory.in"),
  title: {
    default:
      "Property Valuation & Bank-Seized Properties in India | Market Value | Assetory",
    template: "%s | Assetory",
  },
  description:
    "Get accurate property valuations and discover verified bank-seized properties in India. Explore bank-seized properties, market value insights, and data-driven analysis for apartments, villas, land, and commercial real estate.",
  keywords: [
    "property valuation",
    "real estate valuation",
    "property price estimate",
    "bank-seized property",
    "property bank-seized India",
    "bank-seized property India",
    "distressed property bank-seized",
    "bank-seized property valuation",
    "India real estate bank-seized",
    "commercial property bank-seized",
    "India property valuation",
    "apartment valuation",
    "villa valuation",
    "commercial property valuation",
    "land valuation",
    "property value checker",
  ],

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    title:
      "Assetory – Property Valuation & Bank-Seized Properties | Market Value",
    description:
      "Accurate property valuations and verified bank-seized property discovery powered by real market data and analytics.",
    url: SITE_URL,
    siteName: "Assetory",
    images: [
      {
        url: `${SITE_URL}/assets/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Assetory Property Valuation Platform",
      },
    ],
  },
  icons: {
    icon: "/assets/images/logo.svg",
  },
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Assetory | Property Valuation & Bank-Seized Properties in India",
    description:
      "Get accurate valuations and explore bank-seized properties with market value insights across India.",
    images: [`${SITE_URL}/assets/images/og-image.png`],
  },
  // Theme color
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  category: "Real Estate",
  authors: [{ name: "Assetory Team" }],
  creator: "Assetory",
  publisher: "Assetory",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Assetory",
              url: SITE_URL,
              logo: `${SITE_URL}/assets/images/logo.svg`,
              description:
                "Property valuation and bank-seized property discovery platform for Indian real estate",
              sameAs: [
                "https://www.facebook.com/assetory",
                "https://www.twitter.com/assetory",
                "https://www.linkedin.com/company/assetory",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                telephone: "+91-78782-83414",
                availableLanguage: ["en", "hi"],
              },
            }),
          }}
        />

        {/* JSON-LD Structured Data - Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Assetory",
              url: SITE_URL,
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* JSON-LD Structured Data - Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Assetory",
              url: SITE_URL,
              description:
                "Professional property valuation, bank-seized property discovery, and market value analysis platform for Indian real estate",
              image: `${SITE_URL}/assets/images/og-image.png`,
              areaServed: "IN",
              serviceType: [
                "Property Valuation",
                "Bank-Seized Property Discovery",
                "Bank-Seized Property Search",
                "Market Value Analysis",
              ],
              telephone: "+91-78782-83414",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Surat",
                addressRegion: "Gujarat",
                postalCode: "395003",
                addressCountry: "IN",
              },
            }),
          }}
        />

        {/* Preconnect to external resources */}
        {/* Canonical - ensure absolute canonical URL is served */}
        <link rel="canonical" href={SITE_URL || "https://www.assetory.in"} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        {/* ✅ Load Google Maps JavaScript SDK */}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <NavigationInitializer />
          <RazorpayScriptLoader />
          {/* <CookieBanner /> */}
          {/* <ConsentScriptManager /> */}
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
