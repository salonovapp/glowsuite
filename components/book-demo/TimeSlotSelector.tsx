'use client';

import { useState, useEffect, useCallback } from 'react';

interface TimeSlotSelectorProps {
  selectedDate: Date;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

interface ApiSlot {
  time: string;
  label: string;
  range: string;
  available: boolean;
}

export function TimeSlotSelector({
  selectedDate,
  selectedTime,
  onSelectTime,
  onBack,
  onContinue,
}: TimeSlotSelectorProps) {
  const [slots, setSlots] = useState<ApiSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Format date as YYYY-MM-DD for API call
  const year = selectedDate.getFullYear();
  const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
  const day = String(selectedDate.getDate()).padStart(2, '0');
  const dateStr = `${year}-${month}-${day}`;

  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const fetchAvailability = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/booking/availability?date=${dateStr}`, {
        cache: 'no-store',
      });
      if (!res.ok) {
        throw new Error('Failed to retrieve calendar availability.');
      }
      const data = await res.json();
      setSlots(data.slots || []);
    } catch (err: any) {
      setError(err?.message || 'Unable to load open demo slots.');
    } finally {
      setIsLoading(false);
    }
  }, [dateStr]);

  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  const hasAnyAvailableSlots = slots.some((s) => s.available);

  return (
    <div className="flex flex-col">
      {/* Top Navigation & Date Summary */}
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
          Change date
        </button>

        <span
          className="text-[0.8125rem] font-medium text-[var(--text-muted)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          STEP 2 OF 3
        </span>
      </div>

      {/* Selected Date Callout */}
      <div className="mb-6 p-4 rounded-[16px] bg-[#FBF0F9] border border-[rgba(188,38,155,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#BC269B] shadow-sm flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <div>
            <p className="text-[0.75rem] uppercase font-semibold text-[var(--text-muted)] tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
              SELECTED DATE
            </p>
            <p className="text-[0.9375rem] font-medium text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-primary)' }}>
              {formattedDate}
            </p>
          </div>
        </div>

        <span className="text-[0.8125rem] text-[var(--text-secondary)] self-end sm:self-center">
          30-min walkthrough
        </span>
      </div>

      {/* Time Slots Heading */}
      <div className="mb-4">
        <h3
          className="text-[1.25rem] font-medium text-[var(--text-primary)]"
          style={{ fontFamily: 'var(--font-primary)' }}
        >
          Select a Time
        </h3>
        <p className="text-[0.8125rem] text-[var(--text-muted)] mt-0.5">
          All times shown in IST (India Standard Time, GMT+5:30) &bull; 2-hour notice required
        </p>
      </div>

      {/* Loading Skeleton State */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-8" aria-busy="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className="h-[54px] w-full rounded-[14px] bg-black/[0.04] animate-pulse border border-[var(--border-subtle)]"
            />
          ))}
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <div className="mb-8 p-6 rounded-[16px] bg-red-50/60 border border-red-200/80 text-center">
          <p className="text-[0.9375rem] font-medium text-red-900 mb-1">
            Unable to load calendar availability
          </p>
          <p className="text-[0.8125rem] text-red-700/80 mb-4">
            {error}
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={fetchAvailability}
              className="btn btn-primary btn-sm px-4"
            >
              Retry
            </button>
            <button
              type="button"
              onClick={onBack}
              className="btn btn-secondary btn-sm px-4"
            >
              Pick another date
            </button>
          </div>
        </div>
      )}

      {/* No Available Slots State */}
      {!isLoading && !error && !hasAnyAvailableSlots && (
        <div className="mb-8 p-8 rounded-[16px] bg-[#FBF0F9]/60 border border-[rgba(188,38,155,0.15)] text-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#BC269B] shadow-sm mx-auto mb-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <p className="text-[1rem] font-medium text-[var(--text-primary)] mb-1">
            No open demo slots on this date
          </p>
          <p className="text-[0.8125rem] text-[var(--text-muted)] mb-5 max-w-[340px] mx-auto">
            All appointments are booked or fall within the 2-hour notice window. Please select another date.
          </p>
          <button
            type="button"
            onClick={onBack}
            className="btn btn-primary btn-sm px-5"
          >
            Select another date
          </button>
        </div>
      )}

      {/* Slots Grid with Scroll Container for 28 Slots */}
      {!isLoading && !error && hasAnyAvailableSlots && (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-8 max-h-[460px] overflow-y-auto pr-1"
          role="group"
          aria-label="Available demo times"
        >
          {slots.map((slot) => {
            const isSelected = selectedTime === slot.range;

            if (!slot.available) {
              return (
                <div
                  key={slot.time}
                  aria-disabled="true"
                  className="w-full py-3.5 px-4 rounded-[14px] flex items-center justify-between text-left bg-black/[0.02] border border-[var(--border-subtle)] text-[var(--text-muted)] opacity-45 cursor-not-allowed select-none"
                  style={{ fontFamily: 'var(--font-primary)' }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-black/20" />
                    <span className="text-[0.9375rem] font-medium line-through">{slot.label}</span>
                  </div>
                  <span className="text-[0.75rem] text-[var(--text-muted)] font-mono">
                    Booked
                  </span>
                </div>
              );
            }

            return (
              <button
                key={slot.time}
                type="button"
                onClick={() => onSelectTime(slot.range)}
                aria-pressed={isSelected}
                className={`
                  w-full py-3.5 px-4 rounded-[14px] flex items-center justify-between text-left transition-all duration-150
                  focus-visible:outline-2 focus-visible:outline-[var(--focus)] focus-visible:outline-offset-2
                  ${
                    isSelected
                      ? 'bg-[#BC269B] text-white font-medium border border-[#BC269B] shadow-[0_4px_14px_rgba(188,38,155,0.25)] scale-[1.01]'
                      : 'bg-white text-[var(--text-primary)] border border-[var(--border)] hover:border-[rgba(188,38,155,0.4)] hover:bg-[#FBF0F9] hover:text-[#BC269B]'
                  }
                `}
                style={{ fontFamily: 'var(--font-primary)' }}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-[#BC269B]'}`} />
                  <span className="text-[0.9375rem] font-medium">{slot.label}</span>
                </div>
                <span className={`text-[0.8125rem] ${isSelected ? 'text-white/80' : 'text-[var(--text-muted)]'}`}>
                  30 mins
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Action footer */}
      <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-4">
        <p className="text-[0.8125rem] text-[var(--text-muted)]">
          {selectedTime ? `Selected: ${selectedTime}` : 'Select a time to proceed'}
        </p>

        <button
          type="button"
          disabled={!selectedTime}
          onClick={onContinue}
          className="btn btn-primary btn-sm px-6 font-medium disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
        >
          Continue &rarr;
        </button>
      </div>
    </div>
  );
}
