'use client';

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import StickySocial from '@/components/ui/sticky-social';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background text-foreground selection:bg-neon-pink selection:text-white">
      <div className="retro-grid-bg" />
      <div className="crt-overlay" />
      <Header />
      <main className="flex-1 pt-16 relative z-10">
        {children}
      </main>
      <Footer />
      <StickySocial />
    </div>
  );
}
