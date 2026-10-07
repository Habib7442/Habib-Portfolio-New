import { existsSync } from "node:fs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /hire shows "Download resume" only if the PDF is in /public. Checked at build time: ISR
  // re-renders run where /public isn't on disk, so a runtime fs check would hide the button.
  env: {
    HAS_RESUME: existsSync("public/resume-habib-tanwir.pdf") ? "1" : "",
  },

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
