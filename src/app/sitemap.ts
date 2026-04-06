import { MetadataRoute } from 'next';
import { products } from '@/data/products';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-personal-it-support.netlify.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, priority: 1.0 },
    { url: `${BASE_URL}/services`, priority: 0.9 },
    { url: `${BASE_URL}/services/home-ai-setup`, priority: 0.9 },
    { url: `${BASE_URL}/services/business-ai`, priority: 0.9 },
    { url: `${BASE_URL}/services/ai-training`, priority: 0.8 },
    { url: `${BASE_URL}/services/ai-support`, priority: 0.8 },
    { url: `${BASE_URL}/how-it-works`, priority: 0.7 },
    { url: `${BASE_URL}/pricing`, priority: 0.8 },
    { url: `${BASE_URL}/products`, priority: 0.7 },
    { url: `${BASE_URL}/about`, priority: 0.6 },
    { url: `${BASE_URL}/contact`, priority: 0.8 },
    { url: `${BASE_URL}/quote`, priority: 0.7 },
    { url: `${BASE_URL}/membership`, priority: 0.7 },
    { url: `${BASE_URL}/faq`, priority: 0.6 },
    { url: `${BASE_URL}/privacy`, priority: 0.3 },
    { url: `${BASE_URL}/terms`, priority: 0.3 },
  ].map(({ url, priority }) => ({
    url,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority,
  }));

  const productPages = products.map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...productPages];
}
