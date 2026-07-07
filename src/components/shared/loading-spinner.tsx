import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Accessible loading indicator used by route-level loading.tsx and buttons.
 */
export function LoadingSpinner({
  className,
  label = "Loading",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <span role="status" aria-live="polite" className="inline-flex items-center">
      <Loader2 className={cn("h-5 w-5 animate-spin text-primary", className)} />
      <span className="sr-only">{label}…</span>
    </span>
  );
}

/**
 * Full-viewport centered loader for page transitions.
 */
export function PageLoader() {
  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center">
      <LoadingSpinner className="h-8 w-8" />
    </div>
  );
}
