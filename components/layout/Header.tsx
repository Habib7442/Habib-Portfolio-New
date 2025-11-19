'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, Mail, Star, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'Projects', href: '#projects', icon: Briefcase },
  { name: 'About', href: '#about', icon: User },
  { name: 'Reviews', href: '#reviews', icon: Star },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (href: string, isExternal?: boolean) => {
    if (isExternal) {
      // For external links, use Next.js router
      window.location.href = href;
    } else {
      // For internal sections, scroll to element
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-neon-blue/30"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05, filter: "drop-shadow(0 0 8px var(--neon-pink))" }}
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center group">
              <div className="relative w-12 h-12 flex items-center justify-center border-2 border-neon-pink bg-black/50 rounded-none group-hover:border-neon-blue transition-colors duration-300">
                <span className="text-2xl font-bold font-orbitron text-neon-pink group-hover:text-neon-blue transition-colors duration-300">H</span>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-neon-blue" />
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-neon-pink" />
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = !(item as any).isExternal && activeSection === item.href.substring(1);

              if ((item as any).isExternal) {
                return (
                  <Link key={item.name} href={item.href}>
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                      className={cn(
                        'flex items-center space-x-2 px-4 py-2 rounded-none transition-all duration-200 border border-transparent',
                        'hover:bg-neon-blue/10 hover:border-neon-blue/50 hover:text-neon-blue',
                        'text-foreground/80 font-vt323 text-lg tracking-wide'
                      )}
                    >
                      <Icon size={16} />
                      <span className="uppercase">{item.name}</span>
                    </motion.div>
                  </Link>
                );
              }

              return (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavigation(item.href, (item as any).isExternal)}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  className={cn(
                    'flex items-center space-x-2 px-4 py-2 rounded-none transition-all duration-200 border',
                    isActive
                      ? 'text-neon-blue bg-neon-blue/10 border-neon-blue shadow-[0_0_10px_rgba(0,255,255,0.2)]'
                      : 'text-foreground/80 border-transparent hover:bg-neon-blue/10 hover:border-neon-blue/50 hover:text-neon-blue',
                    'font-vt323 text-lg tracking-wide uppercase'
                  )}
                >
                  <Icon size={16} />
                  <span>{item.name}</span>
                </motion.button>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-none border border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="md:hidden overflow-hidden bg-black/90 border-b border-neon-blue/30"
        >
          <nav className="py-4 space-y-2 px-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = !(item as any).isExternal && activeSection === item.href.substring(1);

              if ((item as any).isExternal) {
                return (
                  <Link key={item.name} href={item.href}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={cn(
                        'flex items-center space-x-3 w-full px-4 py-3 rounded-none transition-all duration-200 border-l-2 border-transparent',
                        'hover:bg-neon-blue/10 hover:text-neon-blue hover:border-neon-blue text-foreground/80 font-vt323 text-xl uppercase tracking-wide'
                      )}
                    >
                      <Icon size={20} />
                      <span>{item.name}</span>
                    </motion.div>
                  </Link>
                );
              }

              return (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavigation(item.href, (item as any).isExternal)}
                  whileHover={{ x: 4 }}
                  className={cn(
                    'flex items-center space-x-3 w-full px-4 py-3 rounded-none transition-all duration-200 border-l-2',
                    isActive
                      ? 'text-neon-blue bg-neon-blue/10 border-neon-blue'
                      : 'text-foreground/80 border-transparent hover:bg-neon-blue/10 hover:text-neon-blue hover:border-neon-blue',
                    'font-vt323 text-xl uppercase tracking-wide'
                  )}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </motion.button>
              );
            })}
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
}
