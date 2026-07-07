import Link from "next/link";

const groups = [
  { title:"Orders & Delivery", id:"orders", items:[
    ["How do I place an order?","Add items to your bag and tap 'Order via WhatsApp'. We confirm every order personally on +91 85958 18638."],
    ["Where do you deliver?","Delhi, Noida, Gurgaon, Faridabad and Ghaziabad only. We are expanding soon."],
    ["How long does delivery take?","3–5 working days standard. Express next-day available for ₹99."],
    ["Is delivery free?","Free on orders above ₹2,000. Otherwise ₹99."],
  ]},
  { title:"Returns & Alterations", id:"returns", items:[
    ["Can I return a piece?","Yes — within 15 days, unworn, with tags. We collect from your door."],
    ["Do you offer alterations?","Available at our Faridabad studio by appointment."],
  ]},
  { title:"Sizing & Fit", id:"sizing", items:[
    ["How do your pieces fit?","Cut relaxed and oversized. Size down if you prefer a slimmer silhouette."],
    ["Do you have a size guide?","On every product page with measurements."],
  ]},
  { title:"The House", id:"house", items:[
    ["Where is Pacific Dust made?","In our studio in Faridabad, India."],
    ["Do you sell in stores?","No. Only through this website and via WhatsApp."],
    ["Why don't you do sales?","Because we don't overproduce. We make what we can sell at a fair, full price."],
  ]},
];

export default function Faq() {
  return (
    <main>
      <section className="pt-40 pb-24 px-6 md:px-10 border-b border-line">
        <p className="eyebrow">Answers · Support</p>
        <h1 className="font-display text-6xl md:text-[10rem] mt-8 leading-[0.88]">Everything,<br/><em className="italic font-light">explained.</em></h1>
      </section>

      <section className="grid lg:grid-cols-[280px_1fr] gap-16 px-6 md:px-10 py-24">
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow mb-6">In this page</p>
          <ul className="space-y-3 text-sm">
            {groups.map(g => <li key={g.id}><a href={`#${g.id}`} className="link-underline">{g.title}</a></li>)}
          </ul>
          <div className="mt-12 p-6 bg-surface rounded-sm">
            <p className="eyebrow">Still curious?</p>
            <p className="font-display text-2xl mt-3">We answer personally.</p>
            <Link href="/contact" className="btn-ghost mt-6 inline-flex !py-2.5 !px-4 !text-[10px]">Write to us →</Link>
          </div>
        </aside>

        <div className="space-y-24">
          {groups.map(g => (
            <div key={g.id} id={g.id} className="scroll-mt-32">
              <h2 className="font-display text-4xl md:text-6xl">{g.title}</h2>
              <div className="mt-10 divide-y divide-line border-y border-line">
                {g.items.map(([q,a]) => (
                  <details key={q} className="py-6 group">
                    <summary className="cursor-pointer list-none flex items-center justify-between text-lg">
                      <span className="pr-8">{q}</span>
                      <span className="text-xl leading-none text-ink-muted group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="mt-4 text-ink-muted max-w-2xl leading-relaxed">{a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
