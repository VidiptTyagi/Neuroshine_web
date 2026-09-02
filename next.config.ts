import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-hosted on the Lightsail box behind Nginx+systemd (see
  // deploy/README.md §2.8) — standalone bundles a minimal node_modules so the
  // deploy payload is small instead of shipping the whole workspace.
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Supabase Storage (public buckets) — host filled from env at runtime.
      { protocol: "https", hostname: "*.supabase.co" },
      // Clerk-hosted avatars
      { protocol: "https", hostname: "img.clerk.com" },
      // YouTube thumbnails for resources / success stories
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
  async redirects() {
    return [
      // Canonical host: www.* permanently redirects to the bare domain, which is
      // what NEXT_PUBLIC_SITE_URL, canonical tags and the sitemap all point at.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.neuroshine.in" }],
        destination: "https://neuroshine.in/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
