import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Reviews from '@/components/sections/Reviews';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Projects />
      <About />
      <Reviews />
      <Contact />
    </Layout>
  );
}
