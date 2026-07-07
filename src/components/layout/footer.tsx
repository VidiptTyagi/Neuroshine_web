import * as React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";
import { getSite } from "@/lib/site";
import { footerNav } from "@/config/navigation";
import { Logo } from "@/components/shared/logo";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { Separator } from "@/components/ui/separator";

export async function Footer() {
  const siteConfig = await getSite();
  const year = new Date().getFullYear();

  const socials = [
    { icon: Facebook, href: siteConfig.socials.facebook, label: "Facebook" },
    { icon: Instagram, href: siteConfig.socials.instagram, label: "Instagram" },
    { icon: Youtube, href: siteConfig.socials.youtube, label: "YouTube" },
    { icon: Linkedin, href: siteConfig.socials.linkedin, label: "LinkedIn" },
  ];

  return (
    <footer className="mt-auto border-t bg-muted/40">
      {/* Newsletter band */}
      <div className="border-b">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 container-px py-8 md:flex-row md:items-center">
          <div>
            <h3 className="text-lg font-semibold">
              Join our parenting & therapy newsletter
            </h3>
            <p className="text-sm text-muted-foreground">
              Expert tips, activities and updates — straight to your inbox.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* Main columns */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 container-px py-12 md:grid-cols-3 lg:grid-cols-5">
        <div className="col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            {siteConfig.legalName} — {siteConfig.tagline}. Compassionate,
            evidence-based developmental care for every child.
          </p>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li className="flex items-start gap-2.5 text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                {siteConfig.address.street}, {siteConfig.address.locality},{" "}
                {siteConfig.address.region} {siteConfig.address.postalCode}
              </span>
            </li>
            <li>
              <a
                href={siteConfig.contact.phoneHref}
                className="flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                {siteConfig.contact.phone}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.contact.emailHref}
                className="flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5 text-muted-foreground">
              <Clock className="h-4 w-4 shrink-0 text-primary" />
              {siteConfig.hours[0].day}: {siteConfig.hours[0].time}
            </li>
          </ul>
        </div>

        {footerNav.map((column) => (
          <nav key={column.heading} aria-label={column.heading}>
            <h4 className="text-sm font-semibold">{column.heading}</h4>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <Separator />

      {/* Bottom bar */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 container-px py-6 sm:flex-row">
        <p className="text-xs text-muted-foreground">
          © {year} {siteConfig.legalName}. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <Link href="/privacy-policy" className="hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-primary">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
