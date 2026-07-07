import * as React from "react";
import Link from "next/link";
import { CalendarCheck, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";

export function HomeCta() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] brand-gradient-vivid px-6 py-16 text-center text-white shadow-glow sm:px-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-25"
            >
              <div className="animate-blob absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/40 blur-2xl" />
              <div className="animate-blob absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-white/25 blur-2xl [animation-delay:4s]" />
            </div>
            {/* subtle grid texture */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
                backgroundSize: "36px 36px",
              }}
            />
            <h2 className="relative text-3xl font-bold text-balance sm:text-4xl">
              Ready to help your child shine?
            </h2>
            <p className="relative mx-auto mt-4 max-w-2xl text-white/90">
              Book a consultation today and take the first step toward brighter
              tomorrows. Our team is here to guide you every step of the way.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="rounded-full bg-white text-primary hover:bg-white/90"
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
                className="rounded-full border-white/70 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <a href={siteConfig.contact.phoneHref}>
                  <Phone className="h-5 w-5" />
                  {siteConfig.contact.phone}
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
