import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import Products from "@/components/sections/Products";
import { LandingPageCard } from "@/components/sections/WorkGrid";
import SkillIcons from "@/components/ui/SkillIcons";
import { getLandingPages, getProducts, getSiteSettings } from "@/lib/sanity";
import { FALLBACK_SAME_AS, LOCALLIFY, SKILLS } from "@/lib/site";

export const metadata: Metadata = {
  title: "For hiring teams",
  description:
    "Habib Tanwir — full-stack web developer and designer. Stack, products, best landing pages, GitHub, LinkedIn and resume in one place.",
  alternates: { canonical: "/hire" },
};

const RESUME = "/resume-habib-tanwir.pdf";

const button =
  "eyebrow inline-flex items-center gap-2 rounded-full border border-on-forest/30 px-5 py-3 text-on-forest transition-colors hover:border-on-forest";

export default async function HirePage() {
  const [settings, landingPages, products] = await Promise.all([getSiteSettings(), getLandingPages(), getProducts()]);
  const name = settings.name || "Habib Tanwir";
  const github = settings.githubUrl || FALLBACK_SAME_AS[0];
  const linkedin = settings.linkedinUrl || FALLBACK_SAME_AS[1];
  const bestLandingPages = landingPages.filter((l) => l.imageUrl || l.video.poster).slice(0, 3);

  return (
    <>
      <Navbar name={settings.name} />
      <main id="main-content">
        <PageHeader
          eyebrow="For hiring teams"
          title={
            <>
              Full-stack developer <span className="italic text-sun">&amp; designer</span>
            </>
          }
          intro={`I'm ${name}. I build web apps, SaaS products and landing pages end to end — database, API, front end and the design around it — and ship them to production. I'm based in Silchar, Assam, work remotely, and founded ${LOCALLIFY.name}.`}
        >
          <div className="mt-8 flex flex-wrap gap-3">
            {process.env.HAS_RESUME && (
              <a href={RESUME} download className="eyebrow inline-flex items-center gap-2 rounded-full bg-sun px-5 py-3 text-fg transition-transform hover:-translate-y-0.5">
                <Download className="size-4" /> Download resume
              </a>
            )}
            <a href={github} target="_blank" rel="noreferrer" className={button}>
              <Github className="size-4" /> GitHub
            </a>
            <a href={linkedin} target="_blank" rel="noreferrer" className={button}>
              <Linkedin className="size-4" /> LinkedIn
            </a>
            {settings.email && (
              <a href={`mailto:${settings.email}`} className={button}>
                <Mail className="size-4" /> Email
              </a>
            )}
          </div>
        </PageHeader>

        <section aria-labelledby="stack" className="py-16 md:py-20">
          <div className="container-app grid gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-4 text-accent-hover">✦ Stack</p>
              <h2 id="stack" className="font-serif text-display-md leading-[1.05]">
                What I work with
              </h2>
            </div>
            <div className="lg:col-span-8">
              <SkillIcons />
              <p className="mt-6 max-w-xl text-fg-muted">
                Day to day: {SKILLS.join(", ")}. Landing pages are hand-built in HTML, CSS and JavaScript with GSAP for motion
                where it earns its place.
              </p>
            </div>
          </div>
        </section>

        <Products products={products} />

        {bestLandingPages.length > 0 && (
          <section aria-labelledby="landing" className="border-t border-border py-16 md:py-20">
            <div className="container-app">
              <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="eyebrow mb-4 text-accent-hover">✦ Landing pages</p>
                  <h2 id="landing" className="font-display text-display-md font-bold leading-[1.05] tracking-tight">
                    Best landing pages
                  </h2>
                  <p className="mt-4 max-w-md text-fg-muted">Each one has a write-up of how it was built.</p>
                </div>
                <Link href="/work?type=landing" className="eyebrow inline-flex shrink-0 items-center gap-1.5 text-fg hover:text-accent-hover">
                  See all <ArrowUpRight className="size-4" />
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {bestLandingPages.map((l) => (
                  <LandingPageCard key={l._id} l={l} />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="border-t border-border py-16 md:py-20">
          <div className="container-app flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-xl font-serif text-3xl leading-snug">Want the full picture? Every project, landing page and design is on the work page.</p>
            <Link
              href="/work"
              className="eyebrow inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-forest px-6 py-3.5 text-on-forest transition-transform hover:-translate-y-0.5 md:self-auto"
            >
              All work <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
