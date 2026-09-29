"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import LogoMark from "@/components/ui/LogoMark";
import ScrollLink from "@/components/ui/ScrollLink";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { whatsappUrl } from "@/lib/contact";
import { cn } from "@/lib/utils";

// `section` links scroll to a part of the home page without adding "#..." to the URL.
const LINKS: { name: string; href?: string; section?: string }[] = [
  { name: "Work", href: "/work" },
  { name: "About", section: "about" },
  { name: "Services", section: "services" },
  { name: "Writing", href: "/blogs" },
  { name: "Review", href: "/review" },
];

// Every page opens on a forest-green band, so the bar starts light-on-green and
// flips to dark-on-white once the band has scrolled away.
export default function Navbar({ name = "Habib Tanwir" }: { name?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "bg-bg/85 py-3 shadow-[0_1px_0_var(--color-border)] backdrop-blur-lg" : "py-5 md:py-6"
        )}
      >
        <div className="container-app flex items-center justify-between">
          <Link
            href="/"
            aria-label={`${name} — home`}
            className={cn("flex items-center gap-3 text-lg font-semibold tracking-tight", scrolled ? "text-fg" : "text-on-forest")}
          >
            <LogoMark className="h-8" />
            <span className="h-6 w-px bg-current opacity-25" aria-hidden="true" />
            <span className="font-serif text-2xl font-normal">{name}</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => {
              const cls = cn(
                "eyebrow transition-colors",
                scrolled ? "text-fg-muted hover:text-fg" : "text-on-forest-muted hover:text-on-forest"
              );
              return l.section ? (
                <ScrollLink key={l.name} to={l.section} className={cls}>
                  {l.name}
                </ScrollLink>
              ) : (
                <Link key={l.name} href={l.href!} className={cls}>
                  {l.name}
                </Link>
              );
            })}
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              className="eyebrow inline-flex items-center gap-2 rounded-full bg-sun px-5 py-2.5 text-fg transition-transform hover:scale-[1.04] active:scale-[0.98]"
            >
              <WhatsAppIcon className="size-3.5" />
              Let&apos;s talk
            </a>
          </nav>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className={cn("flex flex-col items-end gap-1.5 p-2 md:hidden", scrolled ? "text-fg" : "text-on-forest")}
          >
            <span className="block h-0.5 w-7 rounded bg-current" />
            <span className="block h-0.5 w-5 rounded bg-current" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col bg-forest px-6 pt-6 pb-10 text-on-forest"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-3 font-serif text-2xl">
                <LogoMark className="h-8" />
                {name}
              </span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2">
                <X className="size-7" />
              </button>
            </div>
            <nav className="mt-16 flex flex-col gap-6">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  {l.section ? (
                    <ScrollLink to={l.section} onNavigate={() => setOpen(false)} className="font-serif text-5xl">
                      {l.name}
                    </ScrollLink>
                  ) : (
                    <Link href={l.href!} onClick={() => setOpen(false)} className="font-serif text-5xl">
                      {l.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 py-4 font-medium text-fg"
            >
              <WhatsAppIcon className="size-5" />
              Chat on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
