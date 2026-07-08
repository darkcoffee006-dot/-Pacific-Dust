import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { QuickAddProvider } from "@/context/QuickAddContext";
import CartDrawer from "@/components/ui/CartDrawer";
import QuickAddModalRoot from "@/components/ui/QuickAddModalRoot";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
});

const SITE_URL = "https://pacificdust.co.in";

// ─── Metadata ────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // Brand name leads — this is what shows for branded search "pacific dust"
    default: "Pacific Dust | Premium Oversized Streetwear — Delhi NCR, India",
    template: "%s | Pacific Dust",
  },
  description:
    "Pacific Dust is a premium Indian streetwear brand. 240 GSM oversized graphic tees — City of Angels, Dreams, Unbothered & Gradient Soul. Made in Delhi NCR. Pan-India delivery.",
  keywords: [
    "pacific dust",
    "pacific dust clothing",
    "pacific dust tee",
    "pacific dust streetwear",
    "pacific dust india",
    "oversized tee india",
    "premium graphic tshirt india",
    "240 gsm tshirt india",
    "indian streetwear brand",
    "buy oversized tshirt online india",
  ],
  authors: [{ name: "Pacific Dust", url: SITE_URL }],
  creator: "Pacific Dust",
  publisher: "Pacific Dust",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Pacific Dust",
    title: "Pacific Dust | Premium Oversized Streetwear — Delhi NCR, India",
    description:
      "Pacific Dust is a premium Indian streetwear brand. 240 GSM oversized graphic tees — City of Angels, Dreams, Unbothered & Gradient Soul. Made in Delhi NCR.",
    images: [
      {
        url: "/images/pacific/black/city of angels/DSCN5554.JPG.jpg.jpeg",
        width: 1200,
        height: 630,
        alt: "Pacific Dust — Premium Indian Streetwear Brand, Delhi NCR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pacific_dust_",
    title: "Pacific Dust | Premium Oversized Streetwear — Delhi NCR, India",
    description:
      "240 GSM French Terry. Oversized box fit. Drop 01 live now. Pan-India delivery.",
    images: ["/images/pacific/black/city of angels/DSCN5554.JPG.jpg.jpeg"],
  },
  alternates: { canonical: SITE_URL },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/icon.png",
  },
  // Verification placeholders — fill in once submitted to Search Console
  // verification: { google: "YOUR_GOOGLE_VERIFICATION_TOKEN" },
};

export const viewport: Viewport = {
  themeColor: "#1c1917",
  width: "device-width",
  initialScale: 1,
};

// ─── Structured Data ─────────────────────────────────────────

/**
 * Organization / ClothingStore
 * This is the most critical schema for branded search.
 * Google uses this to build the Knowledge Panel for "Pacific Dust".
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ClothingStore"],
  "@id": `${SITE_URL}/#organization`,
  name: "Pacific Dust",
  alternateName: ["Pacific Dust India", "PacificDust"],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/images/kangaro.png`,
    width: 512,
    height: 512,
  },
  image: `${SITE_URL}/images/pacific/black/city of angels/DSCN5554.JPG.jpg.jpeg`,
  description:
    "Pacific Dust is a premium Indian streetwear brand founded in Delhi NCR in 2024. We make 240 GSM oversized graphic tees using screen print and DTF artwork — built to last, made with intent.",
  foundingDate: "2024",
  foundingLocation: {
    "@type": "Place",
    name: "Delhi NCR, India",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Delhi NCR",
    addressRegion: "Delhi",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-96436-44455",
      contactType: "customer service",
      contactOption: "TollFree",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    {
      "@type": "ContactPoint",
      url: "https://wa.me/919643644455",
      contactType: "sales",
      contactOption: "TollFree",
      areaServed: "IN",
    },
  ],
  priceRange: "₹899 – ₹1299",
  currenciesAccepted: "INR",
  paymentAccepted: "UPI, Credit Card, Debit Card, Net Banking, WhatsApp",
  openingHours: "Mo-Sa 10:00-19:00",
  sameAs: [
    "https://www.instagram.com/pacific_dust_",
    "https://wa.me/919643644455",
    "https://pacificdust.co.in",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Pacific Dust Drop 01",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "City of Angels Tee" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Dreams Tee" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Unbothered Tee" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Gradient Soul Tee" } },
    ],
  },
};

/**
 * WebSite schema with SearchAction (SiteLinksSearchBox)
 * This enables the search box that appears under your site in Google
 * when someone searches "pacific dust" directly.
 */
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Pacific Dust",
  alternateName: "Pacific Dust India",
  url: SITE_URL,
  description:
    "Pacific Dust — premium Indian streetwear brand. 240 GSM oversized graphic tees. Made in Delhi NCR.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// ─── Layout ──────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${geist.variable} ${playfair.variable} h-full antialiased`}>
      <head>
        {/* Fraunces — loaded once via link (next/font doesn't cover opsz variable axis) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&display=swap"
          rel="stylesheet"
        />

        {/* Web app manifest — brand name + theme colour for PWA / browser signals */}
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/images/kangaro.png" />

        {/* LCP preload — hero image on mobile (most visits) */}
        <link
          rel="preload"
          as="image"
          href="/images/pacific/black/city of angels/city_of_angels_hanger.jpg"
          // @ts-expect-error — fetchpriority is valid HTML but not yet in TS types
          fetchpriority="high"
        />

        {/* Local SEO — Delhi NCR geo signals */}
        <meta name="geo.region" content="IN-DL" />
        <meta name="geo.placename" content="Delhi NCR, India" />
        <meta name="geo.position" content="28.6139;77.2090" />
        <meta name="ICBM" content="28.6139, 77.2090" />

        {/* Organization / ClothingStore — most critical for branded Knowledge Panel */}
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        {/* WebSite + SiteLinksSearchBox — enables search box under site in branded SERP */}
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-ink">
        {/* Google Analytics GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FE13KE3BT4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FE13KE3BT4', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        <Script
          type="module"
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"
          strategy="afterInteractive"
        />
        <CartProvider>
          <QuickAddProvider>
            <div className="sticky top-0 z-[60]">
              <AnnouncementBar />
            </div>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
            <QuickAddModalRoot />
          </QuickAddProvider>
        </CartProvider>
      </body>
    </html>
  );
}
