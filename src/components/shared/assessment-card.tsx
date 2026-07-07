import * as React from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Assessment } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

export function AssessmentCard({ assessment }: { assessment: Assessment }) {
  const Icon = assessment.icon;
  return (
    <Link
      href={`/assessments/${assessment.slug}`}
      className="group block h-full"
    >
      <Card className="h-full border-border/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-lg">
        <CardContent className="flex h-full flex-col p-6">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
            <Icon className="h-6 w-6" />
          </span>
          <h3 className="mt-4 text-lg font-semibold">{assessment.title}</h3>
          <p className="mt-2 flex-1 text-sm text-muted-foreground">
            {assessment.shortDescription}
          </p>
          <span className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {assessment.duration}
          </span>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
            Learn more
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
