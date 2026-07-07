import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CalendarCheck, Clock, ClipboardCheck, CheckCircle2 } from "lucide-react";
import {
  getAssessmentBySlug,
  getAllAssessmentSlugs,
} from "@/content/assessments";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { Reveal } from "@/components/shared/reveal";
import { FaqSection } from "@/components/shared/faq-section";
import { HomeCta } from "@/components/sections/home/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { serviceSchema } from "@/lib/seo/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllAssessmentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getAssessmentBySlug(slug);
  if (!a) return buildMetadata({ title: "Assessment not found" });
  return buildMetadata({
    title: a.title,
    description: a.shortDescription,
    path: `/assessments/${a.slug}`,
  });
}

export default async function AssessmentPage({ params }: Props) {
  const { slug } = await params;
  const a = getAssessmentBySlug(slug);
  if (!a) notFound();

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: a.title,
          description: a.shortDescription,
          path: `/assessments/${a.slug}`,
        })}
      />
      <PageHeader
        eyebrow="Assessment"
        title={a.title}
        description={a.shortDescription}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Assessments", path: "/assessments" },
          { name: a.title, path: `/assessments/${a.slug}` },
        ]}
      >
        <Button asChild size="lg" className="rounded-full">
          <Link href="/appointment">
            <CalendarCheck className="h-5 w-5" />
            Book this assessment
          </Link>
        </Button>
      </PageHeader>

      <section className="py-14 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <h2 className="text-2xl font-bold">Overview</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
              {a.overview.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <h3 className="mt-10 text-xl font-semibold">What we evaluate</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {a.whatWeEvaluate.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal direction="left">
            <Card className="border-border/60">
              <CardContent className="space-y-5 p-6">
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="text-sm font-medium">{a.duration}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ClipboardCheck className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Outcome</p>
                    <p className="text-sm font-medium">{a.outcome}</p>
                  </div>
                </div>
                <Button asChild className="w-full rounded-full">
                  <Link href="/appointment">Book now</Link>
                </Button>
              </CardContent>
            </Card>
          </Reveal>
        </Container>
      </section>

      <div className="bg-muted/40">
        <FaqSection faqs={a.faqs} title={`${a.title} — FAQs`} />
      </div>

      <HomeCta />
    </>
  );
}
