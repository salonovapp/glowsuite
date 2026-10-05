import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

/**
 * Plus Jakarta Sans — humanist geometric sans, very close to TT Commons Pro.
 * Used for: H1, body copy, navigation, CTA buttons, general UI text.
 */
const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700', '800'],
});

/**
 * Space Grotesk — clean, slightly technical geometric, mirrors TT Commons Mono personality.
 * Used for: eyebrow labels, capability tabs, small technical labels.
 */
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono-label',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'GlowSuite — Salon Management Software',
    template: '%s | GlowSuite',
  },
  description:
    'GlowSuite is modern salon management software for independent studios, spas, and multi-branch businesses.',
  metadataBase: new URL('https://glowsuite.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'GlowSuite',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@glowsuite',
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${jakartaSans.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "name": "GlowSuite",
                  "url": "https://glowsuite.in",
                  "logo": "https://glowsuite.in/brand/logo-transparent.png"
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "GlowSuite",
                  "applicationCategory": "BusinessApplication",
                  "operatingSystem": "Web",
                  "url": "https://glowsuite.in"
                }
              ]
            })
          }}
        />
      </head>
      <body className="min-h-dvh flex flex-col antialiased" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)' }}>
        <Header />
        {/* No top padding here so the Hero gradient can bleed under the transparent Header */}
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
