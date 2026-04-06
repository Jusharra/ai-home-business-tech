'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brain, Menu, X, ShoppingCart, ChevronDown, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCartContext } from '@/components/layout/CartProvider';
import { CartDrawer } from '@/components/layout/CartDrawer';

const serviceLinks = [
  {
    label: 'Home AI Setup',
    href: '/services/home-ai-setup',
    description: 'AI assistants and automation for your household',
  },
  {
    label: 'Business AI Setup',
    href: '/services/business-ai',
    description: 'Email, leads, scheduling, and workflow automation',
  },
  {
    label: 'AI Training',
    href: '/services/ai-training',
    description: 'Hands-on, personalized training sessions',
  },
  {
    label: 'AI Support',
    href: '/services/ai-support',
    description: 'Ongoing maintenance and priority support',
  },
];

const navLinks = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Membership', href: '/membership' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCartContext();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled || mobileOpen
            ? 'bg-[#0F172A]/95 backdrop-blur-md shadow-lg'
            : 'bg-[#0F172A]/80 backdrop-blur-sm'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white text-lg hidden sm:block">
                First-Choice Cyber
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Services dropdown */}
              <div className="relative">
                <button
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                  onClick={() => setServicesOpen(!servicesOpen)}
                >
                  Services
                  <ChevronDown
                    className={cn('w-4 h-4 transition-transform', servicesOpen && 'rotate-180')}
                  />
                </button>
                {servicesOpen && (
                  <div
                    className="absolute top-full left-0 mt-1 w-72 bg-[#0F172A] border border-white/10 rounded-xl shadow-2xl p-2"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    {serviceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors group"
                      >
                        <div className="text-sm font-medium text-white group-hover:text-[#06B6D4] transition-colors">
                          {link.label}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">{link.description}</div>
                      </Link>
                    ))}
                    <div className="border-t border-white/10 mt-2 pt-2">
                      <Link
                        href="/services"
                        className="block px-3 py-2 text-xs font-medium text-[#06B6D4] hover:text-[#67E8F9] transition-colors"
                      >
                        View all services →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    pathname === link.href
                      ? 'text-[#06B6D4] bg-white/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Phone — desktop only */}
              <a
                href="tel:+13108946290"
                className="hidden xl:flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>(310) 894-6290</span>
              </a>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-slate-300 hover:text-white transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#06B6D4] text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* CTA */}
              <Button
                asChild
                size="sm"
                className="hidden sm:flex bg-[#06B6D4] hover:bg-[#0891B2] text-white font-semibold shadow-lg shadow-cyan-500/25"
              >
                <Link href="/contact">Book Free Consult</Link>
              </Button>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#0F172A] border-t border-white/10 px-4 pb-6 pt-4">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
                Services
              </div>
              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-white/10 my-3" />
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="block px-3 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                Contact
              </Link>
            </div>
            <div className="mt-4 space-y-2">
              <Button asChild className="w-full bg-[#06B6D4] hover:bg-[#0891B2] text-white font-semibold">
                <Link href="/contact">Book Free Consultation</Link>
              </Button>
              <a
                href="tel:+13108946290"
                className="flex items-center justify-center gap-2 w-full py-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                (310) 894-6290
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16 md:h-18" />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
