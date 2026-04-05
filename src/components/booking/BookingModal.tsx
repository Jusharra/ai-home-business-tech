'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── Schemas ──────────────────────────────────────────────────────────────────

const base = {
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email address required'),
  phone: z.string().min(10, 'Valid phone number required'),
  preferredDate: z.string().min(1, 'Please select a preferred date'),
  preferredTime: z.string().min(1, 'Please select a preferred time'),
  notes: z.string().optional(),
};

const schemas = {
  'home-ai-setup': z.object({
    ...base,
    address: z.string().min(5, 'Address is required for in-person setup'),
    devices: z.string().min(2, 'Please describe your current devices'),
    householdSize: z.string().min(1, 'Please select household size'),
  }),
  'business-ai': z.object({
    ...base,
    address: z.string().min(5, 'Business address is required'),
    businessName: z.string().min(1, 'Business name is required'),
    industry: z.string().min(1, 'Industry is required'),
    employeeCount: z.string().min(1, 'Please select employee count'),
    automationGoal: z.string().min(10, 'Please describe what you want to automate'),
  }),
  'ai-training': z.object({
    ...base,
    address: z.string().optional(),
    experienceLevel: z.string().min(1, 'Please select your experience level'),
    attendeeCount: z.string().min(1, 'Please enter number of attendees'),
  }),
  'ai-support': z.object({
    ...base,
    address: z.string().optional(),
    issueDescription: z.string().min(10, 'Please describe what needs support'),
  }),
} as const;

type ServiceSlug = keyof typeof schemas;

