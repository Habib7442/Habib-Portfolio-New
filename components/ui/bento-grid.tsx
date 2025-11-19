"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  technologies,
  liveUrl,
  githubUrl,
  featured = false,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}) => {
  return (
    <motion.div
      className={cn(
        "row-span-1 rounded-none group/bento hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition duration-200 shadow-none p-4 bg-black/40 border border-neon-blue/30 justify-between flex flex-col space-y-4",
        className
      )}
      whileHover={{ y: -5, borderColor: "var(--neon-pink)" }}
      transition={{ duration: 0.2 }}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-orbitron font-bold text-neon-blue mb-2 mt-2 tracking-wide">
          {title}
        </div>
        <div className="font-rajdhani font-normal text-foreground/70 text-xs">
          {description}
        </div>
        
        {/* Technologies */}
        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs bg-neon-blue/10 text-neon-blue border border-neon-blue/30 rounded-none font-vt323"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 3 && (
              <span className="px-2 py-1 text-xs bg-white/10 text-foreground/60 border border-white/10 rounded-none font-vt323">
                +{technologies.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex space-x-2 mt-4 opacity-100 md:opacity-0 md:group-hover/bento:opacity-100 transition-opacity duration-200">
          {liveUrl && (
            <motion.a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-neon-blue/10 hover:bg-neon-blue/20 border border-neon-blue/50 hover:border-neon-blue rounded-none text-neon-blue transition-colors"
              aria-label="View live project"
            >
              <ExternalLink size={16} />
            </motion.a>
          )}
          {githubUrl && (
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-none text-foreground/80 transition-colors"
              aria-label="View source code"
            >
              <Github size={16} />
            </motion.a>
          )}
        </div>
      </div>
      
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 text-xs bg-neon-yellow/20 text-neon-yellow border border-neon-yellow/50 rounded-none font-orbitron tracking-wider">
            FEATURED
          </span>
        </div>
      )}
    </motion.div>
  );
};

export const BentoGridHeader = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "flex flex-1 w-full h-full min-h-[6rem] rounded-none bg-black/50 border-b border-neon-blue/30 overflow-hidden relative",
        className
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] opacity-20" />
      {children}
    </div>
  );
};
