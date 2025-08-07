'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: 'fadeUp' | 'fadeIn' | 'typewriter' | 'handwritten';
}

const variants = {
  fadeUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  },
  typewriter: {
    initial: { width: 0 },
    animate: { width: 'auto' }
  },
  handwritten: {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 }
  }
};

export default function AnimatedText({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 0.6,
  variant = 'fadeUp'
}: AnimatedTextProps) {
  const selectedVariant = variants[variant];

  return (
    <motion.div
      initial={selectedVariant.initial}
      whileInView={selectedVariant.animate}
      transition={{ 
        duration, 
        delay, 
        ease: 'easeOut',
        ...(variant === 'typewriter' && { type: 'tween' })
      }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
