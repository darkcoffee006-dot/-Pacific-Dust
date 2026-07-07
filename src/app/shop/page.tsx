"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutGrid, Rows3, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { newArrivals, trending } from "@/data/products";

const all = [...newArrivals, ...trending.filter(p => !newArrivals.find(n => n.id === p.id))];
const CATS = ["All","Outerwear","Knitwear","Trousers","Accessories"];
const SIZES = ["XS","S","M","L","XL"];

export default function Shop() {
  const [view, setView] = useState<"grid"|"list">("grid");
  const [open, setOpen] = useState(false);
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? all : all.filter(p => p.category === cat);

  return (
    <main className="pt-40">
      <header className="px-6 md:px-10 pb-16 border-b border-line">
        <div className="grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <p className="eyebrow">All Pieces — {filtered.length}</p>
            <h1 className="font-display text-6xl md:text-9xl mt-6 leading-[0.9]">The <em className="italic font-light">shop</em>.</h1>
          </div>
          <p className="md:col-span-4 text-ink-muted text-sm leading-relaxed">A living archive of every piece we currently make. Ordered by quiet, weight, and season.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
        <aside className={`lg:sticky lg:top-32 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto px-6 md:px-10 py-10 border-r border-line ${open ? "" : "hidden lg:block"}`}>
          <div className="flex items-center justify-between mb-8">
            <p className="eyebrow">Refine</p>
            <button className="lg:hidden" onClick={() => setOpen(false)}><X size={16}/></button>
          </div>
          <details open className="py-6 border-t border-line group">
            <summary className="flex items-center justify-between cursor-pointer list-none text-[13px]">Category <span className="text-ink-muted group-open:rotate-45 transition-transform">+</span></summary>
            <ul className="mt-4 space-y-2.5">
              {CATS.map(o => (
                <li key={o}><button onClick={() => setCat(o)} className={`text-sm transition-colors ${cat===o?"text-ink font-medium":"text-ink-muted hover:text-ink"}`}>{o}</button></li>
              ))}
            </ul>
          </details>
          <details open className="py-6 border-t border-line group">
            <summary className="flex items-center justify-between cursor-pointer list-none text-[13px]">Size <span className="text-ink-muted group-open:rotate-45 transition-transform">+</span></summary>
            <ul className="mt-4 space-y-2.5">
              {SIZES.map(s => <li key={s}><label className="flex items-center gap-3 text-sm text-ink-muted hover:text-ink cursor-pointer"><span className="size-3.5 border border-line rounded-sm"/>{s}</label></li>)}
            </ul>
          </details>
        </aside>

        <div>
          <div className="sticky top-[var(--announcement-h)] z-30 glass-nav flex items-center justify-between px-6 md:px-10 py-4 border-b border-line">
            <button onClick={() => setOpen(v=>!v)} className="lg:hidden flex items-center gap-2 text-sm">
              <SlidersHorizontal size={16}/> Filter
            </button>
            <p className="text-xs text-ink-muted hidden lg:block">Showing {filtered.length} pieces</p>
            <div className="flex items-center gap-4">
              <select className="bg-transparent text-xs tracking-[0.18em] uppercase outline-none cursor-pointer">
                <option>Newest</option><option>Price · low</option><option>Price · high</option>
              </select>
              <div className="hidden md:flex items-center gap-1 border border-line rounded-full p-1">
                <button onClick={() => setView("grid")} className={`size-8 grid place-items-center rounded-full ${view==="grid"?"bg-ink text-background":""}`}><LayoutGrid size={14}/></button>
                <button onClick={() => setView("list")} className={`size-8 grid place-items-center rounded-full ${view==="list"?"bg-ink text-background":""}`}><Rows3 size={14}/></button>
              </div>
            </div>
          </div>

          <div className="px-6 md:px-10 py-16">
            {view === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-16">
                {filtered.map(p => <ProductCard key={p.id} product={p}/>)}
              </div>
            ) : (
              <div className="divide-y divide-line">
                {filtered.map(p => (
                  <Link key={p.id} href={`/products/${p.slug}`} className="flex items-center gap-4 md:gap-6 py-5 group">
                    <div className="relative w-[72px] h-[90px] md:w-[120px] md:h-[120px] bg-surface overflow-hidden flex-shrink-0">
                      {p.image && <Image src={p.image} alt={p.name} fill sizes="120px" className="object-cover"/>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="eyebrow">{p.category}</p>
                      <p className="font-display text-lg md:text-2xl mt-1 truncate">{p.name}</p>
                      <p className="text-xs text-ink-muted mt-1 truncate">{p.colors.join(" · ")}</p>
                      <div className="text-sm mt-2">₹{p.price.toLocaleString("en-IN")}</div>
                    </div>
                    <span className="text-[11px] tracking-[0.18em] uppercase link-underline flex-shrink-0">View →</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
