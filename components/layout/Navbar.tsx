"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Work", href: "/work" },
    { name: "About", href: "/#about" },
    { name: "Writing", href: "/blogs" },
    { name: "Reviews", href: "/leave-review" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <>

      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all ${
          scrolled ? "nav-glass" : ""
        }`}
        style={{
          paddingTop: scrolled ? "12px" : "20px",
          paddingBottom: scrolled ? "12px" : "20px",
          backgroundColor: scrolled ? undefined : "transparent",
          borderBottom: scrolled ? undefined : "none",
        }}
      >
        <div className="container-editorial flex items-center justify-between">
          {/* Logotype */}
          <Link
            href="/#home"
            className="font-display text-lg tracking-tight transition-colors"
            style={{ color: "var(--fg)" }}
          >
            Habib Tanwir
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm transition-colors"
                style={{ color: "var(--fg-muted)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--fg)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--fg-muted)")
                }
              >
                {link.name}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile: toggle + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              className="flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Menu"
              style={{ color: "var(--fg)" }}
            >
              <span
                className="block w-5 h-[1.5px]"
                style={{ backgroundColor: "var(--fg)" }}
              />
              <span
                className="block w-5 h-[1.5px]"
                style={{ backgroundColor: "var(--fg)" }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex flex-col justify-center items-center"
            style={{ backgroundColor: "var(--bg)" }}
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-5 right-6 w-8 h-8 flex items-center justify-center"
              aria-label="Close Menu"
              style={{ color: "var(--fg)" }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.06,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-display text-4xl transition-colors"
                    style={{ color: "var(--fg)" }}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <a
                  href="mailto:habibtanwir1906@gmail.com"
                  className="text-sm"
                  style={{ color: "var(--accent)" }}
                >
                  habibtanwir1906@gmail.com
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
