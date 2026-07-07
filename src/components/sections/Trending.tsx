import { trending } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";

export default function Trending() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <div className="mb-14">
          <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-3">
            Trending — This Week
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-light text-stone-900">
            Currently
            <br />
            <em className="italic text-stone-400">coveted.</em>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10">
          {trending.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
