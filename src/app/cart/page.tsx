"use client";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, X, Truck, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ui/ProductCard";
import { newArrivals } from "@/data/products";

export default function CartPage() {
  const { items, totalPrice, totalItems, setQty, removeItem, clearCart } = useCart();
  const shipping = totalPrice > 2000 ? 0 : 99;
  const progress = Math.min(100, (totalPrice / 2000) * 100);

  const wa = items.length ? `https://wa.me/918595818638?text=${encodeURIComponent(
    `Hello Pacific Dust! 🛍️\n\nI'd like to place an order:\n\n${items.map(i=>`• ${i.product.name} (${i.color}, Size: ${i.size}) × ${i.qty} — ₹${(i.product.price*i.qty).toLocaleString("en-IN")}`).join("\n")}\n\n*Total: ₹${totalPrice.toLocaleString("en-IN")}*\n\nDelivery: Delhi NCR / Faridabad`
  )}` : "#";

  return (
    <main className="pt-32 px-6 md:px-10 min-h-screen">
      <div className="flex items-baseline justify-between border-b border-line pb-8">
        <h1 className="font-display text-5xl md:text-8xl">Your bag<span className="text-ink-muted italic font-light"> — {totalItems}</span></h1>
        <Link href="/shop" className="link-underline text-xs tracking-[0.18em] uppercase">Continue shopping →</Link>
      </div>

      {items.length === 0 ? (
        <div className="py-32 text-center">
          <p className="font-display text-4xl italic font-light">Your bag is empty.</p>
          <Link href="/shop" className="btn-ink mt-10 inline-flex">Discover the collection</Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_420px] gap-16 mt-16">
          <div className="divide-y divide-line">
            {items.map(item => (
              <div key={`${item.product.id}-${item.size}-${item.color}`} className="grid grid-cols-[140px_1fr_auto] gap-6 py-8 items-start">
                <div className="relative w-full aspect-[4/5] bg-surface overflow-hidden">
                  {item.product.image && <Image src={item.product.image} alt={item.product.name} fill sizes="140px" className="object-cover"/>}
                </div>
                <div>
                  <p className="eyebrow">{item.product.category}</p>
                  <p className="font-display text-2xl mt-2">{item.product.name}</p>
                  <p className="text-xs text-ink-muted mt-1">Size {item.size} · {item.color}</p>
                  <div className="mt-6 flex items-center gap-2 border border-line rounded-full w-fit">
                    <button onClick={() => setQty(item.product.id, item.size, item.color, item.qty-1)} className="size-9 grid place-items-center"><Minus size={12}/></button>
                    <span className="w-6 text-center text-sm">{item.qty}</span>
                    <button onClick={() => setQty(item.product.id, item.size, item.color, item.qty+1)} className="size-9 grid place-items-center"><Plus size={12}/></button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm">₹{(item.product.price*item.qty).toLocaleString("en-IN")}</div>
                  <button onClick={() => removeItem(item.product.id, item.size, item.color)} className="mt-6 text-ink-muted hover:text-ink"><X size={16}/></button>
                </div>
              </div>
            ))}
          </div>

          <aside className="lg:sticky lg:top-32 lg:self-start bg-surface p-8 rounded-sm shadow-soft">
            <p className="eyebrow">Summary</p>
            <div className="mt-6">
              <p className="text-xs flex items-center gap-2 text-ink-muted"><Truck size={14}/> {shipping===0?"Free delivery unlocked":`₹${2000-totalPrice} more for free delivery`}</p>
              <div className="mt-3 h-px bg-line relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-ink transition-all" style={{width:`${progress}%`}}/>
              </div>
            </div>
            <div className="mt-8 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-ink-muted">Subtotal</span><span>₹{totalPrice.toLocaleString("en-IN")}</span></div>
              <div className="flex justify-between"><span className="text-ink-muted">Delivery</span><span>{shipping===0?"Free":`₹${shipping}`}</span></div>
            </div>
            <div className="mt-6 pt-6 border-t border-line flex justify-between font-display text-2xl">
              <span>Total</span><span>₹{(totalPrice+shipping).toLocaleString("en-IN")}</span>
            </div>
            <a href={wa} target="_blank" rel="noopener noreferrer" onClick={clearCart}
              className="mt-8 flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] hover:bg-[#20b858] text-white text-[11px] tracking-[0.2em] uppercase rounded-sm transition-colors">
              <MessageCircle size={14}/> Order via WhatsApp
            </a>
            <p className="mt-4 text-[11px] text-ink-muted text-center">Delhi NCR · Faridabad · Noida · Gurgaon</p>
          </aside>
        </div>
      )}

      <section className="mt-32 pb-16">
        <p className="eyebrow mb-8">Consider adding</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12">
          {newArrivals.map(p => <ProductCard key={p.id} product={p}/>)}
        </div>
      </section>
    </main>
  );
}
