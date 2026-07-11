import type { NavItem, Testimonial, Chapter } from "@/types";
import { catalog } from "@/data/products";

export const announcementItems = [
  "Now delivering Pan India — Order from anywhere",
  "Drop 01 — Autumn / Winter 26 · Live now",
  "Proudly made in India — 240 GSM French Terry",
  "Free delivery on orders above ₹1,000 across Delhi NCR",
  "Free returns within 15 days — No questions asked",
  "Order via WhatsApp · +91 96436 44455",
];

// Nav matches the screenshot exactly: Shop | Collections | Lookbook | Journal | About
export const navItems: NavItem[] = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "The City of Angels tee is genuinely the best quality tee I've worn. Heavy, structured, perfect oversized fit.",
  },
  {
    quote:
      "Pacific Dust replaced every basic in my wardrobe. The fabric weight alone justifies the price.",
  },
  {
    quote:
      "Ordered the Unbothered tee. The DTF print is insane — crisp, detailed, still perfect after ten washes.",
  },
];

export const chapters: Chapter[] = [
  {
    season: "Autumn / Winter 26",
    description: "Drop 01 — four tees. Black and white.",
  },
  {
    season: "Spring / Summer 27",
    description: "Coming soon.",
  },
  {
    season: "Transitional",
    description: "Between drops. The archive.",
  },
  {
    season: "Archive",
    description: "Past drops, while stocks last.",
  },
];

export const lookItems = catalog.map((p, i) => ({
  number: String(i + 1).padStart(2, "0"),
  name: p.name,
  color: p.colors[0],
  price: p.price,
  originalPrice: p.originalPrice,
  slug: p.slug,
  image: p.image,
}));

export const footerLinks = {
  Wardrobe: [
    { label: "Shop All", href: "/shop" },
    { label: "T-Shirts", href: "/category/t-shirts" },
    { label: "Lookbook", href: "/lookbook" },
    { label: "Collections", href: "/collections" },
  ],
  "The House": [
    { label: "About Us", href: "/about" },
    { label: "Journal", href: "/journal" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ],
  Service: [
    { label: "Shipping & Delivery", href: "/faq#orders" },
    { label: "Returns", href: "/faq#returns" },
    { label: "Size Guide", href: "/faq#sizing" },
    { label: "WhatsApp Us", href: "https://wa.me/919643644455" },
  ],
};
