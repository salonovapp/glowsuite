'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { FadeUp, FadeIn } from '@/components/motion';

// ─────────────────────────────────────────────────────────────
// Each capability maps to its own real product screenshot
// ─────────────────────────────────────────────────────────────
const CAPABILITIES = [
  {
    label: 'Appointments',
    src: '/images/product/appointments.webp',
    alt: 'GlowSuite appointment calendar — bookings, availability and staff schedule',
  },
  {
    label: 'Clients',
    src: '/images/product/clients.webp',
    alt: 'GlowSuite client management — profiles, history and contact details',
  },
  {
    label: 'Staff',
    src: '/images/product/staff.webp',
    alt: 'GlowSuite staff management — team members, schedules and performance',
  },
  {
    label: 'Billing & POS',
    src: '/images/product/billing-pos.webp',
    alt: 'GlowSuite billing and point-of-sale — invoices, payments and checkout',
  },
  {
    label: 'Inventory',
    src: '/images/product/inventory.webp',
    alt: 'GlowSuite inventory — product stock, usage and reorder levels',
  },
  {
    label: 'Reporting',
    src: '/images/product/reports.webp',
    alt: 'GlowSuite reporting — revenue charts, analytics and business performance',
  },
] as const;

type CapabilityIndex = 0 | 1 | 2 | 3 | 4 | 5;

const AUTO_SLIDE_MS = 4000;

