import { Container } from '@/components/ui/Container';
import { ProductFrame } from '@/components/ui/ProductFrame';
import { FadeUp, FadeIn, ScaleReveal } from '@/components/motion';

export function ProductProof() {
  return (
    <section 
      id="product-proof"
      className="relative w-full overflow-hidden" 
      style={{ background: 'var(--bg-brand-tint)', paddingTop: '5rem', paddingBottom: '5rem' }}
    >
      <Container>
        {/* ── Section Header ─────────────────────────── */}
        <div className="text-center max-w-[760px] mx-auto mb-12 md:mb-16">
          <FadeIn delay={0} className="w-full flex justify-center">
            <p className="text-eyebrow text-center" style={{ color: 'var(--gs-pink)', marginBottom: '1rem' }}>
              BUILT FOR REAL SALON OPERATIONS
            </p>
          </FadeIn>
          
          <FadeUp delay={80}>
            <h2 className="text-h2 mb-4 md:mb-5 font-normal">
              Everything your team needs to run the business.
            </h2>
          </FadeUp>
          
          <FadeUp delay={160}>
            <p className="text-body-lg text-[var(--text-secondary)] font-normal mx-auto">
              From the front desk to daily operations, GlowSuite brings the tools your salon needs into one connected workspace.
            </p>
          </FadeUp>
        </div>

        {/* ── Product Composition ─────────────────────── */}
        <div className="relative w-full max-w-5xl mx-auto mb-4 md:mb-8">
          
          {/* Subtle Ambient Glow */}
          <div 
            aria-hidden="true"
            className="absolute inset-0 z-0 pointer-events-none hidden md:block"
            style={{
              background: 'linear-gradient(135deg, rgba(241,14,153,0.08) 0%, rgba(139,63,216,0.06) 50%, rgba(7,81,250,0.08) 100%)',
              filter: 'blur(80px)',
              borderRadius: '50%',
              transform: 'scale(1.1) translateY(10%)',
            }}
          />

          <div className="relative z-10 flex flex-col md:block">
            
            {/* Center Primary (Appointments) */}
            <div className="w-full md:w-[76%] mx-auto relative z-10 order-2 md:order-none">
              <ScaleReveal from={0.97} duration={700}>
                <ProductFrame
                  src="/images/product/appointments.webp"
                  alt="GlowSuite Smart Appointments Calendar"
                  width={2000}
                  height={1125}
                  priority
                  className="shadow-[0_24px_50px_-12px_rgba(0,0,0,0.15)] ring-1 ring-black/5"
                />
              </ScaleReveal>
            </div>

            {/* Left Supporting (Clients) */}
            <FadeUp delay={200} className="w-full md:w-[38%] md:absolute md:-left-[8%] md:top-[12%] md:z-20 order-1 md:order-none mb-8 md:mb-0">
              <div className="md:transform md:-rotate-2 transition-transform duration-500 hover:rotate-0 hover:z-30 hover:scale-[1.02]">
                <ProductFrame
                  src="/images/product/clients.webp"
                  alt="GlowSuite Client Profiles"
                  width={2000}
                  height={1125}
                  className="shadow-[0_16px_32px_-8px_rgba(0,0,0,0.12)] ring-1 ring-black/5"
                />
              </div>
            </FadeUp>

            {/* Right Supporting (Billing/POS) */}
            <FadeUp delay={300} className="w-full md:w-[38%] md:absolute md:-right-[8%] md:-bottom-[10%] md:z-20 order-3 md:order-none mt-8 md:mt-0">
              <div className="md:transform md:rotate-2 transition-transform duration-500 hover:rotate-0 hover:z-30 hover:scale-[1.02]">
                <ProductFrame
                  src="/images/product/billing-pos.webp"
                  alt="GlowSuite POS and Billing Interface"
                  width={2000}
                  height={1125}
                  className="shadow-[0_16px_32px_-8px_rgba(0,0,0,0.12)] ring-1 ring-black/5"
                />
              </div>
            </FadeUp>
            
          </div>
        </div>

        {/* ── Closing Statement ───────────────────────── */}
        <div className="text-center mt-12 md:mt-32 w-full flex justify-center">
          <FadeUp delay={400} className="w-full flex justify-center text-center">
            <h3 
              className="text-h3 font-normal text-center mx-auto max-w-none" 
              style={{ 
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                fontWeight: 400,
              }}
            >
              One platform. One connected view of your salon.
            </h3>
          </FadeUp>
        </div>

      </Container>
    </section>
  );
}
