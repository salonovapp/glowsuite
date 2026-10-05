'use client';

import { useState } from 'react';
import { BookingCalendar } from './BookingCalendar';
import { TimeSlotSelector } from './TimeSlotSelector';
import { DemoDetailsForm, type DemoFormData, type BookingConfirmationData } from './DemoDetailsForm';
import { BookingConfirmation } from './BookingConfirmation';

type BookingStep = 'date' | 'time' | 'details' | 'confirmed';

export function BookDemoInteractive() {
  const [step, setStep] = useState<BookingStep>('date');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingResult, setBookingResult] = useState<BookingConfirmationData | null>(null);
  const [formData, setFormData] = useState<DemoFormData>({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    locations: '1 Location',
    notes: '',
  });

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    // Smoothly transition to time selection
    setStep('time');
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
  };

  const handleTimeContinue = () => {
    if (selectedTime) {
      setStep('details');
    }
  };

  const handleDetailsSubmit = (data: DemoFormData, result: BookingConfirmationData) => {
    setFormData(data);
    setBookingResult(result);
    setStep('confirmed');
  };

  const handleReset = () => {
    setStep('date');
    setSelectedDate(null);
    setSelectedTime(null);
    setBookingResult(null);
    setFormData({
      fullName: '',
      businessName: '',
      email: '',
      phone: '',
      locations: '1 Location',
      notes: '',
    });
  };

  return (
    <div className="w-full">
      {/* Booking Container */}
      <div
        className="relative bg-white rounded-[28px] border border-[var(--border-subtle)] shadow-[0_16px_48px_-12px_rgba(25,30,73,0.08),0_4px_16px_rgba(188,38,155,0.04)] p-6 sm:p-8 md:p-10 transition-all duration-300"
        style={{ fontFamily: 'var(--font-primary)' }}
      >
        {/* Step Indicator (visible during active booking flow) */}
        {step !== 'confirmed' && (
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border-subtle)] text-[0.8125rem]">
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step === 'date'
                    ? 'bg-[#BC269B] text-white'
                    : selectedDate
                    ? 'bg-[#FBF0F9] text-[#BC269B]'
                    : 'bg-black/5 text-[var(--text-muted)]'
                }`}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {selectedDate && step !== 'date' ? '✓' : '1'}
              </span>
              <span
                className={`font-medium ${
                  step === 'date' ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'
                }`}
              >
                Date
              </span>
            </div>

            <div className="w-6 h-[1px] bg-[var(--border)]" />

            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step === 'time'
                    ? 'bg-[#BC269B] text-white'
                    : selectedTime && step === 'details'
                    ? 'bg-[#FBF0F9] text-[#BC269B]'
                    : 'bg-black/5 text-[var(--text-muted)]'
                }`}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {selectedTime && step === 'details' ? '✓' : '2'}
              </span>
              <span
                className={`font-medium ${
                  step === 'time' ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'
                }`}
              >
                Time
              </span>
            </div>

            <div className="w-6 h-[1px] bg-[var(--border)]" />

            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step === 'details'
                    ? 'bg-[#BC269B] text-white'
                    : 'bg-black/5 text-[var(--text-muted)]'
                }`}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                3
              </span>
              <span
                className={`font-medium ${
                  step === 'details' ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'
                }`}
              >
                Details
              </span>
            </div>
          </div>
        )}

        {/* Step Content Switcher with Smooth Transition */}
        <div className="transition-opacity duration-300">
          {step === 'date' && (
            <BookingCalendar
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
            />
          )}

          {step === 'time' && selectedDate && (
            <TimeSlotSelector
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSelectTime={handleSelectTime}
              onBack={() => setStep('date')}
              onContinue={handleTimeContinue}
            />
          )}

          {step === 'details' && selectedDate && selectedTime && (
            <DemoDetailsForm
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              initialData={formData}
              onBack={() => setStep('time')}
              onSubmit={handleDetailsSubmit}
            />
          )}

          {step === 'confirmed' && selectedDate && selectedTime && (
            <BookingConfirmation
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              formData={formData}
              bookingResult={bookingResult}
              onReset={handleReset}
            />
          )}
        </div>
      </div>
    </div>
  );
}
