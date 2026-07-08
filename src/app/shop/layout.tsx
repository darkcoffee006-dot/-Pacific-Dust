import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop — All Pieces",
  description:
    "Shop all Pacific Dust Drop 01 tees — City of Angels, Dreams, Unbothered, Gradient Soul. 240 GSM French Terry. Pan-India delivery.",
  alternates: { canonical: "https://pacificdust.in/shop" },
  openGraph: {
    title: "Pacific Dust Shop — Drop 01",
    description:
      "City of Angels, Dreams, Unbothered, Gradient Soul. 240 GSM French Terry oversized tees. Pan-India delivery.",
    url: "https://pacificdust.in/shop",
    images: [
      {
        url: "/images/pacific/black/city of angels/DSCN5554.JPG.jpg.jpeg",
        width: 1200,
        height: 630,
        alt: "Pacific Dust Drop 01 — all tees",
      },
    ],
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
