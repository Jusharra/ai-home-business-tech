import { NextRequest, NextResponse } from 'next/server';
import {
  sendBookingOwnerNotification,
  sendBookingCustomerConfirmation,
} from '@/lib/email';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { serviceTitle, packageName, packagePrice, paypalOrderId, booking } = body as {
    serviceTitle: string;
    packageName: string;
    packagePrice: string;
    paypalOrderId: string;
    booking: Record<string, string>;
  };

  try {
    await Promise.all([
      sendBookingOwnerNotification({
        serviceTitle,
        packageName,
        packagePrice,
        paypalOrderId,
        booking,
      }),
      sendBookingCustomerConfirmation({
        serviceTitle,
        packageName,
        packagePrice,
        firstName: booking.firstName ?? 'Customer',
        email: booking.email,
        preferredDate: booking.preferredDate ?? '',
        preferredTime: booking.preferredTime ?? '',
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Booking confirm email error:', err);
    return NextResponse.json({ success: false, error: 'Email sending failed' }, { status: 500 });
  }
}
