import Image from "next/image";
import Link from "next/link";

export default function HouseStory() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* ── Text ──────────────────────────────────────────────── */}
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-6">
              The House · Since 2019
            </p>
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-light leading-snug text-stone-900 mb-8">
              We do not chase seasons.
            </h2>
            <p className="text-[14px] leading-relaxed text-stone-500 mb-5">
              We build a wardrobe as one builds a room — with air, with weight,
              with time.
            </p>
            <p className="text-[14px] leading-relaxed text-stone-500 mb-5">
              Cut in ateliers across Northern Italy and Portugal, from mills that
              have supplied Europe's most exacting houses for six generations.
            </p>
            <p className="text-[14px] leading-relaxed text-stone-500 mb-10">
              We work with virgin wool, undyed cashmere, Egyptian cotton and
              Japanese denim — always natural, always traceable. Fewer garments,
              made more slowly. Each piece is designed to sit inside your wardrobe
              for a decade, not a season.
            </p>
            <Link
              href="/about"
              className="text-[11px] tracking-widest uppercase text-stone-900 underline underline-offset-4 hover:text-stone-500 transition-colors"
            >
              Read our philosophy
            </Link>
          </div>

          {/* ── Right column ──────────────────────────────────────── */}
          <div className="flex flex-col gap-10">
            {/* Studio image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/studio-DwVjruef.jpg.jpeg"
                alt="Light through the atelier — natural materials"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>

            {/* Atelier callout */}
            <div className="border-l-2 border-stone-900 pl-8">
              <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-3">
                Made Slowly
              </p>
              <p className="text-[clamp(1.8rem,3vw,2.8rem)] font-light leading-none text-stone-900 mb-4">
                Fifty pairs
                <br />
                <em className="italic text-stone-400">of hands.</em>
                <br />
                One garment.
              </p>
              <p className="text-[13px] leading-relaxed text-stone-500 mb-6">
                Every Monolith Overcoat passes through fifty hands over three
                weeks — from loom to lining to the final press.
              </p>
              <Link
                href="/about"
                className="text-[11px] tracking-widest uppercase text-stone-900 underline underline-offset-4 hover:text-stone-500 transition-colors"
              >
                Inside the atelier
              </Link>
            </div>

            {/* Material tags */}
            <div className="grid grid-cols-2 gap-3 pt-6 border-t border-stone-100">
              {[
                "Virgin Wool",
                "Undyed Cashmere",
                "Egyptian Cotton",
                "Japanese Denim",
                "Portuguese Loopback",
                "Traceable Origin",
              ].map((mat) => (
                <div key={mat} className="flex items-center gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-stone-400 shrink-0" />
                  <span className="text-[12px] text-stone-500">{mat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
