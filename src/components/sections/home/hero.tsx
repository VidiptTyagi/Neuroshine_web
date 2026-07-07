import * as React from "react";
import Link from "next/link";
import { CalendarCheck, Phone, ShieldCheck, Star } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { HeroIllustration } from "@/components/shared/hero-illustration";
import { Button } from "@/components/ui/button";

const trustBadges = [
  "Certified therapists",
  "Family-centred care",
  "12+ years of trust",
];

export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Aurora mesh + floating blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 mesh-bg">
        <div className="animate-blob absolute -left-24 -top-24 h-96 w-96 rounded-full bg-primary/25 blur-3xl" />
        <div className="animate-blob absolute right-0 top-24 h-80 w-80 rounded-full bg-accent/25 blur-3xl [animation-delay:3s]" />
        <div className="animate-blob absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-chart-3/20 blur-3xl [animation-delay:6s]" />
      </div>

      <Container className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/60 px-3.5 py-1.5 text-xs font-semibold text-primary shadow-soft backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Trusted child-development therapy centre
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-[3.5rem]">
              Bringing out the{" "}
              <span className="brand-gradient-text-vivid">best</span>
              <br className="hidden sm:block" /> in every{" "}
              <span className="brand-gradient-text-vivid">mind</span>.
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
              Compassionate, evidence-based therapy — speech, occupational,
              behaviour, autism support, special education and assessments — all
              under one caring roof.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="sheen h-12 rounded-full px-7 text-base shadow-glow"
              >
                <Link href="/appointment">
                  <CalendarCheck className="h-5 w-5" />
                  Book Appointment
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-primary/25 bg-background/50 px-7 text-base backdrop-blur hover-lift"
              >
                <a href={siteConfig.contact.phoneHref}>
                  <Phone className="h-5 w-5" />
                  Call Now
                </a>
              </Button>
            </div>
          </Reveal>

          {/* Trust row */}
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {["A", "R", "S", "M"].map((c, i) => (
                    <span
                      key={c}
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background text-xs font-bold text-white brand-gradient"
                      style={{ zIndex: 10 - i }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    Loved by <strong className="text-foreground">100+</strong> parents
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {trustBadges.map((b) => (
                <li key={b} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Illustration panel */}
        <Reveal direction="left" delay={0.1}>
          <div className="relative mx-auto w-full max-w-lg">
            <div className="glass-strong rounded-[2rem] p-4 sm:p-6">
              <HeroIllustration className="mx-auto w-full max-w-md" />
            </div>

            {/* Floating stat chips */}
            <div className="glass-strong animate-float absolute -left-3 top-10 hidden rounded-2xl px-4 py-3 sm:block">
              <p className="text-2xl font-extrabold text-primary">100+</p>
              <p className="text-xs text-muted-foreground">Children helped</p>
            </div>
            <div className="glass-strong animate-float-slow absolute -bottom-3 -right-2 hidden rounded-2xl px-4 py-3 sm:block">
              <p className="text-2xl font-extrabold brand-gradient-text">5+</p>
              <p className="text-xs text-muted-foreground">Certified experts</p>
            </div>
            <div className="glass-strong animate-float absolute -right-3 top-1/3 hidden rounded-2xl px-3 py-2 md:block [animation-delay:1.5s]">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                  ✓
                </span>
                <span className="text-xs font-medium">Personalised plans</span>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
