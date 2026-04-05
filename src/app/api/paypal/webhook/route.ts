import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/paypal';

export async function POST(request: NextRequest) {
  const rawBody = await request.text();

  // Verify signature in production; skip in dev with placeholder webhook ID
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  if (webhookId && webhookId !== 'placeholder') {
    const isValid = await verifyWebhookSignature({
      authAlgo: request.headers.get('PAYPAL-AUTH-ALGO') ?? '',
      certUrl: request.headers.get('PAYPAL-CERT-URL') ?? '',
      transmissionId: request.headers.get('PAYPAL-TRANSMISSION-ID') ?? '',
      transmissionSig: request.headers.get('PAYPAL-TRANSMISSION-SIG') ?? '',
      transmissionTime: request.headers.get('PAYPAL-TRANSMISSION-TIME') ?? '',
      webhookId,
      rawBody,
    });

    if (!isValid) {
      console.warn('PayPal webhook signature verification failed');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
  }

  let event: { event_type: string; resource?: Record<string, unknown> };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  try {
    switch (event.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        console.log('Payment capture completed:', event.resource?.id);
        // TODO: update order status in DB, trigger download link delivery
        break;

      case 'PAYMENT.CAPTURE.DENIED':
        console.warn('Payment capture denied:', event.resource?.id);
        break;

      case 'BILLING.SUBSCRIPTION.ACTIVATED':
        console.log('Subscription activated:', event.resource?.id);
        // TODO: provision membership access
        break;

      case 'BILLING.SUBSCRIPTION.CANCELLED':
        console.log('Subscription cancelled:', event.resource?.id);
        // TODO: revoke membership access
        break;

      case 'BILLING.SUBSCRIPTION.SUSPENDED':
        console.log('Subscription suspended:', event.resource?.id);
        break;

      case 'BILLING.SUBSCRIPTION.PAYMENT.FAILED':
        console.warn('Subscription payment failed:', event.resource?.id);
        // TODO: notify customer
        break;

      default:
        console.log('Unhandled PayPal webhook event:', event.event_type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: 'Handler error' }, { status: 500 });
  }
}
