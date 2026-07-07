import Image from "next/image";
import Link from "next/link";

const images = [
  { src:"/images/lookbook-1-C15adsYr.jpg.jpeg", aspect:"aspect-[4/5]", caption:"Look 01 — Colonnade" },
  { src:"/images/campaign-Bg10tBFF.jpg.jpeg",   aspect:"aspect-[16/10]", caption:"Look 02 — Campaign" },
  { src:"/images/hero-1-Mj2Hbnrp.jpg.jpeg",    aspect:"aspect-[4/5]", caption:"Look 03 — Editorial" },
  { src:"/images/hero-2-DkoVx-kF.jpg.jpeg",    aspect:"aspect-[4/3]", caption:"Look 04 — Studio" },
  { src:"/images/lookbook-2-DhQuyHOI.jpg.jpeg", aspect:"aspect-[3/4]", caption:"Look 05 — Detail" },
  { src:"/images/studio-DwVjruef.jpg.jpeg",     aspect:"aspect-[16/9]", caption:"Look 06 — Atelier" },
];

export default function Lookbook() {
  return (
    <main>
      <section className="pt-32 px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-4">
            <p className="eyebrow">Issue N° 04</p>
            <h1 className="font-display text-6xl md:text-9xl mt-6 leading-[0.88]">Brume<br/><em className="italic font-light">— a lookbook.</em></h1>
            <p className="mt-8 text-sm text-ink-muted max-w-sm">Photographed across Faridabad and Delhi. Autumn, twenty-twenty-six.</p>
          </div>
          <div className="md:col-span-8 relative aspect-[4/5]">
            <Image src="/images/lookbook-1-C15adsYr.jpg.jpeg" alt="Lookbook cover" fill sizes="(max-width: 768px) 100vw, 66vw" className="object-cover"/>
          </div>
        </div>
      </section>

      <section className="mt-32 grid md:grid-cols-12 gap-6 px-6 md:px-10">
        <div className="md:col-span-7 relative aspect-[16/10]"><Image src="/images/campaign-Bg10tBFF.jpg.jpeg" alt="" fill sizes="(max-width: 768px) 100vw, 58vw" className="object-cover"/></div>
        <div className="md:col-span-5 flex items-end">
          <div>
            <p className="eyebrow">Look 01</p>
            <p className="font-display text-3xl md:text-4xl mt-4 italic font-light">"The line the body draws when the room is quiet."</p>
          </div>
        </div>
      </section>

      <section className="mt-32 relative aspect-[21/9] w-full">
        <Image src="/images/hero-1-Mj2Hbnrp.jpg.jpeg" alt="" fill sizes="100vw" className="object-cover"/>
      </section>

      <section className="py-40 px-6 md:px-10 max-w-5xl mx-auto">
        <p className="eyebrow">Editor's Note</p>
        <p className="font-display text-3xl md:text-5xl mt-8 leading-[1.15]">
          <em className="italic font-light">Brume</em> is Hindi for the quiet that settles over Delhi in October — thick, still, weightless. This chapter dresses the body the way that silence dresses a room.
        </p>
      </section>

      <section className="grid md:grid-cols-6 gap-4 md:gap-6 px-6 md:px-10 pb-32">
        <div className="md:col-span-3 md:col-start-2 relative aspect-[3/4]"><Image src="/images/lookbook-2-DhQuyHOI.jpg.jpeg" alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover"/></div>
        <div className="md:col-span-2 relative aspect-square mt-24"><Image src="/images/hero-2-DkoVx-kF.jpg.jpeg" alt="" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover"/></div>
        <div className="md:col-span-4 md:col-start-2 mt-16 relative aspect-[16/9]"><Image src="/images/studio-DwVjruef.jpg.jpeg" alt="" fill sizes="(max-width: 768px) 100vw, 66vw" className="object-cover"/></div>
      </section>

      <section className="mt-10 grid md:grid-cols-2 gap-16 px-6 md:px-10 max-w-5xl mx-auto pb-32">
        <p className="eyebrow">Credits</p>
        <div className="text-sm text-ink-muted space-y-3 leading-relaxed">
          <p>Creative direction · Studio Pacific Dust</p>
          <p>Photography · Team Pacific Dust</p>
          <p>Location · Faridabad & Delhi, September 2026</p>
        </div>
      </section>
    </main>
  );
}
