import type { Metadata } from "next";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  AlertCircle,
} from "lucide-react";
import { getSite } from "@/lib/site";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { ContactForm } from "@/components/forms/contact-form";
import { JsonLd } from "@/components/seo/json-ld";
import { localBusinessSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with NeuroShine Child Development Centre — phone, WhatsApp, email, address, business hours and directions.",
  path: "/contact",
});

export default async function ContactPage() {
  const siteConfig = await getSite();
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    siteConfig.address.mapQuery,
  )}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  const info = [
    {
      icon: MapPin,
      label: "Visit us",
      value: `${siteConfig.address.street}, ${siteConfig.address.locality}, ${siteConfig.address.region} ${siteConfig.address.postalCode}`,
    },
    { icon: Phone, label: "Call us", value: siteConfig.contact.phone, href: siteConfig.contact.phoneHref },
    { icon: MessageCircle, label: "WhatsApp", value: siteConfig.contact.phone, href: siteConfig.contact.whatsappHref },
    { icon: Mail, label: "Email us", value: siteConfig.contact.email, href: siteConfig.contact.emailHref },
  ];

  return (
    <>
      <JsonLd data={localBusinessSchema(siteConfig)} />
      <PageHeader
        eyebrow="Contact"
        title="We'd love to hear from you"
        description="Have a question or ready to book? Reach out and our friendly team will help you take the next step."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />

      <section className="py-14 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          {/* Info + form */}
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {info.map((item) => {
                const Icon = item.icon;
                const inner = (
                  <Card className="h-full border-border/60 transition-colors hover:border-primary/40">
                    <CardContent className="p-5">
                      <Icon className="h-6 w-6 text-primary" />
                      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm font-medium">{item.value}</p>
                    </CardContent>
                  </Card>
                );
                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={item.label}>{inner}</div>
                );
              })}
            </div>

            <Card className="mt-4 border-border/60">
              <CardContent className="flex items-start gap-3 p-5">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div className="text-sm">
                  <p className="font-semibold">Business hours</p>
                  {siteConfig.hours.map((h) => (
                    <p key={h.day} className="text-muted-foreground">
                      {h.day}: {h.time}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4 border-destructive/30 bg-destructive/5">
              <CardContent className="flex items-start gap-3 p-5">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                <div className="text-sm">
                  <p className="font-semibold">Emergency contact</p>
                  <a
                    href={`tel:${siteConfig.contact.emergency.replace(/\s/g, "")}`}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    {siteConfig.contact.emergency}
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/60">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-xl font-bold">Send us a message</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                We usually reply within one working day.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>

      {/* Map */}
      <section className="pb-14 lg:pb-20">
        <Container>
          <div className="overflow-hidden rounded-2xl border">
            <iframe
              title="NeuroShine location map"
              src={mapSrc}
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
