'use client';

import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail,  X } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/Habib7442',
    icon: Github,
    color: 'hover:text-gray-900 dark:hover:text-white'
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/habib-tanwir/',
    icon: Linkedin,
    color: 'hover:text-blue-600'
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com/TanwirHabib',
    icon: X,
    color: 'hover:text-blue-400'
  },
  {
    name: 'Email',
    href: 'mailto:habib.tanwir@example.com',
    icon: Mail,
    color: 'hover:text-sketch-red'
  }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="bg-background border-t border-notebook-line mt-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.h3
              whileHover={{ rotate: 1 }}
              className="text-2xl font-bold handwritten text-sketch-blue"
            >
              Portfolio
            </motion.h3>
            <p className="text-foreground/70 leading-relaxed">
              Creating beautiful and functional web experiences with a touch of creativity and attention to detail.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold handwritten text-sketch-green">
              Quick Links
            </h4>
            <nav className="space-y-2">
              {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ x: 4 }}
                  onClick={() => {
                    const element = document.getElementById(item.toLowerCase());
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="block text-foreground/70 hover:text-sketch-blue transition-colors duration-200"
                >
                  {item}
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold handwritten text-sketch-orange">
              Connect
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-lg bg-background border border-notebook-line transition-all duration-200 ${social.color} sketch-hover`}
                    aria-label={social.name}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-notebook-line"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-foreground/60 text-sm flex items-center">
              Made with{' '}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                className="mx-1 text-sketch-red"
              >
                <Heart size={16} fill="currentColor" />
              </motion.span>{' '}
              using Next.js & Tailwind CSS
            </p>
            <p className="text-foreground/60 text-sm">
              © {currentYear} Portfolio. All rights reserved.
            </p>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute bottom-4 left-4 opacity-20">
          <motion.svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            className="text-sketch-blue"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            viewport={{ once: true }}
          >
            <motion.path
              d="M10 30 Q30 10 50 30 Q30 50 10 30"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              className="draw-animation"
            />
          </motion.svg>
        </div>
      </div>
    </motion.footer>
  );
}
