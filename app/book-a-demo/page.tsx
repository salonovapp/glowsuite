import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { BookingWhatWeCover } from '@/components/book-demo/BookingWhatWeCover';
import { BookDemoInteractive } from '@/components/book-demo/BookDemoInteractive';

export const metadata: Metadata = {
  title: 'Book a Demo | GlowSuite Salon Management Software',
  description: 'Get a personalized walkthrough of GlowSuite and see how it can fit your salon’s daily workflow.',
};

export default function BookDemoPage() {
  return (
    <div className="relative min-h-screen bg-[var(--bg-page)] overflow-hidden">
      {/* GlowSuite Approved 9-Stop Atmospheric Gradient */}
      <div
        aria-hidden="true"
        className="hero-background-gradient"
      />

      <section className="relative z-10 pt-32 pb-24 md:pt-40 md:pb-32">
        <Container>
          {/* Two-column layout on Desktop, single column stack on Mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-[1240px] mx-auto">
            {/* Left Column: What We'll Cover & Intro */}
            <div className="lg:col-span-5 w-full">
              <BookingWhatWeCover />
            </div>

            {/* Right Column: Interactive Scheduling Container */}
            <div className="lg:col-span-7 w-full">
              <BookDemoInteractive />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
