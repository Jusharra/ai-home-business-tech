import type { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';
import { getServiceBySlug } from '@/data/services';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'AI Support & Maintenance Plans | First Choice Cyber',
  description:
    'One-time AI support sessions for homes and businesses. Troubleshooting, optimization, and reconfiguration. Home from $129, Business from $249.',
};

export default function AISupportPage() {
  const service = getServiceBySlug('ai-support');
  if (!service) notFound();
  return <ServicePageTemplate service={service} />;
}
