import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { catalog } from "@/data/products";

export const metadata: Metadata = {
  title: "Buy Oversized Graphic Tees Online India — Drop 01 Collection",
  description:
    "Buy Pacific Dust Drop 01 oversized graphic tees online — City of Angels, Dreams, Unbothered & Gradient Soul. 240 GSM French Terry. Sizes S–XL. Pan-India delivery. Free shipping above Rs. 2000.",
  alternates: { canonical: "https://pacificdust.in/collections" },
  openGraph: {
    title: "Pacific Dust Drop 01 — Buy Oversized Graphic Tees Online India",
    description:
      "Four tees. City of Angels, Dreams, Unbothered & Gradient Soul. 240 GSM French Terry. Sizes S–XL. Pan-India delivery.",
    url: "https://pacificdust.in/collections",
    images: [
      {
        url: "/images/pacific/black/city of angels/DSCN5554.JPG.jpg.jpeg",
        width: 1200,
        height: 630,
        alt: "Pacific Dust Drop 01 — oversized graphic tees India",
      },
    ],
  },
};

const chapters = [
  {
    n: "04",
    title: "Gradient Soul",
    season: "White · Screen Print",
    desc: "Desert tones. Higher hopes. Minimalist chest graphic with expressive back artwork.",
    slug: "gradient-soul-tee",
    flip: false,
  },
  {
    n: "03",
    title: "Dreams",
    season: "White · Screen Print",
    desc: "Minimal front, celestial back. A reminder that every great journey begins with imagination.",
    slug: "dreams-tee",
    flip: true,
  },
  {
    n: "02",
    title: "Unbothered",
    season: "Black · DTF Print",
    desc: "Quiet confidence. Bold back artwork via premium Direct-to-Film printing.",
    slug: "unbothered-tee",
    flip: false,
  },
  {
    n: "01",
    title: "City of Angels",
    season: "Black · Screen Print",
    desc: "Vintage athletic jerseys reimagined through a contemporary streetwear lens.",
    slug: "city-of-angels-tee",
    flip: true,
  },
];

export default function Collections() {
  return (
    <main>
      <section className="pt-40 pb-24 px-6 md:px-10 border-b border-line">
        <p className="eyebrow">Drop 01 · Four tees</p>
        <h1 className="font-display text-6xl md:text-[9rem] leading-[0.9] mt-8 max-w-5xl">
          The Pacific
          <br />
          <em className="italic font-light">Dust drop.</em>
        </h1>
      </section>

      <div className="divide-y divide-line">
        {chapters.map((ch) => {
          const product = catalog.find((p) => p.slug === ch.slug);
          const img = product?.image ?? "/images/pacific/DSCN5501.JPG.jpg.jpeg";

          return (
            <section key={ch.n} className="grid md:grid-cols-2 min-h-[80vh] group">
              <div className={`relative overflow-hidden ${ch.flip ? "md:order-2" : ""}`}>
                <Image
                  src={img}
                  alt={ch.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1600ms] group-hover:scale-105"
                />
              </div>
              <div className="flex items-center p-10 md:p-20 bg-background">
                <div className="max-w-md">
                  <p className="eyebrow">
                    Tee N° {ch.n} · {ch.season}
                  </p>
                  <h2 className="font-display text-6xl md:text-8xl mt-6 italic font-light">{ch.title}</h2>
                  <p className="mt-8 text-ink-muted leading-relaxed">{ch.desc}</p>
                  <div className="mt-10 flex gap-4">
                    <Link href={`/products/${ch.slug}`} className="btn-ink">
                      View piece
                    </Link>
                    <Link href="/lookbook" className="btn-ghost">
                      Lookbook
                    </Link>
                  </div>
                  {product && (
                    <p className="mt-8 text-xs text-ink-muted">
                      ₹{product.price.toLocaleString("en-IN")} · {product.fit}
                    </p>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="py-32 px-6 md:px-10 bg-surface text-center">
        <p className="eyebrow">Drop 01 — AW 26</p>
        <h2 className="font-display text-5xl md:text-7xl mt-6">
          Four tees. <em className="italic font-light">One story.</em>
        </h2>
        <p className="mt-6 text-ink-muted">Shop the full drop or explore the lookbook.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/shop" className="btn-ink">
            Shop all
          </Link>
          <Link href="/lookbook" className="btn-ghost">
            Lookbook
          </Link>
        </div>
        <div className="relative mt-16 mx-auto max-w-3xl w-full aspect-[4/3]">
          <Image
            src="/images/pacific/DSCN5501.JPG.jpg.jpeg"
            alt="Pacific Dust Drop 01 collection"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      </section>
    </main>
  );
}
