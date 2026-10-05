'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { ProductFrame } from '@/components/ui/ProductFrame';
import { FadeUp, FadeIn, ScaleReveal } from '@/components/motion';

const topics = [
  {
    id: '01',
    title: 'Everything connected',
    content: 'GlowSuite connects appointments, clients, billing, staff, inventory, and reporting in one workspace. Instead of moving information between separate tools, your team can manage the daily flow of the salon from one connected platform.',
    image: '/images/product/dashboard.webp',
    imageAlt: 'GlowSuite connected dashboard',
  },
  {
    id: '02',
    title: 'Built around real salon operations',
    content: 'GlowSuite is designed around the everyday work that happens inside a salon. Manage bookings, client information, staff operations, billing, inventory, and reporting from tools built to work together.',
    image: '/images/product/appointments.webp',
    imageAlt: 'Salon appointment scheduling interface',
  },
  {
    id: '03',
    title: 'Less switching. Less manual work.',
    content: 'When appointments, clients, billing, inventory, and reporting are connected, your team can avoid repeatedly moving information between disconnected systems. GlowSuite keeps important business information connected across everyday operations.',
    image: '/images/product/billing-pos.webp',
    imageAlt: 'Integrated POS and billing interface',
  },
  {
    id: '04',
    title: 'Clearer visibility across your business',
    content: 'GlowSuite brings operational and business information together so salon owners and managers can understand what is happening across appointments, billing, inventory, staff, and reporting from one connected platform.',
    image: '/images/product/reports.webp',
    imageAlt: 'Salon reporting and analytics dashboard',
  },
  {
    id: '05',
    title: 'Ready for multiple locations',
    content: 'Manage multiple salon locations from one connected platform. Standardize operations, coordinate staff access, and understand performance across your branches.',
    image: '/images/product/multi-location.webp',
    imageAlt: 'Multi-location salon management view',
  },
];

