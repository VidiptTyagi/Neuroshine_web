import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { TherapistCard } from "@/components/shared/therapist-card";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { HomeCta } from "@/components/sections/home/cta";
import { buildMetadata } from "@/lib/seo/metadata";
import { therapists } from "@/content/therapists";

export const metadata: Metadata = buildMetadata({
  title: "Our Therapists",
  description:
    "Meet NeuroShine's certified team of child psychologists, speech and occupational therapists, special educators and behaviour analysts.",
  path: "/therapists",
});

export default function TherapistsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Meet Our Team"
        title="The experts behind every success story"
        description="Certified, experienced and genuinely caring — our specialists work together to help your child thrive."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Therapists", path: "/therapists" },
        ]}
      />
      <section className="py-14 lg:py-20">
        <Container>
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {therapists.map((t) => (
              <RevealItem key={t.slug}>
                <TherapistCard therapist={t} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>
      <HomeCta />
    </>
  );
}
