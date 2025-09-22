'use client';

import { motion } from 'framer-motion';
import { ArrowDown, MapPin, Calendar } from 'lucide-react';
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
      <BackgroundGrid className="absolute inset-0">
        <Spotlight
          className="absolute -top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
      </BackgroundGrid>
      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center lg:text-left">
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
              <p className="text-sketch-blue font-handwritten text-xl">
                Hello, I'm
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 flex-wrap sm:flex-nowrap">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground">
                  <span className="handwritten text-sketch-green">
                    {personalInfo.name}
                  </span>
                </h1>
                {/* Avatar next to name */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-sketch-blue/20 shadow-lg flex-shrink-0"
                >
                  <Image
                    src={personalInfo.avatar}
                    alt={personalInfo.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </div>
              <div className="text-xl md:text-2xl text-foreground/80 font-medium">
                <TextGenerateEffect words={personalInfo.title} />
              </div>
              <div className="space-y-3 space-x-3 flex flex-col sm:flex-row">
                <p className="text-lg text-sketch-green font-medium handwritten">
                  Co-founder at{' '}
                  <a
                    href="https://flerid.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sketch-blue hover:text-sketch-purple transition-colors duration-200 underline decoration-sketch-blue hover:decoration-sketch-purple"
                  >
                    flerid.com
                  </a>
                </p>
                <p className="text-lg text-sketch-orange font-medium handwritten">
                  Creator of{' '}
                  <a
                    href="https://www.imagestudiolab.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sketch-blue hover:text-sketch-purple transition-colors duration-200 underline decoration-sketch-blue hover:decoration-sketch-purple"
                  >
                    ImageStudioLab.com
                  </a>
                </p>
                <p className="text-lg text-sketch-purple font-medium handwritten">
                  Creator of{' '}
                  <a
                    href="https://www.link4coders.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sketch-blue hover:text-sketch-purple transition-colors duration-200 underline decoration-sketch-blue hover:decoration-sketch-purple"
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
              <div className="flex items-center space-x-2 px-4 py-2 bg-background border border-notebook-line rounded-lg sketch-border">
                <MapPin size={16} className="text-sketch-orange" />
                <span className="text-sm font-medium">{personalInfo.location}</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-background border border-notebook-line rounded-lg sketch-border">
                <Calendar size={16} className="text-sketch-purple" />
                <span className="text-sm font-medium">{personalInfo.experience}</span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg text-foreground/70 leading-relaxed max-w-lg"
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
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-sketch-blue text-white rounded-lg font-medium sketch-hover transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>View My Work</span>
                <ArrowDown size={18} />
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
                  className="text-center space-y-1"
                >
                  <p className="text-2xl font-bold text-sketch-blue handwritten">
                    {stat.value}
                  </p>
                  <p className="text-sm text-foreground/60 font-medium">
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
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center space-y-2 text-foreground/60"
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <ArrowDown size={20} />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
