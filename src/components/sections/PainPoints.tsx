'use client';

import { motion } from 'framer-motion';
import { Clock, InboxIcon, TrendingDown, Calendar } from 'lucide-react';

const painPoints = [
  {
    icon: InboxIcon,
    title: 'Drowning in emails',
    description: 'Hours spent on email every day. Most of it repetitive. All of it stealing your time.',
    audience: 'Both',
  },
  {
    icon: Calendar,
    title: 'Missing appointments',
    description: "Too much to track, too many reminders to set. Things fall through the cracks.",
    audience: 'Home',
  },
  {
    icon: TrendingDown,
    title: 'Losing leads',
    description: "Potential clients go cold because you can't follow up fast enough. Your competitors do.",
    audience: 'Business',
  },
  {
    icon: Clock,
    title: 'No time to learn AI',
    description: "You know AI could help. But who has time to figure it all out on top of everything else?",
    audience: 'Both',
  },
];

export function PainPoints() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-[#06B6D4] uppercase tracking-wider mb-3">
            We get it
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A]">Sound Familiar?</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {painPoints.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#F8FAFC] border border-slate-100 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/10 flex items-center justify-center mb-4">
                <point.icon className="w-5 h-5 text-[#06B6D4]" />
              </div>
              <h3 className="font-semibold text-[#0F172A] mb-2">{point.title}</h3>
              <p className="text-sm text-[#64748B] leading-relaxed">{point.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-10 text-lg text-[#64748B]"
        >
          There&apos;s a better way.{' '}
          <span className="text-[#06B6D4] font-semibold">And we&apos;ll set it up for you.</span>
        </motion.p>
      </div>
    </section>
  );
}
