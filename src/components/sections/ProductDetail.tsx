"use client";

import type { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, Minus, Plus, Truck, RotateCcw, Ruler, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { newArrivals, trending } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";

const all = [...newArrivals, ...trending.filter(p => !newArrivals.find(n => n.id === p.id))];
const SIZES = ["XS", "S", "M", "L", "XL"];

export default function ProductDetail({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const [size,  setSize]  = useState("M");
  const [color, setColor] = useState(product.colors[0]);
  const [qty,   setQty]   = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product, size, color);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const wa = `https://wa.me/918595818638?text=${encodeURIComponent(
    `Hi Pacific Dust! I'd like to order:\n\n• ${product.name} (${color}, Size: ${size}) × ${qty}\n\nPrice: ₹${(product.price * qty).toLocaleString("en-IN")}\n\nDelivery: Delhi NCR / Faridabad`
  )}`;

  const gallery = [product.image, product.image, product.image, product.image].filter(Boolean) as string[];
  const related  = all.filter(p => p.id !== product.id).slice(0, 4);

  return (
    /* Extra bottom padding on mobile to clear the sticky CTA bar */
    <main className="pt-24 md:pt-32 pb-24 md:pb-0">
      {/* Breadcrumb */}
      <div className="px-6 md:px-10 text-xs text-ink-muted tracking-[0.18em] uppercase mb-6 md:mb-8">
        <Link href="/shop" className="link-underline">Shop</Link>
        {" / "}
        <Link href={`/category/${product.category.toLowerCase()}`} className="link-underline">
          {product.category}
        </Link>
        {" / "}
        <span className="text-ink">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-[1fr_460px] gap-8 md:gap-10 px-6 md:px-10">
        {/* ── Gallery ── */}
        <div className="grid grid-cols-2 gap-2 md:gap-3">
          {gallery.map((img, i) => (
            <div key={i} className={`bg-surface overflow-hidden group ${i === 0 ? "col-span-2" : ""}`}>
              <div className={`relative ${i === 0 ? "aspect-[4/3]" : "aspect-[4/5]"}`}>
                <Image
                  src={img}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>

        {/* ── Purchase panel ── */}
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow">{product.category} · Collection Brume</p>
          <h1 className="font-display text-4xl md:text-6xl mt-4 leading-[0.95]">{product.name}</h1>

          <div className="mt-6 flex items-baseline gap-3">
            <p className="text-lg">₹{product.price.toLocaleString("en-IN")}</p>
            <p className="text-xs text-ink-muted">incl. all taxes · free delivery</p>
          </div>

          <p className="mt-8 text-sm text-ink-muted leading-relaxed">
            An oversized silhouette in dense, dry-touch fabric. Hand-finished seams,
            drop shoulder, ribbed cuffs. Made in India with precision.
          </p>

          {/* Colour */}
          <div className="mt-8 md:mt-10">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em]">
              <span>Colour</span>
              <span className="text-ink-muted normal-case tracking-normal">{color}</span>
            </div>
            <div className="mt-3 flex gap-3 flex-wrap">
              {product.colors.map(c => (
                <button key={c} onClick={() => setColor(c)}
                  className={`px-4 py-2 border text-xs rounded-sm transition-all
                    ${color === c ? "border-ink bg-ink text-background" : "border-line hover:border-ink"}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-8">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em]">
              <span>Size</span>
              <button className="normal-case tracking-normal text-ink-muted flex items-center gap-1.5 link-underline text-xs">
                <Ruler size={12} /> Size guide
              </button>
            </div>
            <div className="mt-3 grid grid-cols-5 gap-2">
              {SIZES.map(s => (
                <button key={s} onClick={() => setSize(s)}
                  className={`py-3 border text-sm transition-all
                    ${size === s ? "border-ink bg-ink text-background" : "border-line hover:border-ink"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Qty + Add — hidden on mobile (use sticky bar instead) */}
          <div className="mt-8 hidden md:flex items-stretch gap-3">
            <div className="flex items-center border border-line rounded-full">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="size-11 grid place-items-center">
                <Minus size={14} />
              </button>
              <span className="w-6 text-center text-sm">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="size-11 grid place-items-center">
                <Plus size={14} />
              </button>
            </div>
            <button onClick={handleAdd}
              className={`btn-ink flex-1 transition-all ${added ? "!bg-green-600" : ""}`}>
              {added ? "Added ✓" : "Add to bag"}
            </button>
            <button className="size-11 rounded-full border border-line grid place-items-center hover:bg-surface"
              aria-label="Wishlist">
              <Heart size={16} strokeWidth={1.25} />
            </button>
          </div>

          {/* View bag — appears only after adding, lets user choose to proceed or keep shopping */}
          {added && (
            <button
              onClick={openCart}
              className="hidden md:flex mt-2 w-full py-3 border border-line items-center justify-center text-[11px] tracking-[0.2em] uppercase hover:border-ink hover:bg-ink hover:text-background transition-all rounded-sm"
            >
              View bag &amp; checkout →
            </button>
          )}

          {/* WhatsApp — hidden on mobile (use sticky bar instead) */}
          <a href={wa} target="_blank" rel="noopener noreferrer"
            className="mt-3 hidden md:flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] hover:bg-[#20b858] text-white text-[11px] tracking-[0.2em] uppercase rounded-full transition-colors">
            <MessageCircle size={14} /> Order via WhatsApp
          </a>

          <div className="mt-6 flex flex-wrap gap-6 text-xs text-ink-muted">
            <span className="flex items-center gap-2"><Truck size={14} /> Free Delhi NCR delivery</span>
            <span className="flex items-center gap-2"><RotateCcw size={14} /> 15-day returns</span>
          </div>

          {/* Accordions */}
          <div className="mt-10 divide-y divide-line border-y border-line">
            {[
              ["Fabric & Care", "320 gsm brushed cotton. Made in Faridabad, India. Machine wash cold."],
              ["Fit & Sizing",  "Oversized fit — size down for a slimmer silhouette."],
              ["Delivery",     "Free delivery across Delhi NCR and Faridabad. 3–5 working days."],
              ["Returns",      "15-day returns on unworn pieces. We collect from your door."],
            ].map(([t, c]) => (
              <details key={t} className="py-5 group">
                <summary className="flex justify-between items-center cursor-pointer list-none text-sm">
                  {t}
                  <span className="text-ink-muted group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                </summary>
                <p className="mt-3 text-xs text-ink-muted leading-relaxed">{c}</p>
              </details>
            ))}
          </div>
        </aside>
      </div>

      {/* ── Sticky mobile CTA bar ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-line px-4 py-3 flex items-center gap-3">
        {/* Qty controls */}
        <div className="flex items-center border border-line rounded-full">
          <button onClick={() => setQty(Math.max(1, qty - 1))} className="size-10 grid place-items-center">
            <Minus size={13} />
          </button>
          <span className="w-5 text-center text-sm">{qty}</span>
          <button onClick={() => setQty(qty + 1)} className="size-10 grid place-items-center">
            <Plus size={13} />
          </button>
        </div>
        {/* Add to bag */}
        <button onClick={handleAdd}
          className={`btn-ink flex-1 !py-3 text-[11px] ${added ? "opacity-70" : ""}`}>
          {added ? "Added ✓" : "Add to bag"}
        </button>
        {/* WhatsApp */}
        <a href={wa} target="_blank" rel="noopener noreferrer"
          className="size-10 rounded-full bg-[#25D366] grid place-items-center flex-shrink-0"
          aria-label="Order via WhatsApp">
          <MessageCircle size={16} color="white" />
        </a>
      </div>

      {/* Reviews */}
      <section className="mt-32 bg-surface py-24 px-6 md:px-10">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <p className="eyebrow">Words on this piece</p>
            <p className="font-display text-6xl mt-4">4.9<span className="text-2xl align-top text-ink-muted">/5</span></p>
            <p className="text-xs text-ink-muted mt-2">From 48 owners</p>
          </div>
          {[
            { q: "Dense, warm, sculptural.",          a: "Priya · Delhi" },
            { q: "The one piece I'll keep forever.",  a: "Arjun · Faridabad" },
            { q: "Fits exactly as described.",        a: "Meera · Gurgaon" },
          ].map(r => (
            <blockquote key={r.a}>
              <p className="font-display text-xl leading-snug italic font-light">"{r.q}"</p>
              <footer className="mt-4 text-xs uppercase tracking-[0.18em] text-ink-muted">— {r.a}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Related */}
      <section className="py-24 px-6 md:px-10">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-display text-4xl md:text-5xl">You may also consider</h2>
          <Link href="/shop" className="link-underline text-xs tracking-[0.18em] uppercase">All pieces →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12">
          {related.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </main>
  );
}
