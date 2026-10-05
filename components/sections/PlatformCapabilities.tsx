import { Container } from '@/components/ui/Container';
import { ProductFrame } from '@/components/ui/ProductFrame';
import { FadeUp, FadeIn } from '@/components/motion';

export function PlatformCapabilities() {
  return (
    <section 
      id="capabilities"
      className="relative w-full overflow-hidden" 
      style={{ backgroundColor: 'var(--bg-page)', paddingTop: '4rem', paddingBottom: '4rem' }}
    >
      <Container>
        {/* Capability 1: Multi-Location */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-12 md:mb-20 lg:mb-24">
          <div className="lg:col-span-8 order-2 lg:order-1 relative">
            <FadeIn>
              {/* Optional subtle decorative background element to ground the image */}
              <div 
                aria-hidden="true" 
                className="absolute inset-0 bg-white rounded-[24px] shadow-sm transform -rotate-1 scale-[1.02]"
                style={{ zIndex: 0, opacity: 0.5 }}
              />
              <div className="relative z-10">
                <ProductFrame
                  src="/images/product/multi-location.webp"
                  alt="GlowSuite Multi-Location Management Interface"
                  width={2000}
                  height={1125}
                  shadow
                />
              </div>
            </FadeIn>
          </div>
          <div className="lg:col-span-4 order-1 lg:order-2">
            <FadeUp>
              <p className="text-eyebrow" style={{ color: 'var(--gs-pink)', marginBottom: '0.875rem' }}>
                MULTI-LOCATION MANAGEMENT
              </p>
              <h2 className="text-h2 mb-3 md:mb-4 font-normal">
                Grow from one location to fifty.
              </h2>
              <p className="text-body-lg text-[var(--text-secondary)] mb-5 font-normal">
                Whether you run a single boutique salon or a growing franchise network, GlowSuite scales effortlessly with your business ambition.
              </p>
              <p className="text-body text-[var(--text-secondary)]">
                Standardize services across all your branches, share staff schedules securely, and manage permissions from a centralized control panel. Compare performance and revenue across locations with a single click.
              </p>
            </FadeUp>
          </div>
        </div>

        {/* Capability 2: Inventory */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-4 order-1">
            <FadeUp>
              <p className="text-eyebrow" style={{ color: 'var(--gs-pink)', marginBottom: '0.875rem' }}>
                SMART INVENTORY
              </p>
              <h2 className="text-h2 mb-3 md:mb-4 font-normal">
                Total control over your retail and supplies.
              </h2>
              <p className="text-body-lg text-[var(--text-secondary)] mb-5 font-normal">
                Keep your shelves stocked and your costs under control without the manual guesswork and spreadsheets.
              </p>
              <p className="text-body text-[var(--text-secondary)]">
                Track professional salon supplies and retail products with absolute precision. Set automatic low-stock alerts, generate purchase orders instantly, and monitor your most profitable retail items to optimize your salon's bottom line.
              </p>
            </FadeUp>
          </div>
          <div className="lg:col-span-8 order-2 relative">
            <FadeIn>
               {/* Optional subtle decorative background element to ground the image */}
               <div 
                aria-hidden="true" 
                className="absolute inset-0 bg-white rounded-[24px] shadow-sm transform rotate-1 scale-[1.02]"
                style={{ zIndex: 0, opacity: 0.5 }}
              />
              <div className="relative z-10">
                <ProductFrame
                  src="/images/product/inventory.webp"
                  alt="GlowSuite Salon Inventory Management Dashboard"
                  width={2000}
                  height={1125}
                  shadow
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
