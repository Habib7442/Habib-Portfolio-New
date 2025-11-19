'use client';

import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail,  X, Terminal, Code } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/Habib7442',
    icon: Github,
    color: 'hover:text-white'
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/habib-tanwir/',
    icon: Linkedin,
    color: 'hover:text-neon-blue'
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com/TanwirHabib',
    icon: X,
    color: 'hover:text-neon-blue'
  },
  {
    name: 'Email',
    href: 'mailto:habibtanwir1906@gmail.com',
    icon: Mail,
    color: 'hover:text-neon-pink'
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
      className="bg-black border-t border-neon-blue/30 mt-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <Terminal className="text-neon-pink" size={24} />
              <h3 className="text-2xl font-bold font-orbitron text-neon-blue tracking-widest">
                PORTFOLIO_V2
              </h3>
            </motion.div>
            <p className="text-foreground/70 leading-relaxed font-rajdhani">
              Creating beautiful and functional web experiences with a touch of creativity and attention to detail.
              <br />
              <span className="text-neon-purple font-vt323 text-sm">&gt; SYSTEM_STATUS: ONLINE</span>
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold font-orbitron text-neon-green tracking-wider">
              QUICK_NAV
            </h4>
            <nav className="space-y-2">
              {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ x: 4, color: "var(--neon-blue)" }}
                  onClick={() => {
                    const element = document.getElementById(item.toLowerCase());
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="block text-foreground/70 transition-colors duration-200 font-vt323 text-lg uppercase tracking-wide text-left"
                >
                  &gt; {item}
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold font-orbitron text-neon-yellow tracking-wider">
              CONNECT_NODES
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
                    whileHover={{ y: -2, scale: 1.1, borderColor: "var(--neon-pink)" }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 bg-black/50 border border-neon-blue/30 transition-all duration-200 ${social.color} group`}
                    aria-label={social.name}
                  >
                    <Icon size={20} className="group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
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
          className="mt-8 pt-8 border-t border-neon-blue/30"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-foreground/60 text-sm flex items-center font-vt323 tracking-wide">
              EXECUTED WITH{' '}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                className="mx-1 text-neon-pink"
              >
                <Heart size={14} fill="currentColor" />
              </motion.span>{' '}
              USING NEXT.JS & TAILWIND
            </p>
            <p className="text-foreground/60 text-sm font-vt323 tracking-wide">
              © {currentYear} HABIB_TANWIR. ALL_RIGHTS_RESERVED.
            </p>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute bottom-4 right-4 opacity-20 hidden md:block">
           <Code className="text-neon-blue w-24 h-24 opacity-10" />
        </div>
      </div>
    </motion.footer>
  );
}
