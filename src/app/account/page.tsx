"use client";
import { useState } from "react";
import Image from "next/image";

export default function Account() {
  const [mode, setMode] = useState<"in"|"up">("in");
  return (
    <main className="pt-24 grid md:grid-cols-2 min-h-screen">
      <div className="relative hidden md:block">
        <Image src="/images/campaign-Bg10tBFF.jpg.jpeg" alt="" fill sizes="50vw" className="object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ink/30"/>
        <div className="relative z-10 p-16 h-full flex flex-col justify-end text-background">
          <p className="eyebrow text-background/70">Members of the house</p>
          <p className="font-display text-5xl mt-6 italic font-light leading-tight">"A quieter way to keep your wardrobe."</p>
        </div>
      </div>
      <div className="p-10 md:p-20 flex items-center">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-6 text-xs tracking-[0.18em] uppercase mb-12">
            <button onClick={() => setMode("in")} className={mode==="in"?"link-underline text-ink":"text-ink-muted"}>Sign in</button>
            <button onClick={() => setMode("up")} className={mode==="up"?"link-underline text-ink":"text-ink-muted"}>Create account</button>
          </div>
          <h1 className="font-display text-5xl">{mode==="in"?"Welcome back.":"Join the house."}</h1>
          <p className="mt-4 text-ink-muted text-sm">{mode==="in"?"Your saved pieces, orders and appointments.":"Private previews and slower correspondence."}</p>
          <form className="mt-12 space-y-8">
            {mode==="up" && <div><label className="eyebrow">Name</label><input className="mt-2 w-full border-b border-line focus:border-ink bg-transparent outline-none py-3 transition-colors"/></div>}
            <div><label className="eyebrow">Email</label><input type="email" placeholder="you@address.com" className="mt-2 w-full border-b border-line focus:border-ink bg-transparent outline-none py-3 placeholder:text-ink-muted/50 transition-colors"/></div>
            <div><label className="eyebrow">Password</label><input type="password" placeholder="••••••••" className="mt-2 w-full border-b border-line focus:border-ink bg-transparent outline-none py-3 placeholder:text-ink-muted/50 transition-colors"/></div>
            <button className="btn-ink w-full">{mode==="in"?"Sign in →":"Create account →"}</button>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="btn-ghost !py-3">Apple</button>
              <button type="button" className="btn-ghost !py-3">Google</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
