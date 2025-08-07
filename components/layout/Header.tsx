'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, Mail, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'Projects', href: '#projects', icon: Briefcase },
  { name: 'About', href: '#about', icon: User },
  { name: 'Reviews', href: '/reviews', icon: Star, isExternal: true },
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
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-notebook-line"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ rotate: 2, scale: 1.05 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Portfolio Logo"
                width={60}
                height={60}
                className="object-contain"
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = !item.isExternal && activeSection === item.href.substring(1);

              if (item.isExternal) {
                return (
                  <Link key={item.name} href={item.href}>
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                      className={cn(
                        'flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200',
                        'hover:bg-sketch-blue/10 hover:text-sketch-blue',
                        'sketch-hover text-foreground'
                      )}
                    >
                      <Icon size={18} />
                      <span className="font-medium">{item.name}</span>
                    </motion.div>
                  </Link>
                );
              }

              return (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavigation(item.href, item.isExternal)}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  className={cn(
                    'flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200',
                    'hover:bg-sketch-blue/10 hover:text-sketch-blue',
                    'sketch-hover',
                    isActive
                      ? 'text-sketch-blue bg-sketch-blue/10 sketch-border'
                      : 'text-foreground'
                  )}
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.name}</span>
                </motion.button>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-sketch-blue/10 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="md:hidden overflow-hidden"
        >
          <nav className="py-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = !item.isExternal && activeSection === item.href.substring(1);

              if (item.isExternal) {
                return (
                  <Link key={item.name} href={item.href}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={cn(
                        'flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all duration-200',
                        'hover:bg-sketch-blue/10 hover:text-sketch-blue text-foreground'
                      )}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.name}</span>
                    </motion.div>
                  </Link>
                );
              }

              return (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavigation(item.href, item.isExternal)}
                  whileHover={{ x: 4 }}
                  className={cn(
                    'flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all duration-200',
                    'hover:bg-sketch-blue/10 hover:text-sketch-blue',
                    isActive
                      ? 'text-sketch-blue bg-sketch-blue/10 sketch-border'
                      : 'text-foreground'
                  )}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </motion.button>
              );
            })}
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
}
