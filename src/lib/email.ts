import sgMail from '@sendgrid/mail';

function getSgMail() {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || 'placeholder');
  return sgMail;
}

const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@firstchoicecyber.com';
const OWNER_EMAIL = process.env.OWNER_EMAIL || '1stchoicecyber@gmail.com';

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

// ─── Booking emails (sent after PayPal payment) ───────────────────────────────

function bookingRow(label: string, value: string) {
  return `<tr>
    <td style="padding:8px 12px;font-weight:600;color:#374151;width:42%;border-bottom:1px solid #F1F5F9;">${label}</td>
    <td style="padding:8px 12px;color:#6B7280;border-bottom:1px solid #F1F5F9;">${value || '—'}</td>
  </tr>`;
}

function brandHeader(title: string, subtitle: string) {
  return `<div style="background:#0F172A;padding:32px;text-align:center;">
    <p style="color:#06B6D4;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin:0 0 8px;">First Choice Cyber</p>
    <h1 style="color:#ffffff;font-size:22px;font-weight:800;margin:0 0 6px;">${title}</h1>
    <p style="color:#94A3B8;font-size:14px;margin:0;">${subtitle}</p>
  </div>`;
}

function priceBadge(price: string) {
  return `<div style="background:#06B6D4;padding:14px;text-align:center;">
    <span style="color:#ffffff;font-size:26px;font-weight:800;">${price}</span>
    <span style="color:rgba(255,255,255,0.8);font-size:13px;margin-left:8px;">· Payment confirmed via PayPal</span>
  </div>`;
}

export async function sendBookingOwnerNotification(data: {
  serviceTitle: string;
  packageName: string;
  packagePrice: string;
  paypalOrderId: string;
  booking: Record<string, string>;
}) {
  const { serviceTitle, packageName, packagePrice, paypalOrderId, booking } = data;

  const fieldLabels: Record<string, string> = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    preferredDate: 'Preferred Date',
    preferredTime: 'Preferred Time',
    notes: 'Additional Notes',
    devices: 'Current Devices',
    householdSize: 'Household Size',
    businessName: 'Business Name',
    industry: 'Industry',
    employeeCount: 'Employee Count',
    automationGoal: 'Automation Goal',
    experienceLevel: 'Experience Level',
    attendeeCount: 'Number of Attendees',
    issueDescription: 'Issue Description',
  };

  const rows = Object.entries(booking)
    .filter(([, v]) => v && v.toString().trim())
    .map(([k, v]) => bookingRow(fieldLabels[k] ?? k, v.toString()))
    .join('');

  await getSgMail().send({
    from: FROM_EMAIL,
    to: OWNER_EMAIL,
    subject: `New Booking: ${serviceTitle} — ${packageName} (${packagePrice})`,
    html: `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#F8FAFC;margin:0;padding:20px;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
        ${brandHeader('New Booking Received!', `${serviceTitle} — ${packageName}`)}
        ${priceBadge(packagePrice)}
        <div style="padding:28px;">
          <h2 style="color:#0F172A;font-size:16px;font-weight:700;margin:0 0 12px;text-transform:uppercase;letter-spacing:0.5px;">Booking Details</h2>
          <table style="width:100%;border-collapse:collapse;background:#F8FAFC;border-radius:8px;overflow:hidden;">${rows}</table>
          <p style="margin:20px 0 0;color:#64748B;font-size:13px;">PayPal Order ID: <strong>${paypalOrderId}</strong></p>
        </div>
        <div style="background:#F1F5F9;padding:16px;text-align:center;">
          <p style="color:#94A3B8;font-size:12px;margin:0;">First Choice Cyber · Los Angeles &amp; Central Valley</p>
        </div>
      </div>
    </body></html>`,
  });
}

