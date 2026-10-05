'use client';

import { useState, useEffect, useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { ProductFrame } from '@/components/ui/ProductFrame';
import { FadeUp, FadeIn } from '@/components/motion';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/components/motion/hooks';

// ─────────────────────────────────────────────────────────────
// Workspace Tab Data
// ─────────────────────────────────────────────────────────────
type FeatureTab = {
  id: string;
  label: string;
  title: string;
  description: string;
  imageSrc: string;
};

const tabs: FeatureTab[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    title: 'Your salon, at a glance.',
    description: 'Get a clear view of appointments, daily activity and important business information from one central dashboard.',
    imageSrc: '/images/product/dashboard.webp',
  },
  {
    id: 'appointments',
    label: 'Appointments',
    title: 'Keep your schedule running smoothly.',
    description: 'Manage appointments, organize your calendar and keep your salon team aligned throughout the day.',
    imageSrc: '/images/product/appointments.webp',
  },
  {
    id: 'clients',
    label: 'Clients',
    title: 'Build stronger client relationships.',
    description: 'Keep client information, appointment history and important details organized in one connected workspace.',
    imageSrc: '/images/product/clients.webp',
  },
  {
    id: 'billing',
    label: 'Billing & POS',
    title: 'Simplify billing and daily transactions.',
    description: 'Manage payments and salon transactions with an organized workflow designed for daily operations.',
    imageSrc: '/images/product/billing-pos.webp',
  },
  {
    id: 'staff',
    label: 'Staff',
    title: 'Keep your team connected.',
    description: 'Manage staff information and support smoother day-to-day salon operations.',
    imageSrc: '/images/product/staff.webp',
  },
  {
    id: 'reports',
    label: 'Reports',
    title: 'Understand your business better.',
    description: 'Access business insights and reporting information to help you understand your salon operations.',
    imageSrc: '/images/product/reports.webp',
  },
];



// ─────────────────────────────────────────────────────────────
// ConnectedWorkspace Section
// ─────────────────────────────────────────────────────────────
export function ConnectedWorkspace() {
  const [activeTab, setActiveTab] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const tablistRef = useRef<HTMLDivElement>(null);

 

  const handleTabChange = (index: number) => {
    if (index === activeTab) return;
    
    if (reducedMotion) {
      setActiveTab(index);
    } else {
      setIsFading(true);
      setTimeout(() => {
        setActiveTab(index);
        setIsFading(false);
      }, 150); // Fast, subtle fade out/in
    }
  };

  const currentTab = tabs[activeTab];

  // Keyboard navigation support for tabs
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = tabs.length - 1;
    }
    
    if (nextIndex !== index) {
      e.preventDefault();
      handleTabChange(nextIndex);
      // Focus the new tab
      const tabElements = tablistRef.current?.querySelectorAll('[role="tab"]');
      if (tabElements && tabElements[nextIndex]) {
        (tabElements[nextIndex] as HTMLElement).focus();
      }
    }
  };

  return (
    <section
      id="connected-workspace"
      aria-labelledby="workspace-heading"
      className="section-padding"
      style={{ backgroundColor: 'var(--bg-page)' }}
    >
      <Container>
        {/* ── Section Header ─────────────────────────── */}
        <div className="text-center max-w-[760px] mx-auto mb-8 md:mb-12">
          <FadeIn delay={0} className="w-full flex justify-center">
            <p className="text-eyebrow text-center" style={{ color: 'var(--gs-pink)', marginBottom: '1rem' }}>
              ONE CONNECTED WORKSPACE
            </p>
          </FadeIn>
          <FadeUp delay={80}>
            <h2 id="workspace-heading" className="text-h2 font-normal" style={{ marginBottom: '1rem', fontWeight: 400 }}>
              Everything your salon needs, connected in one place.
            </h2>
          </FadeUp>
          <FadeUp delay={160}>
            <p className="text-body-lg font-normal" style={{ color: 'var(--text-secondary)' }}>
              GlowSuite brings appointments, client management, billing, staff, inventory and business insights together in one powerful salon management platform. Spend less time switching between tools and more time growing your salon business.
            </p>
          </FadeUp>
        </div>

        {/* ── Feature Tabs Navigation ─────────────────── */}
        <FadeUp delay={240}>
          <div className="flex justify-center mb-8 md:mb-10">
            <div 
              ref={tablistRef}
              role="tablist" 
              aria-label="Workspace Features"
              className="flex items-center overflow-x-auto pb-4 md:pb-0 hide-scrollbar snap-x snap-mandatory max-w-full"
              style={{
                gap: '0.25rem',
                borderBottom: '1px solid var(--border-subtle)',
                maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                paddingInline: '5%',
              }}
            >
              {tabs.map((tab, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`tabpanel-${tab.id}`}
                    id={`tab-${tab.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => handleTabChange(idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className={cn(
                      "snap-start px-4 py-3 md:px-5 md:py-3.5 whitespace-nowrap text-[0.9375rem] font-medium transition-all duration-200 border-b-2 outline-none focus-visible:bg-black/5 rounded-t-[6px]",
                      isActive
                        ? "text-[var(--text-primary)] border-[var(--gs-purple)]"
                        : "text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]"
                    )}
                  >
                    {isActive ? (
                      <span className="text-gradient font-semibold tracking-tight">{tab.label}</span>
                    ) : (
                      tab.label
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </FadeUp>

        {/* ── Product Area ────────────────────────────── */}
        <FadeIn delay={300}>
          <div
            id={`tabpanel-${currentTab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${currentTab.id}`}
            tabIndex={0}
            className="focus-visible:outline-2 focus-visible:outline-[var(--focus)] focus-visible:outline-offset-4 rounded-[var(--radius-lg)]"
            style={{
              transition: reducedMotion ? 'none' : 'opacity 150ms ease, transform 150ms ease',
              opacity: isFading ? 0 : 1,
              transform: isFading && !reducedMotion ? 'translateY(4px)' : 'translateY(0)',
            }}
          >
            <div 
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'clamp(1.5rem, 4vw, 3rem)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {/* Product Info (Left Column) */}
              <div className="lg:col-span-4 flex flex-col justify-center order-2 lg:order-1">
                <span 
                  className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold mb-4 lg:mb-5"
                  style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-primary)' }}
                >
                  {activeTab + 1}
                </span>
                <h3 className="text-h3 mb-3 lg:mb-4 font-normal">
                  {currentTab.title}
                </h3>
                <p className="text-[0.9375rem] md:text-base text-[var(--text-secondary)] leading-relaxed">
                  {currentTab.description}
                </p>
              </div>

              {/* Screenshot Area (Right Column) */}
              <div className="lg:col-span-8 order-1 lg:order-2">
                <ProductFrame
                  src={currentTab.imageSrc}
                  alt={`${currentTab.label} feature dashboard interface`}
                  width={2000}
                  height={1125}
                  variant="light"
                  shadow
                />
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
