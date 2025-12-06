import type { APIContext } from 'astro';
import sgMail from '@sendgrid/mail';

export const prerender = false;

export async function POST({ request }: APIContext) {
  const payload = await parsePayload(request);

  console.info('Contact submission received', payload);

  const sendgridKey = import.meta.env.SENDGRID_API_KEY;
  const inbox = import.meta.env.RSVP_INBOX;
  const siteUrl = import.meta.env.PUBLIC_SITE_URL ?? 'http://localhost:4321';

  if (!sendgridKey || !inbox) {
    console.warn('SendGrid not configured. Set SENDGRID_API_KEY and RSVP_INBOX to enable email notifications.');
  } else {
    try {
      sgMail.setApiKey(sendgridKey);

      await sgMail.send({
        to: inbox,
        from: inbox,
        subject: payload.subject ? `Sangeet Saadhna contact: ${payload.subject}` : 'New contact submission',
        replyTo: payload.email || inbox,
        text: buildPlainTextBody(payload, siteUrl),
        html: buildHtmlBody(payload, siteUrl),
      });

      console.info('Contact email sent via SendGrid');
    } catch (error) {
      console.error('Failed to send contact email via SendGrid', error);
      return new Response(
        JSON.stringify({
          status: 'error',
          message: 'Unable to send your message right now. Please try again later.',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }
  }

  // TODO: Persist payload to Firebase / SendGrid using server-side integration.

  return new Response(
    JSON.stringify({
      status: 'queued',
      message: 'Thank you for reaching out! We will connect with you shortly.',
    }),
    {
      status: 202,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

async function parsePayload(request: Request) {
  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    const json = await request.json();
    return normalizePayload(json);
  }

  const form = await request.formData();
  const data: Record<string, unknown> = {};
  for (const [key, value] of form.entries()) {
    data[key] = value;
  }
  return normalizePayload(data);
}

function normalizePayload(data: Record<string, unknown>) {
  return {
    name: asString(data.name),
    email: asString(data.email),
    subject: asString(data.subject),
    message: asString(data.message),
    interest: asString(data.interest),
    submittedAt: new Date().toISOString(),
  };
}

function asString(value: unknown) {
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  return '';
}

function buildPlainTextBody(payload: Record<string, string>, siteUrl: string) {
  return `New contact submission from ${payload.name || 'Anonymous'}

Email: ${payload.email || 'Not provided'}
Interest: ${payload.interest || 'Not specified'}
Submitted: ${payload.submittedAt}

Message:
${payload.message || '(No message provided)'}

View site: ${siteUrl}`;
}

function buildHtmlBody(payload: Record<string, string>, siteUrl: string) {
  return `
    <p><strong>New contact submission</strong></p>
    <ul>
      <li><strong>Name:</strong> ${escapeHtml(payload.name)}</li>
      <li><strong>Email:</strong> ${escapeHtml(payload.email)}</li>
      <li><strong>Interest:</strong> ${escapeHtml(payload.interest)}</li>
      <li><strong>Submitted:</strong> ${escapeHtml(payload.submittedAt)}</li>
    </ul>
    <p><strong>Message</strong></p>
    <p>${escapeHtml(payload.message).replace(/\n/g, '<br />')}</p>
    <p><a href="${siteUrl}">Open the website</a></p>
  `;
}

function escapeHtml(value: string) {
  if (!value) return '';
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
