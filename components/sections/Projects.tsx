'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, Grid, List, LayoutGrid, Terminal } from 'lucide-react';
import Container from '@/components/layout/Container';
import ProjectCard from '@/components/ui/project-card';
import { Badge } from '@/components/ui/badge';
import { ProjectData } from '@/types/project';
import projectsData from '@/data/projects.json';
import { cn } from '@/lib/utils';
import { BentoGrid, BentoGridItem, BentoGridHeader } from '@/components/ui/bento-grid';
import Image from 'next/image';

const data = projectsData as ProjectData;

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Web Development');
  const [selectedStatus, setSelectedStatus] = useState<string>('Completed');
  const [viewMode, setViewMode] = useState<'grid' | 'carousel' | 'bento'>('bento');

  // Filter projects based on selected filters
  const filteredProjects = useMemo(() => {
    return data.projects.filter(project => {
      const categoryMatch = project.category === selectedCategory;
      const statusMatch = project.status === selectedStatus;
      return categoryMatch && statusMatch;
    });
  }, [selectedCategory, selectedStatus]);


  const categories = data.categories;
  const statuses = ['Completed', 'In Progress', 'Planning'];

  return (
    <section id="projects" className="py-20 relative">
      <Container>
        <div className="space-y-16">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h2 className="text-4xl md:text-6xl font-bold font-orbitron text-neon-blue tracking-widest uppercase glitch" data-text="My Projects">
              My Projects
            </h2>
            <div className="w-32 h-1 bg-neon-pink mx-auto shadow-[0_0_10px_var(--neon-pink)]" />
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto font-rajdhani">
              A collection of projects I've worked on, showcasing my skills in web development, 
              design, and problem-solving. Each project represents a unique challenge and learning experience.
            </p>
          </motion.div>


          {/* Filters and View Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0"
          >
            {/* Filters */}
            <div className="space-y-4 w-full lg:w-auto">
              <div className="flex items-center space-x-2">
                <Filter size={18} className="text-neon-blue" />
                <span className="font-medium font-orbitron text-neon-blue tracking-wider">FILTER_BY:</span>
              </div>
              
              <div className="space-y-4">
                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground/60 font-vt323 uppercase tracking-widest">Category:</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <motion.button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                          "px-3 py-1 text-xs font-vt323 tracking-wider uppercase border transition-all duration-200 rounded-none",
                          selectedCategory === category
                            ? "bg-neon-blue/20 text-neon-blue border-neon-blue shadow-[0_0_10px_rgba(0,255,255,0.3)]"
                            : "bg-transparent text-foreground/60 border-white/10 hover:border-neon-blue/50 hover:text-neon-blue"
                        )}
                      >
                        {category}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Status Filter */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground/60 font-vt323 uppercase tracking-widest">Status:</label>
                  <div className="flex flex-wrap gap-2">
                    {statuses.map((status) => (
                      <motion.button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                          "px-3 py-1 text-xs font-vt323 tracking-wider uppercase border transition-all duration-200 rounded-none",
                          selectedStatus === status
                            ? "bg-neon-green/20 text-neon-yellow border-neon-yellow shadow-[0_0_10px_rgba(255,255,0,0.3)]"
                            : "bg-transparent text-foreground/60 border-white/10 hover:border-neon-yellow/50 hover:text-neon-yellow"
                        )}
                      >
                        {status}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-black/40 border border-white/10 p-1 self-end lg:self-center">
              <motion.button
                onClick={() => setViewMode('bento')}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "p-2 transition-all duration-200 rounded-none",
                  viewMode === 'bento'
                    ? "bg-neon-blue/20 text-neon-blue shadow-[0_0_5px_rgba(0,255,255,0.3)]"
                    : "text-foreground/40 hover:text-foreground"
                )}
              >
                <LayoutGrid size={18} />
              </motion.button>
              <motion.button
                onClick={() => setViewMode('grid')}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "p-2 transition-all duration-200 rounded-none",
                  viewMode === 'grid'
                    ? "bg-neon-blue/20 text-neon-blue shadow-[0_0_5px_rgba(0,255,255,0.3)]"
                    : "text-foreground/40 hover:text-foreground"
                )}
              >
                <Grid size={18} />
              </motion.button>
              <motion.button
                onClick={() => setViewMode('carousel')}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "p-2 transition-all duration-200 rounded-none",
                  viewMode === 'carousel'
                    ? "bg-neon-blue/20 text-neon-blue shadow-[0_0_5px_rgba(0,255,255,0.3)]"
                    : "text-foreground/40 hover:text-foreground"
                )}
              >
                <List size={18} />
              </motion.button>
            </div>
          </motion.div>

          {/* Projects Display */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
            viewport={{ once: true }}
          >
            {viewMode === 'bento' ? (
              <BentoGrid className="max-w-5xl mx-auto">
                {filteredProjects.map((project, index) => (
                  <BentoGridItem
                    key={project.id}
                    title={project.title}
                    description={project.description}
                    header={
                      <BentoGridHeader className="flex flex-1 w-full h-full min-h-[6rem] overflow-hidden relative border-b border-neon-blue/20">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-all duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          quality={100}
                        />
                        <div className="absolute inset-0 bg-neon-blue/10 mix-blend-overlay" />
                      </BentoGridHeader>
                    }
                    className={cn(
                      index === 0 || index === 3 || index === 6 ? "md:col-span-2" : "",
                      project.featured ? "md:row-span-2" : "",
                      "bg-black/40 border-neon-blue/30 hover:border-neon-pink/50 transition-colors"
                    )}
                    technologies={project.technologies}
                    liveUrl={project.liveUrl}
                    githubUrl={project.githubUrl}
                    featured={project.featured}
                  />
                ))}
              </BentoGrid>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-black/40 border border-neon-blue/30 p-6 hover:border-neon-pink/50 transition-colors group"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                      <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-start justify-between">
                          <h3 className="text-xl font-bold font-orbitron text-neon-blue group-hover:text-neon-pink transition-colors tracking-wide">
                            {project.title}
                          </h3>
                          <Badge variant="outline" className="text-xs font-vt323 rounded-none border-neon-blue/50 text-neon-blue">
                            {project.status}
                          </Badge>
                        </div>
                        <p className="text-foreground/70 leading-relaxed font-rajdhani">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 6).map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs border-white/10 text-foreground/60 rounded-none font-vt323">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-center lg:justify-end">
                        <ProjectCard project={project} index={index} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Results Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-neon-blue/60 font-vt323 text-lg">
              &gt; DISPLAYING {filteredProjects.length} OF {data.projects.length} PROJECTS
              {` [CATEGORY: ${selectedCategory.toUpperCase()}]`}
              {` [STATUS: ${selectedStatus.toUpperCase()}]`}
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
