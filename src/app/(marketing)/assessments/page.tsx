import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { AssessmentCard } from "@/components/shared/assessment-card";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { HomeCta } from "@/components/sections/home/cta";
import { buildMetadata } from "@/lib/seo/metadata";
import { assessments } from "@/content/assessments";

export const metadata: Metadata = buildMetadata({
  title: "Assessments",
  description:
    "Comprehensive, standardised child assessments — developmental, autism, speech, IQ, learning disability, ADHD and behaviour evaluations by NeuroShine specialists.",
  path: "/assessments",
});

export default function AssessmentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Assessments"
        title="Clarity that guides the right support"
        description="A thorough assessment is the foundation of effective help. Our specialists use evidence-based tools to understand your child and recommend the best path forward."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Assessments", path: "/assessments" },
        ]}
      />
      <section className="py-14 lg:py-20">
        <Container>
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {assessments.map((a) => (
              <RevealItem key={a.slug}>
                <AssessmentCard assessment={a} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>
      <HomeCta />
    </>
  );
}
