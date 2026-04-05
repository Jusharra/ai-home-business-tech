import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendQuoteNotification, sendQuoteConfirmation } from '@/lib/email';

const quoteSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  type: z.enum(['home', 'business']),
  companyName: z.string().optional(),
  employeeCount: z.string().optional(),
  services: z.array(z.string()).min(1),
  needs: z.string().min(10),
  budget: z.string(),
  contactMethod: z.enum(['email', 'phone', 'text']),
  referralSource: z.string(),
  honeypot: z.string().max(0).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = quoteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
    }

    const data = parsed.data;

    if (data.honeypot) {
      return NextResponse.json({ success: true });
    }

    await Promise.all([
      sendQuoteNotification(data as Record<string, unknown>),
      sendQuoteConfirmation({ name: data.name, email: data.email }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Quote form error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
