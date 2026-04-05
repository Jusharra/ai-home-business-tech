import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/components/layout/CartProvider';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'AI Setup & Support for Home & Business | First Choice Cyber | Los Angeles',
    template: '%s | First Choice Cyber',
  },
  description:
    'Personal IT for AI. We set up, train, and support AI systems for busy families and businesses in LA and the Central Valley. Book your free consultation today.',
  keywords: [
    'AI setup Los Angeles',
    'AI assistant setup service',
    'business AI automation Los Angeles',
    'home AI setup',
    'AI training for business',
    'AI consultant Los Angeles',
    'ChatGPT setup service',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://firstchoicecyber.com',
    siteName: 'First Choice Cyber',
    title: 'AI Setup & Support for Home & Business | First Choice Cyber',
    description: 'Personal IT for AI. We deploy AI systems that work for you.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'First Choice Cyber | Personal IT for AI',
    description: 'We set up, train, and support AI systems for homes and businesses in LA.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
