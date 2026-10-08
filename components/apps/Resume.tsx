"use client";

import { Download, ExternalLink } from "lucide-react";
import { LINKS } from "@/data/links";
import { MagneticButton } from "@/components/ui/magnetic-button";

/**
 * Resume Preview window.
 * TODO: once /public/resume.pdf exists, render it with <embed src="/resume.pdf">.
 * Until then we link out to the Drive-hosted PDF (real data, no dead viewer).
 */
export default function Resume() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-2">
        <div className="min-w-0">
          <div className="truncate text-sm font-medium">Aryan Gahlot — Resume.pdf</div>
          <div className="text-xs text-muted">Hosted PDF · Google Drive</div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={LINKS.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-black/5 dark:hover:bg-white/10"
          >
            <ExternalLink size={13} /> Open
          </a>
          <MagneticButton
            variant="primary"
            size="sm"
            strength={0.25}
            glow={false}
            className="!rounded-lg text-xs font-medium"
            onClick={() => window.open(LINKS.resume, "_blank", "noopener")}
          >
            <Download size={13} /> Download
          </MagneticButton>
        </div>
      </div>
      <iframe
        title="Aryan Gahlot — Resume PDF preview"
        src={LINKS.resumeEmbed}
        className="min-h-0 w-full flex-1 border-0 bg-white"
      />
    </div>
  );
}
