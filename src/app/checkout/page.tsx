'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { CheckCircle2, AlertCircle, ShoppingBag, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface CheckoutData {
  serviceSlug: string;
  serviceTitle: string;
  packageName: string;
  packagePrice: string;
  packagePriceNumeric: number;
  booking: Record<string, string>;
}

const fieldLabels: Record<string, string> = {
  firstName: 'First Name',
  lastName: 'Last Name',
  email: 'Email',
  phone: 'Phone',
  address: 'Address',
  preferredDate: 'Preferred Date',
  preferredTime: 'Preferred Time',
  notes: 'Notes',
  devices: 'Current Devices',
  householdSize: 'Household Size',
  businessName: 'Business Name',
  industry: 'Industry',
  employeeCount: 'Employees',
  automationGoal: 'Automation Goal',
  experienceLevel: 'Experience Level',
  attendeeCount: 'Attendees',
  issueDescription: 'Issue Description',
};

export default function CheckoutPage() {
  const router = useRouter();
  const [data, setData] = useState<CheckoutData | null>(null);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const raw = sessionStorage.getItem('pendingBooking');
    if (!raw) {
      router.replace('/services');
      return;
    }
    setData(JSON.parse(raw) as CheckoutData);
  }, [router]);

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '';

  if (!data) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#06B6D4]" />
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-10 text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Booking Confirmed!</h1>
          <p className="text-[#64748B] mb-1">
            <strong>{data.serviceTitle} — {data.packageName}</strong>
          </p>
          <p className="text-[#64748B] mb-6">{message}</p>
          <Button asChild className="bg-[#06B6D4] hover:bg-[#0891B2] text-white font-semibold w-full">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const bookingRows = Object.entries(data.booking).filter(
    ([, v]) => v && v.toString().trim()
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] section-padding">
      <div className="container-wide max-w-4xl">
        {/* Heading */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-[#06B6D4] uppercase tracking-wider mb-1">
            Almost there
          </p>
          <h1 className="text-4xl font-extrabold text-[#0F172A]">Review &amp; Pay</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left — booking summary */}
          <div className="lg:col-span-3 space-y-6">
            {/* Order summary card */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="bg-[#0F172A] px-6 py-4 flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#06B6D4]" />
                <h2 className="text-white font-bold">Order Summary</h2>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-bold text-[#0F172A] text-lg">{data.packageName}</p>
                    <p className="text-[#64748B] text-sm">{data.serviceTitle}</p>
                  </div>
                  <p className="text-2xl font-extrabold text-[#0F172A]">{data.packagePrice}</p>
                </div>
                <div className="border-t border-slate-100 pt-4 flex justify-between">
                  <span className="font-semibold text-[#0F172A]">Total due today</span>
                  <span className="font-extrabold text-xl text-[#06B6D4]">{data.packagePrice}</span>
                </div>
              </div>
            </div>

            {/* Booking details card */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h2 className="font-bold text-[#0F172A]">Your Booking Details</h2>
              </div>
              <div className="p-6">
                <dl className="space-y-3">
                  {bookingRows.map(([key, value]) => (
                    <div key={key} className="flex gap-3">
                      <dt className="text-sm font-medium text-[#64748B] w-36 flex-shrink-0">
                        {fieldLabels[key] ?? key}
                      </dt>
                      <dd className="text-sm text-[#0F172A] font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
                <button
                  onClick={() => router.back()}
                  className="mt-5 text-sm text-[#06B6D4] hover:underline"
                >
                  ← Edit booking details
                </button>
              </div>
            </div>
          </div>

          {/* Right — payment */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden sticky top-24">
              <div className="bg-[#0F172A] px-6 py-4">
                <h2 className="text-white font-bold">Secure Payment</h2>
                <p className="text-slate-400 text-xs mt-0.5">Powered by PayPal</p>
              </div>
              <div className="p-6">
                {status === 'error' && (
                  <div className="flex items-start gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <p>{message}</p>
                  </div>
                )}

                {status === 'processing' && (
                  <div className="flex items-center justify-center gap-2 text-[#64748B] py-4">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-sm">Confirming your booking…</span>
                  </div>
                )}

                {status !== 'processing' && clientId && (
                  <PayPalScriptProvider
                    options={{ clientId, currency: 'USD', intent: 'capture' }}
                  >
                    <PayPalButtons
                      style={{ layout: 'vertical', shape: 'rect', color: 'blue' }}
                      createOrder={async () => {
                        const res = await fetch('/api/paypal/create-order', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            amount: data.packagePriceNumeric.toFixed(2),
                            productName: `${data.serviceTitle} — ${data.packageName}`,
                            productSlug: data.serviceSlug,
                          }),
                        });
                        const order = await res.json();
                        return order.id;
                      }}
                      onApprove={async (paypalData) => {
                        setStatus('processing');
                        // Capture the payment
                        const captureRes = await fetch('/api/paypal/capture-order', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            orderId: paypalData.orderID,
                            productSlug: data.serviceSlug,
                          }),
                        });
                        const capture = await captureRes.json();

                        if (!capture.success && captureRes.status !== 200) {
                          setStatus('error');
                          setMessage('Payment could not be completed. Please try again.');
                          return;
                        }

                        // Send booking confirmation emails
                        const confirmRes = await fetch('/api/booking/confirm', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            serviceTitle: data.serviceTitle,
                            packageName: data.packageName,
                            packagePrice: data.packagePrice,
                            paypalOrderId: paypalData.orderID,
                            booking: data.booking,
                          }),
                        });

                        sessionStorage.removeItem('pendingBooking');

                        if (confirmRes.ok) {
                          setStatus('success');
                          setMessage(
                            'Check your email for your booking confirmation. We\'ll be in touch within 24 hours to confirm your appointment.'
                          );
                        } else {
                          // Payment succeeded but email failed — still show success
                          setStatus('success');
                          setMessage(
                            'Payment received! Please check your email. If you don\'t receive a confirmation, contact us at 1stchoicecyber@gmail.com'
                          );
                        }
                      }}
                      onError={() => {
                        setStatus('error');
                        setMessage(
                          'Something went wrong with the payment. Please try again or contact support.'
                        );
                      }}
                    />
                  </PayPalScriptProvider>
                )}

                {!clientId && (
                  <p className="text-sm text-[#64748B] text-center py-4">
                    PayPal is not configured yet. Contact us to complete your booking.
                  </p>
                )}

                <p className="text-xs text-slate-400 text-center mt-4">
                  🔒 Payments processed securely by PayPal. We never store card details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
