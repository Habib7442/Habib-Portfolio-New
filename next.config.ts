import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sanity's CDN does the resizing (see lib/image-loader.ts).
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
  },

  // One canonical host: send www.habibtanwir.com to habibtanwir.com (permanent 308).
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.habibtanwir.com" }],
        destination: "https://habibtanwir.com/:path*",
        permanent: true,
      },
    ];
  },

  // Output standalone build for better compatibility with Vercel
  output: 'standalone',
};

export default nextConfig;
