import { chapters } from "@/data/site";
import Link from "next/link";

export default function Chapters() {
  return (
    <section className="bg-stone-950 text-stone-100 py-20 md:py-28">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <div className="mb-14">
          <p className="text-[10px] tracking-[0.4em] uppercase text-stone-500 mb-3">
            Chapters of the year.
          </p>
          <p className="text-[14px] text-stone-500 max-w-sm">
            Four collections. Twelve pieces each. Released quarterly, kept for
            years.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-stone-800">
          {chapters.map((chapter, i) => (
            <div
              key={i}
              className="bg-stone-950 p-8 md:p-10 flex flex-col justify-between gap-10 group hover:bg-stone-900 transition-colors"
            >
              <div>
                <p className="text-[10px] tracking-widest uppercase text-stone-600 mb-4">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="text-[15px] text-stone-200 leading-snug">
                  {chapter.season}
                </p>
                <p className="text-[13px] text-stone-500 mt-2">
                  {chapter.description}
                </p>
              </div>
              <Link
                href={`/collections/${chapter.season.toLowerCase().replace(/\s+/g, "-").replace("/", "")}`}
                className="text-[10px] tracking-widest uppercase text-stone-600 group-hover:text-stone-300 transition-colors"
              >
                Explore →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
