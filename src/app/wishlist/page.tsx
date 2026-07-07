import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { newArrivals } from "@/data/products";

export default function Wishlist() {
  const items = newArrivals;
  return (
    <main className="pt-40 px-6 md:px-10 min-h-screen">
      <div className="grid md:grid-cols-2 gap-8 items-end pb-16 border-b border-line">
        <div>
          <p className="eyebrow">Held for later · {items.length}</p>
          <h1 className="font-display text-6xl md:text-9xl mt-6">Wishlist.</h1>
        </div>
        <p className="text-ink-muted md:justify-self-end max-w-sm">A quiet holding room. Save pieces you're considering.</p>
      </div>

      {items.length === 0 ? (
        <div className="py-32 text-center">
          <Heart size={24} className="mx-auto text-ink-muted" strokeWidth={1.25}/>
          <p className="font-display text-3xl mt-6">Nothing saved yet.</p>
          <Link href="/shop" className="btn-ink mt-8 inline-flex">Discover the collection</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-12 mt-16">
          {items.map(p => (
            <div key={p.id} className="grid grid-cols-[160px_1fr] md:grid-cols-[220px_1fr] gap-6 py-6 border-b border-line">
              <Link href={`/products/${p.slug}`}>
                <div className="relative w-full aspect-[4/5] bg-surface overflow-hidden">
                  {p.image && <Image src={p.image} alt={p.name} fill sizes="(max-width: 768px) 100vw, 220px" className="object-cover"/>}
                </div>
              </Link>
              <div className="flex flex-col justify-between">
                <div>
                  <p className="eyebrow">{p.category}</p>
                  <Link href={`/products/${p.slug}`}><h3 className="font-display text-3xl mt-3">{p.name}</h3></Link>
                  <p className="text-xs text-ink-muted mt-2">{p.colors.join(" · ")}</p>
                  <p className="text-sm mt-4">₹{p.price.toLocaleString("en-IN")}</p>
                </div>
                <div className="flex gap-3 mt-6">
                  <Link href={`/products/${p.slug}`} className="btn-ink !py-3 !px-5">Add to bag</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
