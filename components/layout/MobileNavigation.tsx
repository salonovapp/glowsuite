'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { navLinks, navCTAs, featureGroups } from '@/content/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * MobileNavigation — full-width slide-down drawer for small screens.
 *
 * Accessibility:
 * - Uses `inert` attribute to remove drawer from tab order when closed.
 * - Focus moves to first nav link on open.
 * - Escape key triggers close (handled in parent Header).
 * - aria-expanded and aria-controls on the toggle button (in Header).
 * - Backdrop click closes the menu.
 */
export function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const [featuresOpen, setFeaturesOpen] = useState(false);

  // Move focus to first nav link when opened
  useEffect(() => {
    if (isOpen) {
      // Small delay to let transition start before stealing focus
      const timer = setTimeout(() => firstLinkRef.current?.focus(), 80);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <>
      {/* ---------- Backdrop ---------- */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      />

      {/* ---------- Drawer ---------- */}
      <nav
        id="mobile-nav"
        aria-label="Mobile navigation"
        // inert removes all keyboard/screen-reader interaction when closed
        {...(!isOpen ? { inert: true } : {})}
        className={cn(
          'fixed top-0 inset-x-0 z-50 bg-bg-elevated border-b border-[var(--border-subtle)] max-h-[100dvh] overflow-y-auto',
          'transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
          isOpen ? 'translate-y-0' : '-translate-y-full'
        )}
      >
        {/* Header row inside drawer: logo + close button */}
        <div className="sticky top-0 z-10 bg-bg-elevated flex items-center justify-between px-5 h-[60px] border-b border-[var(--border-subtle)]">
          <span className="text-h3 font-bold text-text-primary" aria-hidden="true">
            GlowSuite
          </span>
          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            className="btn btn-ghost btn-sm !px-2 !min-h-[36px]"
          >
            {/* X icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <ul role="list" className="flex flex-col px-4 py-4 gap-1">
          {navLinks.map((link, i) => (
            <li key={link.href}>
              {link.label === 'Features' ? (
                <div className="flex flex-col">
                  <button
                    ref={i === 0 ? (firstLinkRef as any) : undefined}
                    aria-expanded={featuresOpen}
                    onClick={() => setFeaturesOpen(!featuresOpen)}
                    className={cn(
                      'flex items-center justify-between w-full px-3 py-3 rounded-[var(--radius-md)] text-body font-medium',
                      'text-text-primary hover:bg-bg-subtle hover:text-text-primary',
                      'transition-colors duration-150',
                      'focus-visible:outline-2 focus-visible:outline-[var(--focus)] focus-visible:outline-offset-2'
                    )}
                  >
                    {link.label}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("transition-transform duration-200", featuresOpen && "-rotate-180")}>
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  <div className={cn("grid transition-all duration-300 ease-in-out", featuresOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                    <div className="overflow-hidden">
                      <ul className="flex flex-col gap-1 pl-4 pr-2 pb-2 pt-1 border-l-2 border-[var(--border-subtle)] ml-4 mt-1">
                        {featureGroups.flatMap(g => g.links).map((sublink) => (
                          <li key={sublink.href}>
                            <Link
                              href={sublink.href}
                              onClick={onClose}
                              className="block px-3 py-2.5 rounded-[var(--radius-md)] text-[0.9375rem] font-medium text-[var(--text-secondary)] hover:text-[var(--gs-purple)] hover:bg-[rgba(139,63,216,0.05)] transition-colors duration-150"
                            >
                              {sublink.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    'block px-3 py-3 rounded-[var(--radius-md)] text-body font-medium',
                    'text-text-primary hover:bg-bg-subtle hover:text-text-primary',
                    'transition-colors duration-150',
                    'focus-visible:outline-2 focus-visible:outline-[var(--focus)] focus-visible:outline-offset-2'
                  )}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* CTA buttons */}
        <div className="flex flex-col gap-3 px-4 pb-6 pt-2 border-t border-[var(--border-subtle)]">
          <Link
            href={navCTAs.secondary.href}
            onClick={onClose}
            className="btn btn-ghost w-full justify-center"
          >
            {navCTAs.secondary.label}
          </Link>
          <Link
            href={navCTAs.primary.href}
            onClick={onClose}
            className="btn btn-primary w-full justify-center"
          >
            {navCTAs.primary.label}
          </Link>
        </div>
      </nav>
    </>
  );
}
