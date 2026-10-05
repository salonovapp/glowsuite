import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { FadeUp, FadeIn } from '@/components/motion';

import { type ReactNode } from 'react';

export interface GlowSuiteCTAProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  eyebrow?: ReactNode;
}

export function GlowSuiteCTA({
  title = "Organize your salon with GlowSuite.",
  subtitle = "Bring your appointments, clients, payments, staff, inventory, and reporting together in one modern platform.",
  eyebrow = "READY TO GROW YOUR SALON?"
}: GlowSuiteCTAProps) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden text-center" style={{ background: 'var(--bg-cta)' }}>
      <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div style={{ width: '100%', height: '100%', background: 'radial-gradient(circle at center, rgba(188,38,155,0.06) 0%, rgba(139,63,216,0.02) 40%, rgba(255,255,255,0) 70%)' }} />
      </div>

      <Container className="relative z-10">
        <div className="max-w-[760px] mx-auto flex flex-col items-center">
          <FadeIn delay={0}>
            <p
              className="mb-4 uppercase"
              style={{
                color: 'var(--gs-pink)',
                fontFamily: "var(--font-mono)",
                fontSize: '0.8125rem',
                letterSpacing: '0.12em',
                fontWeight: 500
              }}
            >
              {eyebrow}
            </p>
          </FadeIn>
          <FadeUp delay={80}>
            <h2 className="mb-5 font-normal" style={{ fontFamily: "var(--font-primary)", fontSize: 'clamp(36px, 3.6vw, 48px)', color: 'var(--text-primary)', lineHeight: 1.08, letterSpacing: '-0.02em', fontWeight: 400 }}>
              {title}
            </h2>
          </FadeUp>
          <FadeUp delay={160}>
            <p className="mb-10 max-w-[560px] mx-auto leading-relaxed font-normal" style={{ fontFamily: "var(--font-primary)", fontSize: 'clamp(1rem, 1.2vw, 1.125rem)', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              {subtitle}
            </p>
          </FadeUp>
          <FadeUp delay={240}>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
              <Link
                href="/book-a-demo"
                className="btn btn-primary btn-lg"
              >
                Book a Demo
              </Link>
              <Link
                href="/salon-management-software"
                className="btn btn-secondary btn-lg"
              >
                Explore GlowSuite
              </Link>
            </div>
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}