export async function sendBookingCustomerConfirmation(data: {
  serviceTitle: string;
  packageName: string;
  packagePrice: string;
  firstName: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
}) {
  const { serviceTitle, packageName, packagePrice, firstName, email, preferredDate, preferredTime } = data;

  await getSgMail().send({
    from: FROM_EMAIL,
    to: email,
    subject: `Booking Confirmed — ${serviceTitle} | First Choice Cyber`,
    html: `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#F8FAFC;margin:0;padding:20px;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
        ${brandHeader('Your Booking is Confirmed!', `Thank you, ${firstName}. We\'ll be in touch soon.`)}
        ${priceBadge(packagePrice)}
        <div style="padding:28px;">
          <h2 style="color:#0F172A;font-size:16px;font-weight:700;margin:0 0 12px;">What You Booked</h2>
          <table style="width:100%;border-collapse:collapse;background:#F8FAFC;border-radius:8px;overflow:hidden;">
            ${bookingRow('Service', serviceTitle)}
            ${bookingRow('Package', packageName)}
            ${bookingRow('Preferred Date', preferredDate)}
            ${bookingRow('Preferred Time', preferredTime)}
          </table>
          <div style="background:#EFF6FF;border-left:4px solid #06B6D4;padding:16px;border-radius:0 8px 8px 0;margin:24px 0 0;">
            <p style="margin:0;color:#0F172A;font-size:14px;font-weight:600;">What happens next?</p>
            <p style="margin:8px 0 0;color:#64748B;font-size:14px;">We'll review your booking and reach out within 24 hours to confirm your appointment date and time. If you need to reach us sooner, reply to this email.</p>
          </div>
        </div>
        <div style="background:#F1F5F9;padding:16px;text-align:center;">
          <p style="color:#94A3B8;font-size:12px;margin:0;">First Choice Cyber · Los Angeles &amp; Central Valley · <a href="mailto:${OWNER_EMAIL}" style="color:#06B6D4;">${OWNER_EMAIL}</a></p>
        </div>
      </div>
    </body></html>`,
  });
}

export async function sendDigitalDeliveryEmail(data: {
  buyerEmail: string;
  buyerName: string;
  productTitle: string;
  downloadUrl: string;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://firstchoicecyber.com';
  const fullDownloadUrl = `${siteUrl}${data.downloadUrl}`;

  await getSgMail().send({
    from: FROM_EMAIL,
    to: data.buyerEmail,
    subject: `Your download is ready — ${data.productTitle}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #0F172A;">
        <div style="background: #0F172A; padding: 28px 32px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: #06B6D4; font-size: 22px; margin: 0;">First Choice Cyber</h1>
          <p style="color: #94A3B8; margin: 4px 0 0; font-size: 14px;">Your purchase is confirmed</p>
        </div>
        <div style="background: #F8FAFC; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #E2E8F0; border-top: none;">
          <p style="font-size: 16px; margin: 0 0 8px;">Hi ${data.buyerName},</p>
          <p style="color: #475569; margin: 0 0 24px;">Thank you for your purchase! Your digital product is ready to download.</p>

          <div style="background: white; border: 1px solid #E2E8F0; border-radius: 10px; padding: 20px; margin-bottom: 24px;">
            <p style="font-size: 13px; color: #64748B; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.05em;">Product</p>
            <p style="font-size: 18px; font-weight: 700; margin: 0 0 20px;">${data.productTitle}</p>
            <a href="${fullDownloadUrl}"
               style="display: inline-block; background: #06B6D4; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 16px;">
              Download Your Files
            </a>
          </div>

          <p style="font-size: 13px; color: #94A3B8; margin: 0 0 4px;">Download link:</p>
          <p style="font-size: 13px; color: #64748B; word-break: break-all; margin: 0 0 24px;">${fullDownloadUrl}</p>

          <p style="font-size: 13px; color: #64748B; margin: 0;">
            Questions? Reply to this email or contact us at
            <a href="mailto:1stchoicecyber@gmail.com" style="color: #06B6D4;">1stchoicecyber@gmail.com</a>
          </p>
          <p style="font-size: 13px; color: #94A3B8; margin: 8px 0 0;">— The First Choice Cyber Team</p>
        </div>
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
