import { Hero } from '@/components/sections/Hero';
import { ConnectedPlatform } from '@/components/sections/ConnectedPlatform';
import { ConnectedWorkspace } from '@/components/sections/ConnectedWorkspace';
import { WhyGlowSuite } from '@/components/sections/WhyGlowSuite';
import { PlatformCapabilities } from '@/components/sections/PlatformCapabilities';
import { ProductProof } from '@/components/sections/ProductProof';
import { CompleteSalonWorkspace } from '@/components/sections/CompleteSalonWorkspace';
import { CallToAction } from '@/components/sections/CallToAction';

/**
 * GlowSuite Homepage
 *
 * Sections will be added progressively per instruction.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ConnectedPlatform />
      <ConnectedWorkspace />
      <WhyGlowSuite />
      <PlatformCapabilities />
      <ProductProof />
      <CompleteSalonWorkspace />
      <CallToAction />
      {/* Additional sections will be added here in future steps */}
    </>
  );
}
