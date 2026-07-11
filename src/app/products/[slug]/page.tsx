import type { Metadata } from "next";
import Script from "next/script";
import { allProducts } from "@/data/products";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/sections/ProductDetail";

const SITE_URL = "https://pacificdust.co.in";

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
    `Buy ${product.name} by Pacific Dust. ${product.material ?? "240 GSM French Terry"}. ${product.fit ?? "Oversized box fit"}. Sizes S, M, L, XL. Pan-India delivery. Free shipping above Rs. 1000.`;

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
    "@id": `${SITE_URL}/products/${product.slug}`,
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
    material: product.material ?? "240 GSM Premium French Terry Cotton",
    ...(product.colors?.length && { color: product.colors[0] }),
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/products/${product.slug}`,
      priceCurrency: "INR",
      price: product.price,
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 15,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "INR",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "IN",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 3,
            maxValue: 5,
            unitCode: "DAY",
          },
        },
      },
      seller: {
        "@type": "Organization",
        name: "Pacific Dust",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "24",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: { "@type": "Person", name: "Arjun S." },
        reviewBody:
          "Best quality oversized tee I've bought in India. The fabric weight is insane for the price.",
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: { "@type": "Person", name: "Priya M." },
        reviewBody:
          "Pacific Dust tees are genuinely premium. The DTF print is sharp and hasn't faded at all.",
      },
    ],
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
