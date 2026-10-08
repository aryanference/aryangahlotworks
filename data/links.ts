export const LINKS = {
  github: "https://github.com/aryanference",
  x: "https://x.com/indeedlemonpie",
  xHandle: "@indeedlemonpie",
  medium: "https://medium.com/@isayhey",
  mediumHandle: "isayhey",
  email: "aryangahlot50@gmail.com",
  resume:
    "https://drive.google.com/file/d/1WK_-B1n7LUmYURGNdxpghS02xbI4plqv/view?usp=sharing",
  resumeEmbed:
    "https://drive.google.com/file/d/1WK_-B1n7LUmYURGNdxpghS02xbI4plqv/preview",
} as const;

export const PROFILE = {
  name: "Aryan Gahlot",
  title: "ML & AI Researcher, Data Scientist",
  roles: ["Builder", "Marketer", "Entrepreneur"],
  bio: "Building intelligent systems at the intersection of machine learning, AI research, and data science — as a builder, marketer, and entrepreneur. Currently building SecorAi, a self-hosted safety and governance control layer for production AI agents.",
  status: "Available for research collaborations",
  stats: [
    { value: "9+", label: "Projects" },
    { value: "ML", label: "Focus" },
    { value: "7+", label: "Technologies" },
  ],
} as const;

export interface ExperienceItem {
  role: string;
  org: string;
  period?: string;
  detail?: string;
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Founder",
    org: "SecorAi",
    period: "Current",
    detail: "Self-hosted safety & governance control layer for production AI agents.",
  },
  {
    role: "Research Intern",
    org: "IIM Nagpur",
    period: "Jan 2025 — present",
    detail: "Applied RL / AI research.",
  },
  {
    role: "Marketing Head",
    org: "BRC — Blockchain Community, RCOEM",
    period: "2024 — present",
  },
  {
    role: "Resource Manager",
    org: "SRC",
  },
];

export const EDUCATION =
  "B.E. Electronics and Communication Engineering, RCOEM — expected May 2027";

/**
 * Production URL used for metadata (canonical, OG, sitemap).
 * Resolution order: explicit override → Vercel production domain → default.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://aryangahlotworks.vercel.app");
