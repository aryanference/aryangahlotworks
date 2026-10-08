import { PROJECTS } from "@/data/projects";
import { PAPERS } from "@/data/papers";
import { POSTS } from "@/data/posts";
import { SKILL_GROUPS, EXPLORING } from "@/data/skills";
import { LINKS, PROFILE, EXPERIENCE, EDUCATION } from "@/data/links";

/**
 * Server-rendered, semantic copy of the portfolio:
 * - an sr-only block for crawlers and screen readers (the desktop UI is
 *   client-rendered, so this carries the full content in the DOM), and
 * - a <noscript> block that becomes visible without JS.
 */
function Content() {
  return (
    <main>
      <h1>
        {PROFILE.name} — {PROFILE.title}
      </h1>
      <p>{PROFILE.bio}</p>
      <p>{PROFILE.status}</p>

      <section aria-label="Projects">
        <h2>Projects</h2>
        <ul>
          {PROJECTS.map((p) => (
            <li key={p.slug}>
              <a href={p.url}>{p.title}</a> — {p.tagline}. Tech: {p.tech.join(", ")}.
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Research papers">
        <h2>Papers</h2>
        <ul>
          {PAPERS.map((p) => (
            <li key={p.slug}>
              {p.title} ({p.status}) — {p.abstract}
              {p.url ? " " : ""}
              {p.url && <a href={p.url}>Implementation</a>}
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Writing">
        <h2>Writing</h2>
        <ul>
          {POSTS.map((p) => (
            <li key={p.slug}>
              <a href={p.url}>{p.title}</a> — {p.publishedOn}
              {p.date ? `, ${p.date}` : ""}. {p.excerpt}
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Skills">
        <h2>Skills</h2>
        {SKILL_GROUPS.map((g) => (
          <p key={g.label}>
            <strong>{g.label}:</strong> {g.items.join(", ")}
          </p>
        ))}
        <p>
          <strong>Currently exploring:</strong> {EXPLORING.join(", ")}
        </p>
      </section>

      <section aria-label="Experience and education">
        <h2>Experience & Education</h2>
        <ul>
          {EXPERIENCE.map((e) => (
            <li key={`${e.role}-${e.org}`}>
              {e.role} — {e.org}
              {e.period ? ` (${e.period})` : ""}
            </li>
          ))}
        </ul>
        <p>{EDUCATION}</p>
      </section>

      <section aria-label="Contact">
        <h2>Contact</h2>
        <ul>
          <li>
            Email: <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>
          </li>
          <li>
            GitHub: <a href={LINKS.github}>{LINKS.github}</a>
          </li>
          <li>
            X: <a href={LINKS.x}>{LINKS.xHandle}</a>
          </li>
          <li>
            Medium: <a href={LINKS.medium}>@{LINKS.mediumHandle}</a>
          </li>
          <li>
            Resume: <a href={LINKS.resume}>PDF</a>
          </li>
        </ul>
      </section>
    </main>
  );
}

export default function SemanticFallback() {
  return (
    <>
      <div className="sr-only">
        <Content />
      </div>
      <noscript>
        <div
          className="fixed inset-0 z-[2000] overflow-auto bg-white p-6 text-black"
          style={{ clip: "auto", width: "auto", height: "auto" }}
        >
          <p className="mb-4 border-b border-black/10 pb-2 text-sm text-black/60">
            JavaScript is disabled — showing the full portfolio content below.
          </p>
          <Content />
        </div>
      </noscript>
    </>
  );
}
