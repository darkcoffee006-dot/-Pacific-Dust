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
              The House · Est. 2024
            </p>
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-light leading-snug text-stone-900 mb-8">
              We don&apos;t chase trends.
            </h2>
            <p className="text-[14px] leading-relaxed text-stone-500 mb-5">
              We build pieces as one builds a reputation — slowly, deliberately,
              without compromise.
            </p>
            <p className="text-[14px] leading-relaxed text-stone-500 mb-5">
              Every tee starts from 240 GSM premium French Terry cotton, sourced
              for its weight, breathability, and structure. Then it&apos;s cut
              oversized, finished with a ribbed crew collar, and printed with
              either high-definition screen print or premium DTF artwork.
            </p>
            <p className="text-[14px] leading-relaxed text-stone-500 mb-10">
              Made in Delhi NCR. Worn everywhere. Built to outlast the hype.
            </p>
            <Link
              href="/about"
              className="text-[11px] tracking-widest uppercase text-stone-900 underline underline-offset-4 hover:text-stone-500 transition-colors"
            >
              Our story
            </Link>
          </div>

          {/* ── Right column ──────────────────────────────────────── */}
          <div className="flex flex-col gap-10">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/pacific/white/dreams/DSCN5454.JPG.jpg.jpeg"
                alt="Pacific Dust studio — Delhi NCR"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>

            <div className="border-l-2 border-stone-900 pl-8">
              <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-3">
                Made With Intent
              </p>
              <p className="text-[clamp(1.8rem,3vw,2.8rem)] font-light leading-none text-stone-900 mb-4">
                One tee.
                <br />
                <em className="italic text-stone-400">No shortcuts.</em>
              </p>
              <p className="text-[13px] leading-relaxed text-stone-500 mb-6">
                Every Pacific Dust tee goes through multiple rounds of sampling
                and quality checks before it reaches you — because we only release
                what meets our own standard.
              </p>
              <Link
                href="/about"
                className="text-[11px] tracking-widest uppercase text-stone-900 underline underline-offset-4 hover:text-stone-500 transition-colors"
              >
                Read more
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-6 border-t border-stone-100">
              {[
                "240 GSM French Terry",
                "Premium Screen Print",
                "DTF Artwork",
                "Oversized Box Fit",
                "Made in Delhi NCR",
                "Pan-India Delivery",
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
