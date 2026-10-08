import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { PROFILE, SITE_URL } from "@/data/links";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aryan Gahlot — ML & AI Researcher",
    template: "%s — Aryan Gahlot",
  },
  description: PROFILE.bio,
  applicationName: "Aryan Gahlot",
  keywords: [
    "Aryan Gahlot",
    "Machine Learning",
    "AI Research",
    "Data Science",
    "LLM",
    "Evolutionary Algorithms",
  ],
  authors: [{ name: "Aryan Gahlot", url: SITE_URL }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Aryan Gahlot",
    title: "Aryan Gahlot — ML & AI Researcher",
    description: PROFILE.bio,
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Aryan Gahlot — ML & AI Researcher" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryan Gahlot — ML & AI Researcher",
    description: PROFILE.bio,
    images: ["/og.png"],
    creator: "@indeedlemonpie",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef1f6" },
    { media: "(prefers-color-scheme: dark)", color: "#101014" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("portfolio-theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.add(d?"dark":"light");}catch(e){document.documentElement.classList.add("dark")}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
