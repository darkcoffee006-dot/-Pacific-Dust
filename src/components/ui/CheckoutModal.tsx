"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { X, MessageCircle, Truck, ShoppingBag, ShieldCheck, CreditCard, Landmark } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function CheckoutModal() {
  const { checkoutDetails, closeCheckout, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "prepaid">("cod");

  // Reset inputs when modal opens
  useEffect(() => {
    if (checkoutDetails) {
      setName("");
      setPhone("");
      setAddress("");
      setPaymentMethod("cod");
    }
  }, [checkoutDetails]);

  // Close on Escape key and disable body scrolling
  useEffect(() => {
    if (!checkoutDetails) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCheckout();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [checkoutDetails, closeCheckout]);

  if (!checkoutDetails) return null;

  const { items, clearCartOnSuccess } = checkoutDetails;
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const shipping = subtotal > 1000 ? 0 : 99;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) return;

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
      `Subtotal: ₹${subtotal.toLocaleString("en-IN")}`,
      `Shipping: ${shipping === 0 ? "FREE" : `₹${shipping}`}`,
      `*Total: ₹${total.toLocaleString("en-IN")}*`,
      "",
      "*Customer Details:*",
      `• Name: ${name.trim()}`,
      `• Contact Number: ${phone.trim()}`,
      `• Address: ${address.trim()}`,
      `• Payment Choice: ${paymentMethod === "prepaid" ? "Prepaid (UPI / Cards)" : "Cash on Delivery (COD)"}`,
      "",
      "Please confirm my order.",
    ].join("\n");

    const whatsappURL = `https://wa.me/919643644455?text=${encodeURIComponent(message)}`;
    
    // Redirect to WhatsApp
    window.open(whatsappURL, "_blank");

    if (clearCartOnSuccess) {
      clearCart();
    }
    
    closeCheckout();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/45 backdrop-blur-[3px] transition-opacity"
        onClick={closeCheckout}
      />

      {/* Modal Box */}
      <motion.div
        className="relative z-10 bg-background w-full max-w-[900px] rounded-sm shadow-float overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] border border-line"
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        
        {/* Left Side: Order items & pricing summary */}
        <div className="w-full md:w-5/12 bg-surface p-6 md:p-8 flex flex-col border-b md:border-b-0 md:border-r border-line overflow-y-auto">
          <div className="flex items-center gap-2 mb-6">
            <ShoppingBag size={15} className="text-ink-muted" />
            <span className="eyebrow">Order Summary</span>
          </div>

          {/* Items List */}
          <div className="flex-1 space-y-4 max-h-[160px] md:max-h-[300px] overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-3 text-xs">
                <div className="relative size-12 bg-background border border-line flex-shrink-0">
                  {item.product.image && (
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-ink truncate">{item.product.name}</p>
                  <p className="text-ink-muted mt-0.5">
                    {item.color} · Size {item.size} × {item.qty}
                  </p>
                </div>
                <div className="text-right font-medium">
                  ₹{(item.product.price * item.qty).toLocaleString("en-IN")}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-line mt-6 pt-4 space-y-2.5 text-xs">
            <div className="flex justify-between text-ink-muted">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-ink-muted">
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
            </div>
            <div className="h-px bg-line my-1" />
            <div className="flex justify-between font-display text-xl text-ink">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {subtotal < 1000 && (
            <div className="mt-4 flex items-start gap-2 bg-[#f0ebe0] p-3 rounded-sm border border-stone-200">
              <Truck size={14} className="text-ink-muted mt-0.5 flex-shrink-0" />
              <p className="text-[10px] text-ink-muted leading-snug">
                Add <strong>₹{(1000 - subtotal).toLocaleString("en-IN")}</strong> more to unlock FREE shipping!
              </p>
            </div>
          )}
        </div>

        {/* Right Side: Customer Info & Form */}
        <form onSubmit={handleSubmit} className="w-full md:w-7/12 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="eyebrow">Checkout Details</p>
              <h2 className="font-display text-2xl md:text-3xl mt-1 text-ink">Verify details for WhatsApp redirect</h2>
            </div>
            <button
              type="button"
              onClick={closeCheckout}
              className="size-8 grid place-items-center rounded-full border border-line hover:bg-surface transition-colors"
              aria-label="Close modal"
            >
              <X size={15} />
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-5 flex-1">
            <div>
              <label className="eyebrow text-[10px]" htmlFor="full-name">Full Name</label>
              <input
                id="full-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="mt-1 w-full bg-transparent border-b border-stone-300 focus:border-ink outline-none py-2 text-sm transition-colors placeholder:text-ink-muted/50"
              />
            </div>

            <div>
              <label className="eyebrow text-[10px]" htmlFor="contact-num">Contact Number (WhatsApp)</label>
              <input
                id="contact-num"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 98765 43210"
                className="mt-1 w-full bg-transparent border-b border-stone-300 focus:border-ink outline-none py-2 text-sm transition-colors placeholder:text-ink-muted/50"
              />
            </div>

            <div>
              <label className="eyebrow text-[10px]" htmlFor="delivery-address">Address for Delivery</label>
              <input
                id="delivery-address"
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Flat / Street / Landmark, City, Pincode, State"
                className="mt-1 w-full bg-transparent border-b border-stone-300 focus:border-ink outline-none py-2 text-sm transition-colors placeholder:text-ink-muted/50"
              />
            </div>

            {/* Prepaid vs COD Selection */}
            <div>
              <span className="eyebrow text-[10px] block mb-2">Payment Method</span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex items-center gap-3 p-3 border rounded-sm transition-all text-left ${
                    paymentMethod === "cod"
                      ? "border-ink bg-surface-2 ring-1 ring-ink"
                      : "border-line bg-transparent hover:bg-surface"
                  }`}
                >
                  <Landmark size={16} className={paymentMethod === "cod" ? "text-ink" : "text-ink-muted"} />
                  <div>
                    <p className="text-xs font-semibold text-ink">Cash on Delivery</p>
                    <p className="text-[9px] text-ink-muted">Pay when order arrives</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("prepaid")}
                  className={`flex items-center gap-3 p-3 border rounded-sm transition-all text-left ${
                    paymentMethod === "prepaid"
                      ? "border-ink bg-surface-2 ring-1 ring-ink"
                      : "border-line bg-transparent hover:bg-surface"
                  }`}
                >
                  <CreditCard size={16} className={paymentMethod === "prepaid" ? "text-ink" : "text-ink-muted"} />
                  <div>
                    <p className="text-xs font-semibold text-ink">Prepaid Order</p>
                    <p className="text-[9px] text-ink-muted">UPI / Cards on WhatsApp</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Secure CTA */}
          <div className="mt-8 pt-4 border-t border-line">
            <button
              type="submit"
              className="w-full bg-[#25D366] hover:bg-[#20b858] text-white text-[11px] tracking-[0.2em] uppercase font-semibold py-4 transition-colors rounded-sm flex items-center justify-center gap-2"
            >
              <MessageCircle size={15} />
              Confirm & Order via WhatsApp
            </button>
            <div className="flex items-center justify-center gap-1.5 text-[9px] text-ink-muted mt-2">
              <ShieldCheck size={11} />
              Secure Checkout · We verify each order personally
            </div>
          </div>
        </form>

      </motion.div>
    </div>
  );
}
