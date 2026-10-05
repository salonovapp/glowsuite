import { NextRequest, NextResponse } from 'next/server';
import {
  getGoogleOAuth2Client,
  GOOGLE_OAUTH_COOKIE_NAME,
} from '@/lib/google-oauth';
import { encrypt } from '@/lib/crypto';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

function sanitizeErrorMessage(msg: string): string {
  if (!msg) return 'Unknown error';
  return msg
    .replace(/postgresql:\/\/[^@\s]+@/gi, 'postgresql://***@')
    .replace(/key=[^&\s]+/gi, 'key=***')
    .replace(/secret=[^&\s]+/gi, 'secret=***')
    .replace(/token=[^&\s]+/gi, 'token=***')
    .replace(/code=[^&\s]+/gi, 'code=***')
    .slice(0, 300);
}

export async function GET(request: NextRequest) {
  // Safe environment configuration check without printing values
  console.log('\n--- OAUTH CALLBACK DIAGNOSTICS ---');
  console.log(`CONFIG_GOOGLE_CLIENT_ID=${Boolean(process.env.GOOGLE_CLIENT_ID)}`);
  console.log(`CONFIG_GOOGLE_CLIENT_SECRET=${Boolean(process.env.GOOGLE_CLIENT_SECRET)}`);
  console.log(`CONFIG_GOOGLE_REDIRECT_URI=${Boolean(process.env.GOOGLE_REDIRECT_URI)}`);
  console.log(`CONFIG_GOOGLE_CALENDAR_ID=${Boolean(process.env.GOOGLE_CALENDAR_ID)}`);
  console.log(`CONFIG_DATABASE_URL=${Boolean(process.env.DATABASE_URL)}`);
  console.log(`CONFIG_GOOGLE_TOKEN_ENCRYPTION_KEY=${Boolean(process.env.GOOGLE_TOKEN_ENCRYPTION_KEY)}`);

  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const errorParam = searchParams.get('error');

  const storedState = request.cookies.get(GOOGLE_OAUTH_COOKIE_NAME)?.value;

  const clearStateCookie = (res: NextResponse) => {
    res.cookies.set(GOOGLE_OAUTH_COOKIE_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });
    return res;
  };

  // STEP A: OAuth state validation
  if (errorParam) {
    console.error('OAUTH_CALLBACK_STEP=A failed: Google authorization error or consent denied');
    const errorResponse = new NextResponse(
      'Google authorization was cancelled or denied.',
      { status: 400, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    );
    return clearStateCookie(errorResponse);
  }

  if (!state || !code) {
    console.error('OAUTH_CALLBACK_STEP=A failed: missing code or state parameter in URL');
    const errorResponse = new NextResponse(
      'Invalid authorization callback request: missing code or state.',
      { status: 400, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    );
    return clearStateCookie(errorResponse);
  }

  if (!storedState || storedState !== state) {
    console.error('OAUTH_CALLBACK_STEP=A failed: state mismatch or expired CSRF cookie');
    const errorResponse = new NextResponse(
      'Invalid or expired OAuth state parameter. Please try authorizing again.',
      { status: 403, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    );
    return clearStateCookie(errorResponse);
  }

  console.log('OAUTH_CALLBACK_STEP=A passed: OAuth state successfully validated');

  // STEP B: Google authorization-code exchange
  let tokens;
  try {
    const oauth2Client = getGoogleOAuth2Client();
    const tokenResult = await oauth2Client.getToken(code);
    tokens = tokenResult.tokens;
    console.log('OAUTH_CALLBACK_STEP=B passed: authorization-code successfully exchanged');
  } catch (err: any) {
    console.error('OAUTH_CALLBACK_STEP=B failed:', sanitizeErrorMessage(err?.message || String(err)));
    const errorResponse = new NextResponse(
      'Failed to exchange authorization code with Google.',
      { status: 500, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    );
    return clearStateCookie(errorResponse);
  }

  // STEP C: Refresh token availability
  const refreshToken = tokens?.refresh_token;
  if (!refreshToken) {
    console.error('OAUTH_CALLBACK_STEP=C failed: Google did not return a refresh token');
    const errorResponse = new NextResponse(
      'Google did not return a refresh token. If you previously authorized this account, please revoke access in your Google Account security settings (https://myaccount.google.com/permissions) and try authorizing again.',
      { status: 400, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    );
    return clearStateCookie(errorResponse);
  }
  console.log('OAUTH_CALLBACK_STEP=C passed: refresh token received from Google');

  // STEP D: GOOGLE_TOKEN_ENCRYPTION_KEY availability/validation & encryption
  let refreshTokenEncrypted: string;
  try {
    refreshTokenEncrypted = encrypt(refreshToken);
    console.log('OAUTH_CALLBACK_STEP=D passed: token encrypted with AES-256-GCM');
  } catch (err: any) {
    console.error('OAUTH_CALLBACK_STEP=D failed:', sanitizeErrorMessage(err?.message || String(err)));
    const errorResponse = new NextResponse(
      'Failed to encrypt token with server encryption key.',
      { status: 500, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    );
    return clearStateCookie(errorResponse);
  }

  // STEP E: Prisma database connection
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('OAUTH_CALLBACK_STEP=E passed: database connection verified');
  } catch (err: any) {
    console.error('OAUTH_CALLBACK_STEP=E failed:', sanitizeErrorMessage(err?.message || String(err)));
    const errorResponse = new NextResponse(
      'Failed to connect to database.',
      { status: 500, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    );
    return clearStateCookie(errorResponse);
  }

  // STEP F: GoogleCalendarConnection upsert
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
  try {
    await prisma.googleCalendarConnection.upsert({
      where: { provider: 'google' },
      update: {
        calendarId,
        refreshTokenEncrypted,
      },
      create: {
        provider: 'google',
        calendarId,
        refreshTokenEncrypted,
      },
    });
    console.log('OAUTH_CALLBACK_STEP=F passed: GoogleCalendarConnection upserted');
  } catch (err: any) {
    console.error('OAUTH_CALLBACK_STEP=F failed:', sanitizeErrorMessage(err?.message || String(err)));
    const errorResponse = new NextResponse(
      'Failed to upsert GoogleCalendarConnection in database.',
      { status: 500, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    );
    return clearStateCookie(errorResponse);
  }

  // STEP G: Successful completion
  console.log('OAUTH_CALLBACK_STEP=G passed: full authorization & persistence complete\n');

  const successHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Google Calendar Authorization Successful</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      background: #f8fafc;
      color: #1e293b;
      padding: 1rem;
    }
    .card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 2.5rem 2rem;
      text-align: center;
      max-width: 460px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
    }
    .icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: #ecfdf5;
      color: #059669;
      font-size: 24px;
      margin-bottom: 1rem;
    }
    h1 {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0 0 0.5rem 0;
      color: #0f172a;
    }
    p {
      font-size: 0.9375rem;
      color: #64748b;
      margin: 0 0 0.5rem 0;
      line-height: 1.5;
    }
    .meta {
      font-size: 0.8125rem;
      color: #94a3b8;
      margin-top: 1rem;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">✓</div>
    <h1>Google Calendar authorization successful.</h1>
    <p>Your Google Calendar connection has been authorized and securely encrypted in the database.</p>
    <div class="meta">You can close this window.</div>
  </div>
</body>
</html>`;

  const successResponse = new NextResponse(successHtml, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });

  return clearStateCookie(successResponse);
}
