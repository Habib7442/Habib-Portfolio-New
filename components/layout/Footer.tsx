"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#FAFAF7] dark:bg-[#0E0E0C] z-20 pb-12" style={{ backgroundColor: "var(--bg)" }}>
      <div className="container-editorial">
        <div className="w-full h-px bg-[#E1DED5] dark:bg-[#2D2C28] mb-8" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 eyebrow" style={{ fontSize: "10px" }}>
          {/* Left: HT Monogram */}
          <div className="flex items-center gap-6">
            <span style={{ color: "var(--fg)" }}>HT</span>
            <span style={{ color: "var(--fg-subtle)" }}>©{currentYear}</span>
          </div>
          
          {/* Center: Social Links mono strip */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/Habib7442"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--fg)] transition-colors"
            >
              GITHUB
            </a>
            <span style={{ color: "var(--border-strong)" }}>·</span>
            <a
              href="https://linkedin.com/in/habib-tanwir"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--fg)] transition-colors"
            >
              LINKEDIN
            </a>
            <span style={{ color: "var(--border-strong)" }}>·</span>
            <a
              href="https://x.com/TanwirHabib"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--fg)] transition-colors"
            >
              X
            </a>
            <span style={{ color: "var(--border-strong)" }}>·</span>
            <a
              href="#"
              className="hover:text-[var(--fg)] transition-colors"
            >
              READ.CV
            </a>
          </div>
          
          {/* Right: Back to Top */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-[var(--fg)] transition-colors flex items-center gap-2"
          >
            ↑ TOP
          </button>
        </div>
      </div>
    </footer>
  );
}
