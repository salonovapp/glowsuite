'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { featureGroups } from '@/content/navigation';
import { cn } from '@/lib/utils';

interface FeaturesMegaMenuProps {
  scrolled: boolean;
}

// Minimal inline SVGs matching GlowSuite style
const icons: Record<string, React.ReactNode> = {
  'Appointments': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
  ),
  'Client Management': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
  ),
  'Billing & POS': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
  ),
  'Inventory': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
  ),
  'Reports': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
  ),
  'Staff Management': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
  ),
  'Multi-Location': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
  ),
};

export function FeaturesMegaMenu({ scrolled }: FeaturesMegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) setIsOpen(false);
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClickOutside, handleKeyDown]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] text-[0.875rem] font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[var(--focus)] focus-visible:outline-offset-2',
          scrolled || isOpen
            ? 'text-[var(--text-primary)] bg-black/[0.04]'
            : 'text-[var(--text-primary)] hover:text-[var(--gs-pink)] hover:bg-white/30'
        )}
      >
        Features
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={cn("transition-transform duration-200", isOpen && "-rotate-180")}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {/* Mega Menu Dropdown */}
      <div
        className={cn(
          'absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)]',
          isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
        )}
      >
        <div
          className="w-[1100px] max-w-[calc(100vw-48px)] bg-white rounded-[24px] overflow-hidden"
          style={{
            border: '1px solid rgba(25, 30, 73, 0.08)',
            boxShadow: '0 12px 48px -12px rgba(188, 38, 155, 0.12), 0 4px 16px rgba(0,0,0,0.04)',
          }}
        >
          {/* Main Grid */}
          <div className="grid grid-cols-3 gap-8 p-10">
            {featureGroups.map((group, idx) => (
              <div key={idx} className="flex flex-col gap-6">
                <h3
                  className="text-eyebrow uppercase"
                  style={{
                    color: 'var(--text-muted)',
                    fontFamily: "'tt-commons-mono-md', monospace",
                    fontSize: '0.8125rem',
                    letterSpacing: '0.12em',
                    fontWeight: 600,
                  }}
                >
                  {group.label}
                </h3>
                <ul className="flex flex-col gap-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-start gap-4 p-3 -ml-3 rounded-[12px] transition-all duration-200 hover:bg-[rgba(188,38,155,0.04)] focus-visible:outline-2 focus-visible:outline-[var(--focus)] focus-visible:outline-offset-2"
                      >
                        <div className="flex-shrink-0 mt-0.5 text-[var(--text-secondary)] group-hover:text-[var(--gs-pink)] transition-colors duration-200">
                          {icons[link.label]}
                        </div>
                        <div className="flex flex-col gap-1">
                          <strong className="text-[1.0625rem] font-semibold text-[var(--text-primary)] group-hover:text-[var(--gs-pink)] transition-colors duration-200" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                            {link.label}
                          </strong>
                          {link.description && (
                            <p className="text-[0.9375rem] text-[var(--text-secondary)] leading-snug" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                              {link.description}
                            </p>
                          )}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar highlight */}
          <div className="bg-[var(--bg-brand-tint)] p-6 border-t border-[rgba(25,30,73,0.06)] flex justify-center">
            <Link
              href="/salon-management-software"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-[var(--gs-pink)] hover:underline focus-visible:outline-2 focus-visible:outline-[var(--focus)] focus-visible:outline-offset-2"
            >
              Explore all GlowSuite features
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
