import { Container } from '@/components/ui/Container';
import { FadeUp, FadeIn } from '@/components/motion';

// ─────────────────────────────────────────────────────────────
// Inline SVG icons — no icon library required.
// stroke="currentColor" so colour is controlled by parent.
// ─────────────────────────────────────────────────────────────
function IconCalendar() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8"  y1="2" x2="8"  y2="6" />
      <line x1="3"  y1="10" x2="21" y2="10" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconReceipt() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}

function IconPackage() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function IconBarChart() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4"  />
      <line x1="6"  y1="20" x2="6"  y2="14" />
      <line x1="2"  y1="20" x2="22" y2="20" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Capability data — single source of truth for content
// ─────────────────────────────────────────────────────────────
const capabilities = [
  {
    id: 'appointments',
    title: 'Appointments',
    description: 'Manage bookings and keep your daily schedule organized.',
    icon: <IconCalendar />,
  },
  {
    id: 'customers',
    title: 'Customers',
    description: 'Keep client information and salon activity in one place.',
    icon: <IconUser />,
  },
  {
    id: 'billing',
    title: 'Billing',
    description: 'Manage billing and day-to-day transactions more efficiently.',
    icon: <IconReceipt />,
  },
  {
    id: 'staff',
    title: 'Staff',
    description: 'Organize your team and manage staff-related operations.',
    icon: <IconUsers />,
  },
  {
    id: 'inventory',
    title: 'Inventory',
    description: 'Keep visibility over products and inventory.',
    icon: <IconPackage />,
  },
  {
    id: 'reports',
    title: 'Reports',
    description: 'Understand business performance with clear reporting and insights.',
    icon: <IconBarChart />,
  },
] as const;

// ─────────────────────────────────────────────────────────────
// Capability card
// ─────────────────────────────────────────────────────────────
interface CapabilityCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function CapabilityCard({ title, description, icon }: CapabilityCardProps) {
  return (
    <article
      className="group h-full flex flex-col hover:-translate-y-1"
      style={{
        backgroundColor: 'var(--bg-elevated)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        boxShadow: 'var(--shadow-sm)',
        transition: 'all 300ms ease',
      }}
      // CSS hover via Tailwind group utilities applied below
    >
      {/* Icon container */}
      <div
        className="group-hover:bg-[rgba(139,63,216,0.1)] transition-colors duration-300"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          backgroundColor: 'rgba(188, 38, 155, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
          color: 'var(--gs-pink)',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-primary)',
          fontSize: '1.0625rem',  /* 17px */
          fontWeight: 500,
          color: 'var(--text-primary)',
          marginBottom: '0.5rem',
          lineHeight: 1.3,
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-primary)',
          fontSize: '0.9375rem',   /* 15px */
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          maxWidth: 'none',
        }}
      >
        {description}
      </p>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────
// ConnectedPlatform section — server component
// ─────────────────────────────────────────────────────────────
export function ConnectedPlatform() {
  return (
    <section
      id="connected-platform"
      aria-labelledby="platform-heading"
      className="relative w-full"
      style={{ backgroundColor: 'var(--bg-page)', paddingTop: '5rem', paddingBottom: '5rem' }}
    >
      <Container>
        {/* ── Section header ──────────────────── */}
        <div
          style={{
            textAlign: 'center',
            maxWidth: '680px',
            marginInline: 'auto',
            marginBottom: 'clamp(1.5rem, 3vw, 2.25rem)',
          }}
        >
          <FadeIn delay={0} className="w-full flex justify-center">
            <p
              className="text-eyebrow text-center"
              style={{ color: 'var(--gs-pink)', marginBottom: '0.75rem' }}
            >
              ONE CONNECTED PLATFORM
            </p>
          </FadeIn>

          <FadeUp delay={80}>
            <h2
              id="platform-heading"
              className="text-h2 font-normal"
              style={{
                color: 'var(--text-primary)',
                marginBottom: '0.75rem',
                fontWeight: 400,
              }}
            >
              Run your salon from one connected system.
            </h2>
          </FadeUp>

          <FadeUp delay={160}>
            <p
              className="text-body-lg font-normal"
              style={{
                color: 'var(--text-secondary)',
                maxWidth: '600px',
                marginInline: 'auto',
              }}
            >
              Managing a salon often means switching between appointments, customers, staff,
              billing, inventory, and business reports. GlowSuite brings your day-to-day
              operations into one connected salon management system, giving you a clearer view
              of your business and the tools to manage it efficiently.
            </p>
          </FadeUp>
        </div>

        {/* ── Capability cards grid ────────────────────
            Each card is wrapped in FadeUp with a staggered
            delay based on index. Cards are equal-height via
            h-full on the article and the FadeUp wrapper.
        ──────────────────────────────────────────────── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          role="list"
          aria-label="GlowSuite platform capabilities"
        >
          {capabilities.map((cap, i) => (
            <FadeUp
              key={cap.id}
              delay={i * 70}
              className="h-full"
            >
              <div role="listitem" className="h-full">
                <CapabilityCard
                  title={cap.title}
                  description={cap.description}
                  icon={cap.icon}
                />
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
