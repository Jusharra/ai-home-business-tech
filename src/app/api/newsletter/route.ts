import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendNewsletterConfirmation } from '@/lib/email';

const newsletterSchema = z.object({
  email: z.string().email(),
  honeypot: z.string().max(0).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = newsletterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const { email, honeypot } = parsed.data;
    if (honeypot) return NextResponse.json({ success: true });

    await sendNewsletterConfirmation(email);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
