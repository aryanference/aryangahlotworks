export interface Paper {
  slug: string;
  title: string;
  status: "Building" | "In Progress" | "Coming Soon" | "Published";
  abstract: string;
  body: string[];
  tags: string[];
  url?: string;
}

export const PAPERS: Paper[] = [
  {
    slug: "secorai",
    title: "What I'm building now — SecorAi",
    status: "Building",
    abstract:
      "A self-hosted safety and governance control layer for production AI agents: real-time scope enforcement, containment, and tamper-evident evidence.",
    body: [
      "Problem: Nearly half of deployed AI agents run with no monitoring, and agents are entering production roughly 7–8× faster than governance is being built around them. When something goes wrong — scope escalation, unauthorized network access, prompt-injection-driven actions, an agent drifting from its task — most teams have no real-time way to stop it and no tamper-proof record of what happened.",
      "Solution: SecorAi is a self-hosted control layer that checks every agent action against its declared scope in real time, contains violations before they complete, and proves — with tamper-evident, hash-chained evidence — that containment worked. It runs entirely inside the customer's own environment, with an independent kill switch that keeps working even if the main enforcement gateway is compromised.",
      "Target market: Enterprises running production AI agents in regulated or high-stakes environments — financial services, healthcare, critical infrastructure, government, and SaaS platforms with agentic features.",
      "Stage: Mid-to-late build — core architecture (audit log, credential broker, policy enforcement gateway, independent kill switch, drift/swarm anomaly detection, and an operator console) implemented across six build phases; approaching first real demo and early user testing.",
      "Traction: Pre-launch — actively seeking first design partners and pilot users.",
      "Why me: Hands-on systems-level build experience — a working multi-service Go/Rust architecture with real cryptographic and database-level guarantees — combined with applied RL/AI research experience from IIM Nagpur, which gives direct insight into how agentic systems actually behave and fail.",
    ],
    tags: ["Startup", "AI Safety", "Agents", "Go", "Rust"],
  },
  {
    slug: "evolving-deeper-llm-thinking",
    title: "Evolving Deeper LLM Thinking, Implementation Study",
    status: "In Progress",
    abstract:
      "An implementation study of evolutionary inference scaling: can evolutionary search over reasoning traces make LLMs think deeper without retraining?",
    body: [
      "This study implements and analyzes an evolutionary framework for scaling LLM inference. Instead of sampling a single chain of thought, a population of candidate reasoning traces is generated, scored, and evolved across rounds — selection pressure applied at inference time.",
      "The working question: how much of \"deeper thinking\" is a search problem over trajectories the model can already produce, versus a training problem? The framework treats inference as an evolutionary process — variation through sampling, selection through evaluation, inheritance through conditioning the next round on the winners.",
      "The accompanying implementation (Python) is public on GitHub and this note tracks the study as it progresses.",
    ],
    tags: ["LLMs", "Evolutionary Algorithms", "Inference Optimization"],
    url: "https://github.com/aryanference/Evolving-Deeper-LLM-Thinking-impl",
  },
  {
    slug: "coming-soon",
    title: "Untitled — next study",
    status: "Coming Soon",
    abstract: "The next write-up is being prepared.",
    body: ["A new study is in preparation. Check back soon."],
    tags: ["Research"],
  },
];
