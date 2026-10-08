"use client";

/**
 * Original, Apple-visual-language dock icons: glossy rounded tiles with
 * soft gradients and simple white glyphs. Drawn from scratch — no Apple or
 * third-party artwork.
 */
export function DockGlyph({ app }: { app: string }) {
  const common = "h-full w-full";
  switch (app) {
    case "finder":
      return (
        <svg viewBox="0 0 56 56" className={common} aria-hidden>
          <defs>
            <linearGradient id="i-finder-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#9BD6FB" />
              <stop offset="0.55" stopColor="#4DA9F4" />
              <stop offset="1" stopColor="#1D7CE0" />
            </linearGradient>
            <linearGradient id="i-finder-face" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#E8F4FF" />
            </linearGradient>
          </defs>
          <rect width="56" height="56" rx="13" fill="url(#i-finder-bg)" />
          {/* left face panel */}
          <path
            d="M13 3h9.5C26 3 28 5 28 8.5v39c0 3.5-2 5.5-5.5 5.5H13C7.5 53 3 48.5 3 43V13C3 7.5 7.5 3 13 3z"
            fill="url(#i-finder-face)"
          />
          {/* eyes */}
          <rect x="9" y="17" width="3" height="7" rx="1.5" fill="#1B4F91" />
          <rect x="17.5" y="17" width="3" height="7" rx="1.5" fill="#1B4F91" />
          {/* smile crossing the divide */}
          <path
            d="M8 33c4.5 4.6 10.5 6.6 16 6.2"
            stroke="#1B4F91"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M24 39.2c5.5-.4 9.5-3 12.4-7"
            stroke="#FFFFFF"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
          {/* gloss */}
          <path d="M3 14Q3 3 14 3h28q11 0 11 11v5Q28 27 3 19v-5z" fill="#FFFFFF" opacity="0.16" />
        </svg>
      );
    case "projects":
      return (
        <svg viewBox="0 0 56 56" className={common} aria-hidden>
          <defs>
            <linearGradient id="i-proj-front" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#6EC4F9" />
              <stop offset="1" stopColor="#2E8FE8" />
            </linearGradient>
            <linearGradient id="i-proj-back" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3E9BF0" />
              <stop offset="1" stopColor="#1F6FD0" />
            </linearGradient>
          </defs>
          {/* back tab */}
          <path
            d="M6 13c0-3 2.2-5 5.2-5h10.6c1.6 0 2.6.7 3.3 1.9l2 3.4c.6 1 1.6 1.7 3.2 1.7H46c3 0 4.5 2 4.5 5v4H6v-11z"
            fill="url(#i-proj-back)"
          />
          {/* front panel */}
          <path
            d="M4.5 18h47c1.8 0 3 1.4 2.8 3.1l-2.6 24.2c-.2 2.4-2.1 4.2-4.5 4.2H8.8c-2.4 0-4.3-1.8-4.5-4.2L1.7 21.1C1.5 19.4 2.7 18 4.5 18z"
            fill="url(#i-proj-front)"
          />
          {/* gloss */}
          <path d="M6 14Q6 8.5 11.5 8.5h10" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M6.5 22h43l-.7 6.5c-14 5-28.7 5-42.3.6L6.5 22z" fill="#FFFFFF" opacity="0.18" />
        </svg>
      );
    case "notes":
      return (
        <svg viewBox="0 0 56 56" className={common} aria-hidden>
          <defs>
            <linearGradient id="i-notes-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#F0EFE6" />
            </linearGradient>
            <linearGradient id="i-notes-band" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFE873" />
              <stop offset="1" stopColor="#FFD53D" />
            </linearGradient>
          </defs>
          <rect width="56" height="56" rx="13" fill="url(#i-notes-bg)" />
          <clipPath id="i-notes-clip">
            <rect width="56" height="56" rx="13" />
          </clipPath>
          <g clipPath="url(#i-notes-clip)">
            <rect x="0" y="0" width="56" height="14.5" fill="url(#i-notes-band)" />
            <path d="M0 13.5h56v1.2H0z" fill="#E5B90F" opacity="0.35" />
            <rect x="8" y="21" width="40" height="3" rx="1.5" fill="#C9C7BC" />
            <rect x="8" y="28.5" width="40" height="3" rx="1.5" fill="#C9C7BC" />
            <rect x="8" y="36" width="28" height="3" rx="1.5" fill="#C9C7BC" />
            <path d="M0 0h56v9Q28 16 0 9V0z" fill="#FFFFFF" opacity="0.35" />
          </g>
        </svg>
      );
    case "writing":
      return (
        <svg viewBox="0 0 56 56" className={common} aria-hidden>
          <defs>
            <linearGradient id="i-write-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#BCA4FF" />
              <stop offset="1" stopColor="#7B57F5" />
            </linearGradient>
          </defs>
          <rect width="56" height="56" rx="13" fill="url(#i-write-bg)" />
          {/* quill nib */}
          <path
            d="M41.5 12.5c-8.5 1.5-16.6 6.3-22 13.6-2.6 3.5-4 7.3-4.4 10.8l7.5-4.6-.8 8.2 8-5.2c2.7-5.8 8.6-13.4 11.7-22.8z"
            fill="#FFFFFF"
          />
          <path d="M22.6 32.3L18 41" stroke="#7B57F5" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M4 14Q4 3 15 3h26q11 0 11 11v4Q28 26 4 18v-4z" fill="#FFFFFF" opacity="0.2" />
        </svg>
      );
    case "terminal":
      return (
        <svg viewBox="0 0 56 56" className={common} aria-hidden>
          <defs>
            <linearGradient id="i-term-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3A3A3E" />
              <stop offset="0.12" stopColor="#232327" />
              <stop offset="1" stopColor="#0C0C0E" />
            </linearGradient>
          </defs>
          <rect width="56" height="56" rx="13" fill="url(#i-term-bg)" />
          <path d="M4 14Q4 4 14 4h28q10 0 10 10v3Q28 24 4 17v-3z" fill="#FFFFFF" opacity="0.1" />
          <path
            d="M13 19l8.5 6.5L13 32"
            stroke="#E8E8EA"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path d="M25 35.5h13" stroke="#E8E8EA" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "resume":
      return (
        <svg viewBox="0 0 56 56" className={common} aria-hidden>
          <defs>
            <linearGradient id="i-resume-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#ECECF1" />
            </linearGradient>
            <linearGradient id="i-resume-band" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#FF5F57" />
              <stop offset="1" stopColor="#E5234E" />
            </linearGradient>
          </defs>
          <rect width="56" height="56" rx="13" fill="url(#i-resume-bg)" />
          <rect x="14" y="9" width="28" height="38" rx="3.5" fill="#FFFFFF" stroke="#DCDCE2" />
          <path d="M14 12.5A3.5 3.5 0 0 1 17.5 9h21A3.5 3.5 0 0 1 42 12.5V17H14v-4.5z" fill="url(#i-resume-band)" />
          <rect x="18" y="23" width="20" height="2.6" rx="1.3" fill="#B9B9C2" />
          <rect x="18" y="28.5" width="20" height="2.6" rx="1.3" fill="#B9B9C2" />
          <rect x="18" y="34" width="13" height="2.6" rx="1.3" fill="#B9B9C2" />
          <path d="M4 14Q4 3 15 3h26q11 0 11 11v3Q28 24 4 17v-3z" fill="#FFFFFF" opacity="0.5" />
        </svg>
      );
    case "about":
      return (
        <svg viewBox="0 0 56 56" className={common} aria-hidden>
          <defs>
            <linearGradient id="i-about-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F7F7FA" />
              <stop offset="1" stopColor="#D9D9E0" />
            </linearGradient>
            <linearGradient id="i-about-card" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#5B5B63" />
              <stop offset="1" stopColor="#3A3A40" />
            </linearGradient>
          </defs>
          <rect width="56" height="56" rx="13" fill="url(#i-about-bg)" />
          <circle cx="28" cy="21.5" r="6.8" fill="url(#i-about-card)" />
          <path
            d="M14.5 45c1.6-8.4 7-12.6 13.5-12.6S40 36.6 41.5 45z"
            fill="url(#i-about-card)"
          />
          <path d="M4 14Q4 3 15 3h26q11 0 11 11v3Q28 24 4 17v-3z" fill="#FFFFFF" opacity="0.55" />
        </svg>
      );
    case "music":
      return (
        <svg viewBox="0 0 56 56" className={common} aria-hidden>
          <defs>
            <linearGradient id="i-music-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FF6D8A" />
              <stop offset="1" stopColor="#E5234E" />
            </linearGradient>
          </defs>
          <rect width="56" height="56" rx="13" fill="url(#i-music-bg)" />
          <path
            d="M24 38.5V19.2l18-3.2v17.8"
            stroke="#FFFFFF"
            strokeWidth="3.4"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="19.5" cy="39.5" r="5.5" fill="#FFFFFF" />
          <circle cx="37.5" cy="34.8" r="5.5" fill="#FFFFFF" />
          <path d="M4 14Q4 3 15 3h26q11 0 11 11v4Q28 26 4 18v-4z" fill="#FFFFFF" opacity="0.18" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 56 56" className={common} aria-hidden>
          <rect width="56" height="56" rx="13" fill="#71717A" />
        </svg>
      );
  }
}
