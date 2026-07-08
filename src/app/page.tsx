import type { Metadata } from "next";
import Script from "next/script";
import Hero from "@/components/sections/Hero";
import NewArrivals from "@/components/sections/NewArrivals";
import CategoryBanner from "@/components/sections/CategoryBanner";
import CollectionFeature from "@/components/sections/CollectionFeature";
import CampaignBanner from "@/components/sections/CampaignBanner";
import BestSellers from "@/components/sections/BestSellers";
import HouseStory from "@/components/sections/HouseStory";
import ShopTheLook from "@/components/sections/ShopTheLook";
import Trending from "@/components/sections/Trending";
import Chapters from "@/components/sections/Chapters";
import Testimonials from "@/components/sections/Testimonials";
import Newsletter from "@/components/sections/Newsletter";
import { catalog } from "@/data/products";

const SITE_URL = "https://pacificdust.in";

// ─── Metadata ────────────────────────────────────────────────
// Title leads with brand name so "pacific dust" search resolves here
export const metadata: Metadata = {
  title: "Pacific Dust | Premium Oversized T-Shirts Online India — Drop 01",
  description:
    "Pacific Dust is an Indian streetwear brand making 240 GSM premium oversized graphic tees. City of Angels, Dreams, Unbothered & Gradient Soul. Made in Delhi NCR. Free delivery above Rs. 2000.",
  keywords: [
    "pacific dust",
    "pacific dust clothing india",
    "pacific dust tshirt",
    "buy oversized tshirt india",
    "240 gsm graphic tee",
    "indian streetwear brand",
    "oversized tee delhi ncr",
    "premium tshirt online india",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Pacific Dust | Premium Oversized T-Shirts Online India — Drop 01",
    description:
      "240 GSM French Terry oversized graphic tees by Pacific Dust. City of Angels, Dreams, Unbothered & Gradient Soul. Made in Delhi NCR. Pan-India delivery.",
    url: SITE_URL,
    images: [
      {
        url: "/images/pacific/black/city of angels/DSCN5554.JPG.jpg.jpeg",
        width: 1200,
        height: 630,
        alt: "Pacific Dust — Premium Indian Streetwear Brand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pacific Dust | Premium Oversized T-Shirts Online India",
    description:
      "240 GSM French Terry. Oversized box fit. City of Angels, Dreams, Unbothered & Gradient Soul. Pan-India delivery.",
    images: ["/images/pacific/black/city of angels/DSCN5554.JPG.jpg.jpeg"],
  },
};

// ─── ItemList JSON-LD ─────────────────────────────────────────
// Google uses this to show individual product links directly under
// the brand in search results when someone searches "pacific dust"
const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Pacific Dust — Drop 01 Collection",
  description:
    "Four premium 240 GSM oversized graphic tees by Pacific Dust. Made in Delhi NCR, India.",
  url: SITE_URL,
  numberOfItems: catalog.length,
  itemListElement: catalog.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: p.name,
    url: `${SITE_URL}/products/${p.slug}`,
    image: p.image ? `${SITE_URL}${p.image}` : undefined,
    description: p.shortDesc,
  })),
};

// ─── Page ─────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Script
        id="schema-itemlist"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Hero />
      <NewArrivals />
      <CategoryBanner />
      <CollectionFeature />
      <CampaignBanner />
      <BestSellers />
      <HouseStory />
      <ShopTheLook />
      <Trending />
      <Chapters />
      <Testimonials />
      <Newsletter />
    </>
  );
}
