'use client';

import { useState } from 'react';

interface BookingCalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function BookingCalendar({ selectedDate, onSelectDate }: BookingCalendarProps) {
  // Use October 2026 or current active mock reference
  const today = new Date();
  
  // Start view from current date or selectedDate if set
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (selectedDate) return selectedDate.getMonth();
    return today.getMonth();
  });
  
  const [currentYear, setCurrentYear] = useState(() => {
    if (selectedDate) return selectedDate.getFullYear();
    return today.getFullYear();
  });

  // Calculate days in month and starting weekday
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  // Adjust so Monday is 0 and Sunday is 6
  const startingDayOffset = (firstDayIndex + 6) % 7;

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Determine if a date is available
  // All 7 days (Monday through Sunday) that are >= today are bookable
  const isDateAvailable = (day: number) => {
    const candidate = new Date(currentYear, currentMonth, day);
    candidate.setHours(0, 0, 0, 0);

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (candidate < now) return false;

    return true;
  };

  const isToday = (day: number) => {
    const now = new Date();
    return (
      day === now.getDate() &&
      currentMonth === now.getMonth() &&
      currentYear === now.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentMonth === selectedDate.getMonth() &&
      currentYear === selectedDate.getFullYear()
    );
  };

  // Prevent navigating to past months
  const isPastMonth = () => {
    const now = new Date();
    return (
      currentYear < now.getFullYear() ||
      (currentYear === now.getFullYear() && currentMonth <= now.getMonth())
    );
  };

  return (
    <div className="flex flex-col">
      {/* Calendar Header with Navigation */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-subtle)]">
        <div>
          <h3
            className="text-[1.25rem] font-medium text-[var(--text-primary)]"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            {MONTH_NAMES[currentMonth]} {currentYear}
          </h3>
          <p className="text-[0.8125rem] text-[var(--text-muted)] mt-0.5">
            Select a day to view open demo slots
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handlePrevMonth}
            disabled={isPastMonth()}
            aria-label="Previous month"
            className="w-9 h-9 rounded-full flex items-center justify-center border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--gs-pink)] hover:bg-[#FBF0F9] disabled:opacity-30 disabled:hover:border-[var(--border)] disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            aria-label="Next month"
            className="w-9 h-9 rounded-full flex items-center justify-center border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--gs-pink)] hover:bg-[#FBF0F9] transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      {/* Weekday Labels Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center">
        {WEEKDAY_NAMES.map((day) => (
          <div
            key={day}
            className="py-1 text-[0.75rem] font-semibold tracking-wider uppercase text-[var(--text-muted)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center" role="grid" aria-label="Calendar dates">
        {/* Leading empty cells */}
        {Array.from({ length: startingDayOffset }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" aria-hidden="true" />
        ))}

        {/* Days of month */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const available = isDateAvailable(day);
          const selected = isSelected(day);
          const todayMarker = isToday(day);

          return (
            <button
              key={day}
              type="button"
              disabled={!available}
              onClick={() => {
                if (available) {
                  onSelectDate(new Date(currentYear, currentMonth, day));
                }
              }}
              aria-label={`${day} ${MONTH_NAMES[currentMonth]} ${currentYear}${available ? ', available' : ', unavailable'}`}
              aria-pressed={selected}
              className={`
                relative aspect-square rounded-[14px] flex flex-col items-center justify-center text-[0.9375rem] transition-all duration-150
                focus-visible:outline-2 focus-visible:outline-[var(--focus)] focus-visible:outline-offset-2
                ${
                  selected
                    ? 'bg-[#BC269B] text-white font-semibold shadow-[0_4px_14px_rgba(188,38,155,0.3)] scale-[1.03]'
                    : available
                    ? 'bg-transparent text-[var(--text-primary)] font-medium hover:bg-[#FBF0F9] hover:text-[#BC269B] hover:border-[rgba(188,38,155,0.4)] border border-transparent cursor-pointer'
                    : 'bg-transparent text-[#CBD0DF] cursor-not-allowed pointer-events-none'
                }
              `}
              style={{ fontFamily: 'var(--font-primary)' }}
            >
              <span>{day}</span>

              {/* Today indicator dot */}
              {todayMarker && !selected && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-1.5 w-1 h-1 rounded-full bg-[#BC269B]"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend & Timezone Info */}
      <div className="mt-8 pt-4 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[0.8125rem] text-[var(--text-muted)]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#BC269B]" />
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full border border-[var(--border)] bg-white" />
            <span>Available</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-muted)]">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>India Standard Time (IST, GMT+5:30)</span>
        </div>
      </div>
    </div>
  );
}
