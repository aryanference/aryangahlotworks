export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  url: string;
  publishedOn: "Medium";
  date?: string;
  readTime?: string;
  tags: string[];
}

export const POSTS: Post[] = [
  {
    slug: "indias-ai-boom-account-deficit",
    title: "India's AI boom might be terrible for our account deficit",
    excerpt:
      "Every foreign AI inference call is a small dollar outflow. GPUs are only half the problem — the real question is whether India exports intelligence, or keeps renting it.",
    url: "https://medium.com/@isayhey/indias-ai-boom-might-be-terrible-for-our-account-deficit-711d37daea4e",
    publishedOn: "Medium",
    date: "Oct 2026",
    readTime: "4 min read",
    tags: ["AI", "LLM Inference", "India"],
  },
];
