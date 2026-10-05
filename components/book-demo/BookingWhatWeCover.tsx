import { FadeIn, FadeUp } from '@/components/motion';

const items = [
  {
    number: '01',
    title: 'Your salon & current setup',
    description: 'We explore your current booking process, salon team size, and existing tools.',
  },
  {
    number: '02',
    title: 'Your workflow & challenges',
    description: 'Pinpoint friction areas in scheduling, client records, billing, or multi-location management.',
  },
  {
    number: '03',
    title: 'Live GlowSuite walkthrough',
    description: 'See the connected platform tailored to how your stylists, reception, and managers work.',
  },
  {
    number: '04',
    title: 'Questions & next steps',
    description: 'Get straight answers on onboarding, data migration from your current software, and plans.',
  },
];

export function BookingWhatWeCover() {
  return (
    <div className="flex flex-col">
      {/* Intro Header */}
      <FadeIn delay={0}>
        <p
          className="text-eyebrow mb-4 uppercase"
          style={{
            color: 'var(--gs-pink)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8125rem',
            letterSpacing: '0.12em',
            fontWeight: 500,
          }}
        >
          BOOK A DEMO
        </p>
      </FadeIn>

      <FadeUp delay={80}>
        <h1
          className="font-normal text-[var(--text-primary)] mb-5"
          style={{
            fontFamily: 'var(--font-primary)',
            fontSize: 'clamp(2.25rem, 3.5vw, 3.25rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            fontWeight: 400,
          }}
        >
          See GlowSuite in action.
        </h1>
      </FadeUp>

      <FadeUp delay={160}>
        <p
          className="text-[1.125rem] text-[var(--text-secondary)] leading-relaxed mb-10 md:mb-12 font-normal"
          style={{
            fontFamily: 'var(--font-primary)',
            maxWidth: '520px',
            lineHeight: 1.55,
          }}
        >
          Get a personalized walkthrough of GlowSuite and see how it can fit your salon&apos;s daily workflow.
        </p>
      </FadeUp>

      {/* "What we'll cover" list */}
      <div className="border-t border-[var(--border)] pt-8 md:pt-10">
        <FadeIn delay={200}>
          <h2
            className="text-[0.75rem] uppercase font-medium tracking-[0.14em] text-[var(--text-muted)] mb-8"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            WHAT WE&apos;LL COVER
          </h2>
        </FadeIn>

        <div className="flex flex-col gap-6 md:gap-7">
          {items.map((item, index) => (
            <FadeUp key={item.number} delay={240 + index * 60}>
              <div className="group flex items-start gap-5 pb-6 border-b border-[var(--border-subtle)] last:border-none">
                <span
                  className="text-[0.9375rem] font-bold text-[var(--gs-pink)] pt-0.5"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {item.number}
                </span>
                <div className="flex flex-col">
                  <h3
                    className="text-[1.125rem] md:text-[1.1875rem] font-normal text-[var(--text-primary)] mb-1.5 transition-colors"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      letterSpacing: '-0.01em',
                      fontWeight: 400,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[0.9375rem] text-[var(--text-secondary)] leading-relaxed font-normal"
                    style={{ fontFamily: 'var(--font-primary)' }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* Trust reassurance pills */}
      <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] flex flex-wrap gap-4 text-[0.8125rem] text-[var(--text-secondary)]">
        <span className="inline-flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--gs-pink)]">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          30-minute session
        </span>
        <span className="inline-flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--gs-pink)]">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Live screen demo
        </span>
        <span className="inline-flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--gs-pink)]">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Tailored to your salon size
        </span>
      </div>
    </div>
  );
}
