'use client';

import { useState } from 'react';

export interface DemoFormData {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  locations: string;
  notes: string;
}

export interface BookingConfirmationData {
  id: string;
  leadId: string;
  date: string;
  time: string;
  timezone: string;
  googleMeetUrl: string;
  bookingReference: string;
  customerEmailSent?: boolean;
}

interface DemoDetailsFormProps {
  selectedDate: Date;
  selectedTime: string;
  initialData: DemoFormData;
  onBack: () => void;
  onSubmit: (data: DemoFormData, bookingResult: BookingConfirmationData) => void;
}

export function DemoDetailsForm({
  selectedDate,
  selectedTime,
  initialData,
  onBack,
  onSubmit,
}: DemoDetailsFormProps) {
  const [formData, setFormData] = useState<DemoFormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof DemoFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<{ message: string; isConflict?: boolean } | null>(null);

  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const validate = () => {
    const errs: Partial<Record<keyof DemoFormData, string>> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.businessName.trim()) errs.businessName = 'Salon / Business Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Work Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid work email';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone / WhatsApp Number is required';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid contact number';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;

      const res = await fetch('/api/booking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: dateStr,
          time: selectedTime,
          fullName: formData.fullName,
          businessName: formData.businessName,
          email: formData.email,
          phone: formData.phone,
          locations: formData.locations,
          notes: formData.notes,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 409) {
          setSubmitError({
            message: data.error || 'This time slot is no longer available. Please select another time.',
            isConflict: true,
          });
        } else {
          setSubmitError({
            message: data.error || 'Unable to confirm demo appointment. Please try again.',
            isConflict: false,
          });
        }
        return;
      }

      onSubmit(formData, data.booking);
    } catch {
      setSubmitError({
        message: 'Network error connecting to booking service. Please check your internet connection and try again.',
        isConflict: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-subtle)]">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[0.875rem] font-medium text-[var(--text-secondary)] hover:text-[#BC269B] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus)] rounded-md"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Change time
        </button>

        <span
          className="text-[0.8125rem] font-medium text-[var(--text-muted)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          STEP 3 OF 3
        </span>
      </div>

      {/* Selected Session Summary */}
      <div className="mb-6 p-4 rounded-[16px] bg-[#FBF0F9] border border-[rgba(188,38,155,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#BC269B] shadow-sm flex-shrink-0 mt-0.5 sm:mt-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div>
            <p className="text-[0.75rem] uppercase font-semibold text-[var(--text-muted)] tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
              DEMO SESSION
            </p>
            <p className="text-[0.9375rem] font-medium text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-primary)' }}>
              {formattedDate} &bull; {selectedTime} IST
            </p>
          </div>
        </div>

        <span className="text-[0.8125rem] text-[var(--text-secondary)] self-end sm:self-center font-medium">
          via Google Meet
        </span>
      </div>

      {/* Form Title */}
      <div className="mb-6">
        <h3
          className="text-[1.25rem] font-medium text-[var(--text-primary)]"
          style={{ fontFamily: 'var(--font-primary)' }}
        >
          Your Details
        </h3>
        <p className="text-[0.8125rem] text-[var(--text-muted)] mt-0.5">
          Tell us about your salon so we can tailor your live demonstration.
        </p>
      </div>

      {/* Inputs Form */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {/* Full Name & Business Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="demo-fullname"
              className="block text-[0.8125rem] font-medium text-[var(--text-primary)] mb-1.5"
            >
              Full Name <span className="text-[#BC269B]">*</span>
            </label>
            <input
              id="demo-fullname"
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => {
                setFormData({ ...formData, fullName: e.target.value });
                if (errors.fullName) setErrors({ ...errors, fullName: undefined });
              }}
              placeholder="e.g. Sarah Jenkins"
              className={`w-full px-4 py-3 rounded-[12px] bg-white border text-[0.9375rem] text-[var(--text-primary)] transition-all outline-none focus:border-[#BC269B] focus:ring-2 focus:ring-[#BC269B]/15 ${
                errors.fullName ? 'border-red-400' : 'border-[var(--border)]'
              }`}
              style={{ fontFamily: 'var(--font-primary)' }}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label
              htmlFor="demo-business"
              className="block text-[0.8125rem] font-medium text-[var(--text-primary)] mb-1.5"
            >
              Salon / Business Name <span className="text-[#BC269B]">*</span>
            </label>
            <input
              id="demo-business"
              type="text"
              required
              value={formData.businessName}
              onChange={(e) => {
                setFormData({ ...formData, businessName: e.target.value });
                if (errors.businessName) setErrors({ ...errors, businessName: undefined });
              }}
              placeholder="e.g. Lumina Hair & Spa"
              className={`w-full px-4 py-3 rounded-[12px] bg-white border text-[0.9375rem] text-[var(--text-primary)] transition-all outline-none focus:border-[#BC269B] focus:ring-2 focus:ring-[#BC269B]/15 ${
                errors.businessName ? 'border-red-400' : 'border-[var(--border)]'
              }`}
              style={{ fontFamily: 'var(--font-primary)' }}
            />
            {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
          </div>
        </div>

        {/* Work Email & WhatsApp Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="demo-email"
              className="block text-[0.8125rem] font-medium text-[var(--text-primary)] mb-1.5"
            >
              Work Email <span className="text-[#BC269B]">*</span>
            </label>
            <input
              id="demo-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              placeholder="sarah@luminasalon.com"
              className={`w-full px-4 py-3 rounded-[12px] bg-white border text-[0.9375rem] text-[var(--text-primary)] transition-all outline-none focus:border-[#BC269B] focus:ring-2 focus:ring-[#BC269B]/15 ${
                errors.email ? 'border-red-400' : 'border-[var(--border)]'
              }`}
              style={{ fontFamily: 'var(--font-primary)' }}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label
              htmlFor="demo-phone"
              className="block text-[0.8125rem] font-medium text-[var(--text-primary)] mb-1.5"
            >
              WhatsApp / Phone Number <span className="text-[#BC269B]">*</span>
            </label>
            <input
              id="demo-phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                if (errors.phone) setErrors({ ...errors, phone: undefined });
              }}
              placeholder="+91 98765 43210"
              className={`w-full px-4 py-3 rounded-[12px] bg-white border text-[0.9375rem] text-[var(--text-primary)] transition-all outline-none focus:border-[#BC269B] focus:ring-2 focus:ring-[#BC269B]/15 ${
                errors.phone ? 'border-red-400' : 'border-[var(--border)]'
              }`}
              style={{ fontFamily: 'var(--font-primary)' }}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* Number of Locations */}
        <div>
          <label
            htmlFor="demo-locations"
            className="block text-[0.8125rem] font-medium text-[var(--text-primary)] mb-1.5"
          >
            Number of Locations
          </label>
          <select
            id="demo-locations"
            value={formData.locations}
            onChange={(e) => setFormData({ ...formData, locations: e.target.value })}
            className="w-full px-4 py-3 rounded-[12px] bg-white border border-[var(--border)] text-[0.9375rem] text-[var(--text-primary)] transition-all outline-none focus:border-[#BC269B] focus:ring-2 focus:ring-[#BC269B]/15 cursor-pointer"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            <option value="1 Location">1 Location (Single Salon)</option>
            <option value="2–4 Locations">2–4 Locations</option>
            <option value="5–10 Locations">5–10 Locations</option>
            <option value="10+ Locations">10+ Locations (Enterprise / Franchise)</option>
          </select>
        </div>

        {/* Notes (Optional) */}
        <div>
          <label
            htmlFor="demo-notes"
            className="block text-[0.8125rem] font-medium text-[var(--text-primary)] mb-1.5"
          >
            Anything you&apos;d like us to know? <span className="text-[var(--text-muted)] font-normal">(Optional)</span>
          </label>
          <textarea
            id="demo-notes"
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Tell us about your team size, what software you currently use, or specific questions..."
            className="w-full px-4 py-3 rounded-[12px] bg-white border border-[var(--border)] text-[0.9375rem] text-[var(--text-primary)] transition-all outline-none focus:border-[#BC269B] focus:ring-2 focus:ring-[#BC269B]/15 resize-none"
            style={{ fontFamily: 'var(--font-primary)' }}
          />
        </div>

        {/* Error Banner */}
        {submitError && (
          <div className="p-4 rounded-[14px] bg-red-50/80 border border-red-200 text-red-900 text-[0.875rem] flex flex-col gap-2">
            <div className="flex items-start gap-2.5">
              <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <p className="font-medium text-red-900">{submitError.message}</p>
                {submitError.isConflict && (
                  <button
                    type="button"
                    onClick={onBack}
                    className="mt-2 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-[#BC269B] hover:underline"
                  >
                    &larr; Choose a different demo slot
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full py-4 text-[1.0625rem] font-medium shadow-[0_6px_20px_rgba(188,38,155,0.25)] flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Reserving your demo...</span>
              </>
            ) : (
              <span>Confirm Demo &rarr;</span>
            )}
          </button>
        </div>

        {/* Reassurance footnote */}
        <p className="text-center text-[0.8125rem] text-[var(--text-muted)] mt-1">
          🔒 No spam. We only use your information to send calendar invites and prepare your walkthrough.
        </p>
      </form>
    </div>
  );
}
