import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <main>
      <section className="pt-40 pb-32 px-6 md:px-10">
        <p className="eyebrow">The House · Est. Faridabad, 2024</p>
        <h1 className="font-display text-[13vw] md:text-[10rem] mt-10 leading-[0.88]">
          Cloth<br/>as <em className="italic font-light">quiet</em><br/>architecture.
        </h1>
      </section>

      <section className="grid md:grid-cols-12 gap-10 px-6 md:px-10 pb-32 items-start">
        <p className="eyebrow md:col-span-3">Mission</p>
        <p className="md:col-span-9 font-display text-3xl md:text-5xl leading-[1.15]">
          We make fewer things, more slowly. Every garment we release is built to sit inside a wardrobe for a decade. <em className="italic font-light text-ink-muted">The house exists to prove that restraint can still be luxurious.</em>
        </p>
      </section>

      <div className="relative h-[100vh] w-full">
        <Image src="/images/hero-1-Mj2Hbnrp.jpg.jpeg" alt="Atelier" fill sizes="100vw" className="object-cover"/>
      </div>

      <section className="grid md:grid-cols-2 gap-16 px-6 md:px-10 py-32 max-w-6xl">
        <div>
          <p className="eyebrow">Vision</p>
          <p className="mt-6 text-ink-muted leading-relaxed">The wardrobe as a room. Every piece a wall, a floor, a beam — engineered to hold, to shelter, to age well. Clothing should behave like architecture: felt more than seen.</p>
        </div>
        <div>
          <p className="eyebrow">Materials</p>
          <p className="mt-6 text-ink-muted leading-relaxed">320 gsm brushed cotton, Japanese denim, natural fibres. Made in Faridabad with precision and care. Every material sourced for longevity, not trend.</p>
        </div>
      </section>

      <section className="bg-surface py-32 px-6 md:px-10">
        <p className="eyebrow">A short chronology</p>
        <div className="mt-16 divide-y divide-line">
          {[
            ["2024","Founded in Faridabad. First drop — twelve pieces, sold through WhatsApp."],
            ["2025","Opened the studio. Introduced the Monolith silhouette."],
            ["2026","Drop 04 — Brume. Delivering across Delhi NCR and Faridabad."],
          ].map(([y,t]) => (
            <div key={y} className="grid grid-cols-[100px_1fr] md:grid-cols-[200px_1fr] gap-8 py-8">
              <p className="font-display text-3xl md:text-5xl">{y}</p>
              <p className="text-ink-muted leading-relaxed max-w-2xl md:pt-3">{t}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4 md:gap-6 px-6 md:px-10 py-32">
        <div className="md:col-span-2 md:row-span-2 relative aspect-[4/3]"><Image src="/images/studio-DwVjruef.jpg.jpeg" alt="" fill sizes="(max-width: 768px) 100vw, 66vw" className="object-cover"/></div>
        <div className="relative aspect-square"><Image src="/images/hero-2-DkoVx-kF.jpg.jpeg" alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover"/></div>
        <div className="relative aspect-square"><Image src="/images/campaign-Bg10tBFF.jpg.jpeg" alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover"/></div>
      </section>

      <section className="py-32 px-6 md:px-10 text-center max-w-4xl mx-auto">
        <p className="eyebrow">Founders</p>
        <p className="font-display text-3xl md:text-5xl mt-8 italic font-light leading-tight">"We do not want to dress everyone. We want to dress a few people, properly, for a long time."</p>
        <p className="mt-6 text-sm text-ink-muted tracking-[0.18em] uppercase">— Pacific Dust, Faridabad</p>
      </section>
    </main>
  );
}
