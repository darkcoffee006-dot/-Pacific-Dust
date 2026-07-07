import Image from "next/image";
import Link from "next/link";

export default function CampaignBanner() {
  return (
    <section className="relative overflow-hidden">
      {/* ── Full-bleed image ─────────────────────────────────── */}
      <div className="relative aspect-[16/7] md:aspect-[16/6]">
        <Image
          src="/images/campaign-Bg10tBFF.jpg.jpeg"
          alt="Campaign AW26 — Silence is the last luxury"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/60 mb-5">
            Campaign — AW26
          </p>
          <blockquote className="text-[clamp(1.6rem,3.5vw,3rem)] font-light italic text-white max-w-2xl leading-snug">
            &ldquo;Silence is the last luxury.&rdquo;
          </blockquote>
          <Link
            href="/collections"
            className="inline-block mt-9 text-[11px] tracking-widest uppercase text-white border border-white/60 px-8 py-3.5 hover:bg-white hover:text-stone-900 transition-colors"
          >
            View campaign
          </Link>
        </div>
      </div>
    </section>
  );
}
