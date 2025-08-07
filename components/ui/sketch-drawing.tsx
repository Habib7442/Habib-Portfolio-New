'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SketchDrawingProps {
  paths: string[];
  className?: string;
  strokeWidth?: number;
  color?: string;
  duration?: number;
  delay?: number;
}

export default function SketchDrawing({
  paths,
  className = '',
  strokeWidth = 2,
  color = 'currentColor',
  duration = 2,
  delay = 0
}: SketchDrawingProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {paths.map((path, index) => (
        <motion.path
          key={index}
          d={path}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isVisible ? { pathLength: 1, opacity: 1 } : {}}
          transition={{
            duration: duration / paths.length,
            delay: (duration / paths.length) * index,
            ease: 'easeInOut'
          }}
        />
      ))}
    </svg>
  );
}

// Predefined sketch patterns
export const sketchPatterns = {
  arrow: ['M20 50 L80 50 M65 35 L80 50 L65 65'],
  star: [
    'M50 10 L60 40 L90 40 L68 58 L78 88 L50 70 L22 88 L32 58 L10 40 L40 40 Z'
  ],
  heart: [
    'M50 85 C20 60, 5 30, 25 25 C35 20, 45 25, 50 35 C55 25, 65 20, 75 25 C95 30, 80 60, 50 85 Z'
  ],
  lightbulb: [
    'M50 10 C35 10, 25 20, 25 35 C25 45, 30 50, 35 55 L35 70 L65 70 L65 55 C70 50, 75 45, 75 35 C75 20, 65 10, 50 10 Z',
    'M40 75 L60 75 M42 80 L58 80 M45 85 L55 85'
  ],
  rocket: [
    'M50 10 L40 30 L35 50 L40 70 L50 90 L60 70 L65 50 L60 30 Z',
    'M35 40 L25 35 L30 50 M65 40 L75 35 L70 50',
    'M45 75 L40 85 M55 75 L60 85'
  ],
  coffee: [
    'M20 30 L20 70 C20 80, 30 90, 40 90 L60 90 C70 90, 80 80, 80 70 L80 30 Z',
    'M80 40 C90 40, 95 45, 95 50 C95 55, 90 60, 80 60',
    'M30 20 C30 15, 35 15, 35 20 M45 20 C45 15, 50 15, 50 20 M60 20 C60 15, 65 15, 65 20'
  ]
};
