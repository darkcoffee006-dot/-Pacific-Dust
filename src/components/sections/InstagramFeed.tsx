import Link from "next/link";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

// Placeholder grid items
const posts = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  bg: ["bg-stone-100", "bg-stone-200", "bg-amber-50", "bg-stone-300", "bg-stone-100", "bg-amber-100"][i],
}));

export default function InstagramFeed() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-3">
              @pacific_dust_
            </p>
            <p className="text-[14px] text-stone-500">
              The archive, unfolded.
            </p>
          </div>
          <a
            href="https://www.instagram.com/pacific_dust_?igsh=MXdseDRuZHNsZGVnbA=="
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-stone-500 hover:text-stone-900 transition-colors"
          >
            <InstagramIcon size={14} />
            Follow →
          </a>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
          {posts.map((post) => (
            <a
              key={post.id}
              href="https://www.instagram.com/pacific_dust_?igsh=MXdseDRuZHNsZGVnbA=="
              target="_blank"
              rel="noopener noreferrer"
              className={`aspect-square ${post.bg} hover:opacity-75 transition-opacity block`}
              aria-label={`Instagram post ${post.id}`}
            >
              <div className="w-full h-full flex items-center justify-center opacity-20">
                <InstagramIcon size={16} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
