'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Calendar, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
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
    'Completed': 'bg-sketch-green/10 text-sketch-green border-sketch-green/20',
    'In Progress': 'bg-sketch-orange/10 text-sketch-orange border-sketch-orange/20',
    'Planning': 'bg-sketch-purple/10 text-sketch-purple border-sketch-purple/20'
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
      className="group relative bg-card border border-border rounded-xl overflow-hidden"
    >
      {/* Hover background effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl"
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
            <Badge className="bg-blue-500 text-white border-blue-500">
              Featured
            </Badge>
          </div>
        )}

        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <motion.div
            className="w-full h-full relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>

          {/* Overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center space-x-4 opacity-100 md:opacity-0 md:hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 1 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
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
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
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
            <h3 className="text-xl font-bold handwritten text-foreground group-hover:text-blue-500 transition-colors flex-1 min-w-0">
              {project.title}
            </h3>
            <Badge 
              variant="outline" 
              className={cn("text-xs flex-shrink-0", statusColors[project.status])}
            >
              {project.status}
            </Badge>
          </div>
          <p className="text-foreground/70 text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Meta Information */}
        <div className="flex items-center space-x-4 text-xs text-foreground/60">
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
          <h4 className="text-sm font-semibold text-foreground/80">Technologies:</h4>
          <div className="flex flex-wrap gap-1 max-w-full overflow-hidden">
            {project.technologies.slice(0, 3).map((tech) => (
              <Badge 
                key={tech} 
                variant="outline" 
                className="text-xs bg-foreground/5 hover:bg-foreground/10 transition-colors flex-shrink-0 max-w-[120px] truncate"
                title={tech}
              >
                {tech.length > 12 ? tech.substring(0, 12) + '...' : tech}
              </Badge>
            ))}
            {project.technologies.length > 3 && (
              <Badge variant="outline" className="text-xs bg-foreground/5 flex-shrink-0">
                +{project.technologies.length - 3}
              </Badge>
            )}
          </div>
        </div>

          {/* Category and Action Buttons */}
          <div className="pt-2 border-t border-border space-y-3">
            <span className="text-xs font-medium text-blue-500 bg-blue-500/10 px-2 py-1 rounded-full inline-block max-w-full truncate">
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
                  className="flex-1 flex items-center justify-center gap-2 p-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg text-blue-500 transition-colors text-sm font-medium"
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
                  className="flex-1 flex items-center justify-center gap-2 p-2 bg-gray-500/10 hover:bg-gray-500/20 rounded-lg text-gray-500 transition-colors text-sm font-medium"
                >
                  <Github size={16} />
                  Code
                </motion.a>
              )}
            </div>
          </div>
        </div>

        {/* Decorative corner element */}
        <div className="absolute bottom-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
          <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="text-blue-500"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1, ease: 'easeInOut', delay: index * 0.1 + 0.5 }}
            viewport={{ once: true }}
          >
            <motion.path
              d="M3 12 L9 6 L15 12 L21 6"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </div>
      </motion.div>
    </motion.div>
  );
}
