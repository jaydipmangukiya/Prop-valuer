import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { AuthProvider } from "@/components/authentication/AuthProvider";
import RazorpayScriptLoader from "./views/subscription/RazorpayScriptLoader";
import NavigationInitializer from "@/components/navigation/NavigationInitializer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://asstory.vercel.app"),
  title: {
    default: "Property Valuation in India – Instant Price Estimates | Asstory",
    template: "%s | Asstory",
  },
  description:
    "Get accurate property valuations and price estimates in India. Free online tool for apartments, villas, and commercial properties.",
  keywords: [
    "property valuation",
    "real estate valuation",
    "property price estimate",
    "India property valuation",
    "free property valuation",
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
    canonical: "https://asstory.vercel.app",
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
    title: "Asstory – Accurate Property Valuation",
    description:
      "Instant property valuation reports powered by real market data and analytics.",
    url: "https://asstory.vercel.app",
    siteName: "Asstory",
    images: [
      {
        url: "/assets/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Asstory Property Valuation Platform",
      },
    ],
  },
  icons: {
    icon: "/assets/images/logo.svg",
  },
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Asstory | Free Property Valuation in India",
    description:
      "Get accurate property valuations and real estate price estimates instantly.",
    images: ["https://asstory.vercel.app/og-image.png"],
  },
  // Theme color
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  category: "Real Estate",
  authors: [{ name: "Asstory Team" }],
  creator: "Asstory",
  publisher: "Asstory",
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
              name: "Asstory",
              url: "https://asstory.vercel.app",
              logo: "https://asstory.vercel.app/logo.png",
              description:
                "Free online property valuation and real estate price estimation platform in India",
              sameAs: [
                "https://www.facebook.com/asstory",
                "https://www.twitter.com/asstory",
                "https://www.linkedin.com/company/asstory",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
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
              name: "Asstory",
              url: "https://asstory.vercel.app",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://asstory.vercel.app/search?q={search_term_string}",
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
              name: "Asstory",
              url: "https://asstory.vercel.app",
              description:
                "Professional property valuation and real estate pricing platform",
              image: "https://asstory.vercel.app/og-image.png",
              areaServed: "IN",
              serviceType: "Property Valuation Service",
            }),
          }}
        />

        {/* Preconnect to external resources */}
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
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
