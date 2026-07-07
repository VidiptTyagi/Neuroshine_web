import * as React from "react";
import { BadgeCheck } from "lucide-react";
import { Container } from "@/components/shared/container";
import { certifications } from "@/content/data/site-content";

export function TrustStrip() {
  return (
    <section className="border-b bg-background/60 py-6 backdrop-blur">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Qualified &amp; accredited professionals you can trust
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {certifications.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground"
            >
              <BadgeCheck className="h-4 w-4 text-primary" />
              {c.replace(/ registered professionals$/, "")}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
