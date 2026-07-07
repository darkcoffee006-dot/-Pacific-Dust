import Link from "next/link";
import { bestSellers } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";

export default function BestSellers() {
  return (
    <section className="bg-stone-50 py-20 md:py-28">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-3">
              Enduring — House Best Sellers
            </p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-light text-stone-900">
              The permanent
              <br />
              <em className="italic text-stone-400">collection.</em>
            </h2>
          </div>
          <Link
            href="/collections/permanent"
            className="text-[11px] tracking-widest uppercase text-stone-500 hover:text-stone-900 transition-colors shrink-0"
          >
            See all →
          </Link>
        </div>

        {/* Grid — 4 columns, show first 4 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
          {bestSellers.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
