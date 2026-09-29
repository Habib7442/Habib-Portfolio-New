import type { MetadataRoute } from "next";
import { DEFAULT_DESCRIPTION, JOB_TITLE, PERSON_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${PERSON_NAME} — ${JOB_TITLE}`,
    short_name: PERSON_NAME,
    description: DEFAULT_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1f3b2c",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
