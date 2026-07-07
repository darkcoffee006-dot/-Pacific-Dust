"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, Heart, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/shop",        label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/lookbook",    label: "Lookbook" },
  { href: "/about",       label: "About" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-500",
        "top-[var(--announcement-h)]",
        scrolled ? "glass-nav shadow-[0_1px_24px_rgba(0,0,0,0.05)]" : "bg-transparent"
      )}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center px-6 md:px-10 py-5">

        {/* Left nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="link-underline text-[13px] text-ink hover:text-ink transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-1.5 -ml-1.5 text-ink"
          aria-label="Menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Logo — always centred */}
        <Link
          href="/"
          className="justify-self-center font-display text-xl md:text-2xl tracking-[-0.02em]"
        >
          Pacific Dust
        </Link>

        {/* Right icons — search, wishlist, cart only */}
        <div className="justify-self-end flex items-center gap-5">
          <Link
            href="/search"
            aria-label="Search"
            className="hover:opacity-60 transition-opacity hidden md:block"
          >
            <Search size={18} strokeWidth={1.25} />
          </Link>
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="hover:opacity-60 transition-opacity hidden md:block"
          >
            <Heart size={18} strokeWidth={1.25} />
          </Link>
          <button
            onClick={openCart}
            aria-label="Cart"
            className="relative hover:opacity-60 transition-opacity"
          >
            <ShoppingBag size={18} strokeWidth={1.25} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 size-4 rounded-full bg-ink text-background text-[9px] grid place-items-center font-medium">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden bg-background/95 backdrop-blur-md border-t border-line"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <nav className="px-6 py-6 flex flex-col gap-5">
              {[
                ...NAV,
                { href: "/search",  label: "Search" },
                { href: "/wishlist", label: "Wishlist" },
                { href: "/contact", label: "Contact" },
                { href: "/faq",     label: "FAQ" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="eyebrow text-ink hover:text-ink/60 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
