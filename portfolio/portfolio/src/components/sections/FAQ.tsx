'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface FAQItem {
  question: string;
  answer: string;
}

const defaultFAQs: FAQItem[] = [
  {
    question: 'What does WordPress maintenance include?',
    answer:
      'Our WordPress maintenance covers core updates, plugin and theme updates, daily backups, security monitoring, uptime monitoring, and performance checks. We proactively keep your site running smoothly so you can focus on your business. Every update is tested in a staging environment first to prevent any disruptions.',
  },
  {
    question: 'How often will my site be updated?',
    answer:
      'Update frequency depends on your plan. Basic plans receive monthly updates, Pro plans get weekly updates, and Enterprise plans receive real-time patching for critical security updates. All updates are performed during off-peak hours and tested before going live.',
  },
  {
    question: 'What happens if my site goes down?',
    answer:
      'We monitor your site around the clock with automated uptime checks. If your site goes down, we are alerted immediately and begin diagnosing the issue right away. Pro and Enterprise plans include priority response times. We also maintain daily backups so we can restore your site quickly if needed.',
  },
  {
    question: 'Can you migrate my existing site?',
    answer:
      'Absolutely. We handle full WordPress migrations including content, databases, themes, plugins, and DNS configuration. We will test everything thoroughly in a staging environment before switching over, ensuring zero downtime during the transition.',
  },
  {
    question: 'Do you offer one-time services?',
    answer:
      'Yes, we offer one-time services like site audits, performance optimization, security hardening, and custom development. However, we strongly recommend ongoing maintenance plans because websites need regular attention to stay secure and performant. Think of it like regular oil changes for your car.',
  },
  {
    question: 'What is your typical response time?',
    answer:
      'Response times depend on your plan. Basic plans receive responses within 24 business hours. Pro plans get priority support with 4-hour response times. Enterprise clients have access to 24/7 phone support with 1-hour response times for critical issues.',
  },
];

interface FAQProps {
  items?: FAQItem[];
}

export default function FAQ({ items = defaultFAQs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, controls } = useScrollAnimation();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={staggerContainer}
      className="max-w-3xl mx-auto space-y-4"
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          variants={staggerItem}
          className={cn(
            'rounded-xl border transition-colors duration-300',
            openIndex === index
              ? 'border-brand-500/50 bg-surface-800/80'
              : 'border-surface-700 bg-surface-900/40'
          )}
        >
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between p-6 text-left"
            aria-expanded={openIndex === index}
          >
            <span className="text-lg font-medium text-surface-100 pr-4">
              {item.question}
            </span>
            <motion.span
              animate={{ rotate: openIndex === index ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-brand-400 text-2xl shrink-0"
            >
              +
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 text-surface-400 leading-relaxed">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
}
