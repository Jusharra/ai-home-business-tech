import { NextRequest, NextResponse } from 'next/server';
import { captureOrder } from '@/lib/paypal';

export async function POST(request: NextRequest) {
  try {
    const { orderId, productSlug, buyerEmail } = await request.json();

    if (!orderId) {
      return NextResponse.json({ error: 'Missing orderId' }, { status: 400 });
    }

    const capture = await captureOrder(orderId);

    if (capture.status === 'COMPLETED') {
      // In production: generate download token, send email with download link
      // For now, return success with a placeholder download URL
      return NextResponse.json({
        success: true,
        downloadUrl: `/api/download/placeholder-token`,
        productSlug,
      });
    }

    return NextResponse.json({ error: 'Payment not completed' }, { status: 400 });
  } catch (error) {
    console.error('Capture order error:', error);
    return NextResponse.json({ error: 'Could not capture payment.' }, { status: 500 });
  }
}
