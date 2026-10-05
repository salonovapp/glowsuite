/**
 * GlowSuite — Navigation Content
 *
 * Centralized nav link structure.
 */

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
}

export interface NavGroup {
  label: string;
  links: NavLink[];
}

/** Primary navigation links */
export const navLinks: NavLink[] = [
  { label: 'Features',       href: '/salon-management-software' },
  { label: 'Why GlowSuite',  href: '/why-glowsuite'      },
];

/** CTA buttons in the navbar */
export const navCTAs = {
  secondary: { label: 'Sign In',       href: 'https://app.glowsuite.in/login' },
  primary:   { label: 'Book a Demo',   href: '/book-a-demo' },
} as const;

/** Mega Menu Feature Groups */
export const featureGroups: NavGroup[] = [
  {
    label: 'APPOINTMENTS & CLIENTS',
    links: [
      {
        label: 'Appointments',
        href: '/features/appointments',
        description: 'Manage bookings, calendars, and daily appointments.',
      },
      {
        label: 'Client Management',
        href: '/features/client-management',
        description: 'Keep client profiles, history, and salon activity connected.',
      },
    ],
  },
  {
    label: 'BILLING & OPERATIONS',
    links: [
      {
        label: 'Billing & POS',
        href: '/features/billing-pos',
        description: 'Manage checkout, transactions, services, and retail.',
      },
      {
        label: 'Inventory',
        href: '/features/inventory',
        description: 'Track retail products and professional supplies.',
      },
      {
        label: 'Reports',
        href: '/features/reports',
        description: 'Understand salon performance and branch reporting.',
      },
    ],
  },
  {
    label: 'TEAM & LOCATIONS',
    links: [
      {
        label: 'Staff Management',
        href: '/features/staff-management',
        description: 'Manage staff profiles, roles, permissions, and schedules.',
      },
      {
        label: 'Multi-Location',
        href: '/solutions/multi-location',
        description: 'Manage multiple salon locations from one connected platform.',
      },
    ],
  },
];
