'use client';

import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface PayPalSubscribeButtonProps {
  planId: string;
  planName: string;
}

export function PayPalSubscribeButton({ planId, planName }: PayPalSubscribeButtonProps) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '';
  if (!clientId) return null;

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-green-600 bg-green-50 border border-green-200 rounded-lg p-4">
        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
        <div>
          <p className="font-medium">Welcome to {planName}!</p>
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
        vault: true,
        intent: 'subscription',
      }}
    >
      <PayPalButtons
        style={{ layout: 'vertical', shape: 'rect', color: 'blue' }}
        createSubscription={(_data, actions) => {
          return actions.subscription.create({ plan_id: planId });
        }}
        onApprove={(data) => {
          setStatus('success');
          setMessage(`Subscription ${data.subscriptionID} is active. Check your email for details.`);
          return Promise.resolve();
        }}
        onError={() => {
          setStatus('error');
          setMessage('Subscription could not be set up. Please try again or contact support.');
        }}
      />
    </PayPalScriptProvider>
  );
}
