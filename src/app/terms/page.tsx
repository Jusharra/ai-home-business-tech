import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | First-Choice Cyber',
  description: 'Terms of service for First Choice Cyber — the rules and policies governing use of our services.',
};

export default function TermsPage() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide max-w-3xl">
        <h1 className="text-4xl font-extrabold text-[#0F172A] mb-2">Terms of Service</h1>
        <p className="text-[#64748B] mb-10">Last updated: April 2026</p>

        <div className="prose prose-slate max-w-none space-y-8 text-[#64748B]">
          <section>
            <h2 className="text-xl font-bold text-[#0F172A]">1. Services</h2>
            <p>First Choice Cyber provides AI setup, training, and support services for residential and commercial clients in Los Angeles and the Central Valley, California. Virtual services are available nationwide.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A]">2. Appointments</h2>
            <p>In-person service appointments must be scheduled in advance. Cancellations with less than 24 hours notice may be subject to a cancellation fee of up to $50.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A]">3. Payment</h2>
            <p>Payment is due at the time of service unless otherwise agreed in writing. Digital products are non-refundable once downloaded. Monthly subscriptions may be cancelled anytime; no partial refunds for unused periods.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A]">4. Digital Products</h2>
            <p>Digital products (templates, guides, prompt packs) are licensed for personal or single-business use only. Redistribution, resale, or sharing with third parties is prohibited.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A]">5. Affiliate Disclosure</h2>
            <p>Some products on this site are affiliate links. As an Amazon Associate and affiliate partner, we may earn commissions from qualifying purchases. This does not affect the price you pay.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A]">6. Limitation of Liability</h2>
            <p>First Choice Cyber is not responsible for data loss, business interruption, or consequential damages arising from AI system failures. Our liability is limited to the amount paid for the specific service in question.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A]">7. Governing Law</h2>
            <p>These terms are governed by the laws of the State of California.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A]">8. Contact</h2>
            <p>For questions about these terms: 1stchoicecyber@gmail.com</p>
          </section>
        </div>
      </div>
    </section>
  );
}
