'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { navLinks } from '@/content/navigation';
import { MobileNavigation } from './MobileNavigation';
import { FeaturesMegaMenu } from './FeaturesMegaMenu';
import { cn } from '@/lib/utils';

/**
 * GlowSuite Header — fixed, scroll-aware, premium glass transition.
 *
 * STATE 0 — At top (scrollY ≤ 36px):
 *   Fully transparent. Visually integrated with the Hero background.
 *   Nav text reads cleanly against the Hero gradient.
 *   No border, no shadow, no white rectangle.
 *
 * STATE 1 — After scroll (scrollY > 36px):
 *   Premium frosted-glass surface:
 *   - rgba(255,255,255,0.72) background
 *   - backdrop-filter: blur(20px)
 *   - subtle semi-transparent border
 *   - very light shadow
 *   Transition: 280ms ease-out — smooth, no flicker.
 *
 * Desktop: Logo | Nav links | Log In · Contact Us · Book a Demo
 * Mobile:  Logo | Hamburger → MobileNavigation drawer
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // ── Scroll detection ─────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initialise immediately
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Mobile nav keyboard handling ─────────────────────────────
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && mobileOpen) setMobileOpen(false);
  }, [mobileOpen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // ── Lock body scroll when mobile nav is open ─────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        role="banner"
        className="fixed top-0 inset-x-0 z-50 h-[68px]"
        style={{
          // All transition properties in one declaration for performance
          transition: 'background-color 280ms ease-out, backdrop-filter 280ms ease-out, -webkit-backdrop-filter 280ms ease-out, border-color 280ms ease-out, box-shadow 280ms ease-out',
          // Scrolled state: premium glass surface
          ...(scrolled
            ? {
                backgroundColor: 'rgba(255,255,255,0.76)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255,255,255,0.55)',
                boxShadow: '0 1px 0 rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.04)',
              }
            : {
                // Top state: fully transparent, merges with Hero
                backgroundColor: 'transparent',
                backdropFilter: 'none',
                WebkitBackdropFilter: 'none',
                borderBottom: '1px solid transparent',
                boxShadow: 'none',
              }),
        }}
      >
        <div className="container-wide h-full flex items-center justify-between gap-6">

          {/* ── Logo ─────────────────────────────────────────── */}
          <Link
            href="/"
            aria-label="GlowSuite home"
            className="flex-shrink-0 flex items-center focus-visible:outline-2 focus-visible:outline-[var(--focus)] focus-visible:outline-offset-3 rounded-[4px]"
          >
            <Image
              src="/brand/logo-trimmed.png"
              alt="GlowSuite"
              width={160}
              height={36}
              priority
              className="h-8 md:h-[34px] w-auto object-contain"
            />
          </Link>

          {/* ── Desktop Navigation ───────────────────────────── */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
            <ul role="list" className="flex items-center gap-0.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.label === 'Features' ? (
                    <FeaturesMegaMenu scrolled={scrolled} />
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        'px-3.5 py-2 rounded-[8px] text-[0.875rem] font-medium',
                        'transition-all duration-200',
                        'focus-visible:outline-2 focus-visible:outline-[var(--focus)] focus-visible:outline-offset-2',
                        scrolled
                          ? 'text-[var(--text-secondary)] hover:text-[var(--gs-pink)] hover:bg-black/[0.04]'
                          : 'text-[var(--text-primary)] hover:text-[var(--gs-pink)] hover:bg-white/30'
                      )}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Desktop CTAs ─────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">

            {/* Sign In — Secondary Button (Outline) */}
            <Link
              href="https://app.glowsuite.in/login"
              className="btn btn-secondary btn-sm"
            >
              Sign In
            </Link>

            {/* Book a Demo — Primary Button (Solid) */}
            <Link
              href="/book-a-demo"
              className="btn btn-primary btn-sm"
            >
              Book a Demo
            </Link>
          </div>

          {/* ── Mobile Hamburger ─────────────────────────────── */}
          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((prev) => !prev)}
            className={cn(
              'md:hidden flex flex-col justify-center items-center gap-[5px]',
              'w-10 h-10 rounded-[8px]',
              'hover:bg-black/[0.05] transition-colors duration-150',
              'focus-visible:outline-2 focus-visible:outline-[var(--focus)] focus-visible:outline-offset-2'
            )}
          >
            <span
              className={cn(
                'block w-5 h-[1.5px] bg-[var(--text-primary)] rounded-full',
                'transition-transform duration-300 origin-center',
                mobileOpen && 'translate-y-[6.5px] rotate-45'
              )}
            />
            <span
              className={cn(
                'block w-5 h-[1.5px] bg-[var(--text-primary)] rounded-full',
                'transition-opacity duration-200',
                mobileOpen && 'opacity-0'
              )}
            />
            <span
              className={cn(
                'block w-5 h-[1.5px] bg-[var(--text-primary)] rounded-full',
                'transition-transform duration-300 origin-center',
                mobileOpen && '-translate-y-[6.5px] -rotate-45'
              )}
            />
          </button>

        </div>
      </header>

      {/* Mobile Navigation drawer */}
      <MobileNavigation
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}
