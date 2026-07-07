import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, AtSign } from "lucide-react";

export default function Contact() {
  return (
    <main>
      <section className="pt-40 px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-12 items-end pb-16 border-b border-line">
          <div>
            <p className="eyebrow">The House · At your service</p>
            <h1 className="font-display text-6xl md:text-[9rem] mt-8 leading-[0.88]">Be<br/>in <em className="italic font-light">touch</em>.</h1>
          </div>
          <p className="text-ink-muted max-w-md md:justify-self-end">Available Monday to Saturday, 10:00–19:00 IST. We reply personally within a day.</p>
        </div>
      </section>

      <section className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-line border-b border-line">
        {[
          { Icon:Mail,   label:"WhatsApp",  value:"+91 85958 18638",    note:"Order & support",
            href:"https://wa.me/918595818638" },
          { Icon:Phone,  label:"Call",      value:"+91 85958 18638",    note:"Mon–Sat 10–19 IST",
            href:"tel:+918595818638" },
          { Icon:AtSign, label:"Instagram", value:"@pacific_dust_",     note:"Journal & campaign",
            href:"https://www.instagram.com/pacific_dust_?igsh=MXdseDRuZHNsZGVnbA==" },
        ].map(s => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
            className="p-10 md:p-14 block hover:bg-surface transition-colors">
            <s.Icon size={20} strokeWidth={1.25}/>
            <p className="eyebrow mt-6">{s.label}</p>
            <p className="font-display text-2xl mt-3">{s.value}</p>
            <p className="text-xs text-ink-muted mt-2">{s.note}</p>
          </a>
        ))}
      </section>

      <section className="grid md:grid-cols-2 gap-0">
        <div className="p-10 md:p-20">
          <p className="eyebrow">Write to the house</p>
          <h2 className="font-display text-4xl md:text-5xl mt-6">A direct line to the studio.</h2>
          <form className="mt-12 space-y-8">
            {[{l:"Name",t:"text",p:"Full name"},{l:"WhatsApp Number",t:"tel",p:"+91 98765 43210"},{l:"Subject",t:"text",p:"Order · Styling · Other"}].map(f => (
              <div key={f.l}>
                <label className="eyebrow">{f.l}</label>
                <input type={f.t} placeholder={f.p} className="mt-3 w-full bg-transparent border-b border-line focus:border-ink outline-none py-3 text-base placeholder:text-ink-muted/60 transition-colors"/>
              </div>
            ))}
            <div>
              <label className="eyebrow">Message</label>
              <textarea rows={5} placeholder="How can we help?" className="mt-3 w-full bg-transparent border-b border-line focus:border-ink outline-none py-3 text-base placeholder:text-ink-muted/60 resize-none transition-colors"/>
            </div>
            <button className="btn-ink w-full md:w-auto">Send message →</button>
          </form>
        </div>

        <div className="relative bg-surface min-h-[500px] md:min-h-full">
          <Image src="/images/studio-DwVjruef.jpg.jpeg" alt="Studio" fill sizes="50vw" className="object-cover opacity-90"/>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent"/>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-background grid gap-4">
            {[
              { city:"Faridabad", addr:"Old Faridabad — Studio (by appointment)" },
              { city:"Delhi",     addr:"Visiting by appointment only" },
            ].map(l => (
              <div key={l.city} className="bg-background/15 backdrop-blur-xl px-5 py-4 rounded-sm flex items-center gap-4">
                <MapPin size={16} strokeWidth={1.5}/>
                <div className="min-w-0">
                  <p className="font-display text-lg">{l.city}</p>
                  <p className="text-xs text-background/80 truncate">{l.addr}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 md:px-10 bg-surface">
        <p className="eyebrow">Frequently asked</p>
        <div className="mt-12 max-w-3xl divide-y divide-line border-y border-line">
          {[
            ["How do I order?","Message us on WhatsApp at +91 85958 18638 or add to cart and tap 'Order via WhatsApp'."],
            ["Do you deliver outside Delhi NCR?","Currently we deliver to Delhi, Noida, Gurgaon, Faridabad and Ghaziabad only."],
            ["Do you offer returns?","Free returns within 15 days. We collect from your door."],
          ].map(([q,a]) => (
            <details key={q} className="py-6 group">
              <summary className="cursor-pointer list-none font-display text-xl flex justify-between items-center">{q}<span className="text-2xl leading-none group-open:rotate-45 transition-transform">+</span></summary>
              <p className="mt-4 text-ink-muted">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
