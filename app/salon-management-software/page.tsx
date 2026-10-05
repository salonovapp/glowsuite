import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { FadeUp } from '@/components/motion';
import { EditorialHero } from '@/components/sections/EditorialHero';
import { ProductStorySection } from '@/components/sections/ProductStorySection';
import { GlowSuiteCTA } from '@/components/sections/GlowSuiteCTA';

export const metadata: Metadata = {
  title: 'Salon Management Software for Modern Salons | GlowSuite',
  description:
    'Manage appointments, clients, staff, billing, inventory, reporting, and more with GlowSuite salon management software built for modern salons.',
  alternates: {
    canonical: 'https://glowsuite.in/salon-management-software',
  },
};

export default function SalonManagementSoftwarePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is salon management software?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Salon management software is a centralized digital platform that helps salon owners and managers streamline their daily operations. It connects appointment scheduling, client profiles, staff management, inventory tracking, and point-of-sale billing into one unified system.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why should I switch to a connected salon platform?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Using a connected platform like GlowSuite means you no longer have to jump between disconnected calendars, spreadsheets, and payment apps. Data flows naturally from the first booking to the end-of-day report, reducing manual work and giving you perfect clarity into your business performance.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I manage multiple salon locations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. GlowSuite allows you to standardize services across branches, share staff schedules securely, and monitor cross-location performance from a centralized control panel.',
        },
      },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Salon Management Software for Modern Salons | GlowSuite',
    description:
      'Manage appointments, clients, staff, billing, inventory, reporting, and more with GlowSuite salon management software built for modern salons.',
    url: 'https://glowsuite.in/salon-management-software',
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
        eyebrow="GLOWSUITE PLATFORM"
        title="Salon Management Software for Modern Salons"
        description="Manage appointments, clients, staff, billing, inventory, reporting, and more with GlowSuite. Build a better experience for your team and your customers."
        imageSrc="/images/product/dashboard.webp"
        imageAlt="GlowSuite Salon Management Software Dashboard"
        floatingCards={[
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            ),
            label: 'Today',
            value: '42 Appointments',
            position: { top: '15%', left: '-5%' },
            delay: 0,
          },
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            ),
            label: 'Revenue',
            value: '$4,250.00',
            position: { bottom: '25%', right: '-3%' },
            delay: 1.5,
          }
        ]}
      />

      {/* What Is Salon Management Software? */}
      <section className="relative py-24" style={{ backgroundColor: 'var(--bg-page)' }}>
        <Container>
          <div className="max-w-[760px] mx-auto text-center">
            <FadeUp delay={0}>
              <h2 className="text-[2.25rem] md:text-[2.75rem] font-bold leading-tight tracking-tight text-[var(--text-primary)] mb-6" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                What Is Salon Management Software?
              </h2>
            </FadeUp>
            <FadeUp delay={100}>
              <p className="text-[1.125rem] text-[var(--text-secondary)] leading-relaxed mb-6" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                Salon management software is the digital backbone of a modern beauty business. Rather than relying on paper calendars, separate payment terminals, and disconnected spreadsheets, a salon management system centralizes your entire operation into one connected platform.
              </p>
              <p className="text-[1.125rem] text-[var(--text-secondary)] leading-relaxed" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                From the moment a client books an appointment online, to their seamless checkout at the point-of-sale, and finally to your end-of-day business reporting, modern salon software ensures every detail is captured accurately and effortlessly.
              </p>
            </FadeUp>
          </div>
        </Container>
      </section>

      <ProductStorySection
        eyebrow="APPOINTMENTS"
        title="Appointments and Daily Scheduling"
        description="Keep your day organized and make booking easier for your clients with smart salon appointment scheduling software. A visual, easy-to-use calendar helps you manage bookings, prevent scheduling conflicts, and optimize your team's availability."
        imageSrc="/images/product/appointments.webp"
        imageAlt="Salon Appointment Scheduling Software Interface"
        backgroundColor="var(--bg-page)"
        features={[
          {
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>,
            text: <Link href="/features/appointments" className="text-[var(--gs-pink)] hover:underline">Explore Appointments &rarr;</Link>
          }
        ]}
      />

      <ProductStorySection
        eyebrow="CLIENT PROFILES"
        title="Client Management"
        description="Build better relationships by keeping detailed client profiles. Our salon client management software ensures you have complete appointment histories, preferences, and important details organized in one secure place to deliver personalized experiences every visit."
        imageSrc="/images/product/clients.webp"
        imageAlt="Salon Client Management Software Profile"
        reverse={true}
        backgroundColor="var(--bg-page)"
        features={[
          {
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>,
            text: <Link href="/features/client-management" className="text-[var(--gs-pink)] hover:underline">Explore Client Management &rarr;</Link>
          }
        ]}
      />

      <ProductStorySection
        eyebrow="CHECKOUT"
        title="Billing & Point of Sale (POS)"
        description="Manage day-to-day transactions efficiently with an integrated salon POS system. Seamless checkouts process services and retail products together, ensuring accurate daily revenue tracking without the friction of switching to a separate payment app."
        imageSrc="/images/product/billing-pos.webp"
        imageAlt="Salon POS System and Billing Software"
        backgroundColor="var(--bg-page)"
        features={[
          {
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>,
            text: <Link href="/features/billing-pos" className="text-[var(--gs-pink)] hover:underline">Explore Billing & POS &rarr;</Link>
          }
        ]}
      />

      <ProductStorySection
        eyebrow="TEAM WORKSPACE"
        title="Staff Management"
        description="Empower your team with salon staff management software. Organize schedules, manage staff-related operations, and securely share calendars so everyone knows exactly what their day looks like."
        imageSrc="/images/product/staff.webp"
        imageAlt="Salon Staff Management and Scheduling"
        reverse={true}
        backgroundColor="var(--bg-page)"
        features={[
          {
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>,
            text: <Link href="/features/staff-management" className="text-[var(--gs-pink)] hover:underline">Explore Staff Management &rarr;</Link>
          }
        ]}
      />

      <ProductStorySection
        eyebrow="STOCK CONTROL"
        title="Inventory Management"
        description="Take total control over your retail products and professional supplies. Salon inventory management software gives you absolute precision, automatic low-stock alerts, and the ability to generate purchase orders instantly."
        imageSrc="/images/product/inventory.webp"
        imageAlt="Salon Inventory Management Software"
        backgroundColor="var(--bg-page)"
        features={[
          {
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>,
            text: <Link href="/features/inventory" className="text-[var(--gs-pink)] hover:underline">Explore Inventory &rarr;</Link>
          }
        ]}
      />

      <ProductStorySection
        eyebrow="ANALYTICS"
        title="Reports & Business Insights"
        description="Understand your salon's performance at a glance. Salon reporting software provides clear visibility into revenue, staff performance, and retail profitability, giving you the insights needed to grow your beauty business."
        imageSrc="/images/product/reports.webp"
        imageAlt="Salon Reporting Software and Analytics Dashboard"
        reverse={true}
        backgroundColor="var(--bg-page)"
        features={[
          {
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>,
            text: <Link href="/features/reports" className="text-[var(--gs-pink)] hover:underline">Explore Reports &rarr;</Link>
          }
        ]}
      />

      <ProductStorySection
        eyebrow="SCALE"
        title="Multi-Location Management"
        description="Multi-location salon management software allows you to standardize services across all branches, share staff schedules securely, and monitor cross-location performance from a centralized control panel."
        imageSrc="/images/product/multi-location.webp"
        imageAlt="Multi-Location Salon Management Software"
        backgroundColor="var(--bg-page)"
        features={[
          {
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>,
            text: <Link href="/solutions/multi-location" className="text-[var(--gs-pink)] hover:underline">Explore Multi-Location &rarr;</Link>
          }
        ]}
      />

      {/* Why a Connected Salon Platform? */}
      <section className="relative py-24" style={{ backgroundColor: 'var(--bg-brand-tint)' }}>
        <Container>
          <div className="max-w-[760px] mx-auto text-center">
            <FadeUp delay={0}>
              <h2 className="text-h2 font-normal leading-tight text-[var(--text-primary)] mb-6">
                Why GlowSuite?
              </h2>
            </FadeUp>
            <FadeUp delay={100}>
              <p className="text-[1.125rem] text-[var(--text-secondary)] leading-relaxed mb-6 font-normal" style={{ fontFamily: "var(--font-primary)" }}>
                When your entire salon operates on a single salon business management software, data flows naturally from one step to the next. You eliminate the friction of switching between a separate booking app, a generic payment processor, and manual inventory spreadsheets.
              </p>
              <p className="text-[1.125rem] text-[var(--text-secondary)] leading-relaxed font-normal" style={{ fontFamily: "var(--font-primary)" }}>
                GlowSuite brings everything together. A connected platform reduces manual administrative work, eliminates double-entry errors, and gives you perfect clarity into your business—so you can spend less time managing software and more time focused on your clients.
              </p>
            </FadeUp>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="relative py-24 md:py-32" style={{ backgroundColor: 'var(--bg-page)' }}>
        <Container>
          <div className="max-w-[800px] mx-auto">
            <FadeUp delay={0}>
              <h2 className="text-h2 mb-12 text-center font-normal">
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
                  <h3 className="text-h3 mb-3 text-[var(--text-primary)] font-normal">
                    What is salon management software?
                  </h3>
                  <p className="text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                    Salon management software is a centralized digital platform that helps salon owners and managers streamline their daily operations. It connects appointment scheduling, client profiles, staff management, inventory tracking, and point-of-sale billing into one unified system.
                  </p>
                </div>
              </FadeUp>

              <FadeUp delay={120}>
                <div
                  className="p-8 rounded-[20px]"
                  style={{
                    backgroundColor: 'var(--bg-page)',
                    border: '1px solid rgba(139, 63, 216, 0.08)',
                  }}
                >
                  <h3 className="text-[1.25rem] font-semibold mb-3 text-[var(--text-primary)]" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                    Why should I switch to a connected salon platform?
                  </h3>
                  <p className="text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                    Using a connected platform like GlowSuite means you no longer have to jump between disconnected calendars, spreadsheets, and payment apps. Data flows naturally from the first booking to the end-of-day report, reducing manual work and giving you perfect clarity into your business performance.
                  </p>
                </div>
              </FadeUp>

              <FadeUp delay={160}>
                <div
                  className="p-8 rounded-[20px]"
                  style={{
                    backgroundColor: 'var(--bg-page)',
                    border: '1px solid rgba(139, 63, 216, 0.08)',
                  }}
                >
                  <h3 className="text-[1.25rem] font-semibold mb-3 text-[var(--text-primary)]" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                    Can I manage multiple salon locations?
                  </h3>
                  <p className="text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                    Yes. GlowSuite allows you to standardize services across branches, share staff schedules securely, and monitor cross-location performance from a centralized control panel.
                  </p>
                </div>
              </FadeUp>
            </div>
          </div>
        </Container>
      </section>

      <GlowSuiteCTA 
        title="Get started with GlowSuite today."
        subtitle="Bring your appointments, clients, payments, staff, inventory, and reporting together in one modern platform."
      />
    </>
  );
}
