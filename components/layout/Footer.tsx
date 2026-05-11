"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GITHUB", href: "https://github.com/Habib7442" },
    { name: "LINKEDIN", href: "https://linkedin.com/in/habib-tanwir" },
    { name: "X", href: "https://x.com/TanwirHabib" },
    { name: "READ.CV", href: "#" },
  ];

  return (
    <footer className="relative bg-bg z-20 pb-12">
      <div className="container-editorial">
        <div className="w-full h-px bg-border mb-8" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Link href="/#home" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-border bg-bg-elevated flex-shrink-0">
                <Image 
                  src="/logo.png" 
                  alt="HT" 
                  width={32}
                  height={32}
                  className="w-full h-full object-cover" 
                />
              </div>
              <span className="font-display text-xl text-fg">Habib Tanwir</span>
            </Link>
            <span className="font-mono text-[10px] font-medium tracking-widest text-fg-subtle uppercase">
              ©{currentYear} ALL RIGHTS RESERVED
            </span>
          </div>
          
          {/* Center: Social Links mono strip */}
          <div className="flex items-center gap-5 text-[10px] font-mono font-medium tracking-[0.1em]">
            {socialLinks.map((link, i) => (
              <div key={link.name} className="flex items-center gap-5">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg-muted hover:text-accent transition-colors"
                >
                  {link.name}
                </a>
                {i < socialLinks.length - 1 && (
                  <span className="text-border-strong">·</span>
                )}
              </div>
            ))}
          </div>
          
          {/* Right: Back to Top */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[10px] font-mono font-medium tracking-widest text-fg-muted hover:text-fg transition-colors flex items-center gap-2 group"
          >
            <span className="group-hover:-translate-y-0.5 transition-transform">↑</span> BACK TO TOP
          </button>
        </div>
      </div>
    </footer>
  );
}
