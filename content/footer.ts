/**
 * GlowSuite — Footer Content
 */

export type LinkStatus = 'live' | 'planned';

export interface FooterLink {
  label: string;
  href: string;
  status: LinkStatus;
  external?: boolean;
}

// ---------------------------------------------------------------------------
// Platform
// ---------------------------------------------------------------------------
export const platformLinks: FooterLink[] = [
  { label: 'Why We\'re Different', href: '/why-glowsuite', status: 'live' },
  { label: 'Pricing',              href: '#pricing',           status: 'live' },
  { label: 'Book a Live Demo',     href: '/book-a-demo',       status: 'live' },
  { label: 'Log In',               href: 'https://app.glowsuite.in/login', status: 'live', external: true },
];

// ---------------------------------------------------------------------------
// About Us
// ---------------------------------------------------------------------------
export const aboutUsLinks: FooterLink[] = [
  { label: 'Contact Us',        href: '/book-a-demo', status: 'live' },
];

// ---------------------------------------------------------------------------
// Features
// ---------------------------------------------------------------------------
export const featureLinks: FooterLink[] = [
  { label: 'Appointments',       href: '/features/appointments',      status: 'live' },
  { label: 'Billing & POS',      href: '/features/billing-pos',       status: 'live' },
  { label: 'Client Management',  href: '/features/client-management', status: 'live' },
  { label: 'Staff Management',   href: '/features/staff-management',  status: 'live' },
  { label: 'Inventory',          href: '/features/inventory',         status: 'live' },
  { label: 'Reports',            href: '/features/reports',           status: 'live' },
  { label: 'Multi-Location',     href: '/solutions/multi-location',   status: 'live' },
];

// ---------------------------------------------------------------------------
// Social links — update handles when confirmed
// ---------------------------------------------------------------------------
export interface SocialLink {
  label: string;
  href: string;
  icon: 'instagram' | 'linkedin' | 'youtube';
}

export const socialLinks: SocialLink[] = [
  { label: 'Instagram', href: 'https://instagram.com/glowsuite', icon: 'instagram' },
  { label: 'LinkedIn',  href: 'https://linkedin.com/company/glowsuite', icon: 'linkedin' },
  { label: 'YouTube',   href: 'https://youtube.com/@glowsuite', icon: 'youtube' },
];

// ---------------------------------------------------------------------------
// Legal links
// ---------------------------------------------------------------------------
export const legalLinks: FooterLink[] = [
  { label: 'Privacy Policy', href: '#', status: 'live' },
  { label: 'Terms of Service', href: '#', status: 'live' },
];
