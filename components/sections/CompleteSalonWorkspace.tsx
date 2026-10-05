import { Container } from '@/components/ui/Container';
import { ProductFrame } from '@/components/ui/ProductFrame';
import { FadeUp, FadeIn } from '@/components/motion';

// Simple Icons for the capabilities list
function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function CreditCardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function BarChartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  );
}

const capabilities = [
  {
    name: 'Appointments',
    description: 'Smart booking that keeps your day organized.',
    icon: <CalendarIcon />,
  },
  {
    name: 'Client Management',
    description: 'Detailed profiles to deliver personalized experiences.',
    icon: <UsersIcon />,
  },
  {
    name: 'Billing & POS',
    description: 'Seamless checkouts and integrated payments.',
    icon: <CreditCardIcon />,
  },
  {
    name: 'Reports',
    description: 'Clear insights to help you grow your bottom line.',
    icon: <BarChartIcon />,
  },
];

export function CompleteSalonWorkspace() {
  return (
    <section 
      id="complete-workspace"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: 'var(--bg-page)', paddingTop: '5rem', paddingBottom: '5rem' }}
    >
      <Container>
        {/* ── Section Header ─────────────────────────── */}
        <div className="text-center max-w-[760px] mx-auto mb-12 md:mb-16">
          <FadeIn delay={0} className="w-full flex justify-center">
            <p className="text-eyebrow text-center" style={{ color: 'var(--gs-pink)', marginBottom: '1rem' }}>
              ONE PLATFORM FOR YOUR WHOLE BUSINESS
            </p>
          </FadeIn>
          <FadeUp delay={80}>
            <h2 className="text-h2 mb-4 md:mb-5 font-normal">
              Everything works better when it works together.
            </h2>
          </FadeUp>
          <FadeUp delay={160}>
            <p className="text-body-lg text-[var(--text-secondary)] font-normal">
              GlowSuite connects the everyday tools your salon team relies on—from appointments and clients to billing, staff, inventory, and reporting.
            </p>
          </FadeUp>
        </div>

        {/* ── 2-Column Composition ──────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center">
          
          {/* LEFT: Editorial Content */}
          <div className="flex flex-col">
            <FadeUp delay={200}>
              <h3 className="text-h3 leading-tight mb-5 text-[var(--text-primary)] font-normal">
                From the first booking to the end-of-day report.
              </h3>
              <p className="text-body text-[var(--text-secondary)] mb-8 md:mb-10">
                Stop jumping between disconnected tools and spreadsheets. When your entire salon operates on a single connected platform, data flows naturally from one step to the next, reducing manual work and giving you perfect clarity into your business.
              </p>
            </FadeUp>

            {/* 4 Connected Capabilities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {capabilities.map((item, index) => (
                <FadeUp key={item.name} delay={250 + index * 50}>
                  <div className="group flex flex-col items-start gap-3 p-4 -ml-4 rounded-xl transition-colors duration-200 hover:bg-black/[0.03]">
                    <div 
                      className="flex items-center justify-center w-10 h-10 rounded-lg text-[var(--gs-purple)] transition-transform duration-200 group-hover:scale-105"
                      style={{ backgroundColor: 'rgba(139,63,216,0.08)' }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-[1rem] font-semibold text-[var(--text-primary)] mb-1">
                        {item.name}
                      </h4>
                      <p className="text-[0.875rem] leading-relaxed text-[var(--text-secondary)]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* RIGHT: Stacked Product Composition */}
          <div className="relative w-full h-auto lg:h-[700px] mt-8 lg:mt-0 flex flex-col lg:block">
            
            {/* Subtle Ambient Glow */}
            <div 
              aria-hidden="true"
              className="absolute inset-0 z-0 pointer-events-none hidden lg:block"
              style={{
                background: 'linear-gradient(135deg, rgba(241,14,153,0.06) 0%, rgba(139,63,216,0.05) 50%, rgba(7,81,250,0.06) 100%)',
                filter: 'blur(80px)',
                borderRadius: '50%',
                transform: 'scale(0.9) translate(10%, -10%)',
              }}
            />

            {/* Mobile layout defaults to flex col stack with margin.
                Desktop layout uses absolute positioning for the premium cascade. */}
            
            {/* Dominant Screenshot: Reports */}
            <FadeIn delay={300} className="relative z-10 w-full lg:absolute lg:top-0 lg:right-0 lg:w-[85%] order-1 mb-8 lg:mb-0">
              <ProductFrame
                src="/images/product/reports.webp"
                alt="GlowSuite business reporting and analytics dashboard"
                width={2000}
                height={1125}
                shadow
                className="shadow-[0_24px_50px_-12px_rgba(0,0,0,0.12)] ring-1 ring-black/5"
              />
            </FadeIn>

            {/* Supporting Screenshot 1: Staff */}
            <FadeUp delay={400} className="relative z-20 w-full lg:absolute lg:bottom-[20%] lg:left-0 lg:w-[55%] order-2 mb-8 lg:mb-0">
              <div className="lg:transform lg:-rotate-2 transition-transform duration-500 hover:rotate-0 hover:z-30 hover:scale-[1.02]">
                <ProductFrame
                  src="/images/product/staff.webp"
                  alt="GlowSuite staff management and schedules"
                  width={2000}
                  height={1125}
                  shadow
                  className="shadow-[0_16px_32px_-8px_rgba(0,0,0,0.15)] ring-1 ring-black/5"
                />
              </div>
            </FadeUp>

            {/* Supporting Screenshot 2: Inventory */}
            <FadeUp delay={500} className="relative z-30 w-full lg:absolute lg:-bottom-[5%] lg:right-[10%] lg:w-[48%] order-3">
              <div className="lg:transform lg:rotate-2 transition-transform duration-500 hover:rotate-0 hover:z-40 hover:scale-[1.02]">
                <ProductFrame
                  src="/images/product/inventory.webp"
                  alt="GlowSuite salon inventory tracking"
                  width={2000}
                  height={1125}
                  shadow
                  className="shadow-[0_16px_32px_-8px_rgba(0,0,0,0.15)] ring-1 ring-black/5"
                />
              </div>
            </FadeUp>

          </div>
        </div>

      </Container>
    </section>
  );
}
