import type { Metadata } from "next";
import Script from "next/script";
import { allProducts } from "@/data/products";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/sections/ProductDetail";

const SITE_URL = "https://pacificdust.in";

export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = true;

// Next.js 16: params is a Promise — must be awaited
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = allProducts.find((p) => p.slug === slug);
  if (!product) return {};

  const url = `${SITE_URL}/products/${product.slug}`;
  const imageUrl = product.image ?? "/images/pacific/black/city of angels/DSCN5554.JPG.jpg.jpeg";
  const title = `Buy ${product.name} Online — ${product.fit ?? "Oversized Tee"} | Pacific Dust`;
  const description = product.shortDesc ??
    `Buy ${product.name} by Pacific Dust. ${product.material ?? "240 GSM French Terry"}. ${product.fit ?? "Oversized box fit"}. Sizes S, M, L, XL. Pan-India delivery. Free shipping above Rs. 2000.`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: [{ url: imageUrl, width: 900, height: 1200, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = allProducts.find((p) => p.slug === slug);
  if (!product) notFound();

  /* ── Product JSON-LD ──────────────────────────────────────── */
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description:
      product.shortDesc ??
      `${product.name} by Pacific Dust. ${product.material ?? "240 GSM French Terry"}. ${product.fit ?? "Oversized box fit"}.`,
    image: product.images?.length
      ? product.images.map((img) => `${SITE_URL}${img}`)
      : product.image
      ? [`${SITE_URL}${product.image}`]
      : [],
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "Pacific Dust",
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/products/${product.slug}`,
      priceCurrency: "INR",
      price: product.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Pacific Dust",
      },
    },
    material: product.material ?? "240 GSM Premium French Terry Cotton",
    ...(product.colors?.length && { color: product.colors[0] }),
  };

  /* ── BreadcrumbList JSON-LD ───────────────────────────────── */
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${SITE_URL}/shop` },
      {
        "@type": "ListItem",
        position: 3,
        name: product.category,
        item: `${SITE_URL}/category/${product.category.toLowerCase().replace(/\s+/g, "-")}`,
      },
      { "@type": "ListItem", position: 4, name: product.name, item: `${SITE_URL}/products/${product.slug}` },
    ],
  };

  return (
    <>
      <Script
        id={`product-schema-${product.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Script
        id={`breadcrumb-schema-${product.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductDetail product={product} />
    </>
  );
}
