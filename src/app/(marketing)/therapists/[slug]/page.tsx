import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CalendarCheck, GraduationCap, Clock, Award } from "lucide-react";
import {
  getTherapistBySlug,
  getAllTherapistSlugs,
} from "@/content/therapists";
import { Container } from "@/components/shared/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Reveal } from "@/components/shared/reveal";
import { HomeCta } from "@/components/sections/home/cta";
import { buildMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllTherapistSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = getTherapistBySlug(slug);
  if (!t) return buildMetadata({ title: "Therapist not found" });
  return buildMetadata({
    title: `${t.name} — ${t.role}`,
    description: t.bio,
    path: `/therapists/${t.slug}`,
  });
}

function initials(name: string) {
  return name
    .replace(/^Dr\.?\s+/i, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

export default async function TherapistPage({ params }: Props) {
  const { slug } = await params;
  const t = getTherapistBySlug(slug);
  if (!t) notFound();

  return (
    <>
      <section className="border-b bg-muted/30">
        <Container className="py-10 lg:py-14">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Therapists", path: "/therapists" },
              { name: t.name, path: `/therapists/${t.slug}` },
            ]}
          />
          <div className="mt-6 grid items-center gap-8 sm:grid-cols-[auto_1fr]">
            {t.image ? (
              <Image
                src={t.image}
                alt={t.name}
                width={160}
                height={160}
                className="h-40 w-40 rounded-3xl object-cover ring-4 ring-background"
              />
            ) : (
              <span className="flex h-40 w-40 items-center justify-center rounded-3xl brand-gradient text-5xl font-bold text-white ring-4 ring-background">
                {initials(t.name)}
              </span>
            )}
            <div>
              <h1 className="text-3xl font-extrabold sm:text-4xl">{t.name}</h1>
              <p className="mt-1 text-lg font-medium text-primary">{t.role}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.specializations.map((s) => (
                  <Badge key={s} variant="secondary" className="font-normal">
                    {s}
                  </Badge>
                ))}
              </div>
              <Button asChild className="mt-6 rounded-full">
                <Link href="/appointment">
                  <CalendarCheck className="h-5 w-5" />
                  Book with {t.name.split(" ")[0]}
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <h2 className="text-2xl font-bold">About {t.name.split(" ")[0]}</h2>
            <p className="mt-4 text-muted-foreground">{t.bio}</p>
          </Reveal>
          <Reveal direction="left">
            <Card className="border-border/60">
              <CardContent className="space-y-5 p-6">
                <div className="flex items-start gap-3">
                  <GraduationCap className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Qualification</p>
                    <p className="text-sm font-medium">{t.qualification}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Experience</p>
                    <p className="text-sm font-medium">
                      {t.experienceYears}+ years
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Availability</p>
                    <p className="text-sm font-medium">{t.availability}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </Container>
      </section>

      <HomeCta />
    </>
  );
}
