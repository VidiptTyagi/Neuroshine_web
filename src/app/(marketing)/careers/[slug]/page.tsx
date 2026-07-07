import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Briefcase, Clock, CheckCircle2 } from "lucide-react";
import { getJobBySlug, jobs } from "@/content/data/misc";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { CareerForm } from "@/components/forms/career-form";
import { buildMetadata } from "@/lib/seo/metadata";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) return buildMetadata({ title: "Position not found" });
  return buildMetadata({
    title: `${job.title} — Careers`,
    description: job.description,
    path: `/careers/${job.slug}`,
  });
}

export default async function JobPage({ params }: Props) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) notFound();

  return (
    <>
      <PageHeader
        eyebrow={job.department}
        title={job.title}
        description={job.description}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
          { name: job.title, path: `/careers/${job.slug}` },
        ]}
      >
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" /> {job.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Briefcase className="h-4 w-4" /> {job.experience}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" /> {job.type}
          </span>
        </div>
      </PageHeader>

      <section className="py-14 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold">Responsibilities</h2>
              <ul className="mt-4 space-y-2.5">
                {job.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Requirements</h2>
              <ul className="mt-4 space-y-2.5">
                {job.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="font-normal">
                {job.department}
              </Badge>
              <Badge variant="outline" className="font-normal">
                {job.type}
              </Badge>
            </div>
          </div>

          <Card className="border-border/60" id="apply">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-xl font-bold">Apply for this role</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Fill in your details and attach your resume.
              </p>
              <div className="mt-6">
                <CareerForm defaultPosition={job.title} />
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>
    </>
  );
}
