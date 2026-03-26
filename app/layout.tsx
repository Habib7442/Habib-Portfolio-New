import type { Metadata } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Preloader from "@/components/ui/Preloader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Habib Tanwir | Full Stack Developer & AI Designer",
  description: "I build category-defining digital experiences. From scalable web platforms to polished mobile apps and AI design, Habib Tanwir is a Full Stack Developer producing exceptional products.",
  keywords: [
    "Habib Tanwir", 
    "Full Stack Developer", 
    "Mobile App Developer", 
    "AI Designer", 
    "React", 
    "Next.js", 
    "TypeScript", 
    "React Native", 
    "UI/UX Design", 
    "Supabase"
  ],
  authors: [{ name: "Habib Tanwir" }],
  creator: "Habib Tanwir",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Habib Tanwir | Full Stack Developer & AI Designer",
    description: "Specializing in scalable web applications, mobile app development, and AI-driven design. Check out my latest projects and portfolio.",
    url: "https://www.habibfolio.tech", // Replace with your actual production domain
    siteName: "Habib Tanwir Portfolio",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Habib Tanwir | Professional AI Studio & Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Habib Tanwir | Full Stack Developer & AI Designer",
    description: "Specializing in scalable web applications, mobile app development, and AI-driven design. Check out my latest projects and portfolio.",
    images: ["/og.png"],
    creator: "@TanwirHabib",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground selection:bg-[#FDE047] selection:text-black`}
        suppressHydrationWarning
      >
        <div className="grain-overlay" />
        <LenisProvider>
          <Preloader />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
