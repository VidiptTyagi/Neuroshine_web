import type { Metadata } from "next";
import { Phone, Mail, Clock, ShieldCheck } from "lucide-react";
import { getSite } from "@/lib/site";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { AppointmentForm } from "@/components/forms/appointment-form";
import { Card, CardContent } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Book an Appointment",
  description:
    "Book a consultation or therapy session at NeuroShine. Choose your service, therapist, date and time — we'll confirm within one working day.",
  path: "/appointment",
});

export default async function AppointmentPage() {
  const siteConfig = await getSite();
  return (
    <>
      <PageHeader
        eyebrow="Book Online"
        title="Book an appointment"
        description="Take the first step toward brighter tomorrows. Fill in the form and our team will confirm your appointment within one working day."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Appointment", path: "/appointment" },
        ]}
      />
      <section className="py-14 lg:py-20">
        <Container className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <Card className="border-border/60">
            <CardContent className="p-6 sm:p-8">
              <AppointmentForm />
            </CardContent>
          </Card>

          <aside className="space-y-4">
            <Card className="border-border/60">
              <CardContent className="space-y-4 p-6">
                <h3 className="font-semibold">Prefer to talk to us?</h3>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="flex items-center gap-3 text-sm hover:text-primary"
                >
                  <Phone className="h-5 w-5 text-primary" />
                  {siteConfig.contact.phone}
                </a>
                <a
                  href={siteConfig.contact.emailHref}
                  className="flex items-center gap-3 text-sm hover:text-primary"
                >
                  <Mail className="h-5 w-5 text-primary" />
                  {siteConfig.contact.email}
                </a>
                <div className="flex items-start gap-3 text-sm">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    {siteConfig.hours.map((h) => (
                      <p key={h.day}>
                        <span className="font-medium">{h.day}:</span> {h.time}
                      </p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="flex gap-3 p-6">
                <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
                <p className="text-sm text-muted-foreground">
                  Your information is kept private and secure, and used only to
                  arrange your child's care.
                </p>
              </CardContent>
            </Card>
          </aside>
        </Container>
      </section>
    </>
  );
}
