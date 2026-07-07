import type { Metadata } from "next";
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

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Pacific Dust — Quiet Luxury, Architecturally Cut",
  description: "Fewer garments, made more slowly. Crafted in India for Delhi NCR & Faridabad.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${playfair.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-ink">
        <Script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js" strategy="afterInteractive" />
        <CartProvider>
          <QuickAddProvider>
            <div className="sticky top-0 z-[60]"><AnnouncementBar /></div>
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
