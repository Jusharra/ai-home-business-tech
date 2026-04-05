import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createOrder } from '@/lib/paypal';

const orderSchema = z.object({
  amount: z.string(),
  productName: z.string(),
  productSlug: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = orderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const order = await createOrder(parsed.data.amount, parsed.data.productName);
    return NextResponse.json(order);
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json({ error: 'Could not create order.' }, { status: 500 });
  }
}
