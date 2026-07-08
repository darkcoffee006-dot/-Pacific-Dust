import type { MetadataRoute } from "next";
import { catalog } from "@/data/products";

const SITE_URL = "https://pacificdust.co.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  /* ── Static pages ─────────────────────────────────────────── */
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL,                      lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE_URL}/shop`,            lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE_URL}/collections`,     lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/lookbook`,        lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about`,           lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/journal`,         lastModified: now, changeFrequency: "weekly",  priority: 0.6 },
    { url: `${SITE_URL}/contact`,         lastModified: now, changeFrequency: "yearly",  priority: 0.5 },
    { url: `${SITE_URL}/faq`,             lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/category/t-shirts`,    lastModified: now, changeFrequency: "weekly",  priority: 0.75 },
    { url: `${SITE_URL}/category/outerwear`,   lastModified: now, changeFrequency: "monthly", priority: 0.5  },
    { url: `${SITE_URL}/category/knitwear`,    lastModified: now, changeFrequency: "monthly", priority: 0.5  },
  ];

  /* ── Product pages ────────────────────────────────────────── */
  const productPages: MetadataRoute.Sitemap = catalog.map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticPages, ...productPages];
}
