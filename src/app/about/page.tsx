import Image from "next/image";
import Link from "next/link";

/* ── Stat card ────────────────────────────────────────────────── */
function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="border-t border-line pt-6">
      <p className="font-display text-5xl md:text-7xl">{n}</p>
      <p className="eyebrow mt-3">{label}</p>
    </div>
  );
}

export default function About() {
  return (
    <main className="overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════
          HERO — dark full-bleed, giant manifesto headline
      ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] bg-ink flex flex-col justify-end overflow-hidden">
        <Image
          src="/images/pacific/white/DSCN5779.JPG.jpg.jpeg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30"
          priority
        />
        {/* Diagonal color wash */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(201,168,76,0.15) 0%, transparent 60%, rgba(28,25,23,0.9) 100%)",
          }}
        />

        <div className="relative z-10 px-6 md:px-10 pb-16 md:pb-24 pt-40">
          <p className="eyebrow text-background/60">Pacific Dust · Est. Faridabad, 2024</p>
          <h1
            className="mt-6 font-display leading-[0.88] text-background"
            style={{ fontSize: "clamp(3.5rem, 10vw, 10rem)" }}
          >
            For those who<br />
            <em
              className="italic"
              style={{ color: "#C9A84C" }}
            >
              refuse
            </em>{" "}
            to settle.
          </h1>

          {/* Stats strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-background/15 pt-12">
            <Stat n="240"  label="GSM French Terry Cotton" />
            <Stat n="01"   label="Year of R&D before drop 1" />
            <Stat n="5+"   label="Drops and counting" />
            <Stat n="NCR"  label="Delhi · Gurgaon · Noida · Faridabad" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SPLIT — brand manifesto
      ══════════════════════════════════════════════════════ */}
      <section className="grid md:grid-cols-2 min-h-[70vh]">
        {/* Left — large quote */}
        <div className="bg-[#f2ede0] flex items-center px-8 md:px-16 py-20">
          <div>
            <p className="eyebrow text-[#C9A84C]">The Origin</p>
            <p
              className="font-display mt-8 leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              "What started as two friends with a vision became an obsession with creating pieces that look premium, feel premium, and live beyond trends."
            </p>
            <div className="mt-10 w-12 h-px bg-[#C9A84C]" />
            <p className="mt-4 text-xs tracking-[0.22em] uppercase text-ink-muted">— Pacific Dust, Faridabad</p>
          </div>
        </div>

        {/* Right — image */}
        <div className="relative min-h-[400px]">
          <Image
            src="/images/pacific/black/DSCN5671.JPG.jpg.jpeg"
            alt=""
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          MARQUEE — mindset statement
      ══════════════════════════════════════════════════════ */}
      <div className="bg-[#C9A84C] py-5 overflow-hidden select-none">
        <div
          className="flex whitespace-nowrap gap-0"
          style={{ animation: "marquee 18s linear infinite" }}
        >
          {Array(6).fill("NEVER SATISFIED · ALWAYS BECOMING · PREMIUM OR NOTHING · ").map((t, i) => (
            <span
              key={i}
              className="font-display text-2xl md:text-4xl italic text-white/90 shrink-0 px-8"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          STORY — 3 acts
      ══════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 md:px-10 max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-12 gap-y-20">

          {/* Act 1 */}
          <div className="md:col-span-5 md:col-start-1 md:sticky md:top-32 md:self-start">
            <span className="font-display text-[8rem] text-ink/[0.06] leading-none select-none">01</span>
            <h2 className="font-display text-4xl md:text-5xl -mt-6 relative z-10">
              The idea was simple.<br />
              <em className="italic font-light text-ink-muted">The execution, obsessive.</em>
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 space-y-6 text-ink-muted leading-[1.9]">
            <p>
              Pacific Dust exists for the people who refuse to settle. We were
              built from the idea that premium streetwear shouldn't belong to a
              select few. The culture has always inspired us — the silhouettes,
              the graphics, the attitude, the obsession with detail — but we
              believed it could be experienced without sacrificing quality or
              authenticity.
            </p>
            <p>
              For almost a year, we researched, sampled, redesigned, and rebuilt
              everything before creating our first drop. Every garment exists
              because we refused to release anything that didn't meet our own
              standards.
            </p>
          </div>

          {/* Act 2 — image break */}
          <div className="md:col-span-12 relative aspect-[16/7] overflow-hidden">
            <Image
              src="/images/pacific/white/DSCN5784.JPG.jpg.jpeg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p
                className="font-display text-white/90 text-center leading-tight"
                style={{ fontSize: "clamp(2rem, 6vw, 7rem)" }}
              >
                Built from the streets.<br />
                <em className="italic font-light opacity-60">Worn beyond them.</em>
              </p>
            </div>
          </div>

          {/* Act 3 */}
          <div className="md:col-span-5 md:col-start-1 md:sticky md:top-32 md:self-start">
            <span className="font-display text-[8rem] text-ink/[0.06] leading-none select-none">02</span>
            <h2 className="font-display text-4xl md:text-5xl -mt-6 relative z-10">
              Rooted in culture.<br />
              <em className="italic font-light text-ink-muted">Defined by none.</em>
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 space-y-6 text-ink-muted leading-[1.9]">
            <p>
              Pacific Dust is rooted in street culture but isn't defined by it.
              We take inspiration from global movements, reinterpret them through
              our own perspective, and bring them to a community that values
              individuality over hype.
            </p>
            <p>
              We create garments for those who appreciate clean aesthetics,
              thoughtful design, and effortless confidence. Behind every
              collection is the same mindset that started it all — the hunger
              to keep going when people doubt you.
            </p>
            <p>
              To improve when others become comfortable. To build something
              lasting instead of chasing temporary attention.
            </p>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          DARK SECTION — never satisfied
      ══════════════════════════════════════════════════════ */}
      <section className="bg-ink text-background py-28 px-6 md:px-10">
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="eyebrow text-background/50">The Mindset</p>
            <h2
              className="font-display mt-6 leading-[0.95]"
              style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}
            >
              We're never<br />
              <em className="italic" style={{ color: "#C9A84C" }}>satisfied.</em>
            </h2>
            <p className="mt-8 text-background/70 leading-relaxed max-w-md">
              Every drop is another opportunity to push further, design better,
              and raise our own standard. Pacific Dust isn't just what you wear.
              It's the mindset of always becoming more than you were yesterday.
            </p>
            <Link href="/shop" className="btn-ghost mt-10 inline-flex !border-background/30 !text-background hover:!bg-background hover:!text-ink">
              Shop the collection →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { n:"240 GSM", label:"Premium French Terry" },
              { n:"Box Fit", label:"Oversized silhouette" },
              { n:"DTF + Screen", label:"Print techniques" },
              { n:"Delhi NCR", label:"Delivery zone" },
            ].map(c => (
              <div key={c.n} className="border border-background/15 p-6 hover:border-[#C9A84C] transition-colors">
                <p className="font-display text-2xl">{c.n}</p>
                <p className="eyebrow text-background/40 mt-3">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TIMELINE
      ══════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 md:px-10 bg-surface">
        <div className="max-w-screen-xl mx-auto">
          <p className="eyebrow">A Short Chronology</p>
          <div className="mt-14 relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-[200px] top-0 bottom-0 w-px bg-line" />
            <div className="space-y-0 divide-y divide-line border-y border-line">
              {[
                { y:"2024",      t:"Founded in Faridabad. Spent the year sampling, redesigning, and rebuilding before our first drop. Two friends. One obsession." },
                { y:"Early 2025",t:"First drop released exclusively through WhatsApp. Sold out. The standard was set." },
                { y:"2025",      t:"Expanded the studio. New silhouettes. Introduced DTF printing for sharper, more detailed artwork." },
                { y:"2026",      t:"Multiple drops. Growing community. Still delivering personally across Delhi NCR and Faridabad. Still never satisfied." },
              ].map(({ y, t }) => (
                <div key={y} className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-16 py-10 items-start group">
                  <div className="flex items-center gap-4">
                    <p className="font-display text-2xl md:text-3xl">{y}</p>
                    {/* Timeline dot */}
                    <div className="hidden md:block size-2.5 rounded-full bg-[#C9A84C] ml-auto mr-[-5px] relative z-10 group-hover:scale-125 transition-transform" />
                  </div>
                  <p className="text-ink-muted leading-relaxed">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CLOSING — full-bleed image + final CTA
      ══════════════════════════════════════════════════════ */}
      <section className="relative h-[70vh] min-h-[480px]">
        <Image
          src="/images/pacific/white/DSCN5785.JPG.jpg.jpeg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="eyebrow text-background/60">Pacific Dust</p>
          <p
            className="font-display text-background mt-6 leading-tight max-w-4xl italic font-light"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
          >
            "Pacific Dust isn't just what you wear. It's the mindset of always becoming more than you were yesterday."
          </p>
          <Link href="/shop" className="btn-ghost mt-12 !border-white/40 !text-white hover:!bg-white hover:!text-ink">
            Shop now →
          </Link>
        </div>
      </section>

    </main>
  );
}
