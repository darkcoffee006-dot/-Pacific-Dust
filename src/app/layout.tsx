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

const SITE_URL = "https://pacificdust.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Pacific Dust — Premium Streetwear. Made in Delhi NCR.",
    template: "%s | Pacific Dust",
  },
  description:
    "Pacific Dust makes 240 GSM premium French Terry oversized tees — screen print and DTF artwork. Drop 01 live now. Pan-India delivery.",
  keywords: [
    "pacific dust",
    "streetwear india",
    "oversized tee india",
    "premium tshirt delhi",
    "240 gsm tshirt",
    "city of angels tee",
    "drop 01",
    "indian streetwear brand",
  ],
  authors: [{ name: "Pacific Dust", url: SITE_URL }],
  creator: "Pacific Dust",
  publisher: "Pacific Dust",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Pacific Dust",
    title: "Pacific Dust — Premium Streetwear. Made in Delhi NCR.",
    description:
      "Pacific Dust makes 240 GSM premium French Terry oversized tees — screen print and DTF artwork. Drop 01 live now. Pan-India delivery.",
    images: [
      {
        url: "/images/pacific/black/city of angels/DSCN5554.JPG.jpg.jpeg",
        width: 1200,
        height: 630,
        alt: "Pacific Dust — Drop 01 AW 26",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pacific Dust — Premium Streetwear. Made in Delhi NCR.",
    description:
      "240 GSM French Terry. Oversized box fit. Drop 01 live now. Pan-India delivery.",
    images: ["/images/pacific/black/city of angels/DSCN5554.JPG.jpg.jpeg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: "#1c1917",
  width: "device-width",
  initialScale: 1,
};

/* ── Organization structured data ──────────────────────────── */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: "Pacific Dust",
  url: SITE_URL,
  logo: `${SITE_URL}/images/kangaro.png`,
  description:
    "Pacific Dust makes premium oversized streetwear tees in Delhi NCR, India. 240 GSM French Terry, screen print and DTF artwork.",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Delhi NCR",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-96436-44455",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://www.instagram.com/pacific_dust_",
    "https://wa.me/919643644455",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${geist.variable} ${playfair.variable} h-full antialiased`}>
      <head>
        {/* Fraunces — loaded once via <link> since next/font doesn't cover variable fonts with opsz axis */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&display=swap"
          rel="stylesheet"
        />
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-ink">
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
