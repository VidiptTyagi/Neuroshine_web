import type { Metadata } from "next";
import Link from "next/link";
import { Target, Eye, Quote, Award, BadgeCheck, ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { TeamPreview } from "@/components/sections/home/team-preview";
import { HomeCta } from "@/components/sections/home/cta";
import { buildMetadata } from "@/lib/seo/metadata";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  coreValues,
  timeline,
  achievements,
  certifications,
} from "@/content/data/site-content";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn about NeuroShine's mission, values and story — a compassionate child-development centre empowering every mind and every child since 2024.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About NeuroShine"
        title="Compassionate care, backed by science"
        description="Since 2024, we've helped children reach their full potential through evidence-based therapy delivered with genuine warmth."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      {/* Mission & Vision */}
      <section className="py-14 lg:py-20">
        <Container className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <Card className="h-full border-border/60">
              <CardContent className="p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Target className="h-6 w-6" />
                </span>
                <h2 className="mt-4 text-2xl font-bold">Our Mission</h2>
                <p className="mt-3 text-muted-foreground">
                  To empower every child to reach their fullest potential through
                  compassionate, individualised and evidence-based therapy — while
                  supporting and equipping the families who love them.
                </p>
              </CardContent>
            </Card>
          </Reveal>
          <Reveal direction="left">
            <Card className="h-full border-border/60">
              <CardContent className="p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Eye className="h-6 w-6" />
                </span>
                <h2 className="mt-4 text-2xl font-bold">Our Vision</h2>
                <p className="mt-3 text-muted-foreground">
                  A world where every child — regardless of their challenges — has
                  the support, opportunity and belief they need to shine, learn
                  and thrive alongside their peers.
                </p>
              </CardContent>
            </Card>
          </Reveal>
        </Container>
      </section>

      {/* Our Story */}
      <section className="bg-muted/40 py-14 lg:py-20">
        <Container className="max-w-3xl">
          <SectionHeading
            align="left"
            eyebrow="Our Story"
            title="From one therapy room to a trusted centre"
          />
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              NeuroShine began in 2024 with a single therapy room, one dedicated
              psychologist and a simple belief: that every child deserves the
              chance to shine. What started as a small practice has grown into a
              multidisciplinary centre trusted by 50+ families.
            </p>
            <p>
              Along the way, our commitment has never changed. We combine clinical
              excellence with genuine compassion, treating every child as an
              individual and every parent as a partner. Today our team of
              specialists works side by side — speech and occupational therapists,
              psychologists, special educators and behaviour analysts — to deliver
              truly coordinated care.
            </p>
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-14 lg:py-20">
        <Container>
          <SectionHeading
            eyebrow="Our Journey"
            title="Milestones along the way"
          />
          <ol className="relative mt-12 space-y-8 border-l-2 border-primary/20 pl-8">
            {timeline.map((event, i) => (
              <Reveal key={event.year} delay={i * 0.05}>
                <li className="relative">
                  <span className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full brand-gradient ring-4 ring-background" />
                  <p className="text-sm font-bold text-primary">{event.year}</p>
                  <h3 className="mt-1 text-lg font-semibold">{event.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {event.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Core Values */}
      <section className="bg-muted/40 py-14 lg:py-20">
        <Container>
          <SectionHeading eyebrow="What we stand for" title="Our core values" />
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((value) => {
              const Icon = value.icon;
              return (
                <RevealItem key={value.title}>
                  <Card className="h-full border-border/60 text-center">
                    <CardContent className="p-6">
                      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl brand-gradient text-white">
                        <Icon className="h-7 w-7" />
                      </span>
                      <h3 className="mt-4 font-semibold">{value.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </section>

      {/* Director's message */}
      <section className="py-14 lg:py-20">
        <Container className="max-w-3xl">
          <Reveal>
            <Card className="border-border/60">
              <CardContent className="p-8">
                <Quote className="h-10 w-10 text-primary/30" />
                <blockquote className="mt-4 text-lg font-medium text-pretty">
                  “Every child who walks through our doors reminds me why we do
                  this work. Our promise to families is simple: we will see your
                  child's strengths, meet them with patience, and never stop
                  believing in what they can achieve.”
                </blockquote>
                <div className="mt-6">
                  <p className="font-semibold">Dr. Garima Tyagi</p>
                  <p className="text-sm text-muted-foreground">
                    Founder & Occupational Therapist
                  </p>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </Container>
      </section>

      <TeamPreview />

      {/* Achievements & Certifications */}
      <section className="bg-muted/40 py-14 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Recognition"
              title="Achievements"
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {achievements.map((a) => (
                <div
                  key={a.label}
                  className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4"
                >
                  <Award className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium">{a.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Credentials"
              title="Certifications"
            />
            <ul className="mt-8 space-y-3">
              {certifications.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <span className="text-sm">{c}</span>
                </li>
              ))}
            </ul>
            <Button asChild variant="outline" className="mt-8 rounded-full">
              <Link href="/gallery">
                See our centre
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      <HomeCta />
    </>
  );
}
