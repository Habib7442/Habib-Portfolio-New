import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Designs from "@/components/sections/Designs";
import Writing from "@/components/sections/Writing";
import Testimonials from "@/components/sections/Testimonials";
import { getProjects, getDesigns, getBlogs, getTestimonials } from "@/lib/data";
import Contact from "@/components/sections/Contact";

// Set revalidate to 60 seconds
export const revalidate = 60;

export default async function Home() {
  const projects = await getProjects();
  const designs = await getDesigns();
  const blogs = await getBlogs();
  const testimonials = await getTestimonials();

  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero featuredProject={projects.find(p => p.title.toLowerCase().includes('integratepdf')) || projects[0]} />
        
        {/* Selected Work (Web) */}
        <Projects projects={projects} />
        
        {/* Selected Work (Visual/Branding) */}
        {designs && designs.length > 0 && <Designs designs={designs} />}
        
        {/* About */}
        <About />
        
        {/* Writing Section */}
        <Writing blogs={blogs} />

        {/* Testimonials */}
        <Testimonials testimonials={testimonials} />

        {/* Contact */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