type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  devices?: string;
  householdSize?: string;
  businessName?: string;
  industry?: string;
  employeeCount?: string;
  automationGoal?: string;
  experienceLevel?: string;
  attendeeCount?: string;
  issueDescription?: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Field({
  label,
  error,
  required = true,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#0F172A] mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

const inputCls =
  'w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent placeholder:text-slate-400';

const selectCls = inputCls + ' bg-white';

// ─── Time options ─────────────────────────────────────────────────────────────

const timeOptions = [
  'Morning (9am – 12pm)',
  'Afternoon (12pm – 3pm)',
  'Late Afternoon (3pm – 6pm)',
];

// ─── Props ────────────────────────────────────────────────────────────────────

export interface BookingModalProps {
  serviceSlug: string;
  serviceTitle: string;
  packageName: string;
  packagePrice: string;
  packagePriceNumeric: number;
  onClose: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function BookingModal({
  serviceSlug,
  serviceTitle,
  packageName,
  packagePrice,
  packagePriceNumeric,
  onClose,
}: BookingModalProps) {
  const router = useRouter();
  const slug = (serviceSlug in schemas ? serviceSlug : 'home-ai-setup') as ServiceSlug;
  const schema = schemas[slug];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<BookingFormData>({
    resolver: zodResolver(schema) as any,
  });

  const onSubmit = (data: BookingFormData) => {
    const checkoutData = {
      serviceSlug,
      serviceTitle,
      packageName,
      packagePrice,
      packagePriceNumeric,
      booking: data,
    };
    sessionStorage.setItem('pendingBooking', JSON.stringify(checkoutData));
    router.push('/checkout');
  };

  // Minimum date = today
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-100 flex-shrink-0">
          <div>
            <p className="text-xs font-semibold text-[#06B6D4] uppercase tracking-wider mb-0.5">
              {serviceTitle}
            </p>
            <h2 className="text-xl font-bold text-[#0F172A]">{packageName}</h2>
            <p className="text-[#8B5CF6] font-bold text-lg">{packagePrice}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 ml-4 flex-shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable form */}
        <div className="overflow-y-auto flex-1 p-6">
          <form id="booking-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="First Name" error={errors.firstName?.message}>
                <input
                  {...register('firstName')}
                  className={inputCls}
                  placeholder="Jane"
                />
              </Field>
              <Field label="Last Name" error={errors.lastName?.message}>
                <input
                  {...register('lastName')}
                  className={inputCls}
                  placeholder="Smith"
                />
              </Field>
            </div>

            {/* Email */}
            <Field label="Email Address" error={errors.email?.message}>
              <input
                {...register('email')}
                type="email"
                className={inputCls}
                placeholder="jane@email.com"
              />
            </Field>

            {/* Phone */}
            <Field label="Phone Number" error={errors.phone?.message}>
              <input
                {...register('phone')}
                type="tel"
                className={inputCls}
                placeholder="(555) 000-0000"
              />
            </Field>

            {/* Address — required for home-ai-setup and business-ai, optional for others */}
            {(slug === 'home-ai-setup' || slug === 'business-ai') && (
              <Field
                label={slug === 'business-ai' ? 'Business Address' : 'Home Address'}
                error={errors.address?.message}
              >
                <input
                  {...register('address')}
                  className={inputCls}
                  placeholder="123 Main St, Los Angeles, CA 90001"
                />
              </Field>
            )}

            {/* Date + Time row */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Preferred Date" error={errors.preferredDate?.message}>
                <input
                  {...register('preferredDate')}
                  type="date"
                  min={today}
                  className={inputCls}
                />
              </Field>
              <Field label="Preferred Time" error={errors.preferredTime?.message}>
                <select {...register('preferredTime')} className={selectCls}>
                  <option value="">Select time</option>
                  {timeOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            {/* ── Home AI Setup specific ── */}
            {slug === 'home-ai-setup' && (
              <>
                <Field
                  label="What smart devices do you currently have?"
                  error={(errors as Record<string, { message?: string }>).devices?.message}
                >
                  <textarea
                    {...register('devices')}
                    className={inputCls}
                    rows={2}
                    placeholder="e.g. Amazon Echo, Google Nest, Smart TV, Ring doorbell…"
                  />
                </Field>
                <Field
                  label="Number of people in household"
                  error={(errors as Record<string, { message?: string }>).householdSize?.message}
                >
                  <select {...register('householdSize')} className={selectCls}>
                    <option value="">Select…</option>
                    {['1', '2', '3', '4', '5+'].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </Field>
              </>
            )}

            {/* ── Business AI specific ── */}
            {slug === 'business-ai' && (
              <>
                <Field
                  label="Business Name"
                  error={(errors as Record<string, { message?: string }>).businessName?.message}
                >
                  <input
                    {...register('businessName')}
                    className={inputCls}
                    placeholder="Acme Inc."
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field
                    label="Industry"
                    error={(errors as Record<string, { message?: string }>).industry?.message}
                  >
                    <input
                      {...register('industry')}
                      className={inputCls}
                      placeholder="e.g. Real Estate, Healthcare"
                    />
                  </Field>
                  <Field
                    label="Employees"
                    error={(errors as Record<string, { message?: string }>).employeeCount?.message}
                  >
                    <select {...register('employeeCount')} className={selectCls}>
                      <option value="">Select…</option>
                      {['1', '2–5', '6–15', '16–50', '50+'].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field
                  label="What would you like to automate?"
                  error={(errors as Record<string, { message?: string }>).automationGoal?.message}
                >
                  <textarea
                    {...register('automationGoal')}
                    className={inputCls}
                    rows={3}
                    placeholder="e.g. Lead follow-up emails, appointment scheduling, customer inquiry responses…"
                  />
                </Field>
              </>
            )}

            {/* ── AI Training specific ── */}
            {slug === 'ai-training' && (
              <>
                <Field
                  label="Current AI experience level"
                  error={(errors as Record<string, { message?: string }>).experienceLevel?.message}
                >
                  <select {...register('experienceLevel')} className={selectCls}>
                    <option value="">Select…</option>
                    <option value="Beginner (never used AI)">Beginner (never used AI)</option>
                    <option value="Some experience (used ChatGPT etc.)">
                      Some experience (used ChatGPT etc.)
                    </option>
                    <option value="Intermediate (regular AI user)">
                      Intermediate (regular AI user)
                    </option>
                  </select>
                </Field>
                <Field
                  label="Number of attendees"
                  error={(errors as Record<string, { message?: string }>).attendeeCount?.message}
                >
                  <input
                    {...register('attendeeCount')}
                    type="number"
                    min="1"
                    className={inputCls}
                    placeholder="e.g. 1 (home session) or up to 10 (workshop)"
                  />
                </Field>
              </>
            )}

            {/* ── AI Support specific ── */}
            {slug === 'ai-support' && (
              <Field
                label="Describe what needs support or isn't working"
                error={(errors as Record<string, { message?: string }>).issueDescription?.message}
              >
                <textarea
                  {...register('issueDescription')}
                  className={inputCls}
                  rows={3}
                  placeholder="e.g. My email automation stopped working after I updated the app…"
                />
              </Field>
            )}

            {/* Notes */}
            <Field label="Additional Notes" required={false} error={undefined}>
              <textarea
                {...register('notes')}
                className={inputCls}
                rows={2}
                placeholder="Anything else we should know?"
              />
            </Field>
          </form>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-6 border-t border-slate-100 bg-[#F8FAFC] rounded-b-2xl">
          <Button
            type="submit"
            form="booking-form"
            disabled={isSubmitting}
            className="w-full bg-[#06B6D4] hover:bg-[#0891B2] text-white font-semibold py-3 text-base shadow-lg shadow-cyan-500/20"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing…
              </>
            ) : (
              `Continue to Checkout — ${packagePrice}`
            )}
          </Button>
          <p className="text-center text-xs text-slate-400 mt-3">
            You&apos;ll review your order and pay securely via PayPal on the next page.
          </p>
        </div>
      </div>
    </div>
  );
}
