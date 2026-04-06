import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-personal-it-support.netlify.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/products/checkout'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
