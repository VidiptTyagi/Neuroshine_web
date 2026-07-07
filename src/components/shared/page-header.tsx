import * as React from "react";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Breadcrumbs, type Crumb } from "@/components/layout/breadcrumbs";

interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}

/**
 * Standard hero band for listing / static pages: breadcrumbs, eyebrow,
 * title and description, on a soft gradient background.
 */
export function PageHeader({
  title,
  description,
  eyebrow,
  crumbs,
  children,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b mesh-bg">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-blob absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="animate-blob absolute -right-24 top-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl [animation-delay:4s]" />
      </div>
      <Container className="py-12 lg:py-16">
        {crumbs ? <Breadcrumbs items={crumbs} /> : null}
        <Reveal className={crumbs ? "mt-6" : ""}>
          {eyebrow ? (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold text-balance sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-6">{children}</div> : null}
        </Reveal>
      </Container>
    </section>
  );
}
