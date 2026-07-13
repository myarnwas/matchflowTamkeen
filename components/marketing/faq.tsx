"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does MatchFlow keep each company's data separate?",
    answer:
      "Every table is protected by PostgreSQL Row Level Security. A tenant's queries are automatically scoped to their own tenant ID at the database level, so it is physically impossible for one company to read another's transactions — even through the API.",
  },
  {
    question: "Which financial sources can I connect?",
    answer:
      "Bank of Palestine, Jawwal Pay, and PayPal are supported out of the box, alongside API-driven ERP integrations and manual CSV/Excel uploads for your internal records. Every source lands in one unified ledger.",
  },
  {
    question: "How does the reconciliation engine actually match transactions?",
    answer:
      "The engine compares external transactions against your internal records using amount, date, and reference matching, assigning each pairing a confidence score. High-confidence matches are applied automatically; anything ambiguous is flagged for a quick manual review.",
  },
  {
    question: "What happens when there's a discrepancy?",
    answer:
      "Discrepancies — mismatched amounts, missing entries, or duplicates — are flagged in real time and surfaced on your dashboard. You can investigate, add notes, and resolve them manually, with every action recorded in the audit trail.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes. Every plan starts with a 14-day free trial, no credit card required. You can explore the full platform and cancel anytime before the trial ends.",
  },
  {
    question: "Can I invite my whole finance team?",
    answer:
      "Absolutely. Each tenant can add team members with role-based access — tenant admin, manager, employee, or read-only viewer — so everyone sees exactly what they need and nothing more.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="border-t border-border/60 bg-secondary/40 py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about MatchFlow. Can&apos;t find an
            answer? Reach out to our team.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
