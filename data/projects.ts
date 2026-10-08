export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  url: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: "heisenberg",
    title: "Heisenberg",
    tagline: "Autonomous financial research agent",
    description:
      "An autonomous agent that conducts financial research end to end: it plans investigations across markets, gathers and cross-checks data, and composes structured research briefs. Built around LLM agent orchestration with typed, testable tooling.",
    tech: ["TypeScript", "LLM Agents", "Finance"],
    url: "https://github.com/aryanference/Heisenberg-",
    featured: true,
  },
  {
    slug: "evolving-deeper-llm-thinking",
    title: "Evolving Deeper LLM Thinking",
    tagline: "Evolutionary inference-scaling framework",
    description:
      "An implementation study of evolutionary search over LLM inference: candidate reasoning traces are generated, evaluated, and evolved across rounds so that deeper thinking emerges at inference time rather than training time.",
    tech: ["Python", "LLMs", "Evolutionary Algorithms", "Inference Optimization"],
    url: "https://github.com/aryanference/Evolving-Deeper-LLM-Thinking-impl",
    featured: true,
  },
  {
    slug: "brain-tumor-detection",
    title: "Brain Tumor Detection",
    tagline: "CNN classification on MRI scans",
    description:
      "A convolutional neural network that classifies brain MRI scans, covering the full pipeline from data preparation and augmentation through training and evaluation.",
    tech: ["Python", "CNNs", "Deep Learning", "Medical Imaging"],
    url: "https://github.com/usergotnewexp/brain-tumor-res",
  },
  {
    slug: "bayesian-modeling",
    title: "Bayesian Modeling",
    tagline: "Probabilistic modeling and inference",
    description:
      "Bayesian modeling work: specifying priors, fitting posterior distributions, and reasoning about uncertainty in model parameters and predictions.",
    tech: ["Python", "Bayesian Methods", "Statistical Modeling"],
    url: "https://github.com/usergotnewexp/Bayesian-Model-re",
  },
  {
    slug: "pyspark-pipeline",
    title: "PySpark Data Pipeline",
    tagline: "Distributed ETL and feature engineering",
    description:
      "A PySpark implementation of a data pipeline: distributed ingestion, transformation, and feature engineering stages wired together as reproducible jobs.",
    tech: ["PySpark", "Data Pipelines", "ETL", "Distributed Compute"],
    url: "https://github.com/usergotnewexp/Pyspark-pipeline-implementation",
  },
];

export function getProject(slug: string | undefined): Project | undefined {
  if (!slug) return undefined;
  return PROJECTS.find((p) => p.slug === slug);
}
