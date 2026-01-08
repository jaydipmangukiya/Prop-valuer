"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { contactFaqs } from "@/lib/siteContent";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  title?: string;
  subtitle?: string;
}

export default function FaqAccordion({
  title = "Frequently Asked Questions",
  subtitle = "Quick answers to common questions",
}: FaqAccordionProps) {
  return (
    <section className="pb-8 md:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-800 mb-4">
            {title}
          </h2>
          <p className="text-base sm:text-xl text-slate-600">{subtitle}</p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {contactFaqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border border-slate-200 rounded-xl px-4 shadow-sm"
            >
              <AccordionTrigger
                className="text-left text-lg font-semibold text-slate-800 hover:no-underline focus:outline-none
    focus-visible:ring-0
    focus-visible:bg-transparent
    active:bg-transparent
    data-[state=open]:bg-white"
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed pt-2 text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
