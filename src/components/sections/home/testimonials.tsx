"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { StarRating } from "@/components/shared/star-rating";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/content/data/site-content";

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });
  const [selected, setSelected] = React.useState(0);

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="bg-muted/40 py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Parent Stories"
          title="Loved by families"
          description="Don't just take our word for it — hear from the parents who've watched their children flourish."
        />

        <div className="mt-12">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="min-w-0 shrink-0 grow-0 basis-full px-2 sm:basis-1/2 lg:basis-1/3"
                >
                  <Card className="card-premium h-full border-0">
                    <CardContent className="flex h-full flex-col p-6">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                        <Quote className="h-5 w-5 text-primary" />
                      </span>
                      <p className="mt-4 flex-1 leading-relaxed text-foreground/90">
                        “{t.quote}”
                      </p>
                      <StarRating rating={t.rating} className="mt-5" />
                      <div className="mt-4 flex items-center gap-3 border-t pt-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full brand-gradient text-sm font-bold text-white">
                          {t.author[0]}
                        </span>
                        <div>
                          <p className="font-semibold leading-tight">{t.author}</p>
                          <p className="text-xs text-muted-foreground">
                            {t.relation}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={scrollPrev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={
                    "h-2 rounded-full transition-all " +
                    (i === selected
                      ? "w-6 bg-primary"
                      : "w-2 bg-primary/30 hover:bg-primary/50")
                  }
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={scrollNext}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
