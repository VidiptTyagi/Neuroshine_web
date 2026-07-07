import * as React from "react";

/**
 * Bespoke, self-contained healthcare hero illustration.
 * Pure inline SVG + CSS animations (no external Lottie/JSON) so it's fast,
 * CSP-safe and Lighthouse-friendly. Decorative → aria-hidden.
 *
 * A friendly "mind in caring hands" motif with a soft aura, radiating shine,
 * gentle pulse rings and floating therapy chips (speech, OT, heart, play).
 */
export function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 520"
      className={className}
      role="img"
      aria-label="Illustration of a child's mind nurtured by caring hands"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ns-aura" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.72 0.13 210)" />
          <stop offset="50%" stopColor="oklch(0.55 0.22 262)" />
          <stop offset="100%" stopColor="oklch(0.55 0.24 300)" />
        </linearGradient>
        <linearGradient id="ns-brain" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.68 0.16 285)" />
          <stop offset="100%" stopColor="oklch(0.6 0.2 300)" />
        </linearGradient>
        <linearGradient id="ns-hand" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.5 0.2 262)" />
          <stop offset="100%" stopColor="oklch(0.62 0.16 245)" />
        </linearGradient>
        <radialGradient id="ns-glow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="oklch(0.72 0.13 210)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="oklch(0.72 0.13 210)" stopOpacity="0" />
        </radialGradient>
        <filter id="ns-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="oklch(0.55 0.22 262)" floodOpacity="0.28" />
        </filter>
      </defs>

      {/* Aura glow */}
      <circle cx="260" cy="250" r="210" fill="url(#ns-glow)" />

      {/* Pulse rings */}
      <g fill="none" stroke="url(#ns-aura)" strokeWidth="2">
        <circle cx="260" cy="248" r="150" opacity="0.25" style={{ transformOrigin: "260px 248px", animation: "pulse-ring 4s ease-out infinite" }} />
        <circle cx="260" cy="248" r="150" opacity="0.2" style={{ transformOrigin: "260px 248px", animation: "pulse-ring 4s ease-out infinite 1.3s" }} />
      </g>

      {/* Soft backdrop disc */}
      <circle cx="260" cy="248" r="140" fill="oklch(0.98 0.01 250)" opacity="0.6" />
      <circle cx="260" cy="248" r="140" fill="none" stroke="oklch(0.55 0.22 262)" strokeOpacity="0.12" strokeWidth="1.5" />

      {/* Radiating shine lines */}
      <g stroke="url(#ns-aura)" strokeWidth="6" strokeLinecap="round" className="animate-float-slow">
        <line x1="260" y1="118" x2="260" y2="86" />
        <line x1="190" y1="140" x2="172" y2="112" />
        <line x1="330" y1="140" x2="348" y2="112" />
        <line x1="150" y1="196" x2="120" y2="180" />
        <line x1="370" y1="196" x2="400" y2="180" />
      </g>

      {/* Caring hands */}
      <g filter="url(#ns-soft)">
        <path
          d="M150 330c-14-6-30 2-30 20 0 26 40 74 110 74s110-46 110-74c0-18-16-26-30-20-8-30-40-52-80-52s-72 22-80 52z"
          fill="url(#ns-hand)"
        />
        <path
          d="M175 336c10-24 42-42 85-42s75 18 85 42"
          fill="none"
          stroke="oklch(0.98 0.01 250)"
          strokeOpacity="0.5"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>

      {/* Brain (the nurtured mind) */}
      <g filter="url(#ns-soft)" className="animate-float">
        <path
          d="M260 168c-20-16-56-10-64 14-22 2-34 22-26 40-14 12-12 36 6 44 6 20 34 28 50 16 8 8 22 8 34 0 16 12 44 4 50-16 18-8 20-32 6-44 8-18-4-38-26-40-8-24-44-30-64-14 8 6 8 0 8 0 6-6 20-6 26 0"
          fill="url(#ns-brain)"
        />
        {/* Neural folds */}
        <g fill="none" stroke="oklch(0.98 0.01 250)" strokeOpacity="0.55" strokeWidth="3.5" strokeLinecap="round">
          <path d="M260 176v112" />
          <path d="M234 196c-14 6-16 22-6 30" />
          <path d="M286 196c14 6 16 22 6 30" />
          <path d="M226 238c-8 8-6 22 6 28" />
          <path d="M294 238c8 8 6 22-6 28" />
        </g>
      </g>

      {/* Floating therapy chips */}
      {/* Speech bubble */}
      <g className="animate-float" style={{ animationDelay: "0.4s" }}>
        <rect x="72" y="150" width="64" height="48" rx="16" fill="oklch(1 0 0)" filter="url(#ns-soft)" />
        <circle cx="92" cy="174" r="4" fill="oklch(0.55 0.22 262)" />
        <circle cx="104" cy="174" r="4" fill="oklch(0.62 0.18 245)" />
        <circle cx="116" cy="174" r="4" fill="oklch(0.55 0.24 300)" />
      </g>
      {/* Heart */}
      <g className="animate-float-slow" style={{ animationDelay: "0.9s" }}>
        <circle cx="410" cy="150" r="30" fill="oklch(1 0 0)" filter="url(#ns-soft)" />
        <path d="M410 162c-10-7-18-12-18-21 0-6 5-9 9-9 4 0 7 3 9 5 2-2 5-5 9-5 4 0 9 3 9 9 0 9-8 14-18 21z" fill="oklch(0.6 0.2 15)" />
      </g>
      {/* Puzzle piece */}
      <g className="animate-float" style={{ animationDelay: "1.3s" }}>
        <rect x="386" y="330" width="60" height="60" rx="16" fill="oklch(1 0 0)" filter="url(#ns-soft)" />
        <path d="M404 350h10a6 6 0 1112 0h10v10a6 6 0 100 12v10h-32z" fill="oklch(0.55 0.24 300)" />
      </g>
      {/* Star / sparkle */}
      <g className="animate-float-slow" style={{ animationDelay: "0.2s" }}>
        <circle cx="96" cy="356" r="26" fill="oklch(1 0 0)" filter="url(#ns-soft)" />
        <path d="M96 342l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="oklch(0.72 0.16 90)" />
      </g>
    </svg>
  );
}
