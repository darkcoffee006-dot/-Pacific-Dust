"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function SizeGuideModal({ onClose }: { onClose: () => void }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Size guide"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 bg-background w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-line">
          <div>
            <p className="eyebrow">Pacific Dust</p>
            <p className="font-display text-2xl mt-0.5">Size Guide</p>
          </div>
          <button
            onClick={onClose}
            className="size-9 grid place-items-center rounded-full border border-line hover:bg-surface transition-colors"
            aria-label="Close size guide"
          >
            <X size={16} />
          </button>
        </div>

        {/* Size guide image */}
        <div className="relative w-full">
          <Image
            src="/images/size-guide.jpeg"
            alt="Pacific Dust size guide — measurements in inches and cm"
            width={1200}
            height={900}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {/* Footer note */}
        <div className="px-6 py-4 border-t border-line bg-surface">
          <p className="text-xs text-ink-muted leading-relaxed">
            All measurements are in <strong>inches</strong>. Our tees are cut oversized — size down if you prefer a slimmer fit.
            Still unsure? Message us on{" "}
            <a
              href="https://wa.me/919643644455"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              WhatsApp
            </a>{" "}
            and we&apos;ll help you pick the right size.
          </p>
        </div>
      </div>
    </div>
  );
}
