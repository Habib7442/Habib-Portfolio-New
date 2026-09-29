import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import CategoryBar from "@/components/sections/CategoryBar";
import About from "@/components/sections/About";
import FeaturedWork from "@/components/sections/FeaturedWork";
import GalleryBand from "@/components/sections/GalleryBand";
import Services, { type Service } from "@/components/sections/Services";
import LandingShowcase from "@/components/sections/LandingShowcase";
import Testimonials from "@/components/sections/Testimonials";
import Writing from "@/components/sections/Writing";
import Contact from "@/components/sections/Contact";
import Faq from "@/components/sections/Faq";
import Marquee from "@/components/ui/Marquee";
import { PendingScroll } from "@/components/ui/ScrollLink";
import JsonLd from "@/components/seo/JsonLd";
import { buildFaqs } from "@/lib/faq";
import { homeSchema } from "@/lib/schema";
import type { Metadata } from "next";
import { getSiteSettings, getProjects, getDesigns, getLandingPages, getBlogs, getReviews } from "@/lib/sanity";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function HomePage() {
  const [settings, projects, designs, landingPages, blogs, reviews] = await Promise.all([
    getSiteSettings(),
    getProjects(),
    getDesigns(),
    getLandingPages(),
    getBlogs(),
    getReviews(),
  ]);

  const faqs = buildFaqs({ name: settings.name, projects, designCount: designs.length, landingCount: landingPages.length });

  const featured = projects.some((p) => p.featured) ? projects.filter((p) => p.featured) : projects;

  // Each service shows a different design: first match by category preference, never reusing one.
  const usedDesigns = new Set<string>();
  const pickDesign = (...cats: string[]) => {
    const match = cats
      .flatMap((c) => designs.filter((d) => d.category === c))
      .find((d) => d.imageUrl && !usedDesigns.has(d._id));
    if (!match) return undefined;
    usedDesigns.add(match._id);
    return match.imageUrl;
  };
  const services: Service[] = [
    {
      title: "Full-stack development",
      description: "Web apps and SaaS products built end to end — database, API, auth, and a fast, polished front end.",
      points: ["Next.js, React & TypeScript", "APIs, auth & databases", "Deployed, monitored, handed over cleanly"],
      imageUrl: projects.find((p) => p.thumbnailUrl)?.thumbnailUrl,
    },
    {
      title: "Landing pages",
      description: "High-converting landing pages that load instantly, read clearly, and look great on every phone.",
      points: ["Copy-first layout & design", "Built in code, not a page builder", "SEO & performance baked in"],
      imageUrl: landingPages.find((l) => l.imageUrl)?.imageUrl,
    },
    {
      title: "Posters & social media",
      description: "Scroll-stopping posters, event creatives, and social media designs that stay on brand.",
      points: ["Event & promo posters", "Instagram & LinkedIn creatives", "Carousel & story formats"],
      imageUrl: pickDesign("social_media", "photoshoot", "poster"),
    },
    {
      title: "Branding & visual identity",
      description: "Logos, colour, and type systems so everything you ship looks like it belongs together.",
      points: ["Logo & identity", "Brand colours & typography", "Templates your team can reuse"],
      imageUrl: pickDesign("branding", "ui", "illustration", "photoshoot", "poster"),
    },
  ];

  return (
    <>
      <JsonLd data={homeSchema(faqs)} />
      <PendingScroll />
      <Navbar name={settings.name} />
      <main id="main-content">
        <Hero settings={settings} />
        <CategoryBar
          items={[
            { label: "Projects", count: projects.length, href: "/work?type=project" },
            { label: "Designs", count: designs.length, href: "/work?type=design" },
            { label: "Landing pages", shortLabel: "Landing", count: landingPages.length, href: "/work?type=landing" },
          ]}
        />
        <Marquee items={["Beyond templates", "Built to convert", "Designed with care", "Shipped fast", "Pixel & code"]} />
        <About settings={settings} />
        <FeaturedWork projects={featured} />
        <GalleryBand designs={designs} />
        <Marquee
          className="bg-bg-alt"
          items={["Full-stack development", "Landing pages", "Posters", "Social media", "Branding"]}
        />
        <Services services={services} />
        <LandingShowcase pages={landingPages} />
        <Testimonials reviews={reviews} />
        <Writing posts={blogs} />
        <Faq faqs={faqs} />
        <Contact settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
