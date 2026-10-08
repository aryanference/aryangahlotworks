export interface SkillGroup {
  label: string;
  items: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "ML & AI",
    items: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "Deep Learning",
      "NLP",
      "LLMs",
      "Transformers",
      "Deep Reinforcement Learning",
    ],
  },
  {
    label: "Data Engineering",
    items: [
      "PySpark",
      "Pandas",
      "NumPy",
      "SQL",
      "Data Pipelines",
      "ETL",
      "Feature Engineering",
    ],
  },
  {
    label: "Backend & Infra",
    items: [
      "Java (Spring Boot)",
      ".NET 8",
      "Kubernetes",
      "Kafka",
      "AWS / GCP / Azure",
      "Docker",
      "Microservices",
    ],
  },
  {
    label: "Systems & Security",
    items: [
      "Go",
      "Rust",
      "Distributed Systems",
      "gRPC / Protocol Buffers",
      "PostgreSQL & SQLite",
      "Ed25519 Signing",
      "Hash-Chaining",
      "PASETO Tokens",
    ],
  },
  {
    label: "Development",
    items: [
      "Python",
      "TypeScript",
      "Next.js",
      "Vue 3",
      "REST APIs",
      "Git",
      "CI/CD",
    ],
  },
  {
    label: "Research",
    items: [
      "Bayesian Methods",
      "Statistical Modeling",
      "Evolutionary Algorithms",
      "Inference Optimization",
    ],
  },
];

export const EXPLORING = [
  "LLM Reasoning",
  "Evolutionary Search",
  "Agent Systems",
  "Mechanistic Interpretability",
];
