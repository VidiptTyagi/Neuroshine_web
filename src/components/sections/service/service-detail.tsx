import * as React from "react";
import Link from "next/link";
import {
  CalendarCheck,
  Phone,
  Clock,
  CheckCircle2,
  AlertCircle,
  Baby,
} from "lucide-react";
import type { Service } from "@/types";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { FaqSection } from "@/components/shared/faq-section";
import { ServiceCard } from "@/components/shared/service-card";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/content/services";

export function ServiceDetail({ service }: { service: Service }) {
  const Icon = service.icon;
  const related = services
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-muted/30">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        </div>
        <Container className="py-10 lg:py-14">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: service.title, path: `/services/${service.slug}` },
            ]}
          />
          <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl brand-gradient text-white">
                <Icon className="h-7 w-7" />
              </span>
              <h1 className="mt-5 text-3xl font-extrabold text-balance sm:text-4xl lg:text-5xl">
                {service.title}
              </h1>
              <p className="mt-3 text-lg text-primary">{service.heroTagline}</p>
              <p className="mt-4 max-w-xl text-muted-foreground">
                {service.shortDescription}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/appointment">
                    <CalendarCheck className="h-5 w-5" />
                    Book Appointment
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full"
                >
                  <a href={siteConfig.contact.phoneHref}>
                    <Phone className="h-5 w-5" />
                    Call Now
                  </a>
                </Button>
              </div>
            </div>
            <Card className="border-border/60">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center gap-3">
                  <Baby className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Ages</p>
                    <p className="font-medium">{service.ageRange}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="text-sm font-medium">{service.duration}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Overview */}
      <section className="py-14 lg:py-20">
        <Container className="max-w-3xl">
          <Reveal>
            <h2 className="text-2xl font-bold sm:text-3xl">Overview</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
              {service.overview.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Signs & Benefits */}
      <section className="bg-muted/40 py-14 lg:py-20">
        <Container className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <Card className="h-full border-border/60">
              <CardContent className="p-6">
                <h3 className="flex items-center gap-2 text-xl font-semibold">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  Signs it may help
                </h3>
                <ul className="mt-4 space-y-3">
                  {service.symptoms.map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>
          <Reveal direction="left">
            <Card className="h-full border-border/60">
              <CardContent className="p-6">
                <h3 className="flex items-center gap-2 text-xl font-semibold">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  Benefits
                </h3>
                <ul className="mt-4 space-y-3">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      {b}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>
        </Container>
      </section>

      {/* Process */}
      <section className="py-14 lg:py-20">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="Your therapy journey"
            description="A supportive, structured path from first visit to lasting progress."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="relative h-full rounded-2xl border border-border/60 bg-card p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full brand-gradient text-lg font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <div className="bg-muted/40">
        <FaqSection
          faqs={service.faqs}
          title={`${service.title} — FAQs`}
          description="Common questions from parents considering this service."
        />
      </div>

      {/* Related */}
      <section className="py-14 lg:py-20">
        <Container>
          <SectionHeading eyebrow="Explore more" title="Related services" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
