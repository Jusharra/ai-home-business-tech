import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendContactNotification, sendContactConfirmation } from '@/lib/email';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  type: z.enum(['home', 'business']),
  message: z.string().min(10),
  honeypot: z.string().max(0).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
    }

    const data = parsed.data;

    // Honeypot check
    if (data.honeypot) {
      return NextResponse.json({ success: true });
    }

    await Promise.all([
      sendContactNotification(data),
      sendContactConfirmation({ name: data.name, email: data.email }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
