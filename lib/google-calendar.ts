import { google } from 'googleapis';
import { prisma } from '@/lib/prisma';
import { decrypt } from '@/lib/crypto';
import { getGoogleOAuth2Client } from '@/lib/google-oauth';

/**
 * Server-only Google Calendar service module.
 * Reconnects to Google Calendar by loading and decrypting the stored refresh token.
 */

/**
 * Retrieves the configured Google Calendar ID.
 * Defaults to process.env.GOOGLE_CALENDAR_ID.
 */
export function getGoogleCalendarId(): string {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!calendarId) {
    throw new Error('GOOGLE_CALENDAR_ID environment variable is not configured.');
  }
  return calendarId;
}

/**
 * Returns an authenticated Google Calendar v3 API client.
 * Loads the encrypted refresh token from PostgreSQL, decrypts it, and sets it on the OAuth2 client.
 * Throws a safe server-side error if no connection is configured.
 */
export async function getGoogleCalendarClient() {
  const connection = await prisma.googleCalendarConnection.findUnique({
    where: { provider: 'google' },
  });

  if (!connection || !connection.refreshTokenEncrypted) {
    throw new Error(
      'No active Google Calendar connection found. Please authorize via /api/google/oauth/start.'
    );
  }

  // Decrypt the stored refresh token
  const refreshToken = decrypt(connection.refreshTokenEncrypted);

  // Initialize OAuth2 client
  const oauth2Client = getGoogleOAuth2Client();
  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  // Return authenticated Calendar client
  return google.calendar({
    version: 'v3',
    auth: oauth2Client,
  });
}
