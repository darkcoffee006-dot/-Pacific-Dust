"use client";

import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag, MessageCircle } from "lucide-react";
import Image from "next/image";

const WHATSAPP_NUMBER = "918595818638"; // +91 85958 18638
const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Build WhatsApp message ─────────────────────────────────── */
function buildWhatsAppURL(items: ReturnType<typeof useCart>["items"], total: number) {
  const lines = items.map(
    (i) =>
      `• ${i.product.name} (${i.color}, Size: ${i.size}) × ${i.qty} — ₹${(i.product.price * i.qty).toLocaleString("en-IN")}`
  );

  const message = [
    "Hello Pacific Dust! 🛍️",
    "",
    "I'd like to place an order:",
    "",
    ...lines,
    "",
    `*Total: ₹${total.toLocaleString("en-IN")}*`,
    "",
    "Please confirm availability and delivery details.",
    "Delivery area: Delhi NCR / Faridabad",
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* ── Cart Drawer ────────────────────────────────────────────── */
export default function CartDrawer() {
  const { items, open, totalItems, totalPrice, removeItem, setQty, clearCart, closeCart } =
    useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[80] bg-black/30 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
          />

          {/* Drawer panel */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 z-[90] w-full max-w-[420px] bg-[#f5f0e8] flex flex-col shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200/60">
              <div className="flex items-center gap-3">
                <ShoppingBag size={17} strokeWidth={1.5} className="text-stone-700" />
                <span className="text-[13px] tracking-[0.15em] uppercase font-light text-stone-800">
                  Your Bag
                </span>
                {totalItems > 0 && (
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[9px] flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-1.5 text-stone-500 hover:text-stone-900 transition-colors"
                aria-label="Close cart"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* ── Items ── */}
            <div className="flex-1 overflow-y-auto py-4 px-6 space-y-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 py-20">
                  <ShoppingBag size={36} strokeWidth={1} className="text-stone-300" />
                  <p className="text-[12px] tracking-[0.2em] uppercase text-stone-400 font-light">
                    Your bag is empty
                  </p>
                  <button
                    onClick={closeCart}
                    className="text-[11px] tracking-[0.15em] uppercase text-stone-600 hover:text-stone-900 underline underline-offset-4 transition-colors"
                  >
                    Continue browsing
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-4 pb-5 border-b border-stone-200/50 last:border-0"
                  >
                    {/* Image */}
                    <div className="w-[80px] h-[100px] bg-stone-100 flex-shrink-0 overflow-hidden">
                      {item.product.image ? (
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          width={80}
                          height={100}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-stone-100" />
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-0.5">
                          {item.product.category}
                        </p>
                        <p className="text-[13px] text-stone-900 font-light leading-snug">
                          {item.product.name}
                        </p>
                        <p className="text-[11px] text-stone-400 mt-0.5">
                          {item.color} · Size {item.size}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Qty controls */}
                        <div className="flex items-center gap-2 border border-stone-300 px-2 py-1">
                          <button
                            onClick={() =>
                              setQty(item.product.id, item.size, item.color, item.qty - 1)
                            }
                            className="text-stone-500 hover:text-stone-900 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={11} strokeWidth={1.5} />
                          </button>
                          <span className="text-[12px] w-4 text-center text-stone-800">
                            {item.qty}
                          </span>
                          <button
                            onClick={() =>
                              setQty(item.product.id, item.size, item.color, item.qty + 1)
                            }
                            className="text-stone-500 hover:text-stone-900 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={11} strokeWidth={1.5} />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-[13px] text-stone-800">
                            ₹{(item.product.price * item.qty).toLocaleString("en-IN")}
                          </span>
                          <button
                            onClick={() =>
                              removeItem(item.product.id, item.size, item.color)
                            }
                            className="text-stone-300 hover:text-red-400 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={13} strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* ── Footer — totals + CTA ── */}
            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-stone-200/60 bg-[#f0ebe0] space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-stone-500 font-light">
                    Subtotal
                  </span>
                  <span className="text-[15px] text-stone-900 font-light">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                <p className="text-[10px] text-stone-400 leading-relaxed">
                  Delivery available across Delhi · Noida · Gurgaon · Faridabad · Ghaziabad.
                  Final price confirmed on WhatsApp.
                </p>

                {/* WhatsApp Buy Now */}
                <a
                  href={buildWhatsAppURL(items, totalPrice)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#20b858] text-white text-[11px] tracking-[0.2em] uppercase font-medium py-4 transition-colors rounded-sm"
                  onClick={clearCart}
                >
                  <MessageCircle size={15} strokeWidth={1.5} />
                  Order via WhatsApp
                </a>

                {/* Clear cart */}
                <button
                  onClick={clearCart}
                  className="w-full text-[10px] tracking-[0.2em] uppercase text-stone-400 hover:text-stone-700 transition-colors py-1"
                >
                  Clear bag
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
