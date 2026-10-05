import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { FadeUp } from '@/components/motion';
import { EditorialHero } from '@/components/sections/EditorialHero';
import { ProductStorySection } from '@/components/sections/ProductStorySection';
import { GlowSuiteCTA } from '@/components/sections/GlowSuiteCTA';

export const metadata: Metadata = {
  title: 'Salon Client Management Software & CRM | GlowSuite',
  description:
    'Keep client information, appointment history, and salon activity organized in one connected workspace with GlowSuite client management software.',
  alternates: {
    canonical: 'https://glowsuite.in/features/client-management',
  },
};

export default function ClientManagementFeaturePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is salon client management software?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Salon client management software, often called a salon CRM, is a digital tool that securely stores client information, service history, preferences, and contact details in one centralized profile.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does client information connect with appointments?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In a connected platform, every appointment on the calendar is linked directly to a client profile. This allows staff to see exactly who is coming in, their past services, and specific preferences before the client even sits in the chair.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is it better to have client records in my salon software?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Keeping client records within your primary salon management platform eliminates the need for separate spreadsheets or physical note cards. It ensures that appointment history, billing records, and client notes are perfectly synchronized and instantly accessible by your team.',
        },
      },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Salon Client Management Software & CRM | GlowSuite',
    description:
      'Keep client information, appointment history, and salon activity organized in one connected workspace with GlowSuite client management software.',
    url: 'https://glowsuite.in/features/client-management',
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
        eyebrow="CLIENT MANAGEMENT"
        title="Build Better Client Relationships"
        description="Keep client information, appointment history, and essential notes organized in one connected workspace. Deliver a more personalized salon experience, every single visit."
        imageSrc="/images/product/clients.webp"
        imageAlt="GlowSuite Salon Client Management Software Profile View"
        floatingCards={[
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            ),
            label: 'Loyalty',
            value: 'VIP Status',
            position: { top: '20%', right: '-4%' },
            delay: 0.5,
          },
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            ),
            label: 'Preference',
            value: 'Olaplex Treatment',
            position: { bottom: '20%', left: '-6%' },
            delay: 1.2,
          }
        ]}
      />

      <ProductStorySection
        eyebrow="CENTRALIZED RECORDS"
        title="Keep Every Detail in One Place"
        description="Consolidate contact information, crucial notes, and service preferences into a single digital profile. Finding a client's specific color formula or preferred stylist takes seconds, ensuring consistency across every visit."
        imageSrc="/images/product/clients.webp"
        imageAlt="Client profile details"
        backgroundColor="var(--bg-page)"
        features={[
          {
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>,
            text: "Securely store client formulas."
          },
          {
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>,
            text: "Track visit frequency effortlessly."
          }
        ]}
      />

      <ProductStorySection
        eyebrow="APPOINTMENT CONTEXT"
        title="Context Behind Every Booking"
        description="When a client calls or books online, their complete history is at your fingertips. You can instantly review past services and upcoming schedules to provide tailored recommendations."
        imageSrc="/images/product/appointments.webp"
        imageAlt="Appointments linked to clients"
        reverse={true}
        backgroundColor="#FFFFFF"
      />

      <ProductStorySection
        eyebrow="TEAM EMPOWERMENT"
        title="Context for Your Team"
        description="Empower your staff to deliver premium service. By centralizing client information, any team member can pick up right where the last stylist left off, creating a unified and professional salon environment."
        imageSrc="/images/product/staff.webp"
        imageAlt="Staff viewing client details"
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
                    What is salon client management software?
                  </h3>
                  <p className="text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                    Salon client management software, often called a salon CRM, is a digital tool that securely stores client information, service history, preferences, and contact details in one centralized profile.
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
                    How does client information connect with appointments?
                  </h3>
                  <p className="text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                    In a connected platform, every appointment on the calendar is linked directly to a client profile. This allows staff to see exactly who is coming in, their past services, and specific preferences before the client even sits in the chair.
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
                    Why is it better to have client records in my salon software?
                  </h3>
                  <p className="text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                    Keeping client records within your primary salon management platform eliminates the need for separate spreadsheets or physical note cards. It ensures that appointment history, billing records, and client notes are perfectly synchronized and instantly accessible by your team.
                  </p>
                </div>
              </FadeUp>
            </div>
          </div>
        </Container>
      </section>

      <GlowSuiteCTA 
        title="Build better relationships with GlowSuite."
      />
    </>
  );
}
