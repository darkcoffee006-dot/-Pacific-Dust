import { allProducts } from "@/data/products";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/sections/ProductDetail";

export function generateStaticParams() {
  return allProducts.map(p => ({ slug: p.slug }));
}

export const dynamicParams = true;

// Next.js 16: params is a Promise — must be awaited
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = allProducts.find(p => p.slug === slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
