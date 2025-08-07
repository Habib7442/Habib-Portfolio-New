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
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-card dark:border-border bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
          {description}
        </div>
        
        {/* Technologies */}
        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs bg-blue-500/10 text-blue-500 rounded-full"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 3 && (
              <span className="px-2 py-1 text-xs bg-gray-500/10 text-gray-500 rounded-full">
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
              className="p-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg text-blue-500 transition-colors"
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
              className="p-2 bg-gray-500/10 hover:bg-gray-500/20 rounded-lg text-gray-500 transition-colors"
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
          <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-500 rounded-full">
            Featured
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
        "flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100",
        className
      )}
    >
      {children}
    </div>
  );
};
