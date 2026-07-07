import type { NavItem, Testimonial, Chapter } from "@/types";

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

export const lookItems = [
  { number: "01", name: "Atelier Hoodie", color: "Ivory", price: 340 },
  { number: "02", name: "Monolith Overcoat", color: "Stone", price: 1290 },
  { number: "03", name: "Column Trouser", color: "Cream", price: 420 },
];

export const footerLinks = {
  Wardrobe: [
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Outerwear", href: "/outerwear" },
    { label: "Knitwear", href: "/knitwear" },
    { label: "Trousers", href: "/trousers" },
    { label: "Accessories", href: "/accessories" },
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
