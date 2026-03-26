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
  title: "Habib Tanwir — Full Stack & Mobile Developer",
  description: "Portfolio of Habib Tanwir, a Full Stack Developer and Mobile App Developer.",
  openGraph: {
    title: "Habib Tanwir — Full Stack & Mobile Developer",
    description: "Portfolio of Habib Tanwir, a Full Stack Developer and Mobile App Developer.",
  }
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
