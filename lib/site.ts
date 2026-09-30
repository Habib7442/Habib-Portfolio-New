// Canonical domain — every absolute URL (canonical tags, sitemap, JSON-LD, llms.txt) is built from this.
export const SITE_URL = "https://habibtanwir.com";

export const PERSON_NAME = "Habib Tanwir";
export const JOB_TITLE = "Full-Stack Engineer & Visual Designer";
export const DEFAULT_DESCRIPTION =
  "Habib Tanwir is a full-stack engineer and visual designer in Silchar, India. He builds web apps, SaaS products and landing pages, and designs the posters and brand visuals that sell them.";

// Default social-share (Open Graph / X) card. Pages with their own cover (projects, posts) use that instead.
export const OG_IMAGE = { url: "/habib_og.png", width: 1733, height: 907, alt: "Habib Tanwir — Web Developer & Designer" };

// Stable @ids so every JSON-LD block on the site points at the same entities.
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const LOCALLIFY = {
  name: "Locallify Agency",
  url: "https://www.locallifyagency.com/",
  id: "https://www.locallifyagency.com/#organization",
  description:
    "Software studio in Silchar, Assam, India building custom software, web apps, SaaS platforms, mobile apps, AI features and workflow automation for clients worldwide.",
};

// Used when admin Settings has no social links yet (these are Habib's existing profiles).
export const FALLBACK_SAME_AS = [
  "https://github.com/Habib7442",
  "https://in.linkedin.com/in/habib-tanwir",
  "https://twitter.com/TanwirHabib",
];

export const SKILLS = ["Next.js", "React", "TypeScript", "Node.js", "React Native", "Supabase", "Sanity", "Figma", "Photoshop"];
export const EXPERTISE = [
  "Full-stack web development",
  "SaaS product development",
  "Landing page design",
  "Poster design",
  "Social media design",
  "Branding and visual identity",
];

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
