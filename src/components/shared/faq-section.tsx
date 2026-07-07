import * as React from "react";
import type { FAQ } from "@/types";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/seo/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqSectionProps {
  faqs: FAQ[];
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Include FAQ JSON-LD (only one FAQPage schema should exist per page). */
  withSchema?: boolean;
  className?: string;
}

/**
 * Reusable FAQ accordion with optional FAQPage structured data.
 * Used on the homepage and every service/assessment page.
 */
export function FaqSection({
  faqs,
  eyebrow = "FAQ",
  title = "Frequently asked questions",
  description,
  withSchema = true,
  className,
}: FaqSectionProps) {
  return (
    <section className={className ?? "py-16 lg:py-24"}>
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <Accordion type="single" collapsible className="mt-10 w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
      {withSchema ? <JsonLd data={faqSchema(faqs)} /> : null}
    </section>
  );
}
