import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { FadeUp } from '@/components/motion';
import { EditorialHero } from '@/components/sections/EditorialHero';
import { ProductStorySection } from '@/components/sections/ProductStorySection';
import { GlowSuiteCTA } from '@/components/sections/GlowSuiteCTA';

export const metadata: Metadata = {
  title: 'Multi-Location Salon Management Software | GlowSuite',
  description:
    'Manage multiple salon locations from one connected platform. Centralize scheduling, clients, staff permissions, billing, and reports across branches with GlowSuite.',
  alternates: {
    canonical: 'https://glowsuite.in/solutions/multi-location',
  },
};

export default function MultiLocationSolutionPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is multi-location salon software?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Multi-location salon software is a platform that connects the operations of multiple salon branches under a single management system. Instead of maintaining disconnected workflows across each location, it provides one centralized view for scheduling, client data, billing, inventory, and business reporting.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can GlowSuite manage multiple salon locations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. GlowSuite is designed to support salon businesses with multiple branches. You can manage appointments, clients, staff, billing, inventory, and reporting across your locations from one connected platform.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can staff permissions be managed across salon locations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. GlowSuite allows you to define role-based access for each team member. You can control which staff can access which locations and restrict or grant visibility into specific parts of the business accordingly.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I see reporting across multiple salon branches?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. GlowSuite provides cross-location business reporting. You can view performance data for individual branches or monitor your entire salon operation from one centralized dashboard.',
        },
      },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Multi-Location Salon Management Software | GlowSuite',
    description:
      'Manage multiple salon locations from one connected platform. Centralize scheduling, clients, staff permissions, billing, and reports across branches with GlowSuite.',
    url: 'https://glowsuite.in/solutions/multi-location',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <EditorialHero
        eyebrow="MULTI-LOCATION MANAGEMENT"
        title="Manage Every Salon Location From One Connected Platform"
        description="Run multiple salon locations without losing visibility across your business. GlowSuite connects appointments, clients, staff, billing, inventory, and reporting in one connected salon management platform."
        imageSrc="/images/product/multi-location.webp"
        imageAlt="GlowSuite Multi-Location Salon Management Software Dashboard"
        floatingCards={[
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            ),
            label: 'Downtown',
            value: 'Branch Active',
            position: { top: '18%', left: '-5%' },
            delay: 0.1,
          },
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            ),
            label: 'Westside',
            value: 'Branch Active',
            position: { bottom: '22%', right: '-4%' },
            delay: 1.4,
          }
        ]}
      />

      <ProductStorySection
        eyebrow="CONSISTENT OPERATIONS"
        title="Standardize Operations Across Branches"
        description="When every branch runs on the same platform, consistency follows naturally. Your service menu, client records, and operational workflows remain aligned across locations—so the experience you deliver at your flagship branch is the same experience clients receive everywhere."
        imageSrc="/images/product/dashboard.webp"
        imageAlt="Unified operations dashboard"
        backgroundColor="var(--bg-page)"
        features={[
          {
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>,
            text: "Unified appointment calendar."
          },
          {
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>,
            text: "Consistent client record-keeping."
          }
        ]}
      />

      <ProductStorySection
        eyebrow="TEAM MANAGEMENT"
        title="Manage Staff and Permissions"
        description="Maintaining clear team access across branches is critical for security and operational clarity. GlowSuite allows you to define specific roles and permissions for each team member, giving them access only to the branches and functionality relevant to their role."
        imageSrc="/images/product/staff.webp"
        imageAlt="Managing staff across locations"
        reverse={true}
        backgroundColor="#FFFFFF"
      />

      <ProductStorySection
        eyebrow="BUSINESS VISIBILITY"
        title="See Performance Across Your Business"
        description="Understand exactly how each location is performing. GlowSuite provides cross-location reporting, allowing you to view daily revenue, payment summaries, and business metrics at the individual branch level or across your entire operation."
        imageSrc="/images/product/reports.webp"
        imageAlt="Cross-location business reporting"
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
              {[
                {
                  q: 'What is multi-location salon software?',
                  a: 'Multi-location salon software is a platform that connects the operations of multiple salon branches under a single management system. Instead of maintaining disconnected workflows across each location, it provides one centralized view for scheduling, client data, billing, inventory, and business reporting.',
                },
                {
                  q: 'Can GlowSuite manage multiple salon locations?',
                  a: 'Yes. GlowSuite is designed to support salon businesses with multiple branches. You can manage appointments, clients, staff, billing, inventory, and reporting across your locations from one connected platform.',
                },
                {
                  q: 'Can staff permissions be managed across salon locations?',
                  a: 'Yes. GlowSuite allows you to define role-based access for each team member. You can control which staff can access which locations and restrict or grant visibility into specific parts of the business accordingly.',
                },
                {
                  q: 'Can I see reporting across multiple salon branches?',
                  a: 'Yes. GlowSuite provides cross-location business reporting. You can view performance data for individual branches or monitor your entire salon operation from one centralized dashboard.',
                },
              ].map((item, i) => (
                <FadeUp key={i} delay={80 + (i * 40)}>
                  <div
                    className="p-8 rounded-[var(--radius-lg)]"
                    style={{
                      backgroundColor: 'var(--bg-page)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <h3 className="text-h3 mb-3 font-normal text-[var(--text-primary)]" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                      {item.q}
                    </h3>
                    <p className="text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                      {item.a}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <GlowSuiteCTA 
        title="Run every salon location from one connected platform."
      />
    </>
  );
}
