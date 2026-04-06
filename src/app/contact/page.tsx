import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Video } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';
import { CalEmbed } from '@/components/CalEmbed';

export const metadata: Metadata = {
  title: 'Contact Us | First Choice Cyber',
  description:
    'Get in touch with First Choice Cyber. Book a free consultation, send a message, or call us. Serving Los Angeles and the Central Valley.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0F172A] section-padding">
        <div className="container-wide text-center">
          <p className="text-sm font-semibold text-[#06B6D4] uppercase tracking-wider mb-3">Get in touch</p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-5">Contact Us</h1>
          <p className="text-xl text-slate-400 max-w-xl mx-auto">
            Book a free consultation, send us a message, or just give us a call.
          </p>
        </div>
      </section>

      <section className="section-padding bg-[#F8FAFC]">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Contact info + form */}
            <div className="space-y-8">
              {/* Contact options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="tel:+15550000000" className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-5 hover:border-[#06B6D4] transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-[#06B6D4]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#06B6D4]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A] text-sm">Call or Text</p>
                    <p className="text-[#06B6D4] text-sm">(310) 894-6290</p>
                    <p className="text-xs text-[#64748B]">Mon–Fri, 9am–6pm PT</p>
                  </div>
                </a>
                <a href="mailto:1stchoicecyber@gmail.com" className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-5 hover:border-[#06B6D4] transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#06B6D4]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#06B6D4]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A] text-sm">Email Us</p>
                    <p className="text-[#06B6D4] text-sm">1stchoicecyber@gmail.com</p>
                    <p className="text-xs text-[#64748B]">Reply within 24 hours</p>
                  </div>
                </a>
                <div className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-5">
                  <div className="w-10 h-10 rounded-lg bg-[#06B6D4]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#06B6D4]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A] text-sm">Service Areas</p>
                    <p className="text-[#64748B] text-xs">Los Angeles County</p>
                    <p className="text-[#64748B] text-xs">Kern County (Bakersfield)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-5">
                  <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center flex-shrink-0">
                    <Video className="w-5 h-5 text-[#8B5CF6]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A] text-sm">Virtual Sessions</p>
                    <p className="text-[#64748B] text-xs">Available nationwide</p>
                    <p className="text-[#64748B] text-xs">via video call</p>
                  </div>
                </div>
              </div>

              {/* Contact form */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-[#0F172A] mb-5">Send a Message</h2>
                <ContactForm />
              </div>
            </div>

            {/* Right: Calendar */}
            <div>
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-[#0F172A] mb-2">Book a Free Consultation</h2>
                <p className="text-[#64748B] text-sm mb-5">
                  Schedule a free 15-minute call. We&apos;ll discuss your needs and show you what&apos;s possible.
                </p>
                <CalEmbed />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
