"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "neuroshine.cookie-consent";

/**
 * GDPR-style cookie consent banner. Persists the choice in localStorage so it
 * only shows once. Analytics scripts can gate on the "accepted" value.
 */
export function CookieConsent() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  const decide = (choice: "accepted" | "declined") => {
    window.localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
    window.dispatchEvent(
      new CustomEvent("cookie-consent", { detail: choice }),
    );
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-2xl border border-border bg-card/95 p-4 shadow-xl backdrop-blur sm:p-5"
        >
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Cookie className="hidden h-8 w-8 shrink-0 text-primary sm:block" />
            <p className="flex-1 text-sm text-muted-foreground">
              We use cookies to improve your experience and analyze traffic. See
              our{" "}
              <Link
                href="/privacy-policy"
                className="font-medium text-primary underline underline-offset-2"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex shrink-0 gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => decide("declined")}
              >
                Decline
              </Button>
              <Button size="sm" onClick={() => decide("accepted")}>
                Accept
              </Button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
