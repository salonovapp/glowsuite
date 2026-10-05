import type { Metadata } from 'next';
import { WhyGlowSuiteAccordion } from './WhyGlowSuiteAccordion';
import { GlowSuiteCTA } from '@/components/sections/GlowSuiteCTA';

export const metadata: Metadata = {
  title: 'Why GlowSuite | Salon Management Software Built for Modern Salons',
  description: 'Discover how GlowSuite connects appointments, clients, staff, billing, inventory, reporting, and multi-location operations in one modern salon management platform.',
  alternates: {
    canonical: 'https://glowsuite.in/why-glowsuite',
  },
};

export default function WhyGlowSuitePage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Why GlowSuite | Salon Management Software Built for Modern Salons',
    description: 'Discover how GlowSuite connects appointments, clients, staff, billing, inventory, reporting, and multi-location operations in one modern salon management platform.',
    url: 'https://glowsuite.in/why-glowsuite',
    publisher: {
      '@type': 'Organization',
      name: 'GlowSuite',
      logo: {
        '@type': 'ImageObject',
        url: 'https://glowsuite.in/logo.png',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      
      <main>
        <WhyGlowSuiteAccordion />
        
        <GlowSuiteCTA 
          eyebrow="READY TO GROW YOUR SALON?"
          title={<>Everything you need to run your salon.<br className="hidden md:block" /> All in one place.</>}
          subtitle="Bring appointments, clients, payments, staff, inventory, and reporting together with GlowSuite."
        />
      </main>
    </>
  );
}
