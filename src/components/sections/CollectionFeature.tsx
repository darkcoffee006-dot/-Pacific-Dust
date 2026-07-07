import Image from "next/image";
import Link from "next/link";

export default function CollectionFeature() {
  return (
    <section className="bg-stone-900 text-stone-100 py-20 md:py-28 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* ── Text ──────────────────────────────────────────────── */}
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-stone-500 mb-6">
              Collection N°04 — Brume
            </p>
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-none mb-6">
              The softness
              <br />
              <em className="italic text-stone-400">of stone.</em>
            </h2>
            <p className="text-[14px] leading-relaxed text-stone-400 max-w-sm mb-10">
              Brume is a study in weight and quiet — twelve pieces cut from virgin
              wool, undyed cashmere and heavy Portuguese loopback cotton. Every
              seam considered, nothing left ornamental.
            </p>
            <Link
              href="/collections/brume"
              className="inline-block text-[11px] tracking-widest uppercase text-stone-100 border border-stone-700 px-8 py-4 hover:bg-stone-100 hover:text-stone-900 transition-colors"
            >
              Enter Brume
            </Link>
          </div>

          {/* ── Image ─────────────────────────────────────────────── */}
          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/lookbook-1-C15adsYr.jpg.jpeg"
                alt="Collection N°04 — Brume editorial"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            {/* Floating label */}
            <div className="absolute bottom-6 left-6 bg-stone-900/80 backdrop-blur-sm px-4 py-3">
              <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400">
                Chapter One
              </p>
              <p className="text-[12px] text-stone-200 mt-1">
                Foundational outerwear, in three tones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
