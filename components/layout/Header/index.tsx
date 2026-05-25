'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type NavLink = { label: string; href: string };

const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Articles', href: '/articles' },
  // { label: 'About', href: '/about' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      data-layout="header"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur border-b border-green-200' : 'bg-transparent'
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-green-600 font-medium text-base hover:text-green-500 transition-colors"
        >
          @smile Blog
        </Link>
        <nav className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-500 hover:text-green-500 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
