import type { APIContext } from 'astro';

export const prerender = false;

export async function POST({ request }: APIContext) {
  const form = await request.formData();

  const payload = {
    name: String(form.get('name') ?? ''),
    email: String(form.get('email') ?? ''),
    subject: String(form.get('subject') ?? ''),
    message: String(form.get('message') ?? ''),
    interest: String(form.get('interest') ?? ''),
    submittedAt: new Date().toISOString(),
  };

  console.info('Contact submission received', payload);

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

