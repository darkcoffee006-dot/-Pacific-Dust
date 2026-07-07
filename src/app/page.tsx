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
