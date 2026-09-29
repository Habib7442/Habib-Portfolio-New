import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sanity's CDN does the resizing (see lib/image-loader.ts).
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
  },

  // Output standalone build for better compatibility with Vercel
  output: 'standalone',
};

export default nextConfig;
