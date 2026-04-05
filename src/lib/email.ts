import sgMail from '@sendgrid/mail';

function getSgMail() {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || 'placeholder');
  return sgMail;
}

const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@firstchoicecyber.com';
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'hello@firstchoicecyber.com';

export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string;
  type: string;
  message: string;
}) {
  await getSgMail().send({
    from: FROM_EMAIL,
    to: OWNER_EMAIL,
    subject: `New Contact: ${data.name} — ${data.type === 'home' ? 'Home' : 'Business'}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
      <p><strong>Type:</strong> ${data.type}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  });
}

export async function sendContactConfirmation(data: {
  name: string;
  email: string;
}) {
  await getSgMail().send({
    from: FROM_EMAIL,
    to: data.email,
    subject: 'Thanks for reaching out — First Choice Cyber',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Hi ${data.name},</h2>
        <p>Thanks for reaching out to First Choice Cyber! We've received your message and will get back to you within 24 hours.</p>
        <p>In the meantime, feel free to <a href="https://firstchoicecyber.com/how-it-works">learn how our process works</a> or <a href="https://firstchoicecyber.com/services">explore our services</a>.</p>
        <p>Talk soon,<br/>The First Choice Cyber Team</p>
        <hr/>
        <p style="color: #64748B; font-size: 14px;">First Choice Cyber | Personal IT for AI | Los Angeles & Central Valley</p>
      </div>
    `,
  });
}

export async function sendQuoteNotification(data: Record<string, unknown>) {
  await getSgMail().send({
    from: FROM_EMAIL,
    to: OWNER_EMAIL,
    subject: `New Quote Request: ${data.name as string} — ${data.type as string}`,
    html: `
      <h2>New Quote Request</h2>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    `,
  });
}

export async function sendQuoteConfirmation(data: {
  name: string;
  email: string;
}) {
  await getSgMail().send({
    from: FROM_EMAIL,
    to: data.email,
    subject: 'Quote Request Received — First Choice Cyber',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Hi ${data.name},</h2>
        <p>We've received your quote request! Here's what happens next:</p>
        <ol>
          <li>We review your request within 24 hours</li>
          <li>We'll reach out to schedule a discovery call</li>
          <li>You'll receive a custom proposal within 48 hours of the call</li>
        </ol>
        <p>Talk soon,<br/>The First Choice Cyber Team</p>
        <hr/>
        <p style="color: #64748B; font-size: 14px;">First Choice Cyber | Personal IT for AI | Los Angeles & Central Valley</p>
      </div>
    `,
  });
}

export async function sendNewsletterConfirmation(email: string) {
  await getSgMail().send({
    from: FROM_EMAIL,
    to: email,
    subject: "You're on the list! — First Choice Cyber",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome aboard!</h2>
        <p>You're now subscribed to AI tips and updates from First Choice Cyber. We send practical, no-fluff AI content weekly.</p>
        <p>— The First Choice Cyber Team</p>
      </div>
    `,
  });
}
