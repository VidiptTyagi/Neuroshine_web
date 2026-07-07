"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, CalendarCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { mainNav } from "@/config/navigation";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  // Close the drawer whenever the route changes.
  React.useEffect(() => setOpen(false), [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full xl:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm p-0">
        <SheetHeader className="border-b p-4 text-left">
          <SheetTitle asChild>
            <Logo href="/" />
          </SheetTitle>
        </SheetHeader>

        <div className="flex h-[calc(100dvh-8.5rem)] flex-col overflow-y-auto p-4">
          <Accordion type="multiple" className="w-full">
            {mainNav.map((item) =>
              item.children ? (
                <AccordionItem
                  key={item.title}
                  value={item.title}
                  className="border-b-0"
                >
                  <AccordionTrigger className="py-3 text-base font-medium hover:no-underline">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="ml-2 space-y-1 border-l pl-3">
                      {item.children.map((link) => (
                        <li key={link.href}>
                          <SheetClose asChild>
                            <Link
                              href={link.href}
                              className="block rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent/10 hover:text-primary"
                            >
                              {link.title}
                            </Link>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <SheetClose asChild key={item.title}>
                  <Link
                    href={item.href ?? "#"}
                    className="flex items-center border-b py-3 text-base font-medium transition-colors hover:text-primary"
                  >
                    {item.title}
                  </Link>
                </SheetClose>
              ),
            )}
          </Accordion>
        </div>

        <div className="grid grid-cols-1 gap-2 border-t p-4">
          <Button asChild className="rounded-full">
            <Link href="/appointment">
              <CalendarCheck className="h-4 w-4" />
              Book Appointment
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <a href={siteConfig.contact.phoneHref}>
              <Phone className="h-4 w-4" />
              {siteConfig.contact.phone}
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
