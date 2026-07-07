import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { ServiceCard } from "@/components/shared/service-card";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { HomeCta } from "@/components/sections/home/cta";
import { buildMetadata } from "@/lib/seo/metadata";
import { services } from "@/content/services";

export const metadata: Metadata = buildMetadata({
  title: "Our Services",
  description:
    "Explore NeuroShine's full range of child-development therapies — speech, occupational, behaviour, autism, ABA, special education, sensory integration and more.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What we offer"
        title="Therapy services designed around your child"
        description="Our multidisciplinary team delivers evidence-based, individualised care across every area of child development."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />
      <section className="py-14 lg:py-20">
        <Container>
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <RevealItem key={service.slug}>
                <ServiceCard service={service} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>
      <HomeCta />
    </>
  );
}
