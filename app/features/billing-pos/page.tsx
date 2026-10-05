import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { FadeUp } from '@/components/motion';
import { EditorialHero } from '@/components/sections/EditorialHero';
import { ProductStorySection } from '@/components/sections/ProductStorySection';
import { GlowSuiteCTA } from '@/components/sections/GlowSuiteCTA';

export const metadata: Metadata = {
  title: 'Salon Billing Software & POS System | GlowSuite',
  description:
    'Simplify salon billing and checkout with GlowSuite. Manage transactions, point of sale, and connected business operations from one salon platform.',
  alternates: {
    canonical: 'https://glowsuite.in/features/billing-pos',
  },
};

export default function BillingPosFeaturePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is salon billing software?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Salon billing software is a digital point-of-sale (POS) system designed specifically for beauty businesses. It manages client checkouts, tracks daily revenue, and processes payments for both services and retail products in a single interface.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the POS connect with appointments?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Because GlowSuite is a connected platform, an appointment automatically transitions into a checkout ticket at the front desk. This eliminates the need to manually re-enter service details or client information into a separate billing system.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does the billing software track retail inventory?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. When a retail product is sold through the salon point of sale software, the inventory levels are automatically updated in real-time, helping you maintain accurate stock counts without manual intervention.',
        },
      },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Salon Billing Software & POS System | GlowSuite',
    description:
      'Simplify salon billing and checkout with GlowSuite. Manage transactions, point of sale, and connected business operations from one salon platform.',
    url: 'https://glowsuite.in/features/billing-pos',
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
        eyebrow="BILLING & POS"
        title="Simple, Connected Salon Billing"
        description="Simplify the checkout experience and manage daily transactions effortlessly. Say goodbye to disconnected card terminals and manual entry with our unified salon POS software."
        imageSrc="/images/product/billing-pos.webp"
        imageAlt="GlowSuite Salon Billing Software and Point of Sale Checkout"
        floatingCards={[
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            ),
            label: 'Total Sale',
            value: '$145.00',
            position: { top: '15%', left: '-5%' },
            delay: 0,
          },
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
            ),
            label: 'Payment',
            value: 'Approved',
            position: { bottom: '25%', right: '-3%' },
            delay: 1.5,
          }
        ]}
      />

      <ProductStorySection
        eyebrow="SMART CHECKOUT"
        title="Keep Every Checkout Organized"
        description="End the confusion at the front desk. GlowSuite allows you to easily process services and retail items together on a single ticket. The intuitive billing workflow ensures your front desk staff can complete checkouts swiftly, giving clients a polished, professional exit."
        imageSrc="/images/product/billing-pos.webp"
        imageAlt="Salon checkout process"
        backgroundColor="var(--bg-page)"
        features={[
          {
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>,
            text: "Process services and retail together."
          },
          {
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>,
            text: "Calculate tips automatically."
          }
        ]}
      />

      <ProductStorySection
        eyebrow="REVENUE TRACKING"
        title="Make Day-to-Day Transactions Simple"
        description="Manage your salon's daily revenue effortlessly. Our salon billing system records transactions securely and clearly, giving you absolute confidence in your end-of-day numbers without the headache of manual reconciliation."
        imageSrc="/images/product/reports.webp"
        imageAlt="Daily revenue tracking"
        reverse={true}
        backgroundColor="#FFFFFF"
      />

      <ProductStorySection
        eyebrow="CONNECTED ECOSYSTEM"
        title="Connect Billing With Your Entire Salon"
        description="A true salon POS system shouldn't operate in a vacuum. Because your billing software is directly connected to your salon platform, every ticket processed instantly updates your daily metrics and inventory counts."
        imageSrc="/images/product/inventory.webp"
        imageAlt="Inventory tracking connection"
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
                    What is salon billing software?
                  </h3>
                  <p className="text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                    Salon billing software is a digital point-of-sale (POS) system designed specifically for beauty businesses. It manages client checkouts, tracks daily revenue, and processes payments for both services and retail products in a single interface.
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
                    How does the POS connect with appointments?
                  </h3>
                  <p className="text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                    Because GlowSuite is a connected platform, an appointment automatically transitions into a checkout ticket at the front desk. This eliminates the need to manually re-enter service details or client information into a separate billing system.
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
                    Does the billing software track retail inventory?
                  </h3>
                  <p className="text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                    Yes. When a retail product is sold through the salon point of sale software, the inventory levels are automatically updated in real-time, helping you maintain accurate stock counts without manual intervention.
                  </p>
                </div>
              </FadeUp>
            </div>
          </div>
        </Container>
      </section>

      <GlowSuiteCTA 
        title="Streamline your checkout with GlowSuite."
      />
    </>
  );
}
