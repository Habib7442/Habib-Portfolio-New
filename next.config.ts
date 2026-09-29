import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sanity's CDN does the resizing (see lib/image-loader.ts).
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
  },

  // www <-> non-www redirects are configured in Vercel (Settings -> Domains), not here:
  // doing it in both places can create a redirect loop.

  // Output standalone build for better compatibility with Vercel
  output: 'standalone',
};

export default nextConfig;
