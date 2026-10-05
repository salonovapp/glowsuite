import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ProductFrame } from '@/components/ui/ProductFrame';
import { FadeUp, FadeIn, ScaleReveal } from '@/components/motion';

export interface FloatingCard {
  icon?: React.ReactNode;
  label: string;
  value?: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  delay?: number;
}

export interface EditorialHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  floatingCards?: FloatingCard[];
}

export function EditorialHero({ eyebrow, title, description, imageSrc, imageAlt, floatingCards }: EditorialHeroProps) {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden" style={{ backgroundColor: 'var(--bg-page)' }}>
      {/* Soft atmospheric gradient */}
      <div
        aria-hidden="true"
        className="hero-background-gradient"
      />

      <Container className="relative z-10">
        <div className="max-w-[900px] mx-auto text-center flex flex-col items-center">
          <FadeIn delay={0}>
            <p
              className="mb-4 uppercase"
              style={{
                color: 'var(--gs-pink)',
                fontFamily: "var(--font-mono)",
                fontSize: '0.8125rem',
                letterSpacing: '0.12em',
                fontWeight: 500,
              }}
            >
              {eyebrow}
            </p>
          </FadeIn>
          <FadeUp delay={100}>
            <h1
              className="text-center mb-6 font-normal"
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: 'clamp(40px, 4.8vw, 64px)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                fontWeight: 400,
              }}
            >
              {title}
            </h1>
          </FadeUp>
          <FadeUp delay={200}>
            <p
              className="mb-10 md:mb-12 leading-relaxed font-normal"
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: 'clamp(1.125rem, 1.4vw, 1.25rem)',
                color: 'var(--text-secondary)',
                maxWidth: '640px',
                lineHeight: 1.5,
              }}
            >
              {description}
            </p>
          </FadeUp>
          <FadeUp delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0 justify-center">
              <Link
                href="/book-a-demo"
                className="btn btn-primary btn-lg"
              >
                Book a Demo
              </Link>
              <Link
                href="/#features"
                className="btn btn-secondary btn-lg"
              >
                Explore GlowSuite
              </Link>
            </div>
          </FadeUp>
        </div>

        <div className="mt-16 md:mt-24 max-w-[1140px] mx-auto relative z-10">
          <ScaleReveal from={0.97} duration={700} delay={400}>
            <div className="relative rounded-[var(--radius-product)] bg-[var(--bg-elevated)] p-2 border border-[var(--border-subtle)] shadow-[var(--shadow-md)]">
              <ProductFrame
                src={imageSrc}
                alt={imageAlt}
                width={2000}
                height={1125}
                priority
              />

              {/* Floating UI Cards */}
              {floatingCards && floatingCards.map((card, i) => (
                <div
                  key={i}
                  className="absolute hidden md:flex items-center gap-3 bg-[var(--bg-elevated)] px-4 py-3 rounded-[var(--radius-md)] animate-float"
                  style={{
                    ...card.position,
                    border: '1px solid var(--border-subtle)',
                    boxShadow: 'var(--shadow-sm)',
                    animationDelay: `${card.delay || 0}s`,
                    zIndex: 20
                  }}
                >
                  {card.icon && (
                    <div className="w-8 h-8 rounded-[var(--radius-sm)] flex items-center justify-center bg-[rgba(188,38,155,0.06)] text-[var(--gs-pink)]">
                      {card.icon}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-[0.75rem] uppercase tracking-wider font-medium text-[var(--text-muted)]" style={{ fontFamily: "var(--font-mono)" }}>
                      {card.label}
                    </span>
                    {card.value && (
                      <span className="text-[0.9375rem] font-medium text-[var(--text-primary)] leading-none mt-0.5" style={{ fontFamily: "var(--font-primary)" }}>
                        {card.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScaleReveal>
        </div>
      </Container>
    </section>
  );
}
