import { NextRequest, NextResponse } from 'next/server';
import {
  createDemoBooking,
  BookingValidationError,
  BookingConflictError,
  CalendarServiceError,
} from '@/lib/booking-service';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON request payload.' },
        { status: 400 }
      );
    }

    const booking = await createDemoBooking(body);

    return NextResponse.json(
      {
        success: true,
        booking,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (err: any) {
    if (err instanceof BookingValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    if (err instanceof BookingConflictError) {
      return NextResponse.json({ error: err.message }, { status: 409 });
    }
    if (err instanceof CalendarServiceError) {
      return NextResponse.json({ error: err.message }, { status: 503 });
    }

    return NextResponse.json(
      { error: 'An unexpected server error occurred while creating your demo reservation.' },
      { status: 500 }
    );
  }
}
