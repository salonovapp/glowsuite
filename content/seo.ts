/**
 * GlowSuite — SEO Content Tokens
 *
 * Central location for all site-level SEO defaults.
 * Override per-page in each page.tsx via generateMetadata.
 */

export const siteConfig = {
  name: 'GlowSuite',
  tagline: 'Salon Management Software',
  description:
    'GlowSuite is modern all-in-one salon management software for independent studios, spas, and multi-branch businesses.',
  url: 'https://glowsuite.in',
  ogImage: 'https://glowsuite.in/og-image.png',
  twitterHandle: '@glowsuite',
  locale: 'en_IN',
} as const;

/** Per-page SEO data shape */
export interface PageSEO {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}
