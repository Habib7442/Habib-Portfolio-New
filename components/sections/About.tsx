'use client';

import { motion } from 'framer-motion';
import { Code, Palette, Zap, Heart, Coffee, Music } from 'lucide-react';
import Container from '@/components/layout/Container';
import { BackgroundGridSmall } from '@/components/ui/background-grid';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

const skills = [
  {
    category: 'Frontend',
    icon: Code,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript']
  },
  {
    category: 'Mobile',
    icon: Zap,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    technologies: ['React Native', 'Expo', 'NativeWind', 'Android', 'iOS']
  },
  {
    category: 'Backend & Database',
    icon: Palette,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    technologies: ['Supabase', 'PostgreSQL', 'Node.js', 'APIs', 'Webhooks']
  }
];

const interests = [
  { name: 'Coffee', icon: Coffee, color: 'text-amber-600' },
  { name: 'Music', icon: Music, color: 'text-purple-600' },
  { name: 'Open Source', icon: Heart, color: 'text-red-500' }
];

const aboutText = [
  "Hello! I'm Habib Tanwir, a passionate frontend developer and mobile app developer based in India. I love creating dynamic and user-friendly web applications that provide exceptional user experiences.",
  "My journey in web development started 3 years ago during my B.Tech studies. Since then, I've been constantly learning and evolving, mastering technologies like React, Next.js, React Native, and TypeScript.",
  "I believe in writing clean, maintainable code and creating applications that solve real-world problems. Every project is an opportunity to learn something new and make a positive impact through technology.",
  "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or working on personal projects. I'm always excited to collaborate on interesting projects and connect with fellow developers!"
];

export default function About() {
  return (
    <section id="about" className="py-20 relative">
      <BackgroundGridSmall className="absolute inset-0" />
      <Container className="relative z-10">
        <div className="space-y-16">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold handwritten text-blue-500">
              About Me
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - About Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {aboutText.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-lg text-foreground/80 leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}

              {/* Interests */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                viewport={{ once: true }}
                className="pt-6"
              >
                <h3 className="text-xl font-semibold handwritten text-sketch-green mb-4">
                  Things I Love
                </h3>
                <div className="flex flex-wrap gap-4">
                  {interests.map((interest, index) => {
                    const Icon = interest.icon;
                    return (
                      <motion.div
                        key={interest.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -2, scale: 1.05 }}
                        className="flex items-center space-x-2 px-4 py-2 bg-background border border-notebook-line rounded-lg sketch-border sketch-hover"
                      >
                        <Icon size={18} className={interest.color} />
                        <span className="font-medium">{interest.name}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Skills */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-semibold handwritten text-sketch-purple">
                Skills & Technologies
              </h3>

              <div className="space-y-6">
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.category}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="p-6 bg-background border border-notebook-line rounded-lg sketch-border"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`p-2 rounded-lg ${skill.bgColor}`}>
                          <Icon size={24} className={skill.color} />
                        </div>
                        <h4 className="text-xl font-semibold handwritten">
                          {skill.category}
                        </h4>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {skill.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ 
                              delay: index * 0.2 + techIndex * 0.1, 
                              duration: 0.3 
                            }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                            className="px-3 py-1 text-sm bg-foreground/5 border border-foreground/10 rounded-full font-medium hover:bg-foreground/10 transition-colors duration-200"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Decorative Quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <blockquote className="text-2xl md:text-3xl font-handwritten text-sketch-blue italic max-w-3xl mx-auto leading-relaxed">
              "The best way to predict the future is to create it."
            </blockquote>
            <cite className="text-lg text-foreground/60 mt-4 block">
              — Peter Drucker
            </cite>
          </motion.div>


        </div>
      </Container>
    </section>
  );
}
