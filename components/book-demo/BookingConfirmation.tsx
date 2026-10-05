'use client';

import Link from 'next/link';
import { type DemoFormData } from './DemoDetailsForm';

interface BookingConfirmationProps {
  selectedDate: Date;
  selectedTime: string;
  formData: DemoFormData;
  bookingResult?: {
    googleMeetUrl?: string;
    bookingReference?: string;
    customerEmailSent?: boolean;
  } | null;
  onReset: () => void;
}

export function BookingConfirmation({
  selectedDate,
  selectedTime,
  formData,
  bookingResult,
  onReset,
}: BookingConfirmationProps) {
  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col text-left">
      {/* Success Badge */}
      <div className="w-14 h-14 rounded-full bg-[#FBF0F9] border border-[rgba(188,38,155,0.25)] flex items-center justify-center text-[#BC269B] mb-6 shadow-sm">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>

      {/* Eyebrow & Headline */}
      <p
        className="text-[0.8125rem] uppercase font-semibold text-[#BC269B] tracking-[0.14em] mb-2"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        DEMO BOOKED
      </p>

      <h2
        className="text-[1.75rem] md:text-[2.125rem] font-normal text-[var(--text-primary)] mb-3"
        style={{ fontFamily: 'var(--font-primary)', letterSpacing: '-0.02em', lineHeight: 1.15 }}
      >
        Your GlowSuite demo is confirmed.
      </h2>

      <p className="text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed mb-8 font-normal" style={{ fontFamily: 'var(--font-primary)' }}>
        {bookingResult?.customerEmailSent ? (
          <>
            We have reserved your 30-minute personalized walkthrough. A confirmation email with your meeting invite has been sent to{' '}
            <strong className="text-[var(--text-primary)] font-medium">{formData.email}</strong>.
          </>
        ) : (
          <>
            We have reserved your 30-minute personalized walkthrough for{' '}
            <strong className="text-[var(--text-primary)] font-medium">{formData.email}</strong>. You can join directly using the Google Meet link below.
          </>
        )}
        {bookingResult?.bookingReference && (
          <span className="block mt-1 text-[0.8125rem] font-mono text-[var(--text-muted)]">
            Booking Reference: <span className="font-semibold text-[#BC269B]">{bookingResult.bookingReference}</span>
          </span>
        )}
      </p>

      {/* Booking Summary Card */}
      <div className="rounded-[20px] bg-[#FBF0F9]/70 border border-[rgba(188,38,155,0.18)] p-6 mb-8 flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-[rgba(188,38,155,0.12)]">
          <div>
            <p className="text-[0.75rem] font-semibold uppercase text-[var(--text-muted)] tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
              DEMO DATE &amp; TIME
            </p>
            <p className="text-[1rem] font-medium text-[var(--text-primary)] mt-0.5" style={{ fontFamily: 'var(--font-primary)' }}>
              {formattedDate}
            </p>
            <p className="text-[0.9375rem] text-[var(--text-secondary)]">
              {selectedTime} IST
            </p>
          </div>

          <div>
            <p className="text-[0.75rem] font-semibold uppercase text-[var(--text-muted)] tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
              MEETING PLATFORM
            </p>
            <p className="text-[1rem] font-medium text-[var(--text-primary)] mt-0.5" style={{ fontFamily: 'var(--font-primary)' }}>
              Google Meet (Video Call)
            </p>
            {bookingResult?.googleMeetUrl ? (
              <a
                href={bookingResult.googleMeetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[0.875rem] text-[#BC269B] font-semibold hover:underline mt-1 break-all"
              >
                <span>Join Google Meet</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            ) : (
              <p className="text-[0.9375rem] text-[var(--text-secondary)]">
                Link included in calendar invite
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-[0.75rem] font-semibold uppercase text-[var(--text-muted)] tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
              ATTENDEE
            </p>
            <p className="text-[0.9375rem] font-medium text-[var(--text-primary)] mt-0.5">
              {formData.fullName} ({formData.businessName})
            </p>
            <p className="text-[0.875rem] text-[var(--text-secondary)]">
              {formData.locations}
            </p>
          </div>

          <div>
            <p className="text-[0.75rem] font-semibold uppercase text-[var(--text-muted)] tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
              CONTACT
            </p>
            <p className="text-[0.9375rem] text-[var(--text-primary)] mt-0.5">
              {formData.email}
            </p>
            <p className="text-[0.875rem] text-[var(--text-secondary)]">
              {formData.phone}
            </p>
          </div>
        </div>
      </div>

      {/* What happens next checklist */}
      <div className="mb-8">
        <h3
          className="text-[0.8125rem] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          WHAT TO EXPECT NEXT
        </h3>

        <div className="flex flex-col gap-3 text-[0.9375rem] text-[var(--text-secondary)]">
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-white border border-[var(--border)] text-[#BC269B] text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5 shadow-sm">
              1
            </span>
            <p>
              {bookingResult?.customerEmailSent
                ? 'Check your inbox for the confirmation email containing the Google Meet joining link.'
                : 'Use the direct Google Meet link above at your scheduled appointment time.'}
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-white border border-[var(--border)] text-[#BC269B] text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5 shadow-sm">
              2
            </span>
            <p>You can forward the invite to other owners, managers, or front-desk staff.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-white border border-[var(--border)] text-[#BC269B] text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5 shadow-sm">
              3
            </span>
            <p>Join on a laptop or desktop computer for the best live screen-sharing experience.</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[var(--border-subtle)]">
        <Link
          href="/salon-management-software"
          className="btn btn-primary btn-md font-medium text-center"
        >
          Explore GlowSuite Features &rarr;
        </Link>
        <button
          type="button"
          onClick={onReset}
          className="btn btn-secondary btn-md font-medium text-center"
        >
          Book Another Session
        </button>
      </div>
    </div>
  );
}
