import type { NextConfig } from "next";

const SITE_URL = "https://pacificdust.co.in";

const nextConfig: NextConfig = {
  /* ── Image optimisation ─────────────────────────────────── */
  images: {
    formats: ["image/avif", "image/webp"],
    // Serve at 75% quality — good trade-off for product shots
    qualities: [75, 85],
    // Sizes matching the layout breakpoints used site-wide
    deviceSizes: [390, 640, 768, 1024, 1280, 1536],
    imageSizes: [64, 128, 256, 384],
  },

  /* ── Three.js / R3F ─────────────────────────────────────── */
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],

  /* ── HTTP security & cache headers ─────────────────────── */
  async headers() {
    return [
      {
        // Apply to every route
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options",    value: "nosniff" },
          { key: "X-Frame-Options",            value: "SAMEORIGIN" },
          { key: "X-XSS-Protection",           value: "1; mode=block" },
          { key: "Referrer-Policy",            value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",         value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        // Long-lived cache for all static assets (fonts, images, JS chunks)
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Cache product images for 1 week, allow stale-while-revalidate
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
    ];
  },

  /* ── Permanent redirects (www → apex, http → https handled at CDN) */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.pacificdust.co.in" }],
        destination: `${SITE_URL}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
