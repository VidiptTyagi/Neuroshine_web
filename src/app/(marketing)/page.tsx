import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/home/hero";
import { TrustStrip } from "@/components/sections/home/trust-strip";
import { HomeStats } from "@/components/sections/home/stats";
import { ServicesPreview } from "@/components/sections/home/services-preview";
import { WhyChooseUs } from "@/components/sections/home/why-choose-us";
import { TeamPreview } from "@/components/sections/home/team-preview";
import { Testimonials } from "@/components/sections/home/testimonials";
import { FaqSection } from "@/components/shared/faq-section";
import { HomeCta } from "@/components/sections/home/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo/schema";
import { generalFaqs } from "@/content/data/site-content";
import { getSite } from "@/lib/site";

export const metadata: Metadata = buildMetadata({ path: "/" });

export default async function HomePage() {
  const site = await getSite();
  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(site),
          organizationSchema(site),
          websiteSchema(site),
        ]}
      />
      <HomeHero />
      <TrustStrip />
      <HomeStats />
      <ServicesPreview />
      <WhyChooseUs />
      <TeamPreview />
      <Testimonials />
      <FaqSection
        faqs={generalFaqs}
        description="Answers to the questions parents ask us most. Can't find yours? Get in touch — we're happy to help."
      />
      <HomeCta />
    </>
  );
}
