"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#about" },
    { name: "Projects", href: "/#projects" },
    { name: "Reviews", href: "/#reviews" },
    { name: "Blogs", href: "/blogs" },
    { name: "Leave a Review", href: "/leave-review" }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 2.8 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "glass-nav py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/#home" className="text-3xl font-syne font-bold tracking-tighter text-[#111] hover:text-[#9333EA] transition-colors relative group drop-shadow-[2px_2px_0px_#fff]">
            HT<span className="text-[#9333EA]">.</span>
          </Link>

          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-inter text-[#444] font-bold hover:text-[#111] transition-colors relative group uppercase tracking-wider"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-[#9333EA] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <Link
              href="/#contact"
              className="px-6 py-2 rounded-lg font-inter text-sm font-bold bg-[#FDE047] text-[#111] border-2 border-black shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:-translate-y-1 transition-all"
            >
              Hire Me
            </Link>
          </div>

          <button
            className="md:hidden text-[#111] p-2 bg-white border-2 border-black shadow-[2px_2px_0px_#000] rounded-md"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-[#FDFBF7] flex flex-col justify-center items-center"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2 text-[#111] bg-white border-2 border-black shadow-[2px_2px_0px_#000] rounded-md"
              aria-label="Close Menu"
            >
              <X size={28} />
            </button>
            <div className="flex flex-col space-y-8 text-center mt-[-10vh]">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-4xl md:text-6xl font-syne font-bold text-[#111] hover:text-[#9333EA] transition-colors block leading-tight drop-shadow-[2px_2px_0px_#fff]"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="pt-8"
              >
                  <Link
                    href="/#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="neo-btn"
                  >
                    Hire Me
                  </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
