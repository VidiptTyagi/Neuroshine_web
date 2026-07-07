import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarClock, ArrowRight } from "lucide-react";
import type { Therapist } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function initials(name: string) {
  return name
    .replace(/^Dr\.?\s+/i, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

export function TherapistCard({ therapist }: { therapist: Therapist }) {
  return (
    <Card className="card-premium group h-full overflow-hidden border-0">
      <div className="flex items-center justify-center bg-gradient-to-br from-primary/15 via-chart-3/10 to-accent/15 py-8">
        {therapist.image ? (
          <Image
            src={therapist.image}
            alt={therapist.name}
            width={112}
            height={112}
            className="h-28 w-28 rounded-full object-cover ring-4 ring-background"
          />
        ) : (
          <span className="flex h-28 w-28 items-center justify-center rounded-full brand-gradient text-3xl font-bold text-white ring-4 ring-background">
            {initials(therapist.name)}
          </span>
        )}
      </div>
      <CardContent className="p-5">
        <h3 className="text-lg font-semibold">{therapist.name}</h3>
        <p className="text-sm font-medium text-primary">{therapist.role}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {therapist.qualification} · {therapist.experienceYears}+ yrs
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {therapist.specializations.slice(0, 2).map((s) => (
            <Badge key={s} variant="secondary" className="font-normal">
              {s}
            </Badge>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarClock className="h-3.5 w-3.5" />
          Available: {therapist.availability}
        </div>
        <Link
          href={`/therapists/${therapist.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View profile
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
