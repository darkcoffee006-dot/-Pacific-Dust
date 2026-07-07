"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search as SearchIcon, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { allProducts } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";

/* ── Filter options derived from actual product data ─────── */
const CATEGORIES  = ["All", ...Array.from(new Set(allProducts.map(p => p.category))).sort()];
const PRINT_TYPES = ["All", ...Array.from(new Set(allProducts.map(p => p.printType).filter(Boolean))).sort()] as string[];
const FITS        = ["All", ...Array.from(new Set(allProducts.map(p => p.fit).filter(Boolean))).sort()] as string[];
const ALL_COLORS  = Array.from(new Set(allProducts.flatMap(p => p.colors))).sort();
const PRICE_RANGES = [
  { label: "All prices",     min: 0,    max: Infinity },
  { label: "Under ₹1,000",  min: 0,    max: 999 },
  { label: "₹1,000–₹1,500", min: 1000, max: 1500 },
  { label: "Above ₹1,500",  min: 1500, max: Infinity },
];

const TRENDING_SEARCHES = [
  "Oversized T-Shirt", "Gradient", "Dreams", "Streetwear",
  "Insane Culture", "Screen Print", "DTF", "Box Fit",
];

/* ── Collapsible filter section ─────────────────────────── */
function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="py-5 border-t border-line">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="eyebrow">{title}</span>
        <ChevronDown size={14} className={`text-ink-muted transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

export default function SearchPage() {
  const [q,          setQ]         = useState("");
  const [category,   setCategory]  = useState("All");
  const [priceIdx,   setPriceIdx]  = useState(0);
  const [printType,  setPrintType] = useState("All");
  const [fit,        setFit]       = useState("All");
  const [colors,     setColors]    = useState<string[]>([]);
  const [sortBy,     setSortBy]    = useState("newest");
  const [filtersOpen,setFiltersOpen] = useState(false);

  const toggleColor = (c: string) =>
    setColors(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  const clearAll = () => {
    setQ(""); setCategory("All"); setPriceIdx(0);
    setPrintType("All"); setFit("All"); setColors([]);
  };

  const activeFilterCount = [
    category !== "All",
    priceIdx !== 0,
    printType !== "All",
    fit !== "All",
    colors.length > 0,
  ].filter(Boolean).length;

  const results = useMemo(() => {
    const pr = PRICE_RANGES[priceIdx];
    let out = allProducts.filter(p => {
      const matchQ       = !q || [p.name, p.category, p.description ?? "", ...(p.tags ?? []), ...(p.colors)]
        .some(s => s.toLowerCase().includes(q.toLowerCase()));
      const matchCat     = category === "All" || p.category === category;
      const matchPrice   = p.price >= pr.min && p.price <= pr.max;
      const matchPrint   = printType === "All" || p.printType === printType;
      const matchFit     = fit === "All" || p.fit === fit;
      const matchColors  = colors.length === 0 || p.colors.some(c => colors.includes(c));
      return matchQ && matchCat && matchPrice && matchPrint && matchFit && matchColors;
    });

    if (sortBy === "price-asc")  out = [...out].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") out = [...out].sort((a, b) => b.price - a.price);
    if (sortBy === "name")       out = [...out].sort((a, b) => a.name.localeCompare(b.name));

    return out;
  }, [q, category, priceIdx, printType, fit, colors, sortBy]);

  const Sidebar = () => (
    <div className="space-y-0">
      {/* Clear */}
      {activeFilterCount > 0 && (
        <button onClick={clearAll} className="mb-4 text-xs text-ink-muted link-underline flex items-center gap-2">
          <X size={12} /> Clear all filters ({activeFilterCount})
        </button>
      )}

      <FilterSection title="Category">
        <div className="space-y-2">
          {CATEGORIES.map(c => (
            <label key={c} className="flex items-center gap-3 cursor-pointer group">
              <span className={`size-4 border rounded-sm flex items-center justify-center transition-all
                ${category === c ? "bg-ink border-ink" : "border-line group-hover:border-ink"}`}>
                {category === c && <span className="w-2 h-2 bg-background rounded-sm block" />}
              </span>
              <span className={`text-sm transition-colors ${category === c ? "text-ink font-medium" : "text-ink-muted"}`}
                onClick={() => setCategory(c)}>
                {c}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price">
        <div className="space-y-2">
          {PRICE_RANGES.map((r, i) => (
            <label key={r.label} className="flex items-center gap-3 cursor-pointer group">
              <span className={`size-4 border rounded-sm flex items-center justify-center transition-all
                ${priceIdx === i ? "bg-ink border-ink" : "border-line group-hover:border-ink"}`}>
                {priceIdx === i && <span className="w-2 h-2 bg-background rounded-sm block" />}
              </span>
              <span className={`text-sm transition-colors ${priceIdx === i ? "text-ink font-medium" : "text-ink-muted"}`}
                onClick={() => setPriceIdx(i)}>
                {r.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Colour">
        <div className="flex flex-wrap gap-2">
          {ALL_COLORS.map(c => (
            <button key={c} onClick={() => toggleColor(c)}
              className={`px-3 py-1.5 border text-[10px] tracking-[0.1em] uppercase rounded-sm transition-all
                ${colors.includes(c) ? "bg-ink border-ink text-background" : "border-line text-ink-muted hover:border-ink"}`}>
              {c}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Print Type">
        <div className="space-y-2">
          {PRINT_TYPES.map(p => (
            <label key={p} className="flex items-center gap-3 cursor-pointer group">
              <span className={`size-4 border rounded-sm flex items-center justify-center transition-all
                ${printType === p ? "bg-ink border-ink" : "border-line group-hover:border-ink"}`}>
                {printType === p && <span className="w-2 h-2 bg-background rounded-sm block" />}
              </span>
              <span className={`text-sm transition-colors ${printType === p ? "text-ink font-medium" : "text-ink-muted"}`}
                onClick={() => setPrintType(p)}>
                {p}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Fit">
        <div className="space-y-2">
          {FITS.map(f => (
            <label key={f} className="flex items-center gap-3 cursor-pointer group">
              <span className={`size-4 border rounded-sm flex items-center justify-center transition-all
                ${fit === f ? "bg-ink border-ink" : "border-line group-hover:border-ink"}`}>
                {fit === f && <span className="w-2 h-2 bg-background rounded-sm block" />}
              </span>
              <span className={`text-sm transition-colors ${fit === f ? "text-ink font-medium" : "text-ink-muted"}`}
                onClick={() => setFit(f)}>
                {f}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <main className="pt-32 min-h-screen">
      {/* ── Search bar ── */}
      <div className="px-6 md:px-10 pb-8 border-b border-line">
        <p className="eyebrow mb-4">Archive · Search & Filter</p>
        <div className="flex items-center gap-4 border-b border-ink pb-4">
          <SearchIcon size={22} strokeWidth={1.25} className="text-ink-muted shrink-0" />
          <input
            autoFocus
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search by name, category, colour, tag…"
            className="flex-1 bg-transparent outline-none font-display text-2xl md:text-5xl placeholder:text-ink-muted/35"
          />
          {q && (
            <button onClick={() => setQ("")} className="text-xs text-ink-muted link-underline shrink-0">
              Clear
            </button>
          )}
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mt-5">
            {category !== "All" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-ink text-background text-[10px] tracking-[0.15em] uppercase rounded-full">
                {category}
                <button onClick={() => setCategory("All")}><X size={10} /></button>
              </span>
            )}
            {priceIdx !== 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-ink text-background text-[10px] tracking-[0.15em] uppercase rounded-full">
                {PRICE_RANGES[priceIdx].label}
                <button onClick={() => setPriceIdx(0)}><X size={10} /></button>
              </span>
            )}
            {printType !== "All" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-ink text-background text-[10px] tracking-[0.15em] uppercase rounded-full">
                {printType}
                <button onClick={() => setPrintType("All")}><X size={10} /></button>
              </span>
            )}
            {fit !== "All" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-ink text-background text-[10px] tracking-[0.15em] uppercase rounded-full">
                {fit}
                <button onClick={() => setFit("All")}><X size={10} /></button>
              </span>
            )}
            {colors.map(c => (
              <span key={c} className="inline-flex items-center gap-1.5 px-3 py-1 bg-ink text-background text-[10px] tracking-[0.15em] uppercase rounded-full">
                {c}
                <button onClick={() => toggleColor(c)}><X size={10} /></button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex">
        {/* ── Desktop sidebar ── */}
        <aside className="hidden lg:block w-72 shrink-0 px-10 py-8 border-r border-line sticky top-24 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
          <Sidebar />
        </aside>

        {/* ── Main content ── */}
        <div className="flex-1 px-6 md:px-10 py-8">

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              {/* Mobile filter toggle */}
              <button
                onClick={() => setFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 text-sm border border-line px-4 py-2 rounded-full hover:border-ink transition-colors"
              >
                <SlidersHorizontal size={14} />
                Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>
              <p className="text-xs text-ink-muted">
                {results.length} {results.length === 1 ? "piece" : "pieces"}
                {q ? ` for "${q}"` : ""}
              </p>
            </div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-transparent text-xs tracking-[0.18em] uppercase outline-none cursor-pointer border border-line rounded-full px-4 py-2 hover:border-ink transition-colors"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price · Low to High</option>
              <option value="price-desc">Price · High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>

          {/* No query — show trending searches */}
          {!q && activeFilterCount === 0 && (
            <div className="mb-12">
              <p className="eyebrow mb-5">Trending Searches</p>
              <div className="flex flex-wrap gap-3">
                {TRENDING_SEARCHES.map(t => (
                  <button key={t} onClick={() => setQ(t)}
                    className="px-4 py-2 border border-line text-sm hover:border-ink hover:bg-ink hover:text-background transition-all rounded-full">
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results grid */}
          {results.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-14">
              {results.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="font-display text-4xl italic font-light text-ink-muted">Nothing found.</p>
              <button onClick={clearAll} className="btn-ghost mt-8">Clear all filters</button>
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile filter drawer ── */}
      {filtersOpen && (
        <>
          <div className="fixed inset-0 z-[80] bg-black/25" onClick={() => setFiltersOpen(false)} />
          <div className="fixed bottom-0 left-0 right-0 z-[90] bg-background rounded-t-2xl max-h-[85vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <p className="eyebrow">Filters</p>
              <button onClick={() => setFiltersOpen(false)}><X size={18} /></button>
            </div>
            <Sidebar />
            <button onClick={() => setFiltersOpen(false)} className="btn-ink w-full mt-6">
              Show {results.length} results
            </button>
          </div>
        </>
      )}
    </main>
  );
}
