import Link from 'next/link';
import { Brain, Mail, Phone, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const services = [
  { label: 'Home AI Setup', href: '/services/home-ai-setup' },
  { label: 'Business AI', href: '/services/business-ai' },
  { label: 'AI Training', href: '/services/ai-training' },
  { label: 'AI Support', href: '/services/ai-support' },
];

const company = [
  { label: 'About Us', href: '/about' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Products', href: '/products' },
  { label: 'Contact', href: '/contact' },
];

const legal = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'FAQ', href: '/faq' },
];

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">First-Choice Cyber</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Personal IT for AI. We deploy, train, and support AI systems for homes and businesses.
            </p>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#06B6D4]" />
                <a href="tel:+13108946290" className="hover:text-white transition-colors">
                  (310) 894-6290
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#06B6D4]" />
                <a href="mailto:1stchoicecyber@gmail.com" className="hover:text-white transition-colors">
                  1stchoicecyber@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#06B6D4]" />
                <span>Los Angeles &amp; Central Valley, CA</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-[#06B6D4] transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-[#06B6D4] transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Newsletter */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 mb-6">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-[#06B6D4] transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/membership"
              className="inline-block text-sm font-semibold text-[#06B6D4] border border-[#06B6D4]/40 rounded-lg px-4 py-2 hover:bg-[#06B6D4]/10 transition-colors"
            >
              Join AI Insider Circle
            </Link>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} First-Choice Cyber. All rights reserved.</p>
          <p>Serving Los Angeles &amp; Central Valley, CA</p>
        </div>
      </div>
    </footer>
  );
}
