import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Briefcase, Clock, ArrowRight, Heart } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { buildMetadata } from "@/lib/seo/metadata";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { jobs } from "@/content/data/misc";

export const metadata: Metadata = buildMetadata({
  title: "Careers",
  description:
    "Join the NeuroShine team. Explore open roles for speech therapists, occupational therapists, special educators and more — and help children shine.",
  path: "/careers",
});

const perks = [
  "Supportive, multidisciplinary team",
  "Continuous professional development",
  "Meaningful, impactful work",
  "Modern, well-equipped facilities",
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Do work that changes lives"
        description="At NeuroShine, you'll be part of a passionate team dedicated to helping children thrive. If that sounds like you, we'd love to meet you."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ]}
      />

      <section className="py-14 lg:py-20">
        <Container>
          <SectionHeading eyebrow="Open positions" title="Current openings" />
          <RevealGroup className="mt-12 grid gap-5 md:grid-cols-2">
            {jobs.map((job) => (
              <RevealItem key={job.slug}>
                <Card className="h-full border-border/60 transition-shadow hover:shadow-md">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="font-normal">
                        {job.department}
                      </Badge>
                      <Badge variant="outline" className="font-normal">
                        {job.type}
                      </Badge>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold">{job.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">
                      {job.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5" />
                        {job.experience}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {job.type}
                      </span>
                    </div>
                    <Button asChild className="mt-5 w-fit rounded-full">
                      <Link href={`/careers/${job.slug}`}>
                        View & apply
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="bg-muted/40 py-14 lg:py-20">
        <Container className="max-w-3xl text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl brand-gradient text-white">
            <Heart className="h-7 w-7" />
          </span>
          <h2 className="mt-5 text-2xl font-bold">Why work with us</h2>
          <ul className="mx-auto mt-6 grid max-w-xl gap-3 sm:grid-cols-2">
            {perks.map((p) => (
              <li
                key={p}
                className="rounded-xl border border-border/60 bg-card p-4 text-sm font-medium"
              >
                {p}
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
