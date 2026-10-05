import { NextRequest, NextResponse } from 'next/server';
import {
  BOOKING_TIMEZONE,
  calculateAvailabilitySlots,
  isValidDateString,
} from '@/lib/booking-availability';
import {
  getGoogleCalendarClient,
  getGoogleCalendarId,
} from '@/lib/google-calendar';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    // 1. Strict date parameter validation
    if (!date || !isValidDateString(date)) {
      return NextResponse.json(
        {
          error:
            'Invalid or missing date parameter. Please provide a valid calendar date in YYYY-MM-DD format.',
        },
        { status: 400 }
      );
    }

    // 2. Obtain authenticated Google Calendar client & target calendar ID
    let calendar;
    let calendarId: string;
    try {
      calendar = await getGoogleCalendarClient();
      calendarId = getGoogleCalendarId();
    } catch {
      return NextResponse.json(
        {
          error:
            'Google Calendar availability cannot be retrieved. Connection is not active.',
        },
        { status: 503 }
      );
    }

    // 3. Query Google Calendar FreeBusy API for Asia/Kolkata day boundaries
    let busyIntervals: Array<{ start?: string | null; end?: string | null }> = [];
    try {
      const freeBusyRes = await calendar.freebusy.query({
        requestBody: {
          timeMin: `${date}T00:00:00+05:30`,
          timeMax: `${date}T23:59:59+05:30`,
          timeZone: BOOKING_TIMEZONE,
          items: [{ id: calendarId }],
        },
      });

      busyIntervals = freeBusyRes.data.calendars?.[calendarId]?.busy || [];
    } catch {
      return NextResponse.json(
        {
          error:
            'Failed to retrieve free/busy information from Google Calendar service.',
        },
        { status: 503 }
      );
    }

    // 4. Calculate available slots adhering to 2-hour notice, business window, and busy events
    const slots = calculateAvailabilitySlots(date, busyIntervals);

    return NextResponse.json(
      {
        date,
        timezone: BOOKING_TIMEZONE,
        slots,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: 'An unexpected error occurred while calculating availability.' },
      { status: 500 }
    );
  }
}
