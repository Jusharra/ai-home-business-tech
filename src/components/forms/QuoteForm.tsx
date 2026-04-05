'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const serviceOptions = [
  'Home AI Setup',
  'Business AI',
  'AI Training',
  'AI Support / Maintenance',
  'Membership Plan',
  'Digital Products',
  'Not sure yet',
];

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10, 'Valid phone number required'),
  type: z.enum(['home', 'business']),
  companyName: z.string().optional(),
  employeeCount: z.string().optional(),
  services: z.array(z.string()).min(1, 'Select at least one service'),
  needs: z.string().min(10, 'Please describe your needs (at least 10 characters)'),
  budget: z.string().min(1, 'Please select a budget range'),
  contactMethod: z.enum(['email', 'phone', 'text']),
  referralSource: z.string().min(1, 'Please let us know how you found us'),
  honeypot: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;

export function QuoteForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { type: 'home', services: [], contactMethod: 'email' },
  });

  const type = watch('type');

  const toggleService = (service: string) => {
    const current = getValues('services') || [];
    const updated = current.includes(service)
      ? current.filter((s) => s !== service)
      : [...current, service];
    setValue('services', updated, { shouldValidate: true });
  };

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-10">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-[#0F172A]">Quote Request Received!</h3>
        <p className="text-[#64748B]">We&apos;ll review your request and reach out within 24 hours.</p>
        <div className="text-left bg-[#F8FAFC] rounded-xl p-5 max-w-sm w-full space-y-2 text-sm text-[#64748B]">
          <p>✓ We review your request within 24 hours</p>
          <p>✓ We&apos;ll reach out to schedule a discovery call</p>
          <p>✓ Custom proposal delivered within 48 hours of the call</p>
        </div>
        <Button asChild className="bg-[#06B6D4] hover:bg-[#0891B2] text-white">
          <Link href="/contact">
            Book a Call Now
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <input type="text" {...register('honeypot')} className="hidden" tabIndex={-1} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" placeholder="Your name" {...register('name')} className={errors.name ? 'border-red-400' : ''} />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" placeholder="you@email.com" {...register('email')} className={errors.email ? 'border-red-400' : ''} />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="phone">Phone *</Label>
        <Input id="phone" type="tel" placeholder="(555) 000-0000" {...register('phone')} className={errors.phone ? 'border-red-400' : ''} />
        {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label>Type *</Label>
        <div className="flex gap-3">
          {[
            { value: 'home', label: 'Home / Personal' },
            { value: 'business', label: 'Business' },
          ].map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg border border-slate-200 hover:border-[#06B6D4] transition-colors has-[:checked]:border-[#06B6D4] has-[:checked]:bg-[#06B6D4]/5"
            >
              <input type="radio" value={opt.value} {...register('type')} className="accent-[#06B6D4]" />
              <span className="text-sm font-medium">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {type === 'business' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <Label htmlFor="companyName">Company Name</Label>
            <Input id="companyName" placeholder="Your company" {...register('companyName')} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="employeeCount">Number of Employees</Label>
            <select
              id="employeeCount"
              {...register('employeeCount')}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Select...</option>
              <option value="1">Just me</option>
              <option value="2-5">2-5</option>
              <option value="6-15">6-15</option>
              <option value="16-50">16-50</option>
              <option value="50+">50+</option>
            </select>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label>Services Interested In *</Label>
        <div className="grid grid-cols-2 gap-2">
          {serviceOptions.map((service) => {
            const selected = watch('services')?.includes(service);
            return (
              <button
                key={service}
                type="button"
                onClick={() => toggleService(service)}
                className={`text-left px-3 py-2.5 rounded-lg border text-sm transition-all ${
                  selected
                    ? 'border-[#06B6D4] bg-[#06B6D4]/10 text-[#06B6D4] font-medium'
                    : 'border-slate-200 text-[#64748B] hover:border-slate-300'
                }`}
              >
                {selected && '✓ '}{service}
              </button>
            );
          })}
        </div>
        {errors.services && <p className="text-xs text-red-500">{errors.services.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="needs">Describe Your Needs *</Label>
        <Textarea
          id="needs"
          placeholder="Tell us what you're hoping to achieve..."
          rows={4}
          {...register('needs')}
          className={errors.needs ? 'border-red-400' : ''}
        />
        {errors.needs && <p className="text-xs text-red-500">{errors.needs.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="budget">Budget Range *</Label>
          <select
            id="budget"
            {...register('budget')}
            className={`w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${errors.budget ? 'border-red-400' : 'border-input'}`}
          >
            <option value="">Select budget...</option>
            <option value="under-500">Under $500</option>
            <option value="500-1000">$500 – $1,000</option>
            <option value="1000-2500">$1,000 – $2,500</option>
            <option value="2500+">$2,500+</option>
            <option value="not-sure">Not sure yet</option>
          </select>
          {errors.budget && <p className="text-xs text-red-500">{errors.budget.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Preferred Contact *</Label>
          <div className="flex gap-2">
            {[
              { value: 'email', label: 'Email' },
              { value: 'phone', label: 'Phone' },
              { value: 'text', label: 'Text' },
            ].map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-1.5 cursor-pointer px-3 py-2 rounded-lg border border-slate-200 hover:border-[#06B6D4] transition-colors has-[:checked]:border-[#06B6D4] has-[:checked]:bg-[#06B6D4]/5 text-sm"
              >
                <input type="radio" value={opt.value} {...register('contactMethod')} className="accent-[#06B6D4]" />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="referralSource">How did you hear about us? *</Label>
        <select
          id="referralSource"
          {...register('referralSource')}
          className={`w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${errors.referralSource ? 'border-red-400' : 'border-input'}`}
        >
          <option value="">Select...</option>
          <option value="google">Google Search</option>
          <option value="social">Social Media</option>
          <option value="referral">Friend / Referral</option>
          <option value="ad">Online Ad</option>
          <option value="other">Other</option>
        </select>
        {errors.referralSource && <p className="text-xs text-red-500">{errors.referralSource.message}</p>}
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          Something went wrong. Please try again.
        </div>
      )}

      <Button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-[#06B6D4] hover:bg-[#0891B2] text-white font-semibold py-6 text-base"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Request My Quote'
        )}
      </Button>
    </form>
  );
}
