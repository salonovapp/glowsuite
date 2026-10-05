import { google } from 'googleapis';

export const GOOGLE_OAUTH_SCOPES = [
  'https://www.googleapis.com/auth/calendar.freebusy',
  'https://www.googleapis.com/auth/calendar.events.owned',
];

export const GOOGLE_OAUTH_COOKIE_NAME = 'g_oauth_state';

/**
 * Returns a configured Google OAuth2 client instance using environment variables.
 */
export function getGoogleOAuth2Client() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri =
    process.env.GOOGLE_REDIRECT_URI ||
    'http://localhost:3000/api/google/oauth/callback';

  if (!clientId || !clientSecret) {
    throw new Error(
      'Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET environment variable.'
    );
  }

  return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
}
