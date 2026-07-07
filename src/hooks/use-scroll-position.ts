"use client";

import { useEffect, useState } from "react";

/**
 * Tracks vertical scroll position and whether the page is scrolled past
 * a threshold — used by the sticky navbar and the back-to-top button.
 */
export function useScrollPosition(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  const [y, setY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const value = window.scrollY;
      setY(value);
      setScrolled(value > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { scrolled, y };
}
