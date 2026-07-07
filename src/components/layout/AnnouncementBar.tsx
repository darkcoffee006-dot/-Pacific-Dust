"use client";
export default function AnnouncementBar() {
  const items = [
    "Complimentary delivery across Delhi NCR & Faridabad",
    "New Arrivals — Autumn / Winter 26",
    "Proudly made in India — Crafted with precision",
    "Now delivering to Delhi · Noida · Gurgaon · Faridabad · Ghaziabad",
    "Free returns within 15 days — No questions asked",
  ];
  const repeated = [...items, ...items];
  return (
    <div className="bg-ink text-background/80 py-[9px] overflow-hidden select-none">
      <div className="flex whitespace-nowrap marquee-track" style={{ gap: "3rem" }}>
        {repeated.map((item, i) => (
          <span key={i} className="shrink-0 text-[10px] tracking-[0.22em] uppercase font-light">
            {item}
            <span className="mx-8 text-background/30">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
