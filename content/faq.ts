/**
 * GlowSuite — FAQ Content
 *
 * Structured data for the FAQ section.
 * Final answers to be written in a future step.
 */

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

/** Placeholder FAQ entries — final answers to be written */
export const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Is GlowSuite suitable for a single-location salon?',
    answer: 'Placeholder — final answer to be written.',
  },
  {
    id: 'faq-2',
    question: 'Can I manage multiple branches from one account?',
    answer: 'Placeholder — final answer to be written.',
  },
  {
    id: 'faq-3',
    question: 'How does GlowSuite handle billing and payments?',
    answer: 'Placeholder — final answer to be written.',
  },
  {
    id: 'faq-4',
    question: 'Is my data secure?',
    answer: 'Placeholder — final answer to be written.',
  },
  {
    id: 'faq-5',
    question: 'Is there a free trial available?',
    answer: 'Placeholder — final answer to be written.',
  },
];
