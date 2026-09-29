import Link from "next/link";
import { ArrowUp, ArrowUpRight, Github, Instagram, Linkedin, Mail } from "lucide-react";
import XIcon from "@/components/ui/XIcon";
import LogoMark from "@/components/ui/LogoMark";
import ScrollLink from "@/components/ui/ScrollLink";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import type { SiteSettings } from "@/lib/sanity";
import { whatsappUrl } from "@/lib/contact";

// `section` links scroll to a part of the home page without adding "#..." to the URL.
const LINKS: { name: string; href?: string; section?: string }[] = [
  { name: "Work", href: "/work" },
  { name: "About", section: "about" },
  { name: "Services", section: "services" },
  { name: "Writing", href: "/blogs" },
  { name: "Leave a review", href: "/review" },
];

export default function Footer({ settings }: { settings: SiteSettings }) {
  const name = settings.name || "Habib Tanwir";
  // Social icons + resume come from admin Settings and only appear once they're filled in.
  const socials = [
    { href: settings.githubUrl, label: "GitHub", icon: Github },
    { href: settings.linkedinUrl, label: "LinkedIn", icon: Linkedin },
    { href: settings.twitterUrl, label: "X", icon: XIcon },
    { href: settings.instagramUrl, label: "Instagram", icon: Instagram },
  ].filter((s) => s.href);

  return (
    <footer className="overflow-hidden bg-forest-deep text-on-forest">
      <div className="container-app grid gap-10 border-b border-on-forest/10 py-14 md:grid-cols-3 md:items-center">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <LogoMark className="h-8" />
            <span className="h-6 w-px bg-on-forest/25" aria-hidden="true" />
            <span className="font-serif text-2xl">{name}</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-on-forest-muted">Full-stack engineer &amp; visual designer.</p>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap gap-x-7 gap-y-3 md:justify-center">
          {LINKS.map((l) =>
            l.section ? (
              <ScrollLink key={l.name} to={l.section} className="eyebrow text-on-forest-muted transition-colors hover:text-on-forest">
                {l.name}
              </ScrollLink>
            ) : (
              <Link key={l.name} href={l.href!} className="eyebrow text-on-forest-muted transition-colors hover:text-on-forest">
                {l.name}
              </Link>
            )
          )}
        </nav>

        {/* Contact */}
        <div className="flex flex-wrap items-center gap-3 md:justify-end">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-medium text-fg transition-transform hover:-translate-y-0.5"
          >
            <WhatsAppIcon className="size-4" />
            Chat on WhatsApp
          </a>
          {settings.resumeUrl && (
            <a
              href={settings.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="eyebrow inline-flex items-center gap-1 rounded-full border border-on-forest/25 px-4 py-2.5 text-[0.64rem] text-on-forest-muted transition-colors hover:bg-on-forest hover:text-forest-deep"
            >
              Resume <ArrowUpRight className="size-3" />
            </a>
          )}
          {settings.email && (
            <a
              href={`mailto:${settings.email}`}
              aria-label={`Email ${settings.email}`}
              title={settings.email}
              className="flex size-10 items-center justify-center rounded-full border border-on-forest/25 text-on-forest-muted transition-colors hover:bg-on-forest hover:text-forest-deep"
            >
              <Mail className="size-4" />
            </a>
          )}
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="flex size-10 items-center justify-center rounded-full border border-on-forest/25 text-on-forest-muted transition-colors hover:bg-on-forest hover:text-forest-deep"
            >
              <s.icon className="size-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="container-app flex flex-col-reverse gap-4 py-6 text-xs text-on-forest-muted sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} {name}. All rights reserved.</span>
        <ScrollLink to="top" className="eyebrow inline-flex items-center gap-2 hover:text-sun">
          Back to top <ArrowUp className="size-3.5" />
        </ScrollLink>
      </div>

      <p
        aria-hidden="true"
        className="select-none whitespace-nowrap px-2 pb-2 text-center font-display text-[16.5vw] font-extrabold leading-[0.8] tracking-tighter text-on-forest/90"
      >
        {name.split(" ")[0]}
        <span className="text-accent">.</span>
      </p>
    </footer>
  );
}
