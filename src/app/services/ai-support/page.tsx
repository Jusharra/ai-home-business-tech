import type { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';
import { getServiceBySlug } from '@/data/services';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'AI Support & Maintenance Plans | First Choice Cyber',
  description:
    'Monthly AI support plans for homes and businesses. Priority response, ongoing optimization, and dedicated support. From $29/month.',
};

export default function AISupportPage() {
  const service = getServiceBySlug('ai-support');
  if (!service) notFound();
  return <ServicePageTemplate service={service} />;
}
