import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import FeaturedLanding from "@/components/sections/FeaturedLanding";
import FeaturedWork from "@/components/sections/FeaturedWork";
import GalleryBand from "@/components/sections/GalleryBand";
import Services, { type Service } from "@/components/sections/Services";
import LandingShowcase from "@/components/sections/LandingShowcase";
import Products from "@/components/sections/Products";
import Testimonials from "@/components/sections/Testimonials";
import Writing from "@/components/sections/Writing";
import Contact from "@/components/sections/Contact";
import Faq from "@/components/sections/Faq";
import { PendingScroll } from "@/components/ui/ScrollLink";
import JsonLd from "@/components/seo/JsonLd";
import { buildFaqs } from "@/lib/faq";
import { homeSchema } from "@/lib/schema";
import type { Metadata } from "next";
import { getSiteSettings, getProjects, getDesigns, getLandingPages, getBlogs, getProducts, getTestimonials } from "@/lib/sanity";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function HomePage() {
  const [settings, projects, designs, landingPages, blogs, products, testimonials] = await Promise.all([
    getSiteSettings(),
    getProjects(),
    getDesigns(),
    getLandingPages(),
    getBlogs(),
    getProducts(),
    getTestimonials(),
  ]);

  const faqs = buildFaqs({ name: settings.name, projects, designCount: designs.length, landingCount: landingPages.length });

  const featured = projects.some((p) => p.featured) ? projects.filter((p) => p.featured) : projects;
  // Landing pages arrive featured-first; the top one gets its own section, the rest go in the grid.
  const spotlight = landingPages.find((l) => l.featured);
  const otherLandingPages = landingPages.filter((l) => l !== spotlight);

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
        <FeaturedLanding page={spotlight} />
        <LandingShowcase pages={otherLandingPages} />
        <FeaturedWork projects={featured} />
        <Products products={products} />
        <Testimonials testimonials={testimonials} />
        <Services services={services} />
        <GalleryBand designs={designs} />
        <Writing posts={blogs} />
        <Faq faqs={faqs} />
        <Contact settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
