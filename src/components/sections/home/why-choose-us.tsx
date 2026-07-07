import * as React from "react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { whyChooseUs } from "@/content/data/site-content";

export function WhyChooseUs() {
  return (
    <section className="bg-muted/40 py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Why NeuroShine"
          title="Care families trust"
          description="We combine clinical excellence with genuine warmth — treating every child as an individual and every parent as a partner."
        />
        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item) => {
            const Icon = item.icon;
            return (
              <RevealItem key={item.title}>
                <div className="card-premium group flex h-full gap-4 rounded-2xl p-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl brand-gradient text-white shadow-soft transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
