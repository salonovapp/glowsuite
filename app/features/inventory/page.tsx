import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { FadeUp } from '@/components/motion';
import { EditorialHero } from '@/components/sections/EditorialHero';
import { ProductStorySection } from '@/components/sections/ProductStorySection';
import { GlowSuiteCTA } from '@/components/sections/GlowSuiteCTA';

export const metadata: Metadata = {
  title: 'Salon Inventory Management Software | GlowSuite',
  description:
    'Take control of salon retail products and professional supplies with GlowSuite inventory management software. Track stock, low-stock items, and purchasing in one connected platform.',
  alternates: {
    canonical: 'https://glowsuite.in/features/inventory',
  },
};

export default function InventoryFeaturePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is salon inventory management software?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Salon inventory management software is a digital tool that tracks your physical products. It helps salon owners monitor retail items for sale and professional supplies used during services, ensuring accurate stock levels at all times.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do low-stock alerts work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The system automatically monitors your inventory levels. When a product drops below a predefined threshold, the software triggers a low-stock alert, prompting you to reorder before you completely run out of an essential item.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does inventory connect with billing and POS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'When a retail product is sold through the salon POS system, the inventory software automatically deducts that item from your stock count. This eliminates manual stock reconciliation and ensures your inventory numbers are always perfectly accurate.',
        },
      },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Salon Inventory Management Software | GlowSuite',
    description:
      'Take control of salon retail products and professional supplies with GlowSuite inventory management software. Track stock, low-stock items, and purchasing in one connected platform.',
    url: 'https://glowsuite.in/features/inventory',
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
        eyebrow="INVENTORY MANAGEMENT"
        title="Smart Inventory Management for Your Salon"
        description="Take control of your retail products and professional supplies. Track stock, monitor low-stock alerts, and manage purchasing from one connected platform."
        imageSrc="/images/product/inventory.webp"
        imageAlt="GlowSuite Salon Inventory Management Software Dashboard"
        floatingCards={[
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            ),
            label: 'Alert',
            value: 'Low Stock: Color',
            position: { top: '15%', left: '-5%' },
            delay: 0,
          },
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            ),
            label: 'Status',
            value: 'PO Submitted',
            position: { bottom: '25%', right: '-3%' },
            delay: 1.5,
          }
        ]}
      />

      <ProductStorySection
        eyebrow="STOCK CONTROL"
        title="Complete Control Over Your Products"
        description="Maintain a crystal-clear view of your current inventory. Our salon inventory tracking tools ensure you always know exactly how many products you have on hand, preventing expensive over-ordering and disorganized stock rooms."
        imageSrc="/images/product/inventory.webp"
        imageAlt="Inventory tracking interface"
        backgroundColor="var(--bg-page)"
        features={[
          {
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>,
            text: "Separate retail and professional stock."
          },
          {
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>,
            text: "Automated low-stock alerts."
          }
        ]}
      />

      <ProductStorySection
        eyebrow="AUTOMATED UPDATES"
        title="Connect Inventory With Billing"
        description="When a client purchases a retail product at the front desk, your inventory is automatically updated in the background. By linking your stock control directly with your point of sale, you eliminate manual reconciliation entirely."
        imageSrc="/images/product/billing-pos.webp"
        imageAlt="Billing POS linked to inventory"
        reverse={true}
        backgroundColor="#FFFFFF"
      />

      <ProductStorySection
        eyebrow="ACTIONABLE INSIGHTS"
        title="Get a Clearer View of Your Business"
        description="Because your inventory is tied to your daily operations, your reporting becomes instantly more powerful. Track exactly which retail products are driving revenue and monitor the financial impact of your professional supplies."
        imageSrc="/images/product/reports.webp"
        imageAlt="Reporting on inventory metrics"
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
                    What is salon inventory management software?
                  </h3>
                  <p className="text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                    Salon inventory management software is a digital tool that tracks your physical products. It helps salon owners monitor retail items for sale and professional supplies used during services, ensuring accurate stock levels at all times.
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
                    How do low-stock alerts work?
                  </h3>
                  <p className="text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                    The system automatically monitors your inventory levels. When a product drops below a predefined threshold, the software triggers a low-stock alert, prompting you to reorder before you completely run out of an essential item.
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
                    How does inventory connect with billing and POS?
                  </h3>
                  <p className="text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed" style={{ fontFamily: "'tt-commons-pro-subset', sans-serif" }}>
                    When a retail product is sold through the salon POS system, the inventory software automatically deducts that item from your stock count. This eliminates manual stock reconciliation and ensures your inventory numbers are always perfectly accurate.
                  </p>
                </div>
              </FadeUp>
            </div>
          </div>
        </Container>
      </section>

      <GlowSuiteCTA 
        title="Take control of your inventory with GlowSuite."
      />
    </>
  );
}
