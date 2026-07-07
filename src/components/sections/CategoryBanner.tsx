import Link from "next/link";

export default function CategoryBanner() {
  const categories = [
    { label: "All Tees", href: "/shop", tone: "bg-stone-800 text-stone-100" },
    { label: "T-Shirts", href: "/category/t-shirts", tone: "bg-stone-100 text-stone-800" },
    { label: "Lookbook", href: "/lookbook", tone: "bg-amber-50 text-stone-800" },
    { label: "Search", href: "/search", tone: "bg-stone-200 text-stone-800" },
  ];

  return (
    <section className="bg-stone-50 py-4">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
          <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 shrink-0 mr-3">
            Drop 01 · Shop
          </p>
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className={`shrink-0 px-5 py-2 text-[11px] tracking-widest uppercase ${cat.tone} hover:opacity-80 transition-opacity`}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
