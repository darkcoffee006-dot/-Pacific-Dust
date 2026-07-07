import Image from "next/image";
import Link from "next/link";
import { lookItems } from "@/data/site";

export default function ShopTheLook() {
  return (
    <section className="bg-stone-50 py-20 md:py-28">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-14">
          Shop The Look
        </p>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">

          {/* ── Editorial images ──────────────────────────────────── */}
          <div className="relative grid grid-cols-2 gap-3">
            {/* Main tall image */}
            <div className="relative col-span-1 row-span-2 aspect-[2/3] overflow-hidden">
              <Image
                src="/images/lookbook-1-C15adsYr.jpg.jpeg"
                alt="Look 07 — Porto, main shot"
                fill
                sizes="(max-width: 768px) 45vw, 25vw"
                className="object-cover object-top"
              />
            </div>
            {/* Secondary image */}
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/images/lookbook-2-DhQuyHOI.jpg.jpeg"
                alt="Look 07 — Porto, detail shot"
                fill
                sizes="(max-width: 768px) 45vw, 25vw"
                className="object-cover object-center"
              />
            </div>
            {/* Colour swatch / label tile */}
            <div className="bg-stone-200 aspect-square flex items-center justify-center p-4">
              <p className="text-[10px] tracking-[0.25em] uppercase text-stone-500 text-center leading-relaxed">
                Look 07
                <br />
                Porto
              </p>
            </div>
          </div>

          {/* ── Item list ─────────────────────────────────────────── */}
          <div className="flex flex-col justify-center gap-8 md:py-6">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-3">
                Look 07 — Porto
              </p>
              <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-light text-stone-900">
                The complete
                <br />
                <em className="italic text-stone-400">look.</em>
              </h2>
            </div>

            <ul className="divide-y divide-stone-200">
              {lookItems.map((item) => (
                <li
                  key={item.number}
                  className="flex items-center justify-between py-5 group"
                >
                  <div className="flex items-center gap-5">
                    <span className="text-[11px] tracking-widest text-stone-300 w-5 shrink-0">
                      {item.number}
                    </span>
                    <div>
                      <p className="text-[13px] text-stone-900 group-hover:text-stone-500 transition-colors">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-stone-400 mt-0.5">
                        {item.color}
                      </p>
                    </div>
                  </div>
                  <span className="text-[13px] text-stone-900">
                    €{item.price.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/lookbook"
              className="inline-block w-fit text-[11px] tracking-widest uppercase text-stone-900 border border-stone-900 px-8 py-4 hover:bg-stone-900 hover:text-white transition-colors"
            >
              Shop this look
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
