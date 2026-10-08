"use client";

import dynamic from "next/dynamic";
import type { AppId } from "@/store/desktop";

const loading = () => (
  <div className="flex h-full w-full items-center justify-center">
    <span className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-accent" />
  </div>
);

const Finder = dynamic(() => import("@/components/apps/Finder"), { ssr: false, loading });
const Projects = dynamic(() => import("@/components/apps/Projects"), { ssr: false, loading });
const Notes = dynamic(() => import("@/components/apps/Notes"), { ssr: false, loading });
const Writing = dynamic(() => import("@/components/apps/Writing"), { ssr: false, loading });
const Terminal = dynamic(() => import("@/components/apps/Terminal"), { ssr: false, loading });
const About = dynamic(() => import("@/components/apps/About"), { ssr: false, loading });
const Resume = dynamic(() => import("@/components/apps/Resume"), { ssr: false, loading });

export default function AppContent({
  app,
  payload,
}: {
  app: AppId;
  payload?: Record<string, unknown>;
}) {
  switch (app) {
    case "finder":
      return <Finder />;
    case "projects":
      return <Projects payload={payload} />;
    case "notes":
      return <Notes payload={payload} />;
    case "writing":
      return <Writing />;
    case "terminal":
      return <Terminal />;
    case "about":
      return <About />;
    case "resume":
      return <Resume />;
    default:
      return null;
  }
}
