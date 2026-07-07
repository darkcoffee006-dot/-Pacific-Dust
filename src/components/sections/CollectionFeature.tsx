import Image from "next/image";
import Link from "next/link";
import { catalog } from "@/data/products";

const featured = catalog[0];

export default function CollectionFeature() {
  return (
    <section className="bg-stone-900 text-stone-100 py-20 md:py-28 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-stone-500 mb-6">
              Drop 01 — AW 26
            </p>
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-none mb-6">
              Four tees.
              <br />
              <em className="italic text-stone-400">One drop.</em>
            </h2>
            <p className="text-[14px] leading-relaxed text-stone-400 max-w-sm mb-10">
              City of Angels, Dreams, Unbothered, and Gradient Soul — each crafted
              from 240 GSM premium French Terry cotton with oversized box fit and
              considered screen print or DTF artwork.
            </p>
            <Link
              href="/shop"
              className="inline-block text-[11px] tracking-widest uppercase text-stone-100 border border-stone-700 px-8 py-4 hover:bg-stone-100 hover:text-stone-900 transition-colors"
            >
              Shop the drop
            </Link>
          </div>

          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={featured.image ?? "/images/pacific/DSCN5501.JPG.jpg.jpeg"}
                alt={featured.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            <div className="absolute bottom-6 left-6 bg-stone-900/80 backdrop-blur-sm px-4 py-3">
              <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400">
                Featured
              </p>
              <p className="text-[12px] text-stone-200 mt-1">{featured.name}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
