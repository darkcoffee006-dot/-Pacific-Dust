export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  slug: string;
  image?: string;
  images?: string[];          // additional gallery images
  colors: string[];
  sizes?: string[];           // available sizes
  description?: string;       // long-form editorial description
  shortDesc?: string;         // one-liner for cards
  features?: string[];        // bullet points
  fit?: string;               // e.g. "Oversized Box Fit"
  washCare?: string[];        // wash instructions
  printType?: string;         // "Screen Print" | "DTF" | "Gradient Dye" etc.
  gsm?: number;               // fabric weight
  material?: string;          // e.g. "240 GSM Premium French Terry Cotton"
  tags?: string[];            // for search: ["graphic", "streetwear", etc.]
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  qty: number;
  size: string;
  color: string;
}

export interface LookItem {
  number: string;
  name: string;
  color: string;
  price: number;
}

export interface Testimonial {
  quote: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Collection {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  ctaHref: string;
}

export interface Chapter {
  season: string;
  description: string;
}
