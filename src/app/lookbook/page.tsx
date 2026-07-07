import Image from "next/image";
import Link from "next/link";
import { catalog } from "@/data/products";
import { allLookbookShots, lookbookChapters, lookbookHero } from "@/data/lookbook";

function productLinks(slugs: string[]) {
  const unique = [...new Set(slugs)];
  return unique
    .map((slug) => catalog.find((p) => p.slug === slug))
    .filter(Boolean);
}

export default function Lookbook() {
  const collectionChapter = lookbookChapters[0];
  const cityChapter = lookbookChapters[1];
  const unbotheredChapter = lookbookChapters[2];
  const whiteChapter = lookbookChapters[3];

  return (
    <main>
      {/* ── Hero — full collection group shot ─────────────────────── */}
      <section className="pt-32 px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-4">
            <p className="eyebrow">Drop 01 — AW 26</p>
            <h1 className="font-display text-6xl md:text-9xl mt-6 leading-[0.88]">
              Pacific<br />
              <em className="italic font-light">— a lookbook.</em>
            </h1>
            <p className="mt-8 text-sm text-ink-muted max-w-sm leading-relaxed">
              Four tees. Four stories. Photographed across Faridabad and Delhi — collection
              sessions, studio days, and the quiet in between.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {catalog.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="text-[10px] tracking-[0.2em] uppercase border border-line px-4 py-2 hover:bg-ink hover:text-background transition-colors"
                >
                  {p.name.replace(" Tee", "")}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:col-span-8 relative aspect-[4/5]">
            <Image
              src={lookbookHero.src}
              alt={lookbookHero.alt}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover"
              priority
            />
            <p className="absolute bottom-4 left-4 eyebrow text-background/80">
              {lookbookHero.caption}
            </p>
          </div>
        </div>
      </section>

      {/* ── Collection chapter — multi-person mix ─────────────────── */}
      <section className="mt-32 px-6 md:px-10">
        <div className="max-w-5xl">
          <p className="eyebrow">Chapter {collectionChapter.number}</p>
          <h2 className="font-display text-4xl md:text-6xl mt-4">{collectionChapter.title}</h2>
          <p className="text-sm text-ink-muted mt-3">{collectionChapter.subtitle}</p>
        </div>
      </section>

      <section className="mt-16 relative aspect-[21/9] w-full">
        <Image
          src={collectionChapter.shots[0].src}
          alt={collectionChapter.shots[0].alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </section>

      <section className="mt-32 grid md:grid-cols-12 gap-6 px-6 md:px-10">
        <div className="md:col-span-5 flex items-end">
          <div>
            <p className="eyebrow">{collectionChapter.shots[1].caption}</p>
            <p className="font-display text-3xl md:text-4xl mt-4 italic font-light max-w-md">
              &ldquo;{collectionChapter.quote}&rdquo;
            </p>
          </div>
        </div>
        <div className="md:col-span-7 relative aspect-[4/3]">
          <Image
            src={collectionChapter.shots[1].src}
            alt={collectionChapter.shots[1].alt}
            fill
            sizes="(max-width: 768px) 100vw, 58vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* ── City of Angels — black duo shots ──────────────────────── */}
      <section className="py-24 px-6 md:px-10 max-w-5xl mx-auto text-center mt-32 border-t border-line">
        <p className="eyebrow">Chapter {cityChapter.number} — {cityChapter.subtitle}</p>
        <h2 className="font-display text-4xl md:text-6xl mt-6">{cityChapter.title}</h2>
        <p className="mt-6 text-sm text-ink-muted max-w-lg mx-auto italic">
          {cityChapter.quote}
        </p>
        <Link
          href="/products/city-of-angels-tee"
          className="inline-block mt-8 text-[11px] tracking-widest uppercase link-underline"
        >
          Shop City of Angels →
        </Link>
      </section>

      <section className="grid md:grid-cols-2 gap-4 md:gap-6 px-6 md:px-10 pb-20">
        {cityChapter.shots.map((shot) => (
          <div key={shot.src} className={`relative ${shot.aspect}`}>
            <Image src={shot.src} alt={shot.alt} fill sizes="50vw" className="object-cover" />
            <p className="absolute bottom-4 left-4 eyebrow text-background/80">{shot.caption}</p>
          </div>
        ))}
      </section>

      {/* ── Unbothered — black duo editorial ──────────────────────── */}
      <section className="py-24 px-6 md:px-10 max-w-5xl mx-auto">
        <p className="eyebrow">Chapter {unbotheredChapter.number} — {unbotheredChapter.subtitle}</p>
        <p className="font-display text-3xl md:text-5xl mt-8 leading-[1.15] max-w-3xl">
          <em className="italic font-light">{unbotheredChapter.title}</em> — {unbotheredChapter.quote}
        </p>
        <Link
          href="/products/unbothered-tee"
          className="inline-block mt-8 text-[11px] tracking-widest uppercase link-underline"
        >
          Shop Unbothered →
        </Link>
      </section>

      <section className="grid md:grid-cols-6 gap-4 md:gap-6 px-6 md:px-10 pb-20">
        <div className="md:col-span-4 relative aspect-[16/10]">
          <Image
            src={unbotheredChapter.shots[0].src}
            alt={unbotheredChapter.shots[0].alt}
            fill
            sizes="66vw"
            className="object-cover"
          />
        </div>
        <div className="md:col-span-2 relative aspect-[3/4] mt-12">
          <Image
            src={unbotheredChapter.shots[1].src}
            alt={unbotheredChapter.shots[1].alt}
            fill
            sizes="33vw"
            className="object-cover"
          />
        </div>
        <div className="md:col-span-3 relative aspect-[16/9]">
          <Image
            src={unbotheredChapter.shots[2].src}
            alt={unbotheredChapter.shots[2].alt}
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
        <div className="md:col-span-3 relative aspect-[16/9]">
          <Image
            src={unbotheredChapter.shots[3].src}
            alt={unbotheredChapter.shots[3].alt}
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* ── White chapter — Dreams & Gradient Soul ────────────────── */}
      <section className="py-24 px-6 md:px-10 max-w-5xl mx-auto text-center border-t border-line">
        <p className="eyebrow">Chapter {whiteChapter.number} — {whiteChapter.subtitle}</p>
        <h2 className="font-display text-4xl md:text-6xl mt-6 italic font-light">
          Light holds, light lets go.
        </h2>
        <p className="mt-6 text-sm text-ink-muted max-w-xl mx-auto">
          {whiteChapter.quote}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/products/dreams-tee" className="text-[11px] tracking-widest uppercase link-underline">
            Shop Dreams →
          </Link>
          <Link href="/products/gradient-soul-tee" className="text-[11px] tracking-widest uppercase link-underline">
            Shop Gradient Soul →
          </Link>
        </div>
      </section>

      <section className="relative aspect-[21/9] w-full">
        <Image
          src={whiteChapter.shots[0].src}
          alt={whiteChapter.shots[0].alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </section>

      <section className="grid md:grid-cols-3 gap-4 md:gap-6 px-6 md:px-10 py-20">
        {whiteChapter.shots.slice(1).map((shot) => (
          <div key={shot.src} className={`relative ${shot.aspect}`}>
            <Image src={shot.src} alt={shot.alt} fill sizes="33vw" className="object-cover" />
            <p className="absolute bottom-4 left-4 eyebrow text-background/80">{shot.caption}</p>
          </div>
        ))}
      </section>

      {/* ── Shop the looks grid ───────────────────────────────────── */}
      <section className="px-6 md:px-10 py-20 border-t border-line">
        <p className="eyebrow mb-10">Shop the looks</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {catalog.map((p) => (
            <Link key={p.slug} href={`/products/${p.slug}`} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-surface">
                <Image
                  src={p.image!}
                  alt={p.name}
                  fill
                  sizes="25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 font-display text-lg">{p.name}</p>
              <p className="text-xs text-ink-muted mt-1">₹{p.price.toLocaleString("en-IN")}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Credits ───────────────────────────────────────────────── */}
      <section className="grid md:grid-cols-2 gap-16 px-6 md:px-10 max-w-5xl mx-auto pb-32">
        <p className="eyebrow">Credits</p>
        <div className="text-sm text-ink-muted space-y-3 leading-relaxed">
          <p>Creative direction · Studio Pacific Dust</p>
          <p>Photography · Team Pacific Dust</p>
          <p>Location · Faridabad &amp; Delhi, September 2026</p>
          <p>{allLookbookShots.length} editorial frames · {lookbookChapters.length + 1} chapters</p>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-20 text-center border-t border-ink/10">
        <p className="eyebrow mb-6">Explore the collection</p>
        <Link
          href="/shop"
          className="inline-block text-[11px] tracking-widest uppercase border border-ink px-10 py-4 hover:bg-ink hover:text-paper transition-colors"
        >
          Shop now
        </Link>
      </section>
    </main>
  );
}
