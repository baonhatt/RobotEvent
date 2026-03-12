import dotenv from 'dotenv';
import express from 'express';
import { Resend } from 'resend';

dotenv.config();
dotenv.config({ path: '.env.local', override: true });

const app = express();
const port = Number(process.env.PORT || 3001);

app.use(express.json());

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

app.get('/api/health', (_req, res) => {
  res.status(200).json({ ok: true });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body ?? {};

  const cleanName = typeof name === 'string' ? name.trim() : '';
  const cleanEmail = typeof email === 'string' ? email.trim() : '';
  const cleanPhone = typeof phone === 'string' ? phone.trim() : '';
  const cleanMessage = typeof message === 'string' ? message.trim() : '';

  if (!cleanName || !cleanEmail || !cleanPhone || !cleanMessage) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (!isValidEmail(cleanEmail)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  if (cleanMessage.length > 5000) {
    return res.status(400).json({ error: 'Message is too long.' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  const missingEnv = [
    !resendApiKey ? 'RESEND_API_KEY' : null,
    !toEmail ? 'CONTACT_TO_EMAIL' : null,
    !fromEmail ? 'CONTACT_FROM_EMAIL' : null,
  ].filter((value): value is string => Boolean(value));

  if (missingEnv.length > 0) {
    return res.status(500).json({
      error: `Server is not configured. Missing: ${missingEnv.join(', ')}.`,
    });
  }

  try {
    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: cleanEmail,
      subject: `New contact form submission from ${cleanName}`,
      text: [
        `Name: ${cleanName}`,
        `Email: ${cleanEmail}`,
        `Phone: ${cleanPhone}`,
        '',
        'Message:',
        cleanMessage,
      ].join('\n'),
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(cleanPhone)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(cleanMessage).replace(/\n/g, '<br/>')}</p>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
});

app.listen(port, () => {
  console.log(`Contact API listening on http://localhost:${port}`);
});
