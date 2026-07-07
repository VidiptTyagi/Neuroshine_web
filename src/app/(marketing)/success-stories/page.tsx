import type { Metadata } from "next";
import { Quote, Sparkles, PlayCircle } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { StarRating } from "@/components/shared/star-rating";
import { HomeCta } from "@/components/sections/home/cta";
import { buildMetadata } from "@/lib/seo/metadata";
import { Card, CardContent } from "@/components/ui/card";
import { successStories } from "@/content/data/misc";
import { testimonials } from "@/content/data/site-content";

export const metadata: Metadata = buildMetadata({
  title: "Success Stories",
  description:
    "Real transformation stories from NeuroShine families — see how children have grown, thrived and shone with the right support.",
  path: "/success-stories",
});

export default function SuccessStoriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Success Stories"
        title="Real children, real transformations"
        description="Behind every milestone is a determined child, a loving family and a dedicated team. Here are just a few of the journeys we're proud to be part of."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Success Stories", path: "/success-stories" },
        ]}
      />

      {/* Transformation stories */}
      <section className="py-14 lg:py-20">
        <Container>
          <RevealGroup className="grid gap-6 md:grid-cols-2">
            {successStories.map((story) => (
              <RevealItem key={story.childName}>
                <Card className="h-full border-border/60">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full brand-gradient text-lg font-bold text-white">
                        {story.childName[0]}
                      </span>
                      <div>
                        <h3 className="font-semibold">
                          {story.childName}, {story.age}
                        </h3>
                        <p className="text-xs text-primary">{story.condition}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">
                      {story.summary}
                    </p>
                    <div className="mt-4 flex items-start gap-2 rounded-xl bg-emerald-500/5 p-4">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <p className="text-sm font-medium">{story.outcome}</p>
                    </div>
                    <p className="mt-4 text-xs italic text-muted-foreground">
                      — {story.parent}
                    </p>
                  </CardContent>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Video testimonials placeholder */}
      <section className="bg-muted/40 py-14 lg:py-20">
        <Container>
          <SectionHeading
            eyebrow="Video Stories"
            title="Hear it from our families"
            description="Video testimonials from parents sharing their NeuroShine journey."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {["Priya & Aarav", "Rahul & Zara", "Aisha & Vivaan"].map((name) => (
              <Card key={name} className="overflow-hidden border-border/60">
                <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                  <PlayCircle className="h-14 w-14 text-primary" />
                </div>
                <CardContent className="p-5">
                  <p className="font-medium">{name}</p>
                  <p className="text-sm text-muted-foreground">
                    A parent's story of progress and hope.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Written reviews */}
      <section className="py-14 lg:py-20">
        <Container>
          <SectionHeading eyebrow="Parent Reviews" title="In their words" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Card key={i} className="h-full border-border/60">
                <CardContent className="flex h-full flex-col p-6">
                  <Quote className="h-7 w-7 text-primary/30" />
                  <p className="mt-3 flex-1 text-sm text-foreground/90">
                    “{t.quote}”
                  </p>
                  <StarRating rating={t.rating} className="mt-4" />
                  <p className="mt-2 text-sm font-semibold">{t.author}</p>
                  <p className="text-xs text-muted-foreground">{t.relation}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <HomeCta />
    </>
  );
}
