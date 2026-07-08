import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Buy Premium Oversized T-Shirts Online India — Pacific Dust",
  description:
    "Buy premium 240 GSM oversized graphic tees from Pacific Dust. City of Angels, Dreams, Unbothered & Gradient Soul. Made in Delhi NCR. Free delivery above Rs. 2000. Pan-India shipping.",
  keywords: [
    "pacific dust",
    "buy oversized tshirt india",
    "premium graphic tee india",
    "240 gsm oversized tshirt",
    "streetwear brand india",
    "oversized tee delhi",
    "city of angels tee",
    "buy graphic tshirt online india",
    "indian streetwear brand",
    "premium tshirt delhi ncr",
    "drop 01 streetwear",
    "oversized box fit tshirt",
  ],
  alternates: { canonical: "https://pacificdust.in" },
  openGraph: {
    title: "Buy Premium Oversized T-Shirts Online India — Pacific Dust",
    description:
      "240 GSM French Terry oversized graphic tees. City of Angels, Dreams, Unbothered & Gradient Soul. Made in Delhi NCR. Pan-India delivery.",
    url: "https://pacificdust.in",
    images: [
      {
        url: "/images/pacific/black/city of angels/DSCN5554.JPG.jpg.jpeg",
        width: 1200,
        height: 630,
        alt: "Pacific Dust — Buy Premium Oversized Graphic Tees Online India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Premium Oversized T-Shirts Online India — Pacific Dust",
    description:
      "240 GSM French Terry. Oversized box fit. City of Angels, Dreams, Unbothered & Gradient Soul. Pan-India delivery.",
    images: ["/images/pacific/black/city of angels/DSCN5554.JPG.jpg.jpeg"],
  },
};

export default function HomePage() {
  return (
    <>
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
