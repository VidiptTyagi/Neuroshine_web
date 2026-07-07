"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/config/navigation";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

interface DashboardShellProps {
  nav: NavLink[];
  label: string;
  children: React.ReactNode;
  /** Optional slot for account controls (Clerk <UserButton> added in Phase 8). */
  account?: React.ReactNode;
}

/**
 * Reusable authenticated dashboard layout with a fixed sidebar (desktop),
 * a slide-over drawer (mobile) and a sticky topbar. Powers both the
 * patient/parent portals and the admin panel.
 */
export function DashboardShell({
  nav,
  label,
  children,
  account,
}: DashboardShellProps) {
  const pathname = usePathname();

  const NavList = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="flex flex-col gap-1" aria-label={label}>
      {nav.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent/10 hover:text-foreground",
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-dvh w-full">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r bg-sidebar p-4 lg:flex">
        <Logo />
        <div className="mt-1 mb-4 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <div className="flex-1 overflow-y-auto">
          <NavList />
        </div>
        {account ? <div className="border-t pt-3">{account}</div> : null}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="glass sticky top-0 z-30 flex h-16 items-center justify-between gap-2 border-b px-4">
          <div className="flex items-center gap-2">
            {/* Mobile drawer */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open navigation"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-4">
                <SheetTitle asChild>
                  <Logo href="/" />
                </SheetTitle>
                <div className="mt-6">
                  <NavList />
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="text-base font-semibold">{label}</h1>
          </div>
          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            {account}
          </div>
        </header>

        <main className="flex-1 bg-muted/30 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
