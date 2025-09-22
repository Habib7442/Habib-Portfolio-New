'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, Grid, List, LayoutGrid } from 'lucide-react';
import Container from '@/components/layout/Container';
import ProjectCard from '@/components/ui/project-card';
import { CardCarousel } from '@/components/ui/card-carousel';
import { Badge } from '@/components/ui/badge';
import { Project, ProjectData } from '@/types/project';
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

  // Get featured projects for carousel
  const featuredProjects = data.projects.filter(project => project.featured);

  // Prepare images for carousel (using placeholder images)
  const carouselImages = featuredProjects.map(project => ({
    src: project.image,
    alt: project.title
  }));

  const categories = data.categories;
  const statuses = ['Completed', 'In Progress', 'Planning'];

  return (
    <section id="projects" className="py-20 bg-background">
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
            <h2 className="text-4xl md:text-5xl font-bold handwritten text-sketch-blue">
              My Projects
            </h2>
            <div className="w-24 h-1 bg-sketch-blue mx-auto rounded-full" />
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              A collection of projects I've worked on, showcasing my skills in web development, 
              design, and problem-solving. Each project represents a unique challenge and learning experience.
            </p>
          </motion.div>

          {/* Featured Projects Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="text-center">
              <h3 className="text-2xl font-semibold handwritten text-sketch-green mb-4">
                Featured Projects
              </h3>
              <p className="text-foreground/60">
                Highlighting some of my best work
              </p>
            </div>
            
            {/* Placeholder for carousel - will be replaced with actual images */}
            <div className="bg-gradient-to-r from-sketch-blue/10 to-sketch-green/10 rounded-xl p-8 border border-notebook-line">
              <div className="text-center space-y-4">
                <div className="text-6xl">🚀</div>
                <h4 className="text-xl font-semibold handwritten">Featured Projects Carousel</h4>
                <p className="text-foreground/60">
                  Interactive carousel showcasing featured projects will be displayed here
                </p>
                <div className="flex justify-center space-x-4">
                  {featuredProjects.slice(0, 3).map((project, index) => (
                    <div key={project.id} className="w-16 h-16 bg-sketch-blue/20 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold handwritten text-sketch-blue">
                        {project.title.split(' ').map(word => word[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Filter size={18} className="text-sketch-blue" />
                <span className="font-medium">Filter by:</span>
              </div>
              
              <div className="space-y-3">
                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Category:</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <motion.button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                          "px-3 py-1 text-sm rounded-full border transition-all duration-200",
                          selectedCategory === category
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-background text-foreground border-border hover:border-blue-500 hover:text-blue-500"
                        )}
                      >
                        {category}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Status Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Status:</label>
                  <div className="flex flex-wrap gap-2">
                    {statuses.map((status) => (
                      <motion.button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                          "px-3 py-1 text-sm rounded-full border transition-all duration-200",
                          selectedStatus === status
                            ? "bg-green-500 text-white border-green-500"
                            : "bg-background text-foreground border-border hover:border-green-500 hover:text-green-500"
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
            <div className="flex items-center space-x-2 bg-background border border-border rounded-lg p-1">
              <motion.button
                onClick={() => setViewMode('bento')}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "p-2 rounded-md transition-all duration-200",
                  viewMode === 'bento'
                    ? "bg-blue-500 text-white"
                    : "text-foreground/60 hover:text-foreground"
                )}
              >
                <LayoutGrid size={18} />
              </motion.button>
              <motion.button
                onClick={() => setViewMode('grid')}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "p-2 rounded-md transition-all duration-200",
                  viewMode === 'grid'
                    ? "bg-blue-500 text-white"
                    : "text-foreground/60 hover:text-foreground"
                )}
              >
                <Grid size={18} />
              </motion.button>
              <motion.button
                onClick={() => setViewMode('carousel')}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "p-2 rounded-md transition-all duration-200",
                  viewMode === 'carousel'
                    ? "bg-blue-500 text-white"
                    : "text-foreground/60 hover:text-foreground"
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
            {/* Special display for AI Designing and Ads */}
            {selectedCategory === 'AI Designing and Ads' ? (
              <div className="space-y-12">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <h3 className="text-3xl font-bold handwritten text-sketch-blue text-center">
                      {project.title}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
                      {project.images.map((imagePath, imgIndex) => {
                        const isVideo = imagePath.endsWith('.mp4');
                        return (
                          <motion.div
                            key={imgIndex}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-full h-80 rounded-lg overflow-hidden border border-notebook-line sketch-border bg-background shadow-lg"
                          >
                            {isVideo ? (
                              <video
                                src={imagePath}
                                className="w-full h-full object-cover"
                                controls
                                preload="metadata"
                              />
                            ) : (
                              <Image
                                src={imagePath}
                                alt={`${project.title} - Image ${imgIndex + 1}`}
                                fill
                                className="object-contain hover:object-cover transition-all duration-300"
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                              />
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : viewMode === 'bento' ? (
              <BentoGrid className="max-w-4xl mx-auto">
                {filteredProjects.map((project, index) => (
                  <BentoGridItem
                    key={project.id}
                    title={project.title}
                    description={project.description}
                    header={
                      <BentoGridHeader className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden relative">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                      </BentoGridHeader>
                    }
                    className={cn(
                      index === 0 || index === 3 || index === 6 ? "md:col-span-2" : "",
                      project.featured ? "md:row-span-2" : ""
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
                    className="bg-background border border-notebook-line rounded-xl p-6 sketch-border"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                      <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-start justify-between">
                          <h3 className="text-xl font-bold handwritten text-sketch-blue">
                            {project.title}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {project.status}
                          </Badge>
                        </div>
                        <p className="text-foreground/70 leading-relaxed">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 6).map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
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
            <p className="text-foreground/60">
              Showing {filteredProjects.length} of {data.projects.length} projects
              {` in ${selectedCategory}`}
              {` with status ${selectedStatus}`}
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