export function WhyGlowSuiteAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      {/* ── HERO SECTION ────────────────────────────────────────── */}
      <section className="relative pt-32 pb-32 md:pt-40 md:pb-48 overflow-hidden bg-[var(--bg-page)]">
        {/* Soft Premium Gradient Background — Exact Approved 9-Stop Gradient */}
        <div
          aria-hidden="true"
          className="hero-background-gradient"
        />

        <Container className="relative z-10">
          <div className="max-w-[700px] mx-auto text-center flex flex-col items-center">
            <FadeIn delay={0}>
              <p className="text-eyebrow mb-5 text-[var(--gs-pink)]">
                WHY GLOWSUITE
              </p>
            </FadeIn>
            
            <FadeUp delay={80}>
              <h1 className="text-h1 mb-6 text-[var(--text-primary)]">
                Why your salon needs one<br className="hidden md:block" /> connected platform.
              </h1>
            </FadeUp>
            
            <FadeUp delay={160}>
              <p className="text-[1.125rem] md:text-[1.1875rem] mb-10 text-[var(--text-secondary)] max-w-[600px] leading-relaxed mx-auto" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                Running a modern salon means keeping appointments, clients, staff, billing, inventory, and reporting moving together. GlowSuite brings these everyday operations into one connected workspace so your team can spend less time switching between tools and more time running the salon.
              </p>
            </FadeUp>

            <FadeUp delay={240}>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0 justify-center">
                <Link href="/book-a-demo" className="btn btn-primary btn-lg font-semibold">
                  Book a Demo
                </Link>
                <Link href="/salon-management-software" className="btn btn-secondary btn-lg font-semibold">
                  Explore Features
                </Link>
              </div>
            </FadeUp>
          </div>

          <div className="mt-16 md:mt-20 max-w-[1040px] mx-auto relative z-10">
            <ScaleReveal from={0.97} duration={700} delay={320}>
              <div className="relative rounded-[var(--radius-product)] bg-[var(--bg-elevated)] p-2 border border-[var(--border-subtle)] shadow-[var(--shadow-md)]">
                <ProductFrame
                  src="/images/product/dashboard.webp"
                  alt="GlowSuite salon dashboard"
                  width={2000}
                  height={1125}
                  priority
                />
              </div>
            </ScaleReveal>
          </div>
        </Container>

        {/* Decorative Flowing Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none h-[140px] md:h-[220px] z-20 translate-y-[45%]">
          <svg 
            viewBox="0 0 1440 220" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-full h-full object-cover md:object-fill"
            preserveAspectRatio="none"
          >
            <path 
              d="M-50,110 C250,-30 450,250 750,110 C1050,-30 1250,250 1490,110" 
              stroke="url(#premium-wave-gradient)" 
              strokeWidth="20"
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0px 8px 24px rgba(25, 30, 73, 0.06))' }}
            />
            <defs>
              <linearGradient id="premium-wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D5D4FB" stopOpacity="0" />
                <stop offset="12.5%" stopColor="#D5D4FB" stopOpacity="0.95" />
                <stop offset="25%" stopColor="#DCCAF8" />
                <stop offset="37.5%" stopColor="#E5CAF2" />
                <stop offset="50%" stopColor="#F0CCEB" />
                <stop offset="62.5%" stopColor="#F9CEE5" />
                <stop offset="75%" stopColor="#FCD2DF" />
                <stop offset="87.5%" stopColor="#FCD7DA" />
                <stop offset="100%" stopColor="#FDDED2" stopOpacity="0.95" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* ── ACCORDION SECTION ──────────────────────────────────────── */}
      <section className="relative py-20 md:py-32 bg-[var(--bg-brand-tint)]">
        <Container>
          <div className="max-w-[1040px] mx-auto flex flex-col gap-2">
            {topics.map((topic, index) => {
              const isOpen = openIndex === index;
              
              return (
                <div key={topic.id} className="group flex flex-col">
                  {/* TRIGGER */}
                  <button
                    onClick={() => setOpenIndex(index)}
                    aria-expanded={isOpen}
                    aria-controls={`panel-${topic.id}`}
                    id={`accordion-trigger-${topic.id}`}
                    className={`flex items-center justify-between py-6 md:py-8 w-full text-left transition-colors duration-200 border-t ${
                      isOpen ? 'border-transparent' : 'border-[var(--border-subtle)] hover:border-[rgba(21,27,74,0.15)]'
                    } focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)] rounded-[4px]`}
                  >
                    <div className="flex items-center gap-6 md:gap-10">
                      <span 
                        className={`flex items-center justify-center w-12 h-12 rounded-full text-[1rem] font-bold transition-colors ${
                          isOpen ? 'bg-[#FBF0F9] text-[var(--gs-pink)]' : 'bg-transparent text-[var(--text-muted)]'
                        }`}
                        style={{ fontFamily: "'tt-commons-mono-md', monospace" }}
                      >
                        {topic.id}
                      </span>
                      <span 
                        className={`text-[1.5rem] md:text-[2rem] font-normal transition-colors ${
                          isOpen ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'
                        }`}
                        style={{ fontFamily: "var(--font-primary)", fontWeight: 400 }}
                      >
                        {topic.title}
                      </span>
                    </div>
                    
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                      isOpen ? 'border-[var(--gs-pink)] bg-[var(--gs-pink)] text-white' : 'border-[var(--border)] text-[var(--text-secondary)] group-hover:border-[var(--text-primary)] group-hover:text-[var(--text-primary)]'
                    }`}>
                      {isOpen ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      )}
                    </div>
                  </button>

                  {/* CONTENT PANEL */}
                  <div
                    id={`panel-${topic.id}`}
                    role="region"
                    aria-labelledby={`accordion-trigger-${topic.id}`}
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? 'grid-rows-[1fr] opacity-100 mb-8 mt-2' : 'grid-rows-[0fr] opacity-0 mb-0 mt-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="bg-[var(--bg-elevated)] rounded-[var(--radius-lg)] md:rounded-[32px] p-6 md:p-12 shadow-[0_4px_24px_rgba(188,38,155,0.06)] border border-[rgba(188,38,155,0.12)] flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
                        
                        <div className="flex-1 w-full flex flex-col">
                          <h3 
                            className="font-normal mb-4 text-[var(--text-primary)] text-h2"
                            style={{ fontFamily: "var(--font-primary)", fontWeight: 400 }}
                          >
                            {topic.title}
                          </h3>
                          <p 
                            className="text-[1.125rem] text-[var(--text-secondary)] leading-relaxed mb-8 font-normal"
                            style={{ fontFamily: "var(--font-primary)" }}
                          >
                            {topic.content}
                          </p>
                        </div>

                        <div className="flex-1 w-full">
                          <div 
                            className={`transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'scale-100' : 'scale-[0.96]'}`}
                          >
                            <ProductFrame
                              src={topic.image}
                              alt={topic.imageAlt}
                              width={1200}
                              height={750}
                              className="shadow-[var(--shadow-md)] ring-1 ring-[var(--border-subtle)]"
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
