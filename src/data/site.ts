import type { NavItem, Testimonial, Chapter } from "@/types";
import { catalog } from "@/data/products";

export const announcementItems = [
  "Complimentary delivery across Delhi NCR & Faridabad",
  "New Arrivals — Autumn / Winter 26",
  "Proudly made in India — Crafted with precision",
  "Now delivering to Delhi · Noida · Gurgaon · Faridabad · Ghaziabad",
  "Free returns within 15 days — No questions asked",
  "Book a private styling session — Delhi NCR only",
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
      "The most beautifully cut coat I've ever owned. It feels like architecture.",
  },
  {
    quote:
      "Pacific Dust has replaced everything in my wardrobe. Quiet, dense, exact.",
  },
  {
    quote:
      "A house that understands restraint. I bought once, I still wear it three winters on.",
  },
];

export const chapters: Chapter[] = [
  {
    season: "Autumn / Winter",
    description: "Twelve pieces. Stone, charcoal, bone.",
  },
  {
    season: "Spring / Summer",
    description: "Linen, cotton, open weave.",
  },
  {
    season: "Transitional",
    description: "Between seasons. Layered and considered.",
  },
  {
    season: "Archive",
    description: "Past chapters, still available.",
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
    { label: "Search", href: "/search" },
  ],
  "The House": [
    { label: "Our Philosophy", href: "/philosophy" },
    { label: "The Atelier", href: "/atelier" },
    { label: "Materials", href: "/materials" },
    { label: "Journal", href: "/journal" },
  ],
  Service: [
    { label: "Shipping", href: "/shipping" },
    { label: "Returns", href: "/returns" },
    { label: "Care Guide", href: "/care" },
    { label: "Contact", href: "/contact" },
  ],
};
