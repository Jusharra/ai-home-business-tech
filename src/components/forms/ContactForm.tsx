'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  type: z.enum(['home', 'business']),
  message: z.string().min(10, 'Please tell us a bit more (at least 10 characters)'),
  honeypot: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { type: 'home' },
  });

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('success');
        reset();
      } else {
        setStatus('error');
      }
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
        <h3 className="text-xl font-bold text-[#0F172A]">Message Sent!</h3>
        <p className="text-[#64748B]">
          Thanks for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <Button variant="outline" onClick={() => setStatus('idle')}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Honeypot */}
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
        <Label htmlFor="phone">Phone (optional)</Label>
        <Input id="phone" type="tel" placeholder="(555) 000-0000" {...register('phone')} />
      </div>

      <div className="space-y-1.5">
        <Label>I need help with *</Label>
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

      <div className="space-y-1.5">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          placeholder="Tell us what you're looking for..."
          rows={4}
          {...register('message')}
          className={errors.message ? 'border-red-400' : ''}
        />
        {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          Something went wrong. Please try again or call us.
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
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </Button>
    </form>
  );
}
