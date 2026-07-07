import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}

/**
 * Consistent section header: kicker eyebrow + title + optional description.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  as = "h2",
}: SectionHeadingProps) {
  const Title = as;
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary",
            align === "center" && "mx-auto",
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full brand-gradient" />
          {eyebrow}
        </span>
      ) : null}
      <Title className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
      </Title>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
