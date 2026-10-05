/**
 * GlowSuite — Feature Content
 *
 * Structured data for the Feature Ecosystem section.
 * Final copy to be written in a future step.
 */

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string;   // Lucide icon name or SVG path
  category: FeatureCategory;
}

export type FeatureCategory =
  | 'appointments'
  | 'billing'
  | 'staff'
  | 'marketing'
  | 'inventory'
  | 'analytics'
  | 'security';

/** Placeholder feature entries — content to be finalised */
export const features: Feature[] = [
  {
    id: 'appointments',
    category: 'appointments',
    title: 'Smart Appointment Booking',
    description: 'Placeholder — final copy to be written.',
  },
  {
    id: 'billing',
    category: 'billing',
    title: 'POS & Billing',
    description: 'Placeholder — final copy to be written.',
  },
  {
    id: 'staff',
    category: 'staff',
    title: 'Staff & Commissions',
    description: 'Placeholder — final copy to be written.',
  },
  {
    id: 'marketing',
    category: 'marketing',
    title: 'Marketing Automation',
    description: 'Placeholder — final copy to be written.',
  },
  {
    id: 'inventory',
    category: 'inventory',
    title: 'Inventory Management',
    description: 'Placeholder — final copy to be written.',
  },
  {
    id: 'analytics',
    category: 'analytics',
    title: 'Reports & Analytics',
    description: 'Placeholder — final copy to be written.',
  },
];
