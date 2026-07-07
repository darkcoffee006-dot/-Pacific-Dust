"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Check, Ruler, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types";

const SIZES = ["XS", "S", "M", "L", "XL"];
const EASE = [0.16, 1, 0.3, 1] as const;

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function QuickAddModal({ product, onClose }: Props) {
  const { addItem, openCart } = useCart();
  const [size,  setSize]  = useState("M");
  const [color, setColor] = useState("");
  const [qty,   setQty]   = useState(1);
  const [added, setAdded] = useState(false);

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setSize("M");
      setColor(product.colors[0] ?? "");
      setQty(1);
      setAdded(false);
    }
  }, [product]);

  // Close on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [product]);

  const handleAdd = () => {
    if (!product) return;
    for (let i = 0; i < qty; i++) addItem(product, size, color);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const wa = product
    ? `https://wa.me/918595818638?text=${encodeURIComponent(
        `Hi Pacific Dust! I'd like to order:\n\n• ${product.name} (${color}, Size: ${size}) × ${qty}\n\nPrice: ₹${(product.price * qty).toLocaleString("en-IN")}\n\nDelivery: Delhi NCR / Faridabad`
      )}`
    : "#";

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/25 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Modal panel — slides up from bottom on mobile, centred on desktop */}
          <motion.div
            className="fixed z-[110] bg-background shadow-2xl
              bottom-0 left-0 right-0 rounded-t-2xl
              md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
              md:rounded-sm md:w-[820px] md:max-h-[90vh] overflow-y-auto"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0,    opacity: 1 }}
            exit={{   y: "100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            style={{ maxHeight: "92vh" }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 size-9 rounded-full bg-surface grid place-items-center hover:bg-line transition-colors"
              aria-label="Close"
            >
              <X size={16} strokeWidth={1.5} />
            </button>

            {/* ─────────────────────────────────────────────────────
                MOBILE: compact header strip + stacked controls
                All controls visible without scrolling
            ───────────────────────────────────────────────────── */}
            <div className="md:hidden">
              {/* Compact product header */}
              <div className="flex items-center gap-4 px-5 pt-5 pb-4 border-b border-line">
                {product.image && (
                  <div className="relative w-[68px] h-[68px] flex-shrink-0 overflow-hidden rounded-sm bg-surface">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="68px"
                      priority
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0 pr-8">
                  <p className="eyebrow truncate">{product.category}</p>
                  <h2 className="font-display text-[1.25rem] mt-0.5 leading-tight truncate">{product.name}</h2>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-base font-light">₹{product.price.toLocaleString("en-IN")}</span>
                    <span className="text-[10px] text-ink-muted">incl. taxes</span>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="px-5 py-4 flex flex-col gap-4">
                {/* Colour */}
                <div>
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] mb-2">
                    <span>Colour</span>
                    <span className="text-ink-muted normal-case tracking-normal text-xs">{color}</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {product.colors.map(c => (
                      <button key={c} onClick={() => setColor(c)}
                        className={`px-4 py-1.5 border text-xs rounded-sm transition-all
                          ${color === c ? "border-ink bg-ink text-background" : "border-line"}`}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div>
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] mb-2">
                    <span>Size</span>
                    <button className="normal-case tracking-normal text-ink-muted flex items-center gap-1 text-xs">
                      <Ruler size={11} /> Size guide
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {SIZES.map(s => (
                      <button key={s} onClick={() => setSize(s)}
                        className={`py-2.5 border text-sm transition-all
                          ${size === s ? "border-ink bg-ink text-background" : "border-line"}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Qty row */}
                <div className="flex items-center gap-3">
                  <span className="text-[11px] uppercase tracking-[0.18em]">Qty</span>
                  <div className="flex items-center border border-line rounded-full">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="size-8 grid place-items-center text-ink-muted">
                      <Minus size={11} />
                    </button>
                    <span className="w-5 text-center text-sm">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="size-8 grid place-items-center text-ink-muted">
                      <Plus size={11} />
                    </button>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col gap-2 pt-1 pb-2">
                  <button
                    onClick={handleAdd}
                    className={`w-full py-3.5 text-[12px] tracking-[0.2em] uppercase rounded-sm flex items-center justify-center gap-2 transition-all duration-300
                      ${added ? "bg-green-600 text-white" : "bg-ink text-background hover:opacity-80"}`}
                  >
                    {added ? <><Check size={13} /> Added — keep shopping</> : "Add to bag"}
                  </button>
                  <button
                    onClick={() => { onClose(); openCart(); }}
                    className="w-full py-3 text-[11px] tracking-[0.2em] uppercase rounded-sm flex items-center justify-center gap-2 border border-line"
                  >
                    View bag & checkout
                  </button>
                  <a href={wa} target="_blank" rel="noopener noreferrer"
                    className="w-full py-3 text-[11px] tracking-[0.2em] uppercase rounded-sm flex items-center justify-center gap-2 bg-[#25D366] text-white">
                    <MessageCircle size={13} /> Order via WhatsApp
                  </a>
                  <Link href={`/products/${product.slug}`} onClick={onClose}
                    className="text-center text-[10px] tracking-[0.2em] uppercase text-ink-muted hover:text-ink transition-colors pt-1">
                    View full details →
                  </Link>
                </div>
              </div>
            </div>

            {/* ─────────────────────────────────────────────────────
                DESKTOP: 2-col — image left, controls right
            ───────────────────────────────────────────────────── */}
            <div className="hidden md:grid md:grid-cols-2">
              {/* Image */}
              <div className="relative aspect-[4/5] bg-surface">
                {product.image && (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="410px"
                    priority
                  />
                )}
                <Link
                  href={`/products/${product.slug}`}
                  onClick={onClose}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-sm px-5 py-2 text-[10px] tracking-[0.22em] uppercase hover:bg-background transition-colors rounded-sm whitespace-nowrap"
                >
                  View full details →
                </Link>
              </div>

              {/* Details */}
              <div className="p-10 flex flex-col">
                <div>
                  <p className="eyebrow">{product.category} · Collection Brume</p>
                  <h2 className="font-display text-3xl md:text-4xl mt-3 leading-[0.95]">
                    {product.name}
                  </h2>
                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="text-xl font-light">₹{product.price.toLocaleString("en-IN")}</span>
                    <span className="text-xs text-ink-muted">incl. taxes · free delivery</span>
                  </div>
                </div>

                {/* Colour */}
                <div className="mt-7">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] mb-3">
                    <span>Colour</span>
                    <span className="text-ink-muted normal-case tracking-normal">{color}</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
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
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] mb-3">
                    <span>Size</span>
                    <button className="normal-case tracking-normal text-ink-muted flex items-center gap-1 link-underline text-xs">
                      <Ruler size={11} /> Size guide
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {SIZES.map(s => (
                      <button key={s} onClick={() => setSize(s)}
                        className={`py-3 border text-sm transition-all
                          ${size === s ? "border-ink bg-ink text-background" : "border-line hover:border-ink"}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Qty */}
                <div className="mt-6 flex items-center gap-4">
                  <span className="text-xs uppercase tracking-[0.18em]">Qty</span>
                  <div className="flex items-center border border-line rounded-full">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="size-9 grid place-items-center text-ink-muted hover:text-ink">
                      <Minus size={12} />
                    </button>
                    <span className="w-6 text-center text-sm">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="size-9 grid place-items-center text-ink-muted hover:text-ink">
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-auto pt-8 flex flex-col gap-3">
                  <button
                    onClick={handleAdd}
                    className={`w-full py-4 text-[12px] tracking-[0.2em] uppercase rounded-sm flex items-center justify-center gap-2 transition-all duration-300
                      ${added ? "bg-green-600 text-white scale-[0.98]" : "bg-ink text-background hover:opacity-80"}`}
                  >
                    {added ? <><Check size={14} /> Added — keep shopping</> : "Add to bag"}
                  </button>
                  <button
                    onClick={() => { onClose(); openCart(); }}
                    className="w-full py-3.5 text-[11px] tracking-[0.2em] uppercase rounded-sm flex items-center justify-center gap-2 border border-line hover:border-ink transition-colors"
                  >
                    View bag & checkout
                  </button>
                  <a href={wa} target="_blank" rel="noopener noreferrer"
                    className="w-full py-3.5 text-[11px] tracking-[0.2em] uppercase rounded-sm flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white transition-colors">
                    <MessageCircle size={13} /> Order via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
