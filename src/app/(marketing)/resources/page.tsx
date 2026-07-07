import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Video, BookOpen, Puzzle, Download } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { HomeCta } from "@/components/sections/home/cta";
import { buildMetadata } from "@/lib/seo/metadata";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { resources } from "@/content/data/misc";
import type { Resource } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "Resources",
  description:
    "Free parenting resources from NeuroShine — videos, PDF downloads, articles, therapy tips and home activities to support your child's development.",
  path: "/resources",
});

const iconFor: Record<Resource["type"], typeof FileText> = {
  PDF: FileText,
  Video: Video,
  Article: BookOpen,
  Activity: Puzzle,
};

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Tools to support your child at home"
        description="Explore our free library of videos, downloads, articles and activities, created by our therapy team for parents and carers."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
        ]}
      />
      <section className="py-14 lg:py-20">
        <Container>
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((r) => {
              const Icon = iconFor[r.type];
              return (
                <RevealItem key={r.title}>
                  <Link href={r.href} className="group block h-full">
                    <Card className="h-full border-border/60 transition-all group-hover:-translate-y-1 group-hover:shadow-lg">
                      <CardContent className="flex h-full flex-col p-6">
                        <div className="flex items-center justify-between">
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Icon className="h-5 w-5" />
                          </span>
                          <Badge variant="secondary" className="font-normal">
                            {r.type}
                          </Badge>
                        </div>
                        <h3 className="mt-4 font-semibold">{r.title}</h3>
                        <p className="mt-2 flex-1 text-sm text-muted-foreground">
                          {r.description}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                          <Download className="h-4 w-4" />
                          Open resource
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </section>
      <HomeCta />
    </>
  );
}
