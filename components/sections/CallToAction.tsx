import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { FadeUp, FadeIn } from '@/components/motion';

export function CallToAction() {
  return (
    <section 
      id="cta"
      className="relative overflow-hidden" 
      style={{ background: 'var(--bg-cta)' }}
    >
      {/* ── Background Abstract Pattern ───────────────────── */}
      {/* 
        A very subtle, premium radial gradient to add depth behind the text. 
        It fades out smoothly to blend perfectly with the background color.
      */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center"
      >
        <div 
          style={{
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at center, rgba(139,63,216,0.06) 0%, rgba(241,14,153,0.02) 40%, rgba(251,251,251,0) 70%)',
          }}
        />
      </div>

      <Container className="relative z-10 py-24 md:py-32 lg:py-40 text-center">
        <div className="max-w-[760px] mx-auto flex flex-col items-center">
          
          <FadeIn delay={0} className="w-full flex justify-center">
            <p className="text-eyebrow text-center" style={{ color: 'var(--gs-pink)', marginBottom: '1.25rem' }}>
              READY TO GROW YOUR SALON?
            </p>
          </FadeIn>
          
          <FadeUp delay={80}>
            <h2 className="text-h2 mb-6 font-normal" style={{ letterSpacing: '-0.02em' }}>
              Everything you need to run your salon. All in one place.
            </h2>
          </FadeUp>
          
          <FadeUp delay={160}>
            <p className="text-body-lg text-[var(--text-secondary)] max-w-[560px] mx-auto leading-relaxed">
              Bring appointments, clients, payments, staff, inventory, and reporting together with GlowSuite.
            </p>
          </FadeUp>
          
        </div>
      </Container>
    </section>
  );
}
