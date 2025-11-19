'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, X } from 'lucide-react';

const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/habib-tanwir',
    icon: Linkedin,
    color: 'hover:bg-neon-blue'
  },
  {
    name: 'GitHub', 
    url: 'https://github.com/Habib7442',
    icon: Github,
    color: 'hover:bg-white/20'
  },
  {
    name: 'X (Twitter)',
    url: 'https://x.com/TanwirHabib',
    icon: X,
    color: 'hover:bg-neon-blue'
  }
];

export default function StickySocial() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 flex-col space-y-3 hidden lg:flex"
    >
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
          whileHover={{ scale: 1.1, x: -5, boxShadow: "0 0 15px var(--neon-blue)" }}
          whileTap={{ scale: 0.95 }}
          className={`
            w-12 h-12 bg-black/50 border border-neon-blue/30 rounded-none
            flex items-center justify-center text-neon-blue
            transition-all duration-300
            ${social.color} hover:text-white hover:border-neon-pink
            group relative
          `}
          aria-label={social.name}
        >
          <social.icon size={20} />
          
          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-full mr-3 px-2 py-1 bg-black/80 border border-neon-blue text-neon-blue text-xs rounded-none whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 font-vt323 tracking-wide"
          >
            {social.name}
          </motion.div>
        </motion.a>
      ))}
    </motion.div>
  );
}
