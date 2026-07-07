"use client";

import { useState, useEffect, useCallback } from "react";
import { testimonials } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="bg-stone-50 py-20 md:py-28 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-12">
          Words · Journal of the House
        </p>

        {/* Quote display */}
        <div className="relative min-h-[120px]">
          {testimonials.map((t, i) => (
            <blockquote
              key={i}
              className={cn(
                "absolute inset-0 transition-all duration-700",
                i === active
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3 pointer-events-none"
              )}
            >
              <p className="text-[clamp(1.2rem,2.5vw,2rem)] font-light italic text-stone-700 max-w-3xl leading-snug">
                &ldquo;{t.quote}&rdquo;
              </p>
            </blockquote>
          ))}
        </div>

        {/* Dots */}
        <div className="flex items-center gap-3 mt-16">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View testimonial ${i + 1}`}
              className={cn(
                "transition-all duration-300",
                i === active
                  ? "w-8 h-px bg-stone-900"
                  : "w-3 h-px bg-stone-300 hover:bg-stone-500"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
