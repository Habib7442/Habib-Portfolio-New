"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const PENDING_KEY = "pending-scroll";

function scrollToSection(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Link to a section on the home page (e.g. to="about") that scrolls smoothly WITHOUT putting
 * "#about" in the address bar. From another page it navigates to "/" first, then scrolls.
 * The real href stays in the HTML so crawlers and no-JS visitors still get a working link.
 */
export default function ScrollLink({
  to,
  className,
  children,
  onNavigate,
}: {
  to: string;
  className?: string;
  children: React.ReactNode;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <a
      href={to === "top" ? "#" : `/#${to}`}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // let "open in new tab" work
        e.preventDefault();
        onNavigate?.();
        if (to === "top" || pathname === "/") {
          // Wait a frame so a just-closed mobile menu has released the page scroll lock.
          requestAnimationFrame(() => scrollToSection(to));
        } else {
          sessionStorage.setItem(PENDING_KEY, to);
          // scroll:false — otherwise Next scrolls the new page to the top after we've scrolled it.
          router.push("/", { scroll: false });
        }
      }}
    >
      {children}
    </a>
  );
}

/**
 * Mounted on the home page: finishes a scroll requested from another page, and strips any
 * "#section" from old bookmarked links after scrolling to it, so the URL stays clean.
 */
export function PendingScroll() {
  // React Strict Mode (dev) runs effects twice; the ref makes this one-shot so the second
  // run can't find an already-consumed request or cancel the first run's scroll.
  const done = useRef(false);

  // A "#section" typed or pasted while already on the page: browser scrolls, we tidy the URL.
  useEffect(() => {
    const onHash = () => {
      if (window.location.hash) history.replaceState(history.state, "", window.location.pathname + window.location.search);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (done.current) return;
    done.current = true;

    let target: string | null = null;
    try {
      target = sessionStorage.getItem(PENDING_KEY);
      sessionStorage.removeItem(PENDING_KEY);
    } catch {}
    const hash = window.location.hash.slice(1);
    target ??= hash || null;
    if (!target) return;

    const id = target;
    // Let sections/images lay out (and Next's router settle) before scrolling and tidying the URL.
    setTimeout(() => {
      scrollToSection(id);
      if (window.location.hash) {
        history.replaceState(history.state, "", window.location.pathname + window.location.search);
      }
    }, 300);
  }, []);

  return null;
}
