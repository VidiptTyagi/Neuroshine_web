"use client";

import * as React from "react";
import Script from "next/script";

const CONSENT_KEY = "neuroshine.cookie-consent";

/**
 * Google Analytics (GA4) loaded only when:
 *   1. NEXT_PUBLIC_GA_MEASUREMENT_ID is set, and
 *   2. the visitor has accepted cookies (via the CookieConsent banner).
 * Listens for the `cookie-consent` event so it activates the moment a
 * visitor accepts, without a page reload.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const [consented, setConsented] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem(CONSENT_KEY) === "accepted") setConsented(true);
    const onConsent = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail === "accepted") setConsented(true);
    };
    window.addEventListener("cookie-consent", onConsent);
    return () => window.removeEventListener("cookie-consent", onConsent);
  }, []);

  if (!gaId || !consented) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
