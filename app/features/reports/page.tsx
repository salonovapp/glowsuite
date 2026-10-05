import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { FadeUp } from '@/components/motion';
import { EditorialHero } from '@/components/sections/EditorialHero';
import { ProductStorySection } from '@/components/sections/ProductStorySection';
import { GlowSuiteCTA } from '@/components/sections/GlowSuiteCTA';

export const metadata: Metadata = {
  title: 'Salon Reporting Software & Business Analytics | GlowSuite',
  description:
    "Understand your salon's performance with clear reports, revenue visibility, and business insights from GlowSuite salon reporting software.",
  alternates: {
    canonical: 'https://glowsuite.in/features/reports',
  },
};

export default function ReportsFeaturePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is salon reporting software?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Salon reporting software is a digital tool that automatically aggregates data from your daily operations—such as checkouts, appointments, and retail sales—and presents it in clear, readable business reports to help you track performance.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does the software track salon revenue?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, because the reporting system is directly tied to your billing and POS, you get real-time revenue visibility. You can easily track daily totals, end-of-day closeouts, and overall financial performance without manual calculation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I view reports for multiple salon locations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For businesses with multiple branches, GlowSuite provides cross-location reporting. You can view the performance of individual locations or monitor the overall health of your entire salon business from one centralized dashboard.',
        },
      },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Salon Reporting Software & Business Analytics | GlowSuite',
    description:
      "Understand your salon's performance with clear reports, revenue visibility, and business insights from GlowSuite salon reporting software.",
    url: 'https://glowsuite.in/features/reports',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <EditorialHero
        eyebrow="REPORTING & INSIGHTS"
        title="Clear Insights for Your Salon Business"
        description="Replace guesswork with visibility. Track your salon's daily performance and understand your revenue effortlessly with powerful, easy-to-read business reports."
        imageSrc="/images/product/reports.webp"
        imageAlt="GlowSuite Salon Reporting Software and Business Analytics Dashboard"
        floatingCards={[
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            ),
            label: 'Growth',
            value: '+14% MRR',
            position: { top: '20%', right: '-4%' },
            delay: 0.3,
          },
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            ),
            label: 'Utilization',
            value: '87% Booked',
            position: { bottom: '20%', left: '-6%' },
            delay: 1.7,
          }
        ]}
      />

      <ProductStorySection
        eyebrow="BUSINESS VISIBILITY"
        title="Understand Your Salon at a Glance"
        description="Log in and instantly see how your salon is performing today. Our salon business reports give you a clear, high-level summary of your most critical metrics the moment you open the dashboard."
        imageSrc="/images/product/dashboard.webp"
        imageAlt="High level summary dashboard"
        backgroundColor="var(--bg-page)"
        features={[
          {
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>,
            text: "Instant daily summaries."
          },
          {
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>,
            text: "Compare historical performance."
          }
        ]}
      />

      <ProductStorySection
        eyebrow="REVENUE TRACKING"
        title="Track the Numbers That Matter"
        description="Focus on what drives your business forward. Review your daily revenue, track completed payments, and monitor overall salon revenue reporting to ensure your business remains financially healthy."
        imageSrc="/images/product/reports.webp"
        imageAlt="Tracking revenue numbers"
        reverse={true}
        backgroundColor="#FFFFFF"
      />

      <ProductStorySection
        eyebrow="MULTI-LOCATION"
        title="See Performance Across Your Business"
        description="For owners managing multiple branches, seeing the big picture is essential. Our platform provides cross-location reporting, allowing you to view performance metrics for individual locations or your entire salon enterprise from one screen."
        imageSrc="/images/product/multi-location.webp"
        imageAlt="Cross-location performance metrics"
        backgroundColor="var(--bg-page)"
      />

      <section className="relative py-24 md:py-32" style={{ backgroundColor: 'var(--bg-page)' }}>
        <Container>
          <div className="max-w-[800px] mx-auto">
            <FadeUp delay={0}>
              <h2 className="text-h2 mb-12 text-center font-normal" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                Frequently Asked Questions
              </h2>
            </FadeUp>

            <div className="flex flex-col gap-6">
              <FadeUp delay={80}>
                <div
                  className="p-8 rounded-[var(--radius-lg)]"
                  style={{
                    backgroundColor: 'var(--bg-page)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <h3 className="text-h3 mb-3 font-normal text-[var(--text-primary)]" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                    What is salon reporting software?
                  </h3>
                  <p className="text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                    Salon reporting software is a digital tool that automatically aggregates data from your daily operations—such as checkouts, appointments, and retail sales—and presents it in clear, readable business reports to help you track performance.
                  </p>
                </div>
              </FadeUp>

              <FadeUp delay={120}>
                <div
                  className="p-8 rounded-[var(--radius-lg)]"
                  style={{
                    backgroundColor: 'var(--bg-page)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <h3 className="text-h3 mb-3 font-normal text-[var(--text-primary)]" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                    Does the software track salon revenue?
                  </h3>
                  <p className="text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                    Yes, because the reporting system is directly tied to your billing and POS, you get real-time revenue visibility. You can easily track daily totals, end-of-day closeouts, and overall financial performance without manual calculation.
                  </p>
                </div>
              </FadeUp>

              <FadeUp delay={160}>
                <div
                  className="p-8 rounded-[var(--radius-lg)]"
                  style={{
                    backgroundColor: 'var(--bg-page)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <h3 className="text-h3 mb-3 font-normal text-[var(--text-primary)]" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                    Can I view reports for multiple salon locations?
                  </h3>
                  <p className="text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                    For businesses with multiple branches, GlowSuite provides cross-location reporting. You can view the performance of individual locations or monitor the overall health of your entire salon business from one centralized dashboard.
                  </p>
                </div>
              </FadeUp>
            </div>
          </div>
        </Container>
      </section>

      <GlowSuiteCTA 
        title="Understand your business with GlowSuite."
      />
    </>
  );
}
