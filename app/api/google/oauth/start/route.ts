import { NextResponse } from 'next/server';
import crypto from 'crypto';
import {
  getGoogleOAuth2Client,
  GOOGLE_OAUTH_SCOPES,
  GOOGLE_OAUTH_COOKIE_NAME,
} from '@/lib/google-oauth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let oauth2Client;
    try {
      oauth2Client = getGoogleOAuth2Client();
    } catch {
      return NextResponse.json(
        {
          error:
            'Google OAuth credentials are not configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local.',
        },
        { status: 500 }
      );
    }

    // Generate cryptographically secure random state to protect against CSRF
    const state = crypto.randomBytes(32).toString('hex');

    // Generate Google authorization URL
    const authorizationUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: GOOGLE_OAUTH_SCOPES,
      prompt: 'consent',
      state,
    });

    const response = NextResponse.redirect(authorizationUrl, { status: 307 });

    // Store state in a secure, HttpOnly, SameSite=Lax cookie valid for 10 minutes
    response.cookies.set(GOOGLE_OAUTH_COOKIE_NAME, state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 10, // 10 minutes
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to initiate Google OAuth authorization.' },
      { status: 500 }
    );
  }
}
