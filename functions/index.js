const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

admin.initializeApp();

const runtimeConfig = functions.config() || {};

const SITE_URL =
  process.env.PUBLIC_SITE_URL ||
  runtimeConfig.public?.site_url ||
  'https://sangeetsaadhna.org';
const ALLOWED_ORIGIN =
  process.env.CONTACT_ALLOWED_ORIGIN ||
  runtimeConfig.contact?.allowed_origin ||
  '*';

exports.contactForm = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      status: 'error',
      message: 'Method not allowed',
    });
  }

  const payload = normalizePayload(req.body || {});

  if (!payload.email && !payload.message) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing required fields.',
    });
  }

  const sendgridKey = process.env.SENDGRID_API_KEY || runtimeConfig.sendgrid?.key;
  const inbox =
    process.env.RSVP_INBOX ||
    runtimeConfig.sendgrid?.inbox ||
    runtimeConfig.contact?.inbox;

  if (!sendgridKey || !inbox) {
    functions.logger.error('SendGrid configuration missing');
    return res.status(500).json({
      status: 'error',
      message: 'Email service not configured.',
    });
  }

  try {
    sgMail.setApiKey(sendgridKey);
    await sgMail.send({
      to: inbox,
      from: inbox,
      subject: payload.subject
        ? `Sangeet Saadhna contact: ${payload.subject}`
        : 'New contact submission',
      replyTo: payload.email || inbox,
      text: buildPlainTextBody(payload, SITE_URL),
      html: buildHtmlBody(payload, SITE_URL),
    });

    functions.logger.info('Contact email sent');

    return res.status(202).json({
      status: 'queued',
      message: 'Thank you for reaching out! We will connect with you shortly.',
    });
  } catch (error) {
    functions.logger.error('Failed to send contact email', error);
    return res.status(500).json({
      status: 'error',
      message: 'We could not send your message right now. Please try again later.',
    });
  }
});

function normalizePayload(body) {
  return {
    name: asString(body.name),
    email: asString(body.email),
    subject: asString(body.subject),
    message: asString(body.message),
    interest: asString(body.interest),
    submittedAt: new Date().toISOString(),
  };
}

function asString(value) {
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  return '';
}

function buildPlainTextBody(payload, siteUrl) {
  return `New contact submission from ${payload.name || 'Anonymous'}

Email: ${payload.email || 'Not provided'}
Interest: ${payload.interest || 'Not specified'}
Submitted: ${payload.submittedAt}

Message:
${payload.message || '(No message provided)'}

View site: ${siteUrl}`;
}

function buildHtmlBody(payload, siteUrl) {
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

function escapeHtml(value) {
  if (!value) return '';
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
