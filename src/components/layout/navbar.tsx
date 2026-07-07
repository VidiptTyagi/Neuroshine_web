"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav, type NavItem } from "@/config/navigation";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { MobileNav } from "./mobile-nav";

export function Navbar() {
  const { scrolled } = useScrollPosition(8);
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "glass border-b shadow-sm"
          : "border-b border-transparent bg-background/40 backdrop-blur-sm",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center gap-4 container-px lg:h-18"
      >
        <div className="shrink-0">
          <Logo />
        </div>

        {/* Desktop navigation — grows to fill and stays centered.
            Shown at xl+; below that the tidy hamburger drawer is used. */}
        <NavigationMenu className="hidden max-w-none flex-1 justify-center xl:flex">
          <NavigationMenuList>
            {mainNav.map((item) => (
              <DesktopNavItem key={item.title} item={item} pathname={pathname} />
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Actions */}
        <div className="ml-auto flex shrink-0 items-center gap-1.5 xl:ml-0">
          <ThemeToggle />
          <Button asChild className="hidden rounded-full sm:inline-flex">
            <Link href="/appointment">
              <CalendarCheck className="h-4 w-4" />
              Book Appointment
            </Link>
          </Button>
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}

function DesktopNavItem({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  if (!item.children) {
    const active =
      item.href === "/"
        ? pathname === "/"
        : pathname.startsWith(item.href ?? "###");
    return (
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            href={item.href ?? "#"}
            className={cn(
              "inline-flex h-9 items-center rounded-full px-3.5 text-sm font-medium transition-colors hover:bg-accent/10 hover:text-primary",
              active && "text-primary",
            )}
          >
            {item.title}
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="rounded-full bg-transparent text-sm font-medium">
        {item.title}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[min(90vw,44rem)] grid-cols-2 gap-1 p-3">
          {item.children.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={link.href}
                    className="flex gap-3 rounded-xl p-3 leading-none no-underline transition-colors hover:bg-accent/10 focus:bg-accent/10"
                  >
                    {Icon ? (
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                    ) : null}
                    <span className="space-y-1">
                      <span className="block text-sm font-semibold">
                        {link.title}
                      </span>
                      {link.description ? (
                        <span className="line-clamp-2 block text-xs text-muted-foreground">
                          {link.description}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                </NavigationMenuLink>
              </li>
            );
          })}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
