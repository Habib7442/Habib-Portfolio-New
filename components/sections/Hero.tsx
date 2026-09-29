"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, Instagram, Linkedin } from "lucide-react";
import XIcon from "@/components/ui/XIcon";
import { SparkStar } from "@/components/ui/Marquee";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { whatsappUrl } from "@/lib/contact";
import { imgUrl, type SiteSettings } from "@/lib/sanity";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero({ settings }: { settings: SiteSettings }) {
  const fullName = settings.name || "Habib Tanwir";
  const [first, ...rest] = fullName.split(" ");
  const tagline = settings.tagline || "I build fast products — and design the pages that sell them.";
  const portrait = settings.profileUrl ? imgUrl(settings.profileUrl, 900) : "/habib.webp";

  const socials = [
    { href: settings.githubUrl, label: "GitHub", icon: Github },
    { href: settings.linkedinUrl, label: "LinkedIn", icon: Linkedin },
    { href: settings.twitterUrl, label: "X", icon: XIcon },
    { href: settings.instagramUrl, label: "Instagram", icon: Instagram },
  ].filter((s) => s.href);

  return (
    <section id="home" className="relative overflow-hidden bg-forest text-on-forest">
      {/* ── Phones & small tablets: one simple centered column ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="container-app flex flex-col items-center pt-28 pb-16 text-center md:hidden"
      >
        <div className="relative aspect-[4/5] w-44 overflow-hidden rounded-t-full bg-forest-deep">
          <Image src={portrait} alt={fullName} fill priority sizes="176px" className="object-cover object-top" />
        </div>

        <p className="eyebrow mt-8 text-sun">Hello, I&apos;m</p>
        <h1 className="mt-3 font-serif text-5xl leading-none">{fullName}</h1>
        <p className="eyebrow mt-4 text-on-forest-muted">Full-stack engineer &amp; visual designer</p>

        <p className="mt-6 max-w-xs text-lg leading-relaxed text-on-forest/85">{tagline}</p>

        <div className="mt-9 flex w-full max-w-xs flex-col gap-3">
          <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="eyebrow inline-flex items-center justify-center gap-2 rounded-full bg-sun px-6 py-4 text-fg">
            <WhatsAppIcon className="size-4" />
            Contact me
          </a>
          <Link href="/work" className="eyebrow rounded-full border border-on-forest/30 px-6 py-4 text-on-forest">
            See my work
          </Link>
        </div>

        {socials.length > 0 && (
          <div className="mt-8 flex justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex size-11 items-center justify-center rounded-full border border-on-forest/25 transition-colors hover:bg-on-forest hover:text-forest"
              >
                <s.icon className="size-4" />
              </a>
            ))}
          </div>
        )}
      </motion.div>

      {/* ── Tablet & desktop: three-column editorial layout ── */}
      <div className="container-app hidden gap-8 pt-36 pb-28 md:grid md:grid-cols-12">
        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="col-span-4 flex flex-col justify-center"
        >
          <p className="eyebrow mb-5 text-sun">Hello, I&apos;m</p>
          <h1 className="font-serif text-display-xl leading-[0.92]">
            {first}
            {rest.length > 0 && (
              <>
                <br />
                {rest.join(" ")}
              </>
            )}
          </h1>
          <div className="mt-8 flex items-start gap-3">
            <span className="mt-2 h-0.5 w-8 shrink-0 bg-accent" />
            <p className="eyebrow leading-relaxed text-on-forest-muted">
              Full-stack engineer
              <br />
              &amp; visual designer
            </p>
          </div>
        </motion.div>

        {/* Arch portrait */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="relative col-span-4"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-forest-deep">
            <Image src={portrait} alt={fullName} fill priority sizes="33vw" className="object-cover object-top" />
          </div>
          <span className="absolute -bottom-5 left-1/2 flex size-11 -translate-x-1/2 items-center justify-center rounded-full bg-bg shadow-md">
            <SparkStar className="size-4 text-fg" />
          </span>
        </motion.div>

        {/* Quote + contact */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="col-span-4 flex flex-col justify-center gap-7"
        >
          <div>
            <span className="font-serif text-6xl leading-none text-accent">&ldquo;</span>
            <p className="-mt-3 font-serif text-[1.9rem] leading-snug">{tagline}</p>
          </div>

          <p className="eyebrow max-w-[16rem] leading-relaxed text-on-forest-muted">
            Open for freelance &amp; full-time work — remote, worldwide.
          </p>

          {socials.length > 0 && (
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex size-10 items-center justify-center rounded-full border border-on-forest/25 transition-colors hover:bg-on-forest hover:text-forest"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          )}

          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
            className="group flex items-end justify-between rounded-2xl bg-accent px-7 py-7 text-white transition-transform hover:-translate-y-1"
          >
            <span>
              <span className="eyebrow mb-3 flex items-center gap-2 text-white/85">
                <WhatsAppIcon className="size-3.5" /> WhatsApp
              </span>
              <span className="block font-serif text-3xl leading-tight">
                Contact
                <br />
                with me
              </span>
            </span>
            <ArrowUpRight className="size-7 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
