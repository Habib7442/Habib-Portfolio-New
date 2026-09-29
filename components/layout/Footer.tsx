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

const heading = "eyebrow mb-5 text-sun";
const linkCls = "text-on-forest-muted transition-colors hover:text-on-forest";

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
      <div className="container-app grid gap-12 border-b border-on-forest/10 py-16 md:grid-cols-12 md:gap-8">
        {/* Brand + contact */}
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <LogoMark className="h-8" />
            <span className="h-6 w-px bg-on-forest/25" aria-hidden="true" />
            <span className="font-serif text-2xl">{name}</span>
          </div>
          <p className="mt-4 max-w-xs text-on-forest-muted">
            Full-stack engineer &amp; visual designer. Building fast websites, products and the visuals that sell them.
          </p>
          <div className="mt-7 flex flex-col items-start gap-3">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-medium text-fg transition-transform hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="size-4" />
              Chat on WhatsApp
            </a>
            {settings.email && (
              <a href={`mailto:${settings.email}`} className={`inline-flex items-center gap-2 text-sm ${linkCls}`}>
                <Mail className="size-4" />
                {settings.email}
              </a>
            )}
          </div>
        </div>

        {/* Pages */}
        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
          <p className={heading}>Pages</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
            {LINKS.map((l) => (
              <li key={l.name}>
                {l.section ? (
                  <ScrollLink to={l.section} className={linkCls}>
                    {l.name}
                  </ScrollLink>
                ) : (
                  <Link href={l.href!} className={linkCls}>
                    {l.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Follow */}
        {(socials.length > 0 || settings.resumeUrl) && (
          <div className="md:col-span-3 md:col-start-10">
            <p className={heading}>Follow</p>
            <div className="flex flex-wrap gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex size-11 items-center justify-center rounded-full border border-on-forest/20 text-on-forest-muted transition-colors hover:border-on-forest hover:bg-on-forest hover:text-forest-deep"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
            {settings.resumeUrl && (
              <a
                href={settings.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className={`mt-5 inline-flex items-center gap-1 text-sm ${linkCls}`}
              >
                Download resume <ArrowUpRight className="size-3.5" />
              </a>
            )}
          </div>
        )}
      </div>

      <div className="container-app flex flex-col-reverse gap-4 py-6 text-sm text-on-forest-muted sm:flex-row sm:items-center sm:justify-between">
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
