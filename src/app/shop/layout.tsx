import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buy Oversized T-Shirts Online India — Pacific Dust Shop",
  description:
    "Buy premium 240 GSM oversized graphic tees online from Pacific Dust. City of Angels, Dreams, Unbothered & Gradient Soul. Made in Delhi NCR. Free delivery above Rs. 2000. Sizes S, M, L, XL.",
  alternates: { canonical: "https://pacificdust.co.in/shop" },
  openGraph: {
    title: "Pacific Dust Shop — Buy Oversized T-Shirts Online India",
    description:
      "240 GSM French Terry oversized graphic tees. City of Angels, Dreams, Unbothered & Gradient Soul. Pan-India delivery. Free shipping above Rs. 2000.",
    url: "https://pacificdust.co.in/shop",
    images: [
      {
        url: "/images/pacific/black/city of angels/DSCN5554.JPG.jpg.jpeg",
        width: 1200,
        height: 630,
        alt: "Pacific Dust — Buy Oversized Graphic Tees Online India",
      },
    ],
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
