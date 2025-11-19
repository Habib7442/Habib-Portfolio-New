'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Calendar, User, Code } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/types/project';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const statusColors = {
    'Completed': 'bg-neon-blue/10 text-neon-blue border-neon-blue/50',
    'In Progress': 'bg-neon-yellow/10 text-neon-yellow border-neon-yellow/50',
    'Planning': 'bg-neon-purple/10 text-neon-purple border-neon-purple/50'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
        delay: index * 0.1
      }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-black/40 border border-neon-blue/30 rounded-none overflow-hidden hover:border-neon-pink/80 transition-colors duration-300"
    >
      {/* Hover background effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-neon-pink/5"
            layoutId="hoverBackground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.15 } }}
            exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
          />
        )}
      </AnimatePresence>

      {/* Card content wrapper */}
      <motion.div
        className="relative z-10 h-full"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 z-20">
            <Badge className="bg-neon-pink text-black border-neon-pink font-orbitron tracking-wider rounded-none">
              FEATURED
            </Badge>
          </div>
        )}

        {/* Project Image */}
        <div className="relative h-48 overflow-hidden border-b border-neon-blue/30 group-hover:border-neon-pink/50 transition-colors">
          <motion.div
            className="w-full h-full relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Scanline overlay for image */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none" />
          </motion.div>

          {/* Overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-black/80 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
          >
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, boxShadow: "0 0 15px var(--neon-blue)" }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-transparent border border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black transition-all duration-200 rounded-none"
              aria-label="View live project"
            >
              <ExternalLink size={20} />
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, boxShadow: "0 0 15px var(--neon-pink)" }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-transparent border border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-black transition-all duration-200 rounded-none"
              aria-label="View source code"
            >
              <Github size={20} />
            </motion.a>
          )}
          </motion.div>
        </div>

        {/* Project Content */}
        <div className="p-6 space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xl font-bold font-orbitron text-foreground group-hover:text-neon-blue transition-colors flex-1 min-w-0 tracking-wide">
              {project.title}
            </h3>
            <Badge 
              variant="outline" 
              className={cn("text-xs flex-shrink-0 rounded-none font-vt323 tracking-widest uppercase", statusColors[project.status])}
            >
              {project.status}
            </Badge>
          </div>
          <p className="text-foreground/70 text-sm leading-relaxed line-clamp-3 font-rajdhani">
            {project.description}
          </p>
        </div>

        {/* Meta Information */}
        <div className="flex items-center space-x-4 text-xs text-foreground/50 font-vt323 tracking-wider">
          <div className="flex items-center space-x-1">
            <Calendar size={12} />
            <span>{new Date(project.startDate).getFullYear()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User size={12} />
            <span>{project.role}</span>
          </div>
        </div>

        {/* Technologies */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-neon-purple uppercase tracking-widest font-orbitron">Technologies:</h4>
          <div className="flex flex-wrap gap-1 max-w-full overflow-hidden">
            {project.technologies.slice(0, 3).map((tech) => (
              <Badge 
                key={tech} 
                variant="outline" 
                className="text-xs border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10 transition-colors flex-shrink-0 max-w-[120px] truncate rounded-none font-vt323 tracking-wide"
                title={tech}
              >
                {tech.length > 12 ? tech.substring(0, 12) + '...' : tech}
              </Badge>
            ))}
            {project.technologies.length > 3 && (
              <Badge variant="outline" className="text-xs border-neon-blue/30 text-neon-blue flex-shrink-0 rounded-none font-vt323">
                +{project.technologies.length - 3}
              </Badge>
            )}
          </div>
        </div>

          {/* Category and Action Buttons */}
          <div className="pt-2 border-t border-white/10 space-y-3">
            <span className="text-xs font-medium text-neon-yellow bg-neon-yellow/5 border border-neon-yellow/20 px-2 py-1 inline-block max-w-full truncate font-orbitron tracking-wider">
              {project.category}
            </span>

            {/* Mobile Action Buttons */}
            <div className="flex space-x-2 md:hidden">
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 p-2 border border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10 transition-colors text-sm font-medium font-vt323 uppercase"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </motion.a>
              )}
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 p-2 border border-neon-pink/50 text-neon-pink hover:bg-neon-pink/10 transition-colors text-sm font-medium font-vt323 uppercase"
                >
                  <Github size={16} />
                  Code
                </motion.a>
              )}
            </div>
          </div>
        </div>

        {/* Decorative corner element */}
        <div className="absolute bottom-2 right-2 opacity-50 group-hover:opacity-100 transition-opacity">
          <Code size={16} className="text-neon-purple" />
        </div>
      </motion.div>
    </motion.div>
  );
}
