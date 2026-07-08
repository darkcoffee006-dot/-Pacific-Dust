import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { catalog } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import Link from "next/link";

const SITE_URL = "https://pacificdust.in";

/* ── Category display config ────────────────────────────────── */
const CATEGORY_META: Record<string, { title: string; heading: string; description: string }> = {
  "t-shirts": {
    title: "Buy Oversized T-Shirts Online India — 240 GSM Graphic Tees",
    heading: "Oversized T-Shirts",
    description:
      "Buy premium 240 GSM oversized graphic T-shirts online in India. Pacific Dust Drop 01 — City of Angels, Dreams, Unbothered & Gradient Soul. Oversized box fit, screen print & DTF artwork. Pan-India delivery. Free shipping above Rs. 2000.",
  },
  outerwear: {
    title: "Outerwear — Pacific Dust",
    heading: "Outerwear",
    description:
      "Pacific Dust outerwear. Premium construction, considered silhouettes. Pan-India delivery.",
  },
  knitwear: {
    title: "Knitwear — Pacific Dust",
    heading: "Knitwear",
    description:
      "Pacific Dust knitwear. Natural fibres, relaxed construction. Pan-India delivery.",
  },
};

export async function generateStaticParams() {
  return Object.keys(CATEGORY_META).map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const meta = CATEGORY_META[category.toLowerCase()];
  if (!meta) return { title: "Category Not Found" };

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `${SITE_URL}/category/${category}` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}/category/${category}`,
      images: [
        {
          url: "/images/pacific/black/city of angels/DSCN5554.JPG.jpg.jpeg",
          width: 1200,
          height: 630,
          alt: `${meta.heading} — Pacific Dust`,
        },
      ],
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const meta = CATEGORY_META[category.toLowerCase()];
  if (!meta) notFound();

  // Match products by category — normalise slug → display label
  const categoryLabel = category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const products = catalog.filter(
    (p) => p.category.toLowerCase() === categoryLabel.toLowerCase()
  );

  /* ── CollectionPage JSON-LD ─────────────────────────────── */
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: meta.heading,
    description: meta.description,
    url: `${SITE_URL}/category/${category}`,
    hasPart: products.map((p) => ({
      "@type": "Product",
      name: p.name,
      url: `${SITE_URL}/products/${p.slug}`,
      offers: {
        "@type": "Offer",
        price: p.price,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
    })),
  };

  return (
    <main className="pt-40 pb-24">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Header */}
      <header className="px-6 md:px-10 pb-16 border-b border-line">
        <nav className="text-xs text-ink-muted tracking-[0.18em] uppercase mb-8">
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-ink transition-colors">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{meta.heading}</span>
        </nav>
        <div className="grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <p className="eyebrow">{products.length} piece{products.length !== 1 ? "s" : ""}</p>
            <h1 className="font-display text-6xl md:text-9xl mt-6 leading-[0.9]">
              {meta.heading}
            </h1>
          </div>
          <p className="md:col-span-4 text-ink-muted text-sm leading-relaxed">
            {meta.description.split(".")[0]}.
          </p>
        </div>
      </header>

      {/* Product grid */}
      {products.length > 0 ? (
        <div className="px-6 md:px-10 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-16">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      ) : (
        <div className="px-6 md:px-10 py-32 text-center">
          <p className="font-display text-4xl italic font-light text-ink-muted">
            More pieces coming soon.
          </p>
          <Link href="/shop" className="btn-ink mt-10 inline-flex">
            Shop all pieces
          </Link>
        </div>
      )}

      {/* SEO text block — keyword-rich, human-readable */}
      <section className="px-6 md:px-10 py-16 border-t border-line max-w-3xl">
        <h2 className="font-display text-2xl md:text-3xl">
          Premium Oversized T-Shirts — Made in Delhi NCR
        </h2>
        <p className="mt-4 text-sm text-ink-muted leading-relaxed">
          Pacific Dust oversized tees are crafted from 240 GSM premium French Terry cotton —
          heavy enough to hold structure, breathable enough for Indian summers, and durable
          enough for 50+ washes. Every tee is cut in an oversized box fit, finished with a
          ribbed crew collar, and printed using either high-definition screen print or premium
          DTF (Direct-to-Film) artwork. Made in Delhi NCR, India. Delivering pan-India.
        </p>
        <p className="mt-4 text-sm text-ink-muted leading-relaxed">
          Drop 01 includes four tees — City of Angels (black, screen print), Unbothered (black, DTF),
          Dreams (white, screen print), and Gradient Soul (white, screen print). Sizes S, M, L, XL.
          Free delivery on orders above Rs. 2,000.
        </p>
      </section>
    </main>
  );
}
