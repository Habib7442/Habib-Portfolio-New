import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
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

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.habibfolio.tech"),
  title: "Habib Tanwir — Engineer & Designer",
  description:
    "Habib Tanwir builds AI-powered SaaS products and the brand identity that ships with them — full-stack engineering with a designer's eye.",
  keywords: [
    "Habib Tanwir",
    "Full Stack Engineer",
    "AI Engineer",
    "Designer",
    "React",
    "Next.js",
    "TypeScript",
    "React Native",
    "Supabase",
  ],
  authors: [{ name: "Habib Tanwir" }],
  creator: "Habib Tanwir",
  alternates: {
    canonical: "https://www.habibfolio.tech/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Habib Tanwir — Engineer & Designer",
    description:
      "Full-stack engineering with a designer's eye. AI-powered SaaS products, brand identity, and thoughtful interfaces.",
    url: "https://www.habibfolio.tech",
    siteName: "Habib Tanwir",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Habib Tanwir — Engineer & Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Habib Tanwir — Engineer & Designer",
    description:
      "Full-stack engineering with a designer's eye. AI-powered SaaS products and brand identity.",
    images: ["/og.png"],
    creator: "@TanwirHabib",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Schema.org Person JSON-LD — Entity Fusion */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Habib Tanwir",
              "alternateName": "Habib Tanwir Laskar",
              "url": "https://www.habibfolio.tech",
              "image": "https://www.habibfolio.tech/og.png",
              "jobTitle": "Engineer & Designer",
              "description": "Full-stack engineer and designer building AI-powered SaaS products and brand identity.",
              "knowsAbout": ["TypeScript", "Next.js", "Supabase", "React Native", "AI Orchestration", "Brand Identity", "Generative AI"],
              "sameAs": [
                "https://github.com/Habib7442",
                "https://in.linkedin.com/in/habib-tanwir",
                "https://twitter.com/TanwirHabib"
              ]
            })
          }}
        />
        {/* Prevent theme flash — set data-theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || theme === 'light') {
                    document.documentElement.setAttribute('data-theme', theme);
                  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <div className="grain-overlay" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
