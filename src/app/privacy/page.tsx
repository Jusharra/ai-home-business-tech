import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | First-Choice Cyber',
  description: 'Privacy policy for First-Choice Cyber — how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide max-w-3xl">
        <h1 className="text-4xl font-extrabold text-[#0F172A] mb-2">Privacy Policy</h1>
        <p className="text-[#64748B] mb-10">Last updated: April 2026</p>

        <div className="prose prose-slate max-w-none space-y-8 text-[#64748B]">
          <section>
            <h2 className="text-xl font-bold text-[#0F172A]">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, including when you fill out a contact or quote form, subscribe to our newsletter, or purchase a product. This may include your name, email address, phone number, and details about your service needs.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A]">2. How We Use Your Information</h2>
            <p>We use the information we collect to respond to your inquiries, provide our services, send you relevant communications, process payments, and improve our website and services.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A]">3. Information Sharing</h2>
            <p>We do not sell or rent your personal information to third parties. We may share information with service providers who assist us in operating our website and providing our services, subject to confidentiality agreements.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A]">4. Payment Information</h2>
            <p>Payment processing is handled by PayPal. We do not store your credit card or payment information on our servers. Please review PayPal&apos;s privacy policy for information on how they handle your payment data.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A]">5. Cookies</h2>
            <p>We use cookies and similar tracking technologies to improve your experience on our website, analyze traffic, and support marketing. You can control cookie settings through your browser.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A]">6. Your Rights</h2>
            <p>You may request to access, correct, or delete your personal information by contacting us at 1stchoicecyber@gmail.com. We will respond within 30 days.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A]">7. Contact</h2>
            <p>For privacy-related questions, contact us at: 1stchoicecyber@gmail.com</p>
          </section>
        </div>
      </div>
    </section>
  );
}
