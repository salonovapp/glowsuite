import Image from 'next/image';
import Link from 'next/link';
import {
  platformLinks,
  aboutUsLinks,
  featureLinks,
  socialLinks,
  legalLinks,
  type FooterLink,
  type SocialLink,
} from '@/content/footer';

// ---------------------------------------------------------------------------
// Social icon SVGs (inline — no icon library dependency)
// ---------------------------------------------------------------------------
function SocialIcon({ icon }: { icon: SocialLink['icon'] }) {
  if (icon === 'instagram') return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
  if (icon === 'linkedin') return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
  if (icon === 'youtube') return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
  );
  return null;
}

// ---------------------------------------------------------------------------
// Footer link renderer — respects live/planned status
// ---------------------------------------------------------------------------
function FooterLinkItem({ link }: { link: FooterLink }) {
  if (link.status === 'planned') {
    // Render as non-linked text to avoid dead links and false SEO signals.
    // TODO: Replace with real <Link> when the page/feature is built.
    return (
      <span className="text-sm text-white/40 cursor-default select-none" aria-label={`${link.label} (coming soon)`}>
        {link.label}
      </span>
    );
  }

  return (
    <Link
      href={link.href}
      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="text-sm text-white/70 hover:text-[var(--gs-pink)] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[var(--gs-pink)] focus-visible:outline-offset-2 rounded-[2px]"
    >
      {link.label}
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Footer column component
// ---------------------------------------------------------------------------
function FooterColumn({ heading, links }: { heading: string; links: FooterLink[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[0.8125rem] font-bold tracking-[0.08em] uppercase" style={{ color: 'var(--gs-pink)' }}>
        {heading}
      </h3>
      <ul role="list" className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={`${link.label}-${link.href}`}>
            <FooterLinkItem link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Footer — Server Component (no client JS required)
// ---------------------------------------------------------------------------
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-dark)', color: 'var(--text-inverse)' }}
    >
      {/* ---- Main footer grid ---- */}
      <div className="container-wide py-20 md:py-24 relative z-10">

        {/* Top section: brand + columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">

          {/* Brand column — spans 2 cols */}
          <div className="col-span-2 flex flex-col gap-6 relative">
            
            {/* Subtle Brand Accent Glow */}
            <div 
              aria-hidden="true" 
              className="absolute -top-12 -left-12 w-[150%] h-[150%] z-[-1] pointer-events-none rounded-full"
              style={{
                background: 'radial-gradient(circle at center, rgba(188, 38, 155, 0.12) 0%, rgba(139, 63, 216, 0.04) 40%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />

            <Link href="/" aria-label="GlowSuite home" className="inline-block w-fit focus-visible:outline-2 focus-visible:outline-white/80 focus-visible:outline-offset-4 rounded-[4px]">
              <Image
                src="/brand/logo-trimmed.png"
                alt="GlowSuite"
                width={180}
                height={42}
                className="h-10 md:h-[42px] w-auto brightness-0 invert"
              />
            </Link>
            
            <p className="text-[0.9375rem] leading-relaxed max-w-[280px]" style={{ color: 'var(--gs-pink)' }}>
              Modern salon management software for ambitious beauty businesses.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2.5 mt-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.icon}
                  href={social.href}
                  aria-label={`GlowSuite on ${social.label}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-white/80 hover:text-white hover:bg-[var(--gs-pink)] hover:scale-105 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[var(--gs-pink)] focus-visible:outline-offset-2"
                >
                  <SocialIcon icon={social.icon} />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="col-span-1"><FooterColumn heading="Platform" links={platformLinks} /></div>
          <div className="col-span-1"><FooterColumn heading="About Us" links={aboutUsLinks} /></div>
          <div className="col-span-1"><FooterColumn heading="Features" links={featureLinks} /></div>
        </div>

        {/* Bottom bar: copyright + legal */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
          <p className="text-[0.875rem] text-white/50">
            &copy; {year} GlowSuite. All rights reserved.
          </p>

          <nav aria-label="Legal links" className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <FooterLinkItem key={link.label} link={link} />
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
