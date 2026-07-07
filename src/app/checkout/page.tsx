"use client";
import Link from "next/link";
import Image from "next/image";
import { Lock, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";

function Field({ label, placeholder, type="text", span=false }: { label:string; placeholder?:string; type?:string; span?:boolean }) {
  return (
    <div className={span ? "col-span-2" : ""}>
      <label className="eyebrow">{label}</label>
      <input type={type} placeholder={placeholder} className="mt-2 w-full bg-transparent border-b border-line focus:border-ink outline-none py-2.5 text-sm transition-colors placeholder:text-ink-muted/60"/>
    </div>
  );
}

export default function Checkout() {
  const { items, totalPrice } = useCart();
  return (
    <main className="pt-32">
      <div className="px-6 md:px-10 pb-10 border-b border-line">
        <div className="flex items-center gap-8 text-xs uppercase tracking-[0.18em]">
          {["Bag","Address","Payment","Review"].map((s,i) => (
            <div key={s} className="flex items-center gap-3">
              <span className={`size-6 rounded-full grid place-items-center text-[10px] ${i<2?"bg-ink text-background":"border border-line"}`}>{i<2?<Check size={12}/>:`0${i+1}`}</span>
              <span className={i>=2?"text-ink-muted":""}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_440px]">
        <div className="p-8 md:p-16 max-w-3xl">
          <p className="eyebrow">Step 02 of 04</p>
          <h1 className="font-display text-4xl md:text-6xl mt-4">Delivery & Payment</h1>
          <section className="mt-16 space-y-6"><h2 className="eyebrow">Contact</h2><Field label="Email" placeholder="you@address.com" type="email"/><Field label="Phone" placeholder="+91 98765 43210"/></section>
          <section className="mt-16"><h2 className="eyebrow">Shipping address</h2>
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6">
              <Field label="First name"/><Field label="Last name"/>
              <Field label="Address" span/><Field label="City" placeholder="Delhi / Faridabad / Noida"/>
              <Field label="Postal code"/><Field label="State" placeholder="Delhi / Haryana"/>
            </div>
          </section>
          <section className="mt-16"><h2 className="eyebrow">Delivery method</h2>
            <div className="mt-6 divide-y divide-line border-y border-line">
              {[["Standard","3–5 working days","Free (orders above ₹2000)"],["Express","1–2 working days","₹99"],["Same-day (Faridabad/Delhi)","Before 7pm","₹149"]].map(([m,d,p],i) => (
                <label key={m} className="flex items-center justify-between py-5 cursor-pointer">
                  <span className="flex items-center gap-4">
                    <span className={`size-4 rounded-full border ${i===0?"border-ink bg-ink ring-4 ring-background ring-offset-1 ring-offset-ink":"border-line"}`}/>
                    <span><p className="text-sm">{m}</p><p className="text-xs text-ink-muted">{d}</p></span>
                  </span>
                  <span className="text-sm">{p}</span>
                </label>
              ))}
            </div>
          </section>
          <button className="btn-ink w-full mt-16 !py-5 flex items-center gap-2"><Lock size={14}/> Place order · ₹{totalPrice.toLocaleString("en-IN")}</button>
        </div>

        <aside className="bg-surface p-8 md:p-12 lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow">Order</p>
          <div className="mt-8 divide-y divide-line">
            {items.map(item => (
              <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-4 py-4">
                <div className="relative size-20 bg-background overflow-hidden">
                  {item.product.image && <Image src={item.product.image} alt={item.product.name} fill sizes="80px" className="object-cover"/>}
                  <span className="absolute -top-2 -right-2 size-5 rounded-full bg-ink text-background text-[10px] grid place-items-center">{item.qty}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-lg truncate">{item.product.name}</p>
                  <p className="text-xs text-ink-muted mt-1">Size {item.size} · {item.color}</p>
                </div>
                <div className="text-sm">₹{(item.product.price*item.qty).toLocaleString("en-IN")}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-line flex justify-between font-display text-2xl">
            <span>Total</span><span>₹{totalPrice.toLocaleString("en-IN")}</span>
          </div>
          <p className="mt-8 text-[11px] text-ink-muted leading-relaxed">By placing your order you agree to Pacific Dust's <Link href="/faq" className="link-underline">terms</Link>.</p>
        </aside>
      </div>
    </main>
  );
}
