'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  amplitude?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'circular';
}

export default function FloatingElement({
  children,
  className = '',
  duration = 3,
  delay = 0,
  amplitude = 10,
  direction = 'up'
}: FloatingElementProps) {
  const getAnimation = () => {
    switch (direction) {
      case 'up':
        return {
          y: [-amplitude, amplitude, -amplitude],
        };
      case 'down':
        return {
          y: [amplitude, -amplitude, amplitude],
        };
      case 'left':
        return {
          x: [-amplitude, amplitude, -amplitude],
        };
      case 'right':
        return {
          x: [amplitude, -amplitude, amplitude],
        };
      case 'circular':
        return {
          x: [0, amplitude, 0, -amplitude, 0],
          y: [-amplitude, 0, amplitude, 0, -amplitude],
        };
      default:
        return {
          y: [-amplitude, amplitude, -amplitude],
        };
    }
  };

  return (
    <motion.div
      className={className}
      animate={getAnimation()}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

// Predefined floating elements
export function FloatingIcon({ 
  icon, 
  className = '', 
  size = 'w-8 h-8',
  ...props 
}: FloatingElementProps & { 
  icon: string; 
  size?: string;
}) {
  return (
    <FloatingElement className={className} {...props}>
      <div className={`${size} flex items-center justify-center text-2xl bg-white/10 backdrop-blur-sm rounded-full border border-white/20`}>
        {icon}
      </div>
    </FloatingElement>
  );
}

export function FloatingShape({ 
  shape = 'circle', 
  className = '', 
  size = 'w-6 h-6',
  color = 'bg-sketch-blue/20',
  ...props 
}: FloatingElementProps & { 
  shape?: 'circle' | 'square' | 'triangle';
  size?: string;
  color?: string;
}) {
  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-lg',
    triangle: 'rounded-sm transform rotate-45'
  };

  return (
    <FloatingElement className={className} {...props}>
      <div className={`${size} ${color} ${shapeClasses[shape]} border border-current/20`} />
    </FloatingElement>
  );
}
