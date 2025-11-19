'use client';

import { motion } from 'framer-motion';
import { Code, Palette, Zap, Heart, Coffee, Music, Cpu, Terminal } from 'lucide-react';
import Container from '@/components/layout/Container';
import { BackgroundGridSmall } from '@/components/ui/background-grid';

const skills = [
  {
    category: 'Frontend_Module',
    icon: Code,
    color: 'text-neon-blue',
    borderColor: 'border-neon-blue',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript']
  },
  {
    category: 'Mobile_Unit',
    icon: Zap,
    color: 'text-neon-yellow',
    borderColor: 'border-neon-yellow',
    technologies: ['React Native', 'Expo', 'NativeWind', 'Android', 'iOS']
  },
  {
    category: 'Backend_Core',
    icon: Palette,
    color: 'text-neon-pink',
    borderColor: 'border-neon-pink',
    technologies: ['Supabase', 'PostgreSQL', 'Node.js', 'APIs', 'Webhooks']
  }
];

const interests = [
  { name: 'Coffee.exe', icon: Coffee, color: 'text-amber-500' },
  { name: 'Music.wav', icon: Music, color: 'text-purple-500' },
  { name: 'OpenSource.git', icon: Heart, color: 'text-red-500' }
];

const aboutText = [
  "Hello! I'm Habib Tanwir, a passionate frontend developer and mobile app developer based in India. I love creating dynamic and user-friendly web applications that provide exceptional user experiences.",
  "My journey in web development started 3 years ago during my B.Tech studies. Since then, I've been constantly learning and evolving, mastering technologies like React, Next.js, React Native, and TypeScript.",
  "I believe in writing clean, maintainable code and creating applications that solve real-world problems. Every project is an opportunity to learn something new and make a positive impact through technology.",
  "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or working on personal projects. I'm always excited to collaborate on interesting projects and connect with fellow developers!"
];

export default function About() {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <BackgroundGridSmall className="absolute inset-0 opacity-20" />
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
            <h2 className="text-4xl md:text-6xl font-bold font-orbitron text-neon-purple tracking-widest uppercase glitch" data-text="About Me">
              About Me
            </h2>
            <div className="w-32 h-1 bg-neon-purple mx-auto shadow-[0_0_10px_var(--neon-purple)]" />
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
              <div className="bg-black/40 border border-neon-blue/30 p-6 relative rounded-none">
                <div className="absolute top-0 left-0 bg-neon-blue/20 px-2 py-1 text-xs font-vt323 text-neon-blue">
                  USER_BIO_LOG
                </div>
                {aboutText.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-lg text-foreground/80 leading-relaxed font-rajdhani mb-4 last:mb-0"
                  >
                    <span className="text-neon-blue mr-2">&gt;</span>
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Interests */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                viewport={{ once: true }}
                className="pt-6"
              >
                <h3 className="text-xl font-semibold font-orbitron text-neon-yellow mb-4 tracking-wider">
                  &lt;THINGS_I_LOVE /&gt;
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
                        className="flex items-center space-x-2 px-4 py-2 bg-black/40 border border-white/10 hover:border-neon-yellow/50 transition-colors cursor-pointer group"
                      >
                        <Icon size={18} className={`${interest.color} group-hover:animate-pulse`} />
                        <span className="font-medium font-vt323 text-lg tracking-wide">{interest.name}</span>
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
              <h3 className="text-2xl font-semibold font-orbitron text-neon-pink tracking-widest uppercase">
                System_Modules
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
                      className={`p-6 bg-black/40 border ${skill.borderColor} border-opacity-30 hover:border-opacity-80 transition-all duration-300 relative group`}
                    >
                      {/* Corner accents */}
                      <div className={`absolute top-0 right-0 w-2 h-2 ${skill.borderColor.replace('border', 'bg')} opacity-50`} />
                      <div className={`absolute bottom-0 left-0 w-2 h-2 ${skill.borderColor.replace('border', 'bg')} opacity-50`} />
                      
                      <div className="flex items-center space-x-3 mb-4 border-b border-white/5 pb-2">
                        <div className={`p-2 rounded-none bg-white/5`}>
                          <Icon size={24} className={skill.color} />
                        </div>
                        <h4 className="text-xl font-semibold font-vt323 tracking-widest uppercase">
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
                            className={`px-3 py-1 text-xs bg-transparent border ${skill.borderColor} border-opacity-30 text-foreground/80 font-medium hover:bg-white/5 hover:text-${skill.color.replace('text-', '')} transition-colors duration-200 font-orbitron tracking-wider`}
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
            <div className="inline-block border-l-4 border-neon-blue pl-6 py-2 bg-black/20 pr-6">
              <blockquote className="text-xl md:text-2xl font-vt323 text-neon-blue italic max-w-3xl mx-auto leading-relaxed tracking-wide">
                "The best way to predict the future is to create it."
              </blockquote>
              <cite className="text-sm text-neon-pink mt-2 block font-orbitron uppercase tracking-widest">
                — Peter Drucker
              </cite>
            </div>
          </motion.div>


        </div>
      </Container>
    </section>
  );
}
