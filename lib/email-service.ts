import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';
import { normalizeSlotTime } from '@/lib/booking-service';

export interface EmailServiceConfig {
  apiKey?: string;
  fromEmail?: string;
  internalEmail?: string;
  isConfigured: boolean;
}

export function getEmailConfig(): EmailServiceConfig {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail = process.env.DEMO_BOOKING_FROM_EMAIL?.trim();
  const internalEmail = process.env.DEMO_BOOKING_INTERNAL_EMAIL?.trim();
  const isConfigured = Boolean(apiKey && fromEmail);
  return { apiKey, fromEmail, internalEmail, isConfigured };
}

/**
 * Escapes unsafe characters to prevent HTML/XSS injection in email templates.
 */
export function escapeHtml(unsafe: string): string {
  return String(unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Formats a YYYY-MM-DD date into a friendly format (e.g. Thursday, October 15, 2026).
 */
export function formatFriendlyDate(dateStr: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  const [y, m, d] = dateStr.split('-').map(Number);
  const dateObj = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  return dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/**
 * Formats time string into 12-hr AM/PM IST format.
 */
export function formatFriendlyTime(timeStr: string): string {
  const normalized = normalizeSlotTime(timeStr) || timeStr;
  if (/^\d{2}:\d{2}$/.test(normalized)) {
    const [h, m] = normalized.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    let h12 = h % 12;
    if (h12 === 0) h12 = 12;
    const padH = String(h12).padStart(2, '0');
    const padM = String(m).padStart(2, '0');
    return `${padH}:${padM} ${period} IST`;
  }
  return `${timeStr} IST`;
}

export interface CustomerEmailData {
  customerName: string;
  customerEmail: string;
  businessName: string;
  date: string;
  time: string;
  googleMeetUrl: string;
  bookingReference: string;
}

export interface InternalEmailData {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  businessName: string;
  locations?: string;
  notes?: string;
  date: string;
  time: string;
  googleMeetUrl: string;
  bookingReference: string;
}

/**
 * Generates customer confirmation email content (HTML and plain text).
 */
export function getCustomerEmailTemplates(data: CustomerEmailData): {
  subject: string;
  html: string;
  text: string;
} {
  const safeName = escapeHtml(data.customerName);
  const safeBusiness = escapeHtml(data.businessName || 'your salon');
  const friendlyDate = formatFriendlyDate(data.date);
  const friendlyTime = formatFriendlyTime(data.time);
  const safeMeetUrl = escapeHtml(data.googleMeetUrl);
  const safeReference = escapeHtml(data.bookingReference);

  const subject = `Confirmed: GlowSuite Product Walkthrough (${safeReference})`;

  const text = `Hi ${data.customerName},

Your 30-minute personalized GlowSuite demo is confirmed!

Here are your meeting details:
- Date & Time: ${friendlyDate} at ${friendlyTime}
- Duration: 30 minutes
- Platform: Google Meet (Video Call)
- Booking Reference: ${data.bookingReference}
- Salon / Business: ${data.businessName}

Join Google Meet:
${data.googleMeetUrl}

We recommend joining from a desktop or laptop computer so you can comfortably view the live screen walkthrough.

If you have any questions ahead of time, simply reply to this email.

Best regards,
The GlowSuite Team
https://glowsuite.com
`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F8F9FC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #191E49;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #F8F9FC; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 580px; background-color: #FFFFFF; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(25, 30, 73, 0.06); border: 1px solid rgba(25, 30, 73, 0.08);">
          
          <!-- Header Banner -->
          <tr>
            <td style="padding: 32px 36px 24px 36px; background: linear-gradient(135deg, #191E49 0%, #2A1E4A 100%); text-align: left;">
              <span style="font-size: 20px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.02em;">Glow<span style="color: #F370C2;">Suite</span></span>
              <p style="margin: 8px 0 0 0; font-size: 13px; color: rgba(255, 255, 255, 0.75); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">Personalized Walkthrough Confirmed</p>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 36px 36px 28px 36px;">
              <h1 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 600; color: #191E49; line-height: 1.3;">
                We look forward to demonstrating GlowSuite for ${safeBusiness}.
              </h1>
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #4A5168;">
                Hi <strong>${safeName}</strong>, your 30-minute one-on-one walkthrough has been scheduled. We will guide you through salon appointment scheduling, billing &amp; POS, stylist payroll, and client retention tools.
              </p>

              <!-- Session Details Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #FBF0F9; border-radius: 16px; border: 1px solid rgba(188, 38, 155, 0.18); margin-bottom: 28px;">
                <tr>
                  <td style="padding: 24px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding-bottom: 14px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #BC269B;">
                          Meeting Details
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 10px; font-size: 14px; color: #191E49;">
                          <strong style="color: #6B7280; font-size: 13px;">Date &amp; Time:</strong><br>
                          <span style="font-size: 15px; font-weight: 600;">${friendlyDate}</span><br>
                          <span style="font-size: 14px; color: #4A5168;">${friendlyTime}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 10px; font-size: 14px; color: #191E49;">
                          <strong style="color: #6B7280; font-size: 13px;">Duration:</strong><br>
                          <span>30 minutes</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 10px; font-size: 14px; color: #191E49;">
                          <strong style="color: #6B7280; font-size: 13px;">Platform:</strong><br>
                          <span>Google Meet (Video Walkthrough)</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size: 14px; color: #191E49;">
                          <strong style="color: #6B7280; font-size: 13px;">Booking Reference:</strong><br>
                          <span style="font-family: monospace; font-size: 14px; font-weight: 700; color: #BC269B;">${safeReference}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Call to Action -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 28px; text-align: center;">
                <tr>
                  <td align="center">
                    <a href="${safeMeetUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background-color: #BC269B; color: #FFFFFF; font-size: 15px; font-weight: 600; text-decoration: none; padding: 14px 28px; border-radius: 12px; box-shadow: 0 4px 14px rgba(188, 38, 155, 0.3);">
                      Join Google Meet &rarr;
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 12px; font-size: 12px; color: #6B7280;">
                    Or paste this URL in your browser: <br>
                    <a href="${safeMeetUrl}" style="color: #BC269B; word-break: break-all;">${safeMeetUrl}</a>
                  </td>
                </tr>
              </table>

              <!-- Helpful Note -->
              <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #6B7280; padding-top: 20px; border-top: 1px solid rgba(25, 30, 73, 0.08);">
                💡 <strong>Tip:</strong> Join on a laptop or desktop computer for the best live screen-sharing experience. If you need to reschedule or forward this invite to colleagues, please reply to this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 36px; background-color: #FAFAFD; border-top: 1px solid rgba(25, 30, 73, 0.06); text-align: center; font-size: 12px; color: #8C93A8;">
              &copy; GlowSuite. All rights reserved. &bull; Salon &amp; Spa Management Platform
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, html, text };
}

/**
 * Generates internal notification email content (HTML and plain text).
 */
export function getInternalEmailTemplates(data: InternalEmailData): {
  subject: string;
  html: string;
  text: string;
} {
  const safeName = escapeHtml(data.customerName);
  const safeEmail = escapeHtml(data.customerEmail);
  const safePhone = escapeHtml(data.customerPhone || 'Not provided');
  const safeBusiness = escapeHtml(data.businessName || 'Not provided');
  const safeLocations = escapeHtml(data.locations || '1 Location');
  const safeNotes = data.notes ? escapeHtml(data.notes) : null;
  const friendlyDate = formatFriendlyDate(data.date);
  const friendlyTime = formatFriendlyTime(data.time);
  const safeMeetUrl = escapeHtml(data.googleMeetUrl);
  const safeReference = escapeHtml(data.bookingReference);

  const subject = `[New Demo] ${data.businessName || data.customerName} — ${friendlyDate} (${safeReference})`;

  const text = `New GlowSuite Product Walkthrough Booked!

Customer Details:
- Name: ${data.customerName}
- Email: ${data.customerEmail}
- Phone: ${data.customerPhone || 'Not provided'}
- Salon / Business: ${data.businessName}
- Locations: ${data.locations || '1 Location'}
${data.notes ? `- Client Notes: ${data.notes}\n` : ''}
Meeting Schedule:
- Date & Time: ${friendlyDate} at ${friendlyTime}
- Duration: 30 minutes
- Reference: ${data.bookingReference}
- Google Meet: ${data.googleMeetUrl}
`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8F9FC; padding: 24px; color: #191E49;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 580px; margin: 0 auto; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #E5E7EB; padding: 28px;">
    <tr>
      <td>
        <h2 style="margin: 0 0 16px 0; color: #191E49; font-size: 18px;">New Demo Booked: ${safeBusiness}</h2>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="6" border="0" style="font-size: 14px; margin-bottom: 20px;">
          <tr>
            <td style="color: #6B7280; width: 140px;">Contact Name:</td>
            <td style="font-weight: 600;">${safeName}</td>
          </tr>
          <tr>
            <td style="color: #6B7280;">Email:</td>
            <td><a href="mailto:${safeEmail}" style="color: #BC269B;">${safeEmail}</a></td>
          </tr>
          <tr>
            <td style="color: #6B7280;">Phone / WhatsApp:</td>
            <td>${safePhone}</td>
          </tr>
          <tr>
            <td style="color: #6B7280;">Salon / Business:</td>
            <td>${safeBusiness}</td>
          </tr>
          <tr>
            <td style="color: #6B7280;">Locations:</td>
            <td>${safeLocations}</td>
          </tr>
          ${safeNotes ? `
          <tr>
            <td style="color: #6B7280; vertical-align: top;">Client Notes:</td>
            <td style="background-color: #F9FAFB; padding: 8px; border-radius: 6px;">${safeNotes}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="color: #6B7280;">Scheduled Time:</td>
            <td style="font-weight: 600;">${friendlyDate} &bull; ${friendlyTime}</td>
          </tr>
          <tr>
            <td style="color: #6B7280;">Booking Reference:</td>
            <td style="font-family: monospace; font-weight: 700; color: #BC269B;">${safeReference}</td>
          </tr>
        </table>

        <div style="background-color: #FBF0F9; border-radius: 10px; padding: 14px; text-align: center;">
          <a href="${safeMeetUrl}" target="_blank" rel="noopener noreferrer" style="color: #BC269B; font-weight: 600; text-decoration: underline;">
            Open Google Meet Link &rarr;
          </a>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, html, text };
}

export interface DispatchNotificationResult {
  customerEmailSent: boolean;
  customerEmailId?: string;
  internalEmailSent: boolean;
  internalEmailId?: string;
}

/**
 * Dispatches customer and internal booking notification emails.
 * Executed AFTER the booking transaction is committed and advisory locks released.
 * Safe from provider failures: never crashes or rolls back confirmed bookings.
 */
export async function dispatchBookingEmails(
  booking: {
    id: string;
    date: string;
    time: string;
    googleMeetUrl: string;
    bookingReference: string;
    customerEmailSentAt?: Date | null;
    internalEmailSentAt?: Date | null;
  },
  lead: {
    name: string;
    email: string;
    phone?: string;
    salonName: string;
    locations?: string;
    notes?: string;
  },
  resendOverride?: any
): Promise<DispatchNotificationResult> {
  const config = getEmailConfig();
  const result: DispatchNotificationResult = {
    customerEmailSent: Boolean(booking.customerEmailSentAt),
    internalEmailSent: Boolean(booking.internalEmailSentAt),
  };

  // If no override provided and not configured, log safe notice and return
  if (!resendOverride && !config.isConfigured) {
    console.warn('[EmailService] RESEND_API_KEY or DEMO_BOOKING_FROM_EMAIL not configured; skipping email dispatch.');
    return result;
  }

  const resend = resendOverride || new Resend(config.apiKey);
  const fromEmail = config.fromEmail || 'GlowSuite <onboarding@resend.dev>';
  const internalEmail = config.internalEmail;

  // 1. Customer Confirmation Email
  if (!booking.customerEmailSentAt && lead.email) {
    try {
      const template = getCustomerEmailTemplates({
        customerName: lead.name,
        customerEmail: lead.email,
        businessName: lead.salonName,
        date: booking.date,
        time: booking.time,
        googleMeetUrl: booking.googleMeetUrl,
        bookingReference: booking.bookingReference,
      });

      const sendRes = await resend.emails.send({
        from: fromEmail,
        to: lead.email,
        subject: template.subject,
        html: template.html,
        text: template.text,
      });

      if (sendRes.error) {
        console.error('[EmailService] Customer confirmation rejected by provider:', sendRes.error.name || 'Error');
      } else if (sendRes.data?.id) {
        result.customerEmailSent = true;
        result.customerEmailId = sendRes.data.id;
        if (!booking.id.startsWith('mock_')) {
          try {
            await prisma.demoBooking.update({
              where: { id: booking.id },
              data: {
                customerEmailSentAt: new Date(),
                customerEmailId: sendRes.data.id,
              },
            });
          } catch {
            // Non-critical tracking persistence issue
          }
        }
      }
    } catch (err: any) {
      console.error('[EmailService] Failed to send customer confirmation:', err?.message || 'Unknown network error');
    }
  }

  // 2. Internal Team Notification Email (Independent of customer send)
  if (!booking.internalEmailSentAt && internalEmail) {
    try {
      const internalTemplate = getInternalEmailTemplates({
        customerName: lead.name,
        customerEmail: lead.email,
        customerPhone: lead.phone,
        businessName: lead.salonName,
        locations: lead.locations,
        notes: lead.notes,
        date: booking.date,
        time: booking.time,
        googleMeetUrl: booking.googleMeetUrl,
        bookingReference: booking.bookingReference,
      });

      const internalRes = await resend.emails.send({
        from: fromEmail,
        to: internalEmail,
        subject: internalTemplate.subject,
        html: internalTemplate.html,
        text: internalTemplate.text,
      });

      if (internalRes.error) {
        console.error('[EmailService] Internal notification rejected by provider:', internalRes.error.name || 'Error');
      } else if (internalRes.data?.id) {
        result.internalEmailSent = true;
        result.internalEmailId = internalRes.data.id;
        if (!booking.id.startsWith('mock_')) {
          try {
            await prisma.demoBooking.update({
              where: { id: booking.id },
              data: {
                internalEmailSentAt: new Date(),
                internalEmailId: internalRes.data.id,
              },
            });
          } catch {
            // Non-critical tracking persistence issue
          }
        }
      }
    } catch (err: any) {
      console.error('[EmailService] Failed to send internal notification:', err?.message || 'Unknown network error');
    }
  }

  return result;
}