export function Hero() {
  const [active, setActive] = useState<CapabilityIndex>(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!paused) {
        setActive((prev) => ((prev + 1) % CAPABILITIES.length) as CapabilityIndex);
      }
    }, AUTO_SLIDE_MS);
  }, [paused]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const handleTabClick = (index: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActive(index as CapabilityIndex);
    timerRef.current = setInterval(() => {
      setActive((prev) => ((prev + 1) % CAPABILITIES.length) as CapabilityIndex);
    }, AUTO_SLIDE_MS);
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-page)' }}
    >
      {/* ── Brand atmosphere: exact approved 9-stop horizontal gradient ── */}
      <div
        aria-hidden="true"
        className="hero-background-gradient"
      />

      {/* pt-[112px] md:pt-[132px] compensates for the 68px transparent header sitting above it */}
      <Container className="relative z-10 pt-[112px] md:pt-[132px] pb-0">

        {/* ── Hero Text: eyebrow → H1 → description (NO CTAs) ── */}
        <div className="flex flex-col items-center text-center max-w-[820px] mx-auto mb-4 md:mb-5">

          {/* Eyebrow */}
          <FadeIn delay={0} className="w-full flex justify-center">
            <p
              className="text-center uppercase tracking-[0.12em] mb-3"
              style={{
                fontSize: '0.8125rem',
                color: 'var(--gs-pink)',
                fontFamily: "var(--font-mono)",
                fontWeight: 500,
              }}
            >
              GLOWSUITE SALON MANAGEMENT SOFTWARE
            </p>
          </FadeIn>

          {/* H1 */}
          <FadeUp delay={80}>
            <h1
              id="hero-heading"
              className="text-center font-normal"
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: 'clamp(40px, 4.8vw, 64px)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                fontWeight: 400,
                marginBottom: '1rem',
              }}
            >
              Run your entire salon from<br className="hidden md:inline" /> one powerful platform.
            </h1>
          </FadeUp>

          {/* Supporting description */}
          <FadeUp delay={140}>
            <p
              className="text-center font-normal"
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: 'clamp(1.125rem, 1.4vw, 1.25rem)',
                color: 'var(--text-secondary)',
                maxWidth: '680px',
                marginInline: 'auto',
                lineHeight: 1.5,
              }}
            >
              Manage appointments, clients, staff, billing, inventory, reporting, and more—all in one connected workspace built for modern salons.
            </p>
          </FadeUp>
        </div>

        {/* ── Capability tabs ─────────────────────────────────── */}
        <FadeUp delay={210} className="w-full max-w-[860px] mx-auto mb-3 relative z-20">
          <div
            role="tablist"
            aria-label="GlowSuite platform capabilities"
            className="flex flex-wrap items-center justify-center gap-2"
          >
            {CAPABILITIES.map((cap, index) => {
              const isActive = active === index;
              return (
                <button
                  key={cap.label}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`carousel-slide-${index}`}
                  onClick={() => handleTabClick(index)}
                  className="relative overflow-hidden font-semibold uppercase tracking-[0.08em] rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[var(--focus)] focus-visible:outline-offset-2"
                  style={{
                    fontFamily: "'tt-commons-mono-md', monospace",
                    fontSize: '0.6875rem',
                    padding: '0.5rem 1.125rem',
                    ...(isActive
                      ? {
                          background: 'linear-gradient(135deg, var(--gs-pink) 0%, var(--gs-purple) 100%)',
                          color: '#fff',
                          boxShadow: '0 4px 14px -2px rgba(139,63,216,0.40)',
                          transform: 'translateY(-1px) scale(1.03)',
                        }
                      : {
                          background: 'rgba(255,255,255,0.80)',
                          color: '#2a2a38',
                          border: '1px solid rgba(139,63,216,0.18)',
                          backdropFilter: 'blur(8px)',
                          boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
                        }),
                  }}
                >
                  {/* Progress sweep on active tab */}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-[2px] rounded-full bg-white/45"
                      style={{ animation: `gs-tab-progress ${AUTO_SLIDE_MS}ms linear forwards` }}
                    />
                  )}
                  {cap.label}
                </button>
              );
            })}
          </div>

          <style>{`
            @keyframes gs-tab-progress {
              from { width: 0%; }
              to   { width: 100%; }
            }
            @media (prefers-reduced-motion: reduce) {
              @keyframes gs-tab-progress { from { width:100%; } to { width:100%; } }
            }
          `}</style>
        </FadeUp>

        {/* ── Horizontal translate3d carousel ─────────────────── */}
        {/*
          Pattern mirrors Mangomint reference:
          All slides in a flex row; track translates by
          -(activeIndex × 100%) with a 600ms cubic-bezier glide.
          No fixed height — image fills the frame naturally via
          w-full h-auto, preserving the actual 16:10 aspect ratio.
        */}
        <FadeUp delay={290} className="w-full max-w-[1080px] mx-auto relative">

          {/* Ambient brand glow behind the frame */}
          <div
            aria-hidden="true"
            className="absolute -inset-8 z-[-1] pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 80% 50% at 50% 80%, rgba(139,63,216,0.14) 0%, rgba(241,14,153,0.07) 55%, transparent 80%)',
              filter: 'blur(48px)',
            }}
          />

          {/* Clip frame */}
          <div
            className="relative rounded-t-[20px] overflow-hidden"
            style={{
              boxShadow: '0 -4px 40px -8px rgba(139,63,216,0.12), 0 0 0 1px rgba(0,0,0,0.055)',
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Browser chrome */}
            <div
              className="relative z-10 flex items-center gap-1.5 px-4 bg-[#F0F0F0] flex-shrink-0"
              style={{ height: '36px', borderBottom: '1px solid rgba(0,0,0,0.08)' }}
              aria-hidden="true"
            >
              <span className="w-[11px] h-[11px] rounded-full bg-[#FF5F57]" />
              <span className="w-[11px] h-[11px] rounded-full bg-[#FEBC2E]" />
              <span className="w-[11px] h-[11px] rounded-full bg-[#28C840]" />
              <div className="flex-1 mx-6 flex items-center justify-center">
                <div
                  className="flex items-center gap-1.5 text-slate-500 rounded-md px-3 py-[3px]"
                  style={{
                    background: 'rgba(0,0,0,0.07)',
                    fontSize: '0.6875rem',
                    maxWidth: '260px',
                    width: '100%',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  app.glowsuite.in
                </div>
              </div>
            </div>

            {/* 
              Viewport Height Controller
              This invisible image stays in the normal document flow.
              Because it has width and height attributes, the browser reserves
              the EXACT required space instantly on initial load before rendering.
              It updates to the active slide, meaning the carousel height is
              always perfectly matching the active slide, ignoring the 6-slide track.
            */}
            <div aria-hidden="true" className="relative w-full opacity-0 pointer-events-none select-none">
              <Image
                src={CAPABILITIES[active].src}
                alt=""
                width={2560}
                height={1600}
                priority
                className="w-full h-auto block"
              />
            </div>

            {/* Slide track - Absolute positioned so it doesn't inflate container height */}
            <div
              role="region"
              aria-live="polite"
              aria-atomic="true"
              className="absolute top-[36px] left-0 right-0 flex items-start"
              style={{
                transform: `translate3d(-${active * 100}%, 0px, 0px)`,
                transition: 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1)',
                willChange: 'transform',
              }}
            >
              {CAPABILITIES.map((cap, index) => (
                <div
                  key={cap.label}
                  id={`carousel-slide-${index}`}
                  role="tabpanel"
                  aria-label={cap.label}
                  data-active={active === index}
                  className="relative flex-shrink-0 w-full"
                >
                  <Image
                    src={cap.src}
                    alt={cap.alt}
                    width={2560}
                    height={1600}
                    priority={index === 0}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    className="w-full h-auto block"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

      </Container>
    </section>
  );
}
