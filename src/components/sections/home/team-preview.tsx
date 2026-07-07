import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { TherapistCard } from "@/components/shared/therapist-card";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { therapists } from "@/content/therapists";

export function TeamPreview() {
  const preview = therapists.slice(0, 3);
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Meet Our Team"
          title="Experts who care"
          description="Our certified therapists, educators and psychologists bring years of experience and genuine compassion to every session."
        />
        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((t) => (
            <RevealItem key={t.slug}>
              <TherapistCard therapist={t} />
            </RevealItem>
          ))}
        </RevealGroup>
        <div className="mt-10 text-center">
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link href="/therapists">
              Meet all therapists
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
