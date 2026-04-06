import { NextRequest, NextResponse } from 'next/server';
import { captureOrder } from '@/lib/paypal';
import { sendDigitalDeliveryEmail } from '@/lib/email';
import { getProductBySlug } from '@/data/products';

export async function POST(request: NextRequest) {
  try {
    const { orderId, productSlug } = await request.json();

    if (!orderId) {
      return NextResponse.json({ error: 'Missing orderId' }, { status: 400 });
    }

    const capture = await captureOrder(orderId);

    if (capture.status === 'COMPLETED') {
      const product = productSlug ? getProductBySlug(productSlug) : null;

      // Send digital delivery email if product has a download file
      if (product?.downloadUrl) {
        const buyerEmail: string = capture.payer?.email_address ?? '';
        const firstName: string = capture.payer?.name?.given_name ?? 'there';

        if (buyerEmail) {
          await sendDigitalDeliveryEmail({
            buyerEmail,
            buyerName: firstName,
            productTitle: product.title,
            downloadUrl: product.downloadUrl,
          });
        }
      }

      return NextResponse.json({
        success: true,
        downloadUrl: product?.downloadUrl ?? null,
        productSlug,
      });
    }

    return NextResponse.json({ error: 'Payment not completed' }, { status: 400 });
  } catch (error) {
    console.error('Capture order error:', error);
    return NextResponse.json({ error: 'Could not capture payment.' }, { status: 500 });
  }
}
