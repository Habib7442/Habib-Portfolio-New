'use client';

import { motion } from 'framer-motion';
import { ArrowDown, MapPin, Calendar, Terminal } from 'lucide-react';
import Image from 'next/image';
import Container from '@/components/layout/Container';
import { BackgroundGrid } from '@/components/ui/background-grid';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { Spotlight } from '@/components/ui/spotlight';

const personalInfo = {
  name: 'Habib Tanwir',
  title: 'Full Stack Developer & Mobile App Developer',
  location: 'India',
  experience: '3+ years',
  description: 'Passionate Full Stack Developer specializing in React, Next.js, and React Native. Expert in creating dynamic, user-friendly web applications and mobile apps with modern technologies and best practices.',
  avatar: '/avatar.png',
  resumeUrl: '/resume.pdf',
  products: [
    {
      name: 'ImageStudioLab',
      url: 'https://www.imagestudiolab.com/',
      description: 'AI-Powered Image Studio'
    },
    {
      name: 'Link4Coders',
      url: 'https://www.link4coders.in/',
      description: 'Developer-first bio platform'
    }
  ]
};

const stats = [
  { label: 'Projects Completed', value: '20+' },
  { label: 'GitHub Repos', value: '62' },
  { label: 'Years Experience', value: '3+' },
  { label: 'Technologies', value: '15+' }
];

export default function Hero() {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center py-20 overflow-hidden">
      <BackgroundGrid className="absolute inset-0 opacity-30" />
      <Spotlight
        className="absolute -top-40 left-0 md:left-60 md:-top-20 opacity-50"
        fill="#ff00ff"
      />
      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto text-center lg:text-left">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-2"
            >
              <p className="text-neon-blue font-vt323 text-2xl tracking-widest">
                &lt;SYSTEM_READY&gt; Hello, I'm
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-6 flex-wrap sm:flex-nowrap">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground uppercase tracking-tighter glitch" data-text={personalInfo.name}>
                  <span className="text-neon-pink drop-shadow-[0_0_10px_rgba(255,0,255,0.5)]">
                    {personalInfo.name}
                  </span>
                </h1>
                {/* Avatar next to name */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-none border-2 border-neon-blue shadow-[0_0_15px_rgba(0,255,255,0.5)] flex-shrink-0 overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-neon-blue/20 group-hover:bg-transparent transition-colors z-10" />
                  <Image
                    src={personalInfo.avatar}
                    alt={personalInfo.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    priority
                  />
                </motion.div>
              </div>
              <div className="text-xl md:text-2xl text-neon-blue/80 font-vt323 tracking-wide">
                <TextGenerateEffect words={`> ${personalInfo.title}`} />
              </div>
              
              <div className="space-y-3 space-x-3 flex flex-col sm:flex-row pt-2">
                <p className="text-lg text-neon-yellow font-rajdhani font-medium">
                  <span className="text-neon-purple mr-2">►</span>
                  Co-founder at{' '}
                  <a
                    href="https://flerid.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon-blue hover:text-neon-pink transition-colors duration-200 hover:underline decoration-neon-pink underline-offset-4"
                  >
                    flerid.com
                  </a>
                </p>
                <p className="text-lg text-neon-yellow font-rajdhani font-medium">
                  <span className="text-neon-purple mr-2">►</span>
                  Creator of{' '}
                  <a
                    href="https://www.axomprep.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon-blue hover:text-neon-pink transition-colors duration-200 hover:underline decoration-neon-pink underline-offset-4"
                  >
                    axomprep.com
                  </a>
                </p>
                <p className="text-lg text-neon-yellow font-rajdhani font-medium">
                  <span className="text-neon-purple mr-2">►</span>
                  Creator of{' '}
                  <a
                    href="https://www.link4coders.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon-blue hover:text-neon-pink transition-colors duration-200 hover:underline decoration-neon-pink underline-offset-4"
                  >
                    Link4Coders.in
                  </a>
                </p>
              </div>
            </motion.div>

            {/* Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <div className="flex items-center space-x-2 px-4 py-2 bg-black/50 border border-neon-blue/50 text-neon-blue font-vt323 text-lg hover:bg-neon-blue/10 transition-colors cursor-crosshair">
                <MapPin size={16} className="text-neon-pink" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-black/50 border border-neon-purple/50 text-neon-purple font-vt323 text-lg hover:bg-neon-purple/10 transition-colors cursor-crosshair">
                <Calendar size={16} className="text-neon-yellow" />
                <span>{personalInfo.experience}</span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg text-foreground/80 leading-relaxed max-w-lg font-rajdhani border-l-2 border-neon-pink pl-4"
            >
              {personalInfo.description}
            </motion.p>

            {/* Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex justify-center lg:justify-start"
            >
              <motion.button
                onClick={scrollToProjects}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px var(--neon-blue)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-transparent border-2 border-neon-blue text-neon-blue font-orbitron tracking-wider hover:bg-neon-blue hover:text-black transition-all duration-200 flex items-center justify-center space-x-2 uppercase"
              >
                <Terminal size={18} className="mr-2" />
                <span>Initialize_View</span>
                <ArrowDown size={18} className="animate-bounce" />
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
                  className="text-center space-y-1 border border-white/10 p-4 bg-white/5 backdrop-blur-sm hover:border-neon-pink/50 transition-colors"
                >
                  <p className="text-3xl font-bold text-neon-pink font-vt323">
                    {stat.value}
                  </p>
                  <p className="text-xs text-neon-blue uppercase tracking-widest font-orbitron">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="w-full flex justify-center mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center space-y-2 text-neon-blue/60"
          >
            <span className="text-xs font-orbitron tracking-[0.2em] uppercase">Scroll_Down</span>
            <ArrowDown size={20} />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
