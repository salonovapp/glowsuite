import { Container } from '@/components/ui/Container';
import { ProductFrame } from '@/components/ui/ProductFrame';
import { FadeUp, FadeIn } from '@/components/motion';

export interface ProductStorySectionProps {
  eyebrow?: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
  features?: { icon: React.ReactNode; text: React.ReactNode }[];
  backgroundColor?: string;
}

export function ProductStorySection({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  reverse = false,
  features,
  backgroundColor = 'var(--bg-page)'
}: ProductStorySectionProps) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor }}>
      <Container>
        <div className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* Text Content */}
          <div className="flex-1 max-w-[540px] w-full">
            {eyebrow && (
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
            )}
            
            <FadeUp delay={100}>
              <h2
                className="font-normal mb-6"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: 'clamp(36px, 3.6vw, 48px)',
                  lineHeight: 1.08,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                  fontWeight: 400,
                }}
              >
                {title}
              </h2>
            </FadeUp>
            
            <FadeUp delay={200}>
              <p
                className="mb-8 font-normal"
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
                  lineHeight: 1.55,
                  color: 'var(--text-secondary)',
                }}
              >
                {description}
              </p>
            </FadeUp>

            {features && features.length > 0 && (
              <ul className="flex flex-col gap-4 mt-8">
                {features.map((feature, idx) => (
                  <FadeUp key={idx} delay={300 + idx * 50}>
                    <li className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-[var(--radius-sm)] bg-[rgba(188,38,155,0.06)] text-[var(--gs-pink)] flex items-center justify-center mt-1">
                        {feature.icon}
                      </div>
                      <div className="text-[1rem] leading-relaxed text-[var(--text-primary)] font-normal" style={{ fontFamily: "var(--font-primary)" }}>
                        {feature.text}
                      </div>
                    </li>
                  </FadeUp>
                ))}
              </ul>
            )}
          </div>

          {/* Image */}
          <div className="flex-1 w-full max-w-[700px]">
            <FadeUp delay={200}>
              <div className="relative rounded-[var(--radius-product)] bg-[var(--bg-elevated)] p-2 border border-[var(--border-subtle)] shadow-[var(--shadow-md)]">
                <ProductFrame
                  src={imageSrc}
                  alt={imageAlt}
                  width={1400}
                  height={850}
                />
              </div>
            </FadeUp>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
