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
  // Controlled so the mega-menu opens on click rather than on hover.
  const [openMenu, setOpenMenu] = React.useState("");

  // A link inside the menu navigates without closing it, which would leave the
  // page scroll-locked on the new route.
  React.useEffect(() => setOpenMenu(""), [pathname]);

  // While the mega-menu is open the page behind it must not scroll. Pad for the
  // scrollbar so the layout doesn't jump as it disappears.
  React.useEffect(() => {
    if (!openMenu) return;
    const { body } = document;
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (gutter > 0) body.style.paddingRight = `${gutter}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, [openMenu]);

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
        <NavigationMenu
          value={openMenu}
          onValueChange={setOpenMenu}
          className="hidden max-w-none flex-1 justify-center xl:flex"
        >
          <NavigationMenuList>
            {mainNav.map((item) => (
              <DesktopNavItem
                key={item.title}
                item={item}
                pathname={pathname}
                onNavigate={() => setOpenMenu("")}
              />
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
  onNavigate,
}: {
  item: NavItem;
  pathname: string;
  onNavigate: () => void;
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
      {/* Radix opens this on hover by default. Swallowing the pointer events it
          listens for leaves the trigger's own click handling as the only way in
          or out, so the menu behaves like a button. */}
      <NavigationMenuTrigger
        className="rounded-full bg-transparent text-sm font-medium"
        onPointerMove={(e) => e.preventDefault()}
        onPointerLeave={(e) => e.preventDefault()}
      >
        {item.title}
      </NavigationMenuTrigger>
      <NavigationMenuContent
        onPointerEnter={(e) => e.preventDefault()}
        onPointerLeave={(e) => e.preventDefault()}
      >
        {/* Services lists 18 items; keep a tall panel inside its own scroll area
            instead of letting it run past the viewport. */}
        <ul className="grid max-h-[calc(100vh-8rem)] w-[min(90vw,44rem)] grid-cols-2 gap-1 overflow-y-auto overscroll-contain p-3">
          {item.children.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
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
