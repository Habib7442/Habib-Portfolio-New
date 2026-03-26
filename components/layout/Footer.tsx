"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#FDFBF7] z-20 py-8 border-t-2 border-black">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: HT Monogram */}
        <Link 
          href="/#home" 
          className="text-2xl font-syne font-bold tracking-tighter text-[#111] hover:text-[#9333EA] transition-colors drop-shadow-[1px_1px_0px_#fff]"
        >
          HT<span className="text-[#9333EA]">.</span>
        </Link>
        
        {/* Center: Copyright */}
        <p className="font-mono text-xs text-[#111] uppercase tracking-widest text-center font-bold">
          © {new Date().getFullYear()} Habib Tanwir — All Rights Reserved
        </p>
        
        {/* Right: Social Links minimal */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/Habib7442"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#111] hover:text-[#9333EA] hover:-translate-y-1 transition-all"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com/in/habib-tanwir"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#111] hover:text-[#06B6D4] hover:-translate-y-1 transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://x.com/TanwirHabib"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#111] hover:text-[#F472B6] hover:-translate-y-1 transition-all"
            aria-label="Twitter"
          >
            <Twitter size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
