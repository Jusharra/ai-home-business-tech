'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FAQ } from '@/types';

interface FAQAccordionProps {
  faqs: FAQ[];
  showViewAll?: boolean;
  title?: string;
}

export function FAQAccordion({ faqs, showViewAll = false, title = 'Frequently Asked Questions' }: FAQAccordionProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-sm font-semibold text-[#06B6D4] uppercase tracking-wider mb-3">FAQ</p>
          <h2 className="text-4xl font-bold text-[#0F172A]">{title}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion multiple={false} className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-slate-200 rounded-xl px-6 data-open:border-[#06B6D4]/40 transition-colors"
              >
                <AccordionTrigger className="text-left font-semibold text-[#0F172A] hover:text-[#06B6D4] hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#64748B] leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {showViewAll && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-8"
          >
            <Link href="/faq" className="text-[#06B6D4] font-medium hover:underline">
              See All FAQs →
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
