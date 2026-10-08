"use client";

import { PenLine, ExternalLink } from "lucide-react";
import { POSTS } from "@/data/posts";
import { LINKS } from "@/data/links";
import { MediumIcon } from "@/components/icons";

/**
 * Writing app — published posts. Entries live in data/posts.ts and currently
 * link out to where they're published (Medium). Local MDX posts can be added
 * later without changing this list UI.
 */
export default function Writing() {
  return (
    <div className="flex h-full min-h-[260px] flex-col">
      {POSTS.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black/[0.05] dark:bg-white/10">
            <PenLine size={24} className="text-muted" />
          </div>
          <h2 className="text-base font-semibold">Writing</h2>
          <p className="max-w-xs text-sm text-muted">
            Long-form posts live here. The first entry is being written — check
            back soon.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between border-b border-border px-4 py-2">
            <span className="text-xs font-semibold text-muted">
              {POSTS.length} {POSTS.length === 1 ? "post" : "posts"}
            </span>
            <a
              href={LINKS.medium}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline"
            >
              <MediumIcon size={13} /> @{LINKS.mediumHandle}
            </a>
          </div>

          <ol className="flex-1 divide-y divide-border overflow-auto">
            {POSTS.map((post, i) => (
              <li key={post.slug}>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group block p-5 transition-colors hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[11px] font-semibold tabular-nums text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[11px] text-muted">
                      {post.publishedOn}
                      {post.date ? ` · ${post.date}` : ""}
                      {post.readTime ? ` · ${post.readTime}` : ""}
                    </span>
                  </div>
                  <h2 className="mt-1.5 text-[17px] font-semibold leading-snug tracking-tight group-hover:text-accent">
                    {post.title}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                  <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-black/[0.05] px-2 py-0.5 text-[11px] dark:bg-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-accent">
                      Read on Medium <ExternalLink size={12} />
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}
