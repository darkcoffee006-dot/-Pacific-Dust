"use client";

import { useState, type FormEvent } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="bg-stone-900 text-stone-100 py-20 md:py-28">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <div className="max-w-xl">
          <p className="text-[10px] tracking-[0.4em] uppercase text-stone-500 mb-6">
            Correspondence
          </p>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-snug mb-4">
            Letters,
            <br />
            <em className="italic text-stone-400">not marketing.</em>
          </h2>
          <p className="text-[14px] text-stone-500 mb-10 leading-relaxed">
            A quiet dispatch, once a month. New chapters, atelier notes,
            invitations to private previews.
          </p>

          {submitted ? (
            <div className="border border-stone-700 px-8 py-5">
              <p className="text-[13px] text-stone-300 tracking-wide">
                You are on the list.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-0 border border-stone-700"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                aria-label="Email address"
                className="flex-1 bg-transparent px-6 py-4 text-[13px] text-stone-300 placeholder:text-stone-600 outline-none focus:placeholder:text-stone-500 transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-stone-100 text-stone-900 text-[11px] tracking-widest uppercase hover:bg-white transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-[11px] text-stone-600 mt-4">
            No frequency. No noise. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
