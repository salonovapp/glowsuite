import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { FadeUp } from '@/components/motion';
import { EditorialHero } from '@/components/sections/EditorialHero';
import { ProductStorySection } from '@/components/sections/ProductStorySection';
import { GlowSuiteCTA } from '@/components/sections/GlowSuiteCTA';

export const metadata: Metadata = {
  title: 'Salon Appointment Scheduling Software & Booking System | GlowSuite',
  description:
    'Keep your salon organized with GlowSuite appointment scheduling software. Manage bookings, calendars, and daily appointments from one connected workspace.',
  alternates: {
    canonical: 'https://glowsuite.in/features/appointments',
  },
};

export default function AppointmentsFeaturePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does salon appointment scheduling software do?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Salon appointment scheduling software replaces paper appointment books with a visual digital calendar. It allows salon owners and staff to manage daily schedules, prevent double bookings, and organize client appointments efficiently.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does scheduling connect with client profiles?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In a connected platform like GlowSuite, every appointment on the calendar is linked directly to a client profile. This allows staff to view appointment history, past services, and client details the moment a booking is made.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does the calendar sync with staff schedules?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The scheduling software coordinates with staff management tools, ensuring that appointments can only be booked when the specific stylist or team member is available and scheduled to work.',
        },
      },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Salon Appointment Scheduling Software & Booking System | GlowSuite',
    description:
      'Keep your salon organized with GlowSuite appointment scheduling software. Manage bookings, calendars, and daily appointments from one connected workspace.',
    url: 'https://glowsuite.in/features/appointments',
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
        eyebrow="APPOINTMENT MANAGEMENT"
        title="Smart Salon Appointment Scheduling"
        description="Keep your salon organized with intuitive appointment scheduling software. Manage your calendar and daily bookings effortlessly from one connected workspace."
        imageSrc="/images/product/appointments.webp"
        imageAlt="GlowSuite Salon Appointment Scheduling Software Interface"
        floatingCards={[
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            ),
            label: 'Upcoming',
            value: 'Haircut w/ Sarah',
            position: { top: '15%', left: '-5%' },
            delay: 0,
          },
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            ),
            label: 'Status',
            value: 'Confirmed',
            position: { bottom: '25%', right: '-3%' },
            delay: 1.5,
          }
        ]}
      />

      <ProductStorySection
        eyebrow="CALENDAR CLARITY"
        title="Keep Your Daily Schedule Organized"
        description="Take control of your day with a clear, visual calendar. Our salon scheduling software allows salon owners and team members to manage appointments at a glance, ensuring that the entire team knows exactly what the day looks like without constant check-ins."
        imageSrc="/images/product/dashboard.webp"
        imageAlt="Salon daily schedule view"
        backgroundColor="var(--bg-page)"
        features={[
          {
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>,
            text: "Drag and drop appointments easily."
          },
          {
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>,
            text: "Color-coded service statuses."
          }
        ]}
      />

      <ProductStorySection
        eyebrow="SEAMLESS BOOKING"
        title="Make Booking Easier"
        description="A smart salon booking software streamlines the workflow of adding and modifying appointments. By providing a clean interface that actively prevents double-bookings and scheduling conflicts, you can quickly secure client slots with confidence."
        imageSrc="/images/product/appointments.webp"
        imageAlt="Booking interface"
        reverse={true}
        backgroundColor="#FFFFFF"
      />

      <ProductStorySection
        eyebrow="TEAM COORDINATION"
        title="Coordinate Your Team"
        description="An effective appointment management system works in lockstep with your staff operations. Securely share schedules, manage team availability, and ensure that appointments are only booked when the right team member is on the clock."
        imageSrc="/images/product/staff.webp"
        imageAlt="Staff scheduling view"
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
                    What does salon appointment scheduling software do?
                  </h3>
                  <p className="text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                    Salon appointment scheduling software replaces paper appointment books with a visual digital calendar. It allows salon owners and staff to manage daily schedules, prevent double bookings, and organize client appointments efficiently.
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
                    How does scheduling connect with client profiles?
                  </h3>
                  <p className="text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                    In a connected platform like GlowSuite, every appointment on the calendar is linked directly to a client profile. This allows staff to view appointment history, past services, and client details the moment a booking is made.
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
                    Does the calendar sync with staff schedules?
                  </h3>
                  <p className="text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                    Yes. The scheduling software coordinates with staff management tools, ensuring that appointments can only be booked when the specific stylist or team member is available and scheduled to work.
                  </p>
                </div>
              </FadeUp>
            </div>
          </div>
        </Container>
      </section>

      <GlowSuiteCTA 
        title="Organize your schedule with GlowSuite."
        subtitle="Bring your appointments, clients, payments, staff, inventory, and reporting together in one modern platform."
      />
    </>
  );
}
