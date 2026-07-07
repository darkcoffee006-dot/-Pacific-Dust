import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <main>

      {/* ── Hero headline ─────────────────────────────────────── */}
      <section className="pt-40 pb-28 px-6 md:px-10">
        <p className="eyebrow">The House · Est. Faridabad, 2024</p>
        <h1 className="font-display text-[12vw] md:text-[9rem] mt-10 leading-[0.88]">
          For those who<br />
          <em className="italic font-light">refuse to settle.</em>
        </h1>
      </section>

      {/* ── Opening statement ─────────────────────────────────── */}
      <section className="grid md:grid-cols-12 gap-10 px-6 md:px-10 pb-28 items-start">
        <p className="eyebrow md:col-span-3">Who We Are</p>
        <p className="md:col-span-9 font-display text-3xl md:text-5xl leading-[1.15]">
          Pacific Dust exists for the people who refuse to settle.{" "}
          <em className="italic font-light text-ink-muted">
            We were built from the idea that premium streetwear shouldn't
            belong to a select few.
          </em>
        </p>
      </section>

      {/* ── Full-bleed image ──────────────────────────────────── */}
      <div className="relative h-[80vh] w-full">
        <Image
          src="/images/hero-1-Mj2Hbnrp.jpg.jpeg"
          alt="Pacific Dust"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/40" />
        <div className="absolute bottom-10 left-6 md:left-10 text-background">
          <p className="eyebrow text-background/70">The Culture. The Craft.</p>
        </div>
      </div>

      {/* ── Origin story ──────────────────────────────────────── */}
      <section className="py-28 px-6 md:px-10 max-w-screen-lg mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="eyebrow">The Beginning</p>
            <h2 className="font-display text-4xl md:text-6xl mt-6 leading-[0.95]">
              Almost a year of saying{" "}
              <em className="italic font-light text-ink-muted">no</em>{" "}
              before saying yes.
            </h2>
          </div>
          <div className="space-y-5 text-ink-muted leading-[1.9] md:pt-4">
            <p>
              For almost a year, we researched, sampled, redesigned, and rebuilt
              everything before creating our first drop. Every garment exists
              because we refused to release anything that didn't meet our own
              standards.
            </p>
            <p>
              What started as two friends with a vision became an obsession with
              creating pieces that look premium, feel premium, and live beyond
              trends.
            </p>
          </div>
        </div>
      </section>

      {/* ── Philosophy cards ──────────────────────────────────── */}
      <section className="bg-surface py-28 px-6 md:px-10">
        <div className="max-w-screen-lg mx-auto">
          <p className="eyebrow mb-14">What We Stand For</p>
          <div className="grid md:grid-cols-3 gap-px bg-line">
            {[
              {
                n: "01",
                title: "Culture First",
                body: "Pacific Dust is rooted in street culture but isn't defined by it. We take inspiration from global movements, reinterpret them through our own perspective, and bring them to a community that values individuality over hype.",
              },
              {
                n: "02",
                title: "Obsession with Detail",
                body: "The culture has always inspired us — the silhouettes, the graphics, the attitude. We believed it could be experienced without sacrificing quality or authenticity. Every stitch, every print, every wash is deliberate.",
              },
              {
                n: "03",
                title: "Never Satisfied",
                body: "Every drop is another opportunity to push further, design better, and raise our own standard. The hunger to keep going when people doubt you. To improve when others become comfortable.",
              },
            ].map((item) => (
              <div key={item.n} className="bg-surface p-8 md:p-10">
                <p className="font-display text-5xl text-ink/20">{item.n}</p>
                <h3 className="font-display text-2xl mt-6">{item.title}</h3>
                <p className="mt-4 text-ink-muted leading-relaxed text-sm">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Image grid ────────────────────────────────────────── */}
      <section className="grid md:grid-cols-3 gap-4 md:gap-6 px-6 md:px-10 py-28">
        <div className="md:col-span-2 md:row-span-2 relative aspect-[4/3] md:aspect-auto md:min-h-[500px]">
          <Image src="/images/studio-DwVjruef.jpg.jpeg" alt="" fill sizes="(max-width: 768px) 100vw, 66vw" className="object-cover" />
        </div>
        <div className="relative aspect-square">
          <Image src="/images/hero-2-DkoVx-kF.jpg.jpeg" alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        </div>
        <div className="relative aspect-square">
          <Image src="/images/campaign-Bg10tBFF.jpg.jpeg" alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────── */}
      <section className="bg-surface py-28 px-6 md:px-10">
        <div className="max-w-screen-lg mx-auto">
          <p className="eyebrow mb-14">A Short Chronology</p>
          <div className="divide-y divide-line border-y border-line">
            {[
              ["2024", "Founded in Faridabad by two friends. Spent the year sampling, redesigning, and rebuilding before our first drop."],
              ["Early 2025", "First drop released exclusively through WhatsApp. Sold out. The standard was set."],
              ["2025", "Expanded the studio. Introduced new silhouettes — oversized box fits, premium cotton constructions."],
              ["2026", "Multiple drops. Delivering across Delhi, Noida, Gurgaon, Faridabad and Ghaziabad. Still never satisfied."],
            ].map(([y, t]) => (
              <div key={y} className="grid grid-cols-[120px_1fr] md:grid-cols-[220px_1fr] gap-8 py-8">
                <p className="font-display text-2xl md:text-4xl">{y}</p>
                <p className="text-ink-muted leading-relaxed max-w-2xl md:pt-1.5">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Manifesto quote ───────────────────────────────────── */}
      <section className="py-32 px-6 md:px-10 text-center max-w-4xl mx-auto">
        <p className="eyebrow">The Mindset</p>
        <p className="font-display text-3xl md:text-6xl mt-8 italic font-light leading-tight">
          "Pacific Dust isn't just what you wear. It's the mindset of always becoming more than you were yesterday."
        </p>
        <p className="mt-8 text-sm text-ink-muted tracking-[0.18em] uppercase">
          — Pacific Dust, Faridabad
        </p>
        <Link href="/shop" className="btn-ink mt-12 inline-flex">
          Shop the collection →
        </Link>
      </section>

      {/* ── Materials / Delivery callouts ─────────────────────── */}
      <section className="border-t border-line grid md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-line">
        {[
          { label: "Material",  value: "240 GSM French Terry Cotton" },
          { label: "Fit",       value: "Oversized Box Fit" },
          { label: "Print",     value: "Screen Print & Premium DTF" },
          { label: "Delivery",  value: "Delhi NCR · Faridabad · Noida" },
        ].map((item) => (
          <div key={item.label} className="px-8 md:px-10 py-10">
            <p className="eyebrow">{item.label}</p>
            <p className="font-display text-xl md:text-2xl mt-4">{item.value}</p>
          </div>
        ))}
      </section>

    </main>
  );
}
