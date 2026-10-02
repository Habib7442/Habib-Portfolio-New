import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/lib/sanity";
import JsonLd from "@/components/seo/JsonLd";
import { siteGraph } from "@/lib/schema";
import { DEFAULT_DESCRIPTION, OG_IMAGE, PERSON_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings.seoTitle || SITE_TITLE;
  const description = settings.seoDescription || settings.bio || DEFAULT_DESCRIPTION;

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s — ${settings.name || PERSON_NAME}` },
    description,
    authors: [{ name: settings.name || PERSON_NAME, url: SITE_URL }],
    creator: settings.name || PERSON_NAME,
    openGraph: {
      type: "website",
      locale: "en_US",
      title,
      description,
      siteName: settings.name || PERSON_NAME,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
    category: "technology",
    // Ownership verification for Google Search Console / Bing Webmaster Tools (see docs/search-console.md).
    verification: {
      ...(process.env.GOOGLE_SITE_VERIFICATION && { google: process.env.GOOGLE_SITE_VERIFICATION }),
      ...(process.env.BING_SITE_VERIFICATION && { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } }),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();
  return (
    <html lang="en">
      <head>
        {/* Site-wide entity graph: Person (Habib), Organization (Locallify), WebSite */}
        <JsonLd data={siteGraph(settings)} />
      </head>
      {/* suppressHydrationWarning: browser extensions (e.g. Testim, Grammarly) add attributes to <body>
          before React hydrates. This only silences attribute diffs on this one element. */}
      <body
        className={`${inter.variable} ${bricolage.variable} ${instrumentSerif.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
