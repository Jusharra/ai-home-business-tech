import type { Metadata } from 'next';
import { ServicePageTemplate } from '@/components/ServicePageTemplate';
import { getServiceBySlug } from '@/data/services';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Google My Business Optimization Los Angeles | First Choice Cyber',
  description:
    'AI-powered Google My Business optimization for local businesses in Los Angeles and the Central Valley. Rank higher on Google Maps, automate reviews, and get found by AI search. Free GMB audit included.',
  keywords: [
    'Google My Business optimization Los Angeles',
    'GMB optimization service',
    'Google Maps ranking Los Angeles',
    'local SEO Los Angeles',
    'Google Business Profile optimization',
    'AI local search optimization',
    'review automation service',
    'Google Maps SEO',
  ],
  openGraph: {
    title: 'Google My Business Optimization | First Choice Cyber',
    description:
      'Rank higher on Google Maps and get found in AI search results. We optimize your Google Business Profile, automate reviews, and keep your listing active with AI-generated posts.',
    url: 'https://first-choicecyber.com/services/google-my-business',
  },
};

export default function GoogleMyBusinessPage() {
  const service = getServiceBySlug('google-my-business');
  if (!service) notFound();
  return <ServicePageTemplate service={service} />;
}
