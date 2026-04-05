'use client';

import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface PayPalButtonProps {
  amount: number;
  productName: string;
  productSlug: string;
  onSuccess?: (downloadUrl: string) => void;
}

export function PayPalButton({ amount, productName, productSlug, onSuccess }: PayPalButtonProps) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '';
  if (!clientId) return null;

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-green-600 bg-green-50 border border-green-200 rounded-lg p-4">
        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
        <div>
          <p className="font-medium">Payment successful!</p>
          <p className="text-sm text-green-700">{message}</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg p-4">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm">{message}</p>
      </div>
    );
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId,
        currency: 'USD',
        intent: 'capture',
      }}
    >
      <PayPalButtons
        style={{ layout: 'vertical', shape: 'rect', color: 'blue' }}
        createOrder={async () => {
          const res = await fetch('/api/paypal/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              amount: amount.toFixed(2),
              productName,
              productSlug,
            }),
          });
          const data = await res.json();
          return data.id;
        }}
        onApprove={async (data) => {
          const res = await fetch('/api/paypal/capture-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: data.orderID,
              productSlug,
            }),
          });
          const capture = await res.json();
          if (capture.success) {
            setStatus('success');
            setMessage('Check your email for your download link.');
            onSuccess?.(capture.downloadUrl);
          } else {
            setStatus('error');
            setMessage('Payment could not be completed. Please try again.');
          }
        }}
        onError={() => {
          setStatus('error');
          setMessage('Something went wrong. Please try again or contact support.');
        }}
      />
    </PayPalScriptProvider>
  );
}
