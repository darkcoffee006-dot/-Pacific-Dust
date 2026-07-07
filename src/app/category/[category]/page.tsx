import Image from "next/image";
import { newArrivals, trending } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";

const all = [...newArrivals, ...trending].filter(
  (p, idx, arr) => arr.findIndex(x => x.slug === p.slug) === idx
);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default async function Category({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const filtered = all.filter(p => p.category.toLowerCase() === category.toLowerCase());
  const list = filtered.length ? filtered : all;

  return (
    <main>
      <section className="relative h-[70vh] min-h-[500px] pt-24">
        <Image src="/images/campaign-Bg10tBFF.jpg.jpeg" alt="" fill sizes="100vw" className="object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40"/>
        <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-16 text-background">
          <p className="eyebrow text-background/70">The Wardrobe · {list.length} pieces</p>
          <h1 className="font-display text-7xl md:text-[10rem] leading-[0.88] mt-4 italic font-light">{cap(category)}.</h1>
        </div>
      </section>

      <section className="px-6 md:px-10 py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Notes on the category</p>
          <p className="font-display text-2xl md:text-3xl mt-6 leading-relaxed">Cut long, worn loose. Every piece engineered to fall in weight — to shape the body without holding it.</p>
        </div>
        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-16">
          {list.map(p => <ProductCard key={p.id} product={p}/>)}
        </div>
      </section>
    </main>
  );
}
