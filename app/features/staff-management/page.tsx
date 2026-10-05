import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { FadeUp } from '@/components/motion';
import { EditorialHero } from '@/components/sections/EditorialHero';
import { ProductStorySection } from '@/components/sections/ProductStorySection';
import { GlowSuiteCTA } from '@/components/sections/GlowSuiteCTA';

export const metadata: Metadata = {
  title: 'Salon Staff Management Software | GlowSuite',
  description:
    'Organize your salon team, manage staff operations, permissions, and schedules from one connected workspace with GlowSuite.',
  alternates: {
    canonical: 'https://glowsuite.in/features/staff-management',
  },
};

export default function StaffManagementFeaturePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is salon staff management software?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Salon staff management software is a digital system that helps salon owners organize their team, securely share schedules, and manage role-based access to business operations from one centralized platform.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do staff roles and permissions work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'GlowSuite allows you to assign specific roles to team members. This means you can control exactly what each staff member can see and do within the software, keeping your sensitive business data secure while giving stylists the tools they need.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does staff management work for multiple salon locations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For multi-branch businesses, GlowSuite provides a centralized control panel. You can share staff schedules securely across branches and manage permissions universally, ensuring smooth operations across all your salon locations.',
        },
      },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Salon Staff Management Software | GlowSuite',
    description:
      'Organize your salon team, manage staff operations, permissions, and schedules from one connected workspace with GlowSuite.',
    url: 'https://glowsuite.in/features/staff-management',
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
        eyebrow="STAFF MANAGEMENT"
        title="Manage Your Salon Team With Confidence"
        description="Organize your team, secure your data with role-based access, and manage staff operations seamlessly from one connected workspace."
        imageSrc="/images/product/staff.webp"
        imageAlt="GlowSuite Salon Staff Management Software and Permissions Dashboard"
        floatingCards={[
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            ),
            label: 'Shift',
            value: 'On Clock',
            position: { top: '18%', left: '-6%' },
            delay: 0.2,
          },
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            ),
            label: 'Role',
            value: 'Senior Stylist',
            position: { bottom: '22%', right: '-5%' },
            delay: 1.8,
          }
        ]}
      />

      <ProductStorySection
        eyebrow="TEAM ORGANIZATION"
        title="Keep Your Team Organized"
        description="Bring clarity to your salon team operations. A dedicated stylist management software environment allows you to organize staff details systematically, ensuring every team member is accounted for and their operational status is always up to date."
        imageSrc="/images/product/staff.webp"
        imageAlt="Staff organization directory"
        backgroundColor="var(--bg-page)"
        features={[
          {
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>,
            text: "Clear staff directories."
          },
          {
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>,
            text: "Track performance targets."
          }
        ]}
      />

      <ProductStorySection
        eyebrow="ACCESS CONTROL"
        title="Manage Roles and Access"
        description="Your salon data is highly sensitive. GlowSuite provides robust access control, allowing you to define precise roles and permissions. Restrict financial reports to managers while giving stylists exactly what they need to manage their daily appointments—no more, no less."
        imageSrc="/images/product/settings.webp"
        imageAlt="Role-based access permissions"
        reverse={true}
        backgroundColor="#FFFFFF"
      />

      <ProductStorySection
        eyebrow="SCHEDULING"
        title="Connect Staff With Appointments"
        description="Salon staff scheduling relies entirely on accurate appointment data. Because GlowSuite integrates your team directory with your calendar, an appointment can only be booked when the specific stylist is available and scheduled to work—preventing double bookings."
        imageSrc="/images/product/appointments.webp"
        imageAlt="Scheduling appointments based on staff availability"
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
                    What is salon staff management software?
                  </h3>
                  <p className="text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                    Salon staff management software is a digital system that helps salon owners organize their team, securely share schedules, and manage role-based access to business operations from one centralized platform.
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
                    How do staff roles and permissions work?
                  </h3>
                  <p className="text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                    GlowSuite allows you to assign specific roles to team members. This means you can control exactly what each staff member can see and do within the software, keeping your sensitive business data secure while giving stylists the tools they need.
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
                    How does staff management work for multiple salon locations?
                  </h3>
                  <p className="text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                    For multi-branch businesses, GlowSuite provides a centralized control panel. You can share staff schedules securely across branches and manage permissions universally, ensuring smooth operations across all your salon locations.
                  </p>
                </div>
              </FadeUp>
            </div>
          </div>
        </Container>
      </section>

      <GlowSuiteCTA 
        title="Empower your team with GlowSuite."
      />
    </>
  );
}
