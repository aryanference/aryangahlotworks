"use client";

/** Simple inline brand glyphs for outbound links (original renderings). */

export function GithubIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export function XIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12.6 1h2.45l-5.36 6.14L16 15h-4.94l-3.87-5.06L2.86 15H.4l5.73-6.56L0 1h5.06l3.5 4.63L12.6 1zm-.86 12.6h1.36L4.32 2.33H2.86l8.88 11.27z" />
    </svg>
  );
}

/** Medium logomark — an "M" of columns. */
export function MediumIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M2.4 18.2h3.1c.3 0 .5-.2.5-.5V9.1c0-.3-.2-.5-.5-.5H2.4c-.3 0-.5.2-.5.5v8.6c0 .3.2.5.5.5zm4.8 0h3.1c.3 0 .5-.2.5-.5V5.6c0-.3-.2-.5-.5-.5H7.2c-.3 0-.5.2-.5.5v12.1c0 .3.2.5.5.5zm4.9 0h3.1c.3 0 .5-.2.5-.5v-6.9c0-.3-.2-.5-.5-.5h-3.1c-.3 0-.5.2-.5.5v6.9c0 .3.2.5.5.5zm4.8 0h3.1c.3 0 .5-.2.5-.5V3.3c0-.3-.2-.5-.5-.5h-3.1c-.3 0-.5.2-.5.5v14.4c0 .3.2.5.5.5z" />
    </svg>
  );
}

/** YouTube play tile. */
export function YoutubeIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="1" y="4" width="22" height="16" rx="5" fill="#FF0000" />
      <path d="M10 8.5v7l6-3.5-6-3.5z" fill="#fff" />
    </svg>
  );
}
