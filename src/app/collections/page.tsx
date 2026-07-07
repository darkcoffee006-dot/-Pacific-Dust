import Image from "next/image";
import Link from "next/link";

const chapters = [
  { n:"04", title:"Brume",   season:"Autumn / Winter 26", desc:"A study in fog and weight. Undyed cashmere, dense wool.", img:"/images/hero-1-Mj2Hbnrp.jpg.jpeg", flip:false },
  { n:"03", title:"Terraza", season:"Spring / Summer 26",  desc:"Cotton, air, and long shadow. Cut wider, worn lighter.",  img:"/images/campaign-Bg10tBFF.jpg.jpeg", flip:true },
  { n:"02", title:"Ossa",    season:"Autumn / Winter 25", desc:"Bone and structure. Tailoring reduced to its geometry.", img:"/images/lookbook-1-C15adsYr.jpg.jpeg", flip:false },
  { n:"01", title:"Alba",    season:"Spring / Summer 25",  desc:"The first chapter. Whites, salt, first hours of light.", img:"/images/studio-DwVjruef.jpg.jpeg", flip:true },
];

export default function Collections() {
  return (
    <main>
      <section className="pt-40 pb-24 px-6 md:px-10 border-b border-line">
        <p className="eyebrow">The House · Four chapters a year</p>
        <h1 className="font-display text-6xl md:text-[9rem] leading-[0.9] mt-8 max-w-5xl">
          Collections<br/><em className="italic font-light">as chapters</em>,<br/>not seasons.
        </h1>
      </section>

      <div className="divide-y divide-line">
        {chapters.map((ch) => (
          <section key={ch.n} className="grid md:grid-cols-2 min-h-[80vh] group">
            <div className={`relative overflow-hidden ${ch.flip ? "md:order-2" : ""}`}>
              <Image src={ch.img} alt={ch.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-[1600ms] group-hover:scale-105"/>
            </div>
            <div className="flex items-center p-10 md:p-20 bg-background">
              <div className="max-w-md">
                <p className="eyebrow">Chapter N° {ch.n} · {ch.season}</p>
                <h2 className="font-display text-6xl md:text-8xl mt-6 italic font-light">{ch.title}</h2>
                <p className="mt-8 text-ink-muted leading-relaxed">{ch.desc}</p>
                <div className="mt-10 flex gap-4">
                  <Link href="/shop" className="btn-ink">Shop the chapter</Link>
                  <Link href="/lookbook" className="btn-ghost">Lookbook</Link>
                </div>
                <p className="mt-8 text-xs text-ink-muted">12 pieces · Made in India</p>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="py-32 px-6 md:px-10 bg-surface text-center">
        <p className="eyebrow">Coming Winter 27</p>
        <h2 className="font-display text-5xl md:text-7xl mt-6">Chapter 05 — <em className="italic font-light">Vela</em></h2>
        <p className="mt-6 text-ink-muted">Register to be first.</p>
        <div className="relative mt-16 mx-auto max-w-3xl w-full aspect-[4/3]">
          <Image src="/images/hero-2-DkoVx-kF.jpg.jpeg" alt="" fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover"/>
        </div>
      </section>
    </main>
  );
}
