import { Container } from '@/components/ui/Container';
import { FadeUp, FadeIn } from '@/components/motion';

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────
const benefits = [
  {
    number: '01',
    title: 'Run your day with clarity',
    description: 'Appointments, staff schedules, customers, and daily operations in one connected workspace.',
  },
  {
    number: '02',
    title: 'Give your clients a better experience',
    description: 'Make booking easier and keep customer information organized across every interaction.',
  },
  {
    number: '03',
    title: 'Make better business decisions',
    description: 'Bring billing, inventory, staff performance, and reporting together so you can understand your salon at a glance.',
  },
] as const;

// ─────────────────────────────────────────────────────────────
// WhyGlowSuite Section
// ─────────────────────────────────────────────────────────────
export function WhyGlowSuite() {
  return (
    <section
      aria-labelledby="why-heading"
      className="relative w-full"
      style={{ background: 'var(--bg-brand-tint)', paddingTop: '5rem', paddingBottom: '5rem' }}
    >
      <Container>
        {/* ── Section Header ─────────────────────────── */}
        <div className="max-w-[760px] mb-12 md:mb-14">
          <FadeIn delay={0}>
            <p className="text-eyebrow" style={{ color: 'var(--gs-pink)', marginBottom: '0.75rem' }}>
              BUILT FOR MODERN SALONS
            </p>
          </FadeIn>
          
          <FadeUp delay={80}>
            <h2 id="why-heading" className="text-h2 font-normal" style={{ marginBottom: '0.75rem', fontWeight: 400 }}>
              Less time managing your business. More time growing it.
            </h2>
          </FadeUp>
        </div>

        {/* ── Benefit Grid (3-step horizontal on desktop) ────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-12">
          {benefits.map((benefit, i) => (
            <div key={benefit.number} className="group relative flex flex-col">
              {/* Subtle top border line with hover interaction */}
              <div 
                aria-hidden="true"
                className="w-full h-[1px] mb-5 md:mb-6 transition-colors duration-300 group-hover:bg-[var(--gs-pink)] bg-[var(--border-subtle)]"
              />

              {/* Decorative Number */}
              <FadeIn delay={i * 80}>
                <div 
                  aria-hidden="true"
                  className="font-outfit font-normal leading-none select-none mb-4"
                  style={{ 
                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  <span style={{ color: 'var(--gs-pink)' }}>{benefit.number.charAt(0)}</span>
                  {benefit.number.charAt(1)}
                </div>
              </FadeIn>

              {/* Content Block */}
              <FadeUp delay={(i * 80) + 40} className="flex-1">
                <h3 className="text-h3 mb-2 font-normal" style={{ fontSize: '1.25rem', fontWeight: 400 }}>
                  {benefit.title}
                </h3>
                
                <p className="text-[0.9375rem] md:text-[1rem] text-[var(--text-secondary)] leading-[1.6] font-normal" style={{ fontFamily: 'var(--font-primary)' }}>
                  {benefit.description}
                </p>
              </FadeUp>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
