import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

interface LogoProps {
  className?: string;
  showText?: boolean;
  /** href — set to null to render a non-link (e.g. inside the footer heading). */
  href?: string | null;
}

/**
 * Brand lockup: NeuroShine mark + wordmark. Links home by default.
 */
export function Logo({ className, showText = true, href = "/" }: LogoProps) {
  const content = (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Image
        src={siteConfig.logo}
        alt={`${siteConfig.name} logo`}
        width={44}
        height={44}
        className="h-10 w-10 rounded-full ring-2 ring-primary/15"
        priority
      />
      {showText ? (
        <span className="flex flex-col leading-none">
          <span className="text-lg font-bold tracking-tight">
            Neuro<span className="text-primary">Shine</span>
          </span>
          <span className="mt-0.5 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Child Development Centre
          </span>
        </span>
      ) : null}
    </span>
  );

  if (href === null) return content;
  return (
    <Link href={href} aria-label={`${siteConfig.name} — home`}>
      {content}
    </Link>
  );
}
