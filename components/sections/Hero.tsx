import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, Instagram, Linkedin } from "lucide-react";
import XIcon from "@/components/ui/XIcon";
import { SparkStar } from "@/components/ui/Marquee";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { whatsappUrl } from "@/lib/contact";
import { imgUrl, type SiteSettings } from "@/lib/sanity";

const delay = (s: number) => ({ animationDelay: `${s}s` });

/**
 * One layout for every screen (a single h1 and a single portrait in the HTML).
 * Phones & tablets: a centred column — portrait, name, pitch, then the meta strip.
 * Desktop (lg+): name / portrait / pitch in a row, vertically centred on the portrait;
 * justify-between hands leftover width out equally, so the gaps either side of the portrait match.
 */
export default function Hero({ settings }: { settings: SiteSettings }) {
  const fullName = settings.name || "Habib Tanwir";
  const [first, ...rest] = fullName.split(" ");
  const tagline = settings.tagline || "I help business owners get more customers — with websites that actually sell.";
  const portrait = settings.profileUrl ? imgUrl(settings.profileUrl, 900) : "/habib.webp";

  const socials = [
    { href: settings.githubUrl, label: "GitHub", icon: Github },
    { href: settings.linkedinUrl, label: "LinkedIn", icon: Linkedin },
    { href: settings.twitterUrl, label: "X", icon: XIcon },
    { href: settings.instagramUrl, label: "Instagram", icon: Instagram },
  ].filter((s) => s.href);

  return (
    <section id="home" className="relative overflow-hidden bg-forest text-on-forest">
      <div className="container-app pt-28 pb-12 lg:pt-32 lg:pb-16">
        <div className="flex flex-col items-center text-center lg:flex-row lg:justify-between lg:gap-10 lg:text-left">
          {/* Name */}
          <div className="order-2 mt-8 shrink-0 animate-fade-up lg:order-1 lg:mt-0">
            <p className="eyebrow text-sun lg:mb-5">Hello, I&apos;m</p>
            <h1 className="mt-3 font-serif text-5xl leading-none lg:mt-0 lg:text-display-xl lg:leading-[0.92] xl:text-[clamp(6rem,7vw,8rem)]">
              <span className="lg:block">{first}</span>
              {rest.length > 0 && (
                <>
                  {" "}
                  <span className="lg:block">{rest.join(" ")}</span>
                </>
              )}
            </h1>
            <div className="mt-4 flex items-start justify-center gap-3 lg:mt-8 lg:justify-start">
              <span className="mt-2 hidden h-0.5 w-8 shrink-0 bg-accent lg:block" />
              <p className="eyebrow leading-relaxed text-on-forest-muted">
                Web developer <span className="lg:block">&amp; designer</span>
              </p>
            </div>
          </div>

          {/* Arch portrait. On desktop its width follows viewport height (4:5 arch) so the whole hero,
              meta strip included, fits above the fold. */}
          <div
            className="relative z-10 order-1 w-44 shrink-0 animate-fade-up lg:order-2 lg:w-[max(18rem,min(26rem,32vw,calc((100svh_-_21rem)*0.8)))]"
            style={delay(0.1)}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-forest-deep">
              <Image
                src={portrait}
                alt={fullName}
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1280px) 416px, (min-width: 1024px) 33vw, 176px"
                className="object-cover object-top"
              />
            </div>
            {/* Spark rides with the portrait and lands on the meta-strip rule 4rem below (mt-16), centred under it */}
            <span className="absolute top-[calc(100%+2.625rem)] left-1/2 hidden size-11 -translate-x-1/2 items-center justify-center rounded-full bg-bg shadow-md lg:flex">
              <SparkStar className="size-4 text-fg" />
            </span>
          </div>

          {/* Pitch + actions */}
          <div className="order-3 mt-6 w-full max-w-xs min-w-0 animate-fade-up lg:mt-0 lg:w-auto lg:max-w-none lg:basis-[30rem]" style={delay(0.2)}>
            <p className="text-lg leading-relaxed text-on-forest/85 lg:font-serif lg:text-[2rem] lg:leading-snug lg:text-on-forest">
              <span className="hidden text-accent lg:inline" aria-hidden="true">
                &ldquo;
              </span>
              {tagline}
            </p>

            <div className="mt-9 flex flex-col gap-3 lg:mt-10 lg:flex-row lg:flex-wrap">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                className="eyebrow inline-flex items-center justify-center gap-2 rounded-full bg-sun px-6 py-4 text-fg transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                <WhatsAppIcon className="size-4" />
                Contact me
              </a>
              <Link
                href="/work"
                className="group eyebrow inline-flex items-center justify-center gap-2 rounded-full border border-on-forest/30 px-6 py-4 text-on-forest transition-colors hover:border-on-forest"
              >
                See my work
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <Link
              href="/hire"
              className="mt-5 inline-block text-sm text-on-forest-muted underline-offset-4 transition-colors hover:text-on-forest hover:underline"
            >
              For hiring teams &rarr;
            </Link>
          </div>
        </div>

        {/* Meta strip */}
        <div
          className="mt-10 flex flex-col items-center gap-5 border-t border-on-forest/15 pt-8 animate-fade-up lg:mt-16 lg:flex-row lg:justify-between"
          style={delay(0.35)}
        >
          <p className="eyebrow flex items-center gap-3 text-on-forest-muted">
            <span className="size-2 shrink-0 rounded-full bg-sun" />
            <span className="max-w-[15rem] sm:max-w-none">Taking on new client projects — Assam &amp; worldwide</span>
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
                  className="flex size-11 items-center justify-center rounded-full border border-on-forest/25 transition-colors hover:bg-on-forest hover:text-forest lg:size-10"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
