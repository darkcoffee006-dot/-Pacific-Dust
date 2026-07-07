import Image from "next/image";
import Link from "next/link";

const articles = [
  { t:"The weight of a t-shirt",          cat:"Craft",      read:"6 min", img:"/images/hero-2-DkoVx-kF.jpg.jpeg" },
  { t:"Notes from Faridabad",             cat:"Ateliers",   read:"4 min", img:"/images/lookbook-2-DhQuyHOI.jpg.jpeg" },
  { t:"Dressing for the room, not the season", cat:"Essay", read:"8 min", img:"/images/campaign-Bg10tBFF.jpg.jpeg" },
  { t:"Why we don't do sales",            cat:"House Notes", read:"3 min", img:"/images/lookbook-1-C15adsYr.jpg.jpeg" },
];

export default function Journal() {
  return (
    <main>
      <section className="pt-40 pb-16 px-6 md:px-10 border-b border-line">
        <div className="flex items-baseline justify-between">
          <p className="eyebrow">The Journal · Volume 07</p>
          <p className="text-xs text-ink-muted">Updated monthly</p>
        </div>
        <h1 className="font-display text-6xl md:text-[10rem] mt-8 leading-[0.88]">Slow reading,<br/><em className="italic font-light">on cloth.</em></h1>
      </section>

      <section className="grid md:grid-cols-12 gap-10 px-6 md:px-10 py-24 border-b border-line">
        <div className="md:col-span-7 relative aspect-[16/10]">
          <Image src="/images/studio-DwVjruef.jpg.jpeg" alt="Featured" fill sizes="(max-width: 768px) 100vw, 58vw" className="object-cover"/>
        </div>
        <article className="md:col-span-5 flex flex-col justify-end">
          <p className="eyebrow">Essay · July 2026</p>
          <h2 className="font-display text-4xl md:text-6xl mt-4 leading-[0.98]">The architecture of a wardrobe.</h2>
          <p className="mt-6 text-ink-muted leading-relaxed">On why a well-built cupboard is the beginning of every well-built collection — weight, light and air as the true materials of dressing.</p>
          <Link href="/journal" className="btn-ghost mt-8 w-fit">Read the essay →</Link>
        </article>
      </section>

      <section className="px-6 md:px-10 py-24">
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-16">
          {articles.map((a,i) => (
            <article key={a.t} className="group">
              <div className="overflow-hidden relative">
                <div className={`relative w-full ${i%2?"aspect-[4/3]":"aspect-[16/10]"}`}>
                  <Image src={a.img} alt={a.t} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-105"/>
                </div>
              </div>
              <div className="mt-6 flex items-baseline justify-between">
                <p className="eyebrow">{a.cat}</p>
                <p className="text-xs text-ink-muted">{a.read}</p>
              </div>
              <h3 className="font-display text-3xl md:text-4xl mt-3 leading-tight link-underline">{a.t}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-surface py-32 px-6 md:px-10 text-center">
        <p className="eyebrow">Subscribe</p>
        <p className="font-display text-4xl md:text-6xl mt-6 max-w-3xl mx-auto leading-tight">The journal, delivered quietly. Once a month.</p>
        <form className="mt-10 max-w-md mx-auto flex border-b border-ink pb-2">
          <input type="email" placeholder="your@address.com" className="flex-1 bg-transparent outline-none py-2 text-sm"/>
          <button className="text-[11px] uppercase tracking-[0.22em]">Subscribe →</button>
        </form>
      </section>
    </main>
  );
}
