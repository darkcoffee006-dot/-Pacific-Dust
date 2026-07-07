import Link from "next/link";
import { newArrivals } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";

export default function NewArrivals() {
  return (
    <section id="new-arrivals" className="bg-white py-20 md:py-28">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-3">
              Newly Arrived — 04
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-light leading-tight text-stone-900">
              Considered weights
              <br />
              <em className="italic text-stone-400">for the season ahead.</em>
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-[11px] tracking-widest uppercase text-stone-500 hover:text-stone-900 transition-colors underline-offset-4 hover:underline shrink-0"
          >
            All new →
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
