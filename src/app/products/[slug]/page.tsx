import { newArrivals, trending } from "@/data/products";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/sections/ProductDetail";

const all = [...newArrivals, ...trending].filter(
  (p, idx, arr) => arr.findIndex(x => x.slug === p.slug) === idx
);

export function generateStaticParams() {
  return all.map(p => ({ slug: p.slug }));
}

export const dynamicParams = true;

// Next.js 16: params is a Promise — must be awaited
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = all.find(p => p.slug === slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
