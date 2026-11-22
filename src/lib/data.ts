/**
 * Canonical content for northprot.com.
 * Sourced from Cyan's LinkedIn profile (About, Experience, Honors, Publications;
 * current as of 2026-04) and Cyan's own notes.
 *
 * Every public-facing string on northprot.com flows from this module.
 * Tone forensics and exclusion list enforced by src/__tests__/data.test.ts.
 */

// ---------------------------------------------------------------------------
// Types — local to this module. Sprint 2 keeps the type surface minimal.
// ---------------------------------------------------------------------------

export interface Masthead {
  date: string;
  place: string;
  name: string;
  tagline: string;
  thesis_h1: string;
}

export interface NowEntry {
  label: "BUILDING" | "STUDYING" | "OPEN TO";
  body: string;
}

export interface Footnote {
  id: string;
  body: string;
}

export interface Thesis {
  anchor: string;
  paragraphs: string[];
  footnotes: Footnote[];
}

export interface WorkEntry {
  name: string;
  role: string;
  period: string;
  blurb: string;
  tags: string[];
  href: string | null;
}

export interface WritingEntry {
  title: string;
  date: string;
  excerpt: string;
  href: string | null;
}

export type StackGroup =
  | "LANGUAGES"
  | "BIO"
  | "AI"
  | "DATA"
  | "WEB"
  | "OS"
  | "CERTS";

export type Stack = Record<StackGroup, string[]>;

export interface ElsewhereLink {
  value: string;
  href: string;
}

export interface ElsewhereEntry {
  label: "email" | "github" | "linkedin" | "x" | "lab";
  value: string;
  href: string;
  /** Additional handles rendered after a separator on the same row. */
  extras?: ElsewhereLink[];
}

export interface Colophon {
  built_by: string;
  typography: string;
  source_link: { label: string; href: string };
  copyright: string;
}

// ---------------------------------------------------------------------------
// masthead
// ---------------------------------------------------------------------------

export const masthead: Masthead = {
  // src: internal plan §4 — dateline format is YYYY.MM, place is city only.
  date: "2026.07",
  place: "MILKY WAY",
  // src: LinkedIn profile (legal name on header).
  name: "Jongmin Lee",
  // src: LinkedIn headline tagline — verbatim, lowercase, terminal period.
  tagline: "bioinformatics, biology with root access.",
  // src: LinkedIn About, paragraph 1 — the methodology line.
  thesis_h1:
    "I build gene therapies the way I build software: from first principles, source open, no ceremony.",
};

// ---------------------------------------------------------------------------
// now — three present-tense status lines
// ---------------------------------------------------------------------------

export const now: NowEntry[] = [
  {
    label: "BUILDING",
    // src: LinkedIn Experience → Arcivus Lab (Mar 2026).
    body: "AAV gene-replacement therapy for DYT-SGCE myoclonus-dystonia at Arcivus Lab.",
  },
  {
    label: "STUDYING",
    // src: LinkedIn Education — Langara + UBC MBIM 2027 intake.
    body: "Bioinformatics @ Langara. UBC Microbiology and Immunology, 2027 intake.",
  },
  {
    label: "OPEN TO",
    // src: LinkedIn About, "Looking for —" paragraph. Collapsed to two lines.
    body: "Wet-lab partners for AAV production. Bioinformatics consulting (Python / LLM pipelines).",
  },
];

// ---------------------------------------------------------------------------
// thesis — anchor line + 3 paragraphs + 3 footnotes
// ---------------------------------------------------------------------------

export const thesis: Thesis = {
  // src: LinkedIn About — the thesis-of-the-practice line, verbatim.
  anchor:
    "Patient-specific molecular identity should drive therapy design, not population averages.",
  paragraphs: [
    // src: (a) SGCE frameshift as the concrete test case — LinkedIn About + SGCE Explorer project.
    "The concrete test case is a single frameshift in the SGCE gene\u00b9 — one nucleotide duplicated, one premature stop codon, one truncated \u03b5-sarcoglycan. Arcivus Lab's first program is an AAV vector that replaces the broken copy. No small molecules. No symptom management.",
    // src: (b) carbon × silicon methodology — How Claude.ai see me.md + persona DB.
    "NorthProt is the silicon half: Python, Claude API, MCP pipelines, pgvector retrieval over the primary literature. Arcivus is the carbon half: capsid engineering, construct design, wet-lab validation. The same person runs both sides because the target-identification-to-construct gap\u00b2 is where rare-disease programs die, and collapsing it is a tooling problem before it is a biology problem.",
    // src: (c) methodology not branding — Arcivus thesis line.
    "From first principles, source open, no ceremony\u00b3 — this is how the work is done, not how the site is marketed. Every tool Arcivus builds ships open-source. Every decision is traceable to a paper or a sequence. Small. Real.",
  ],
  footnotes: [
    // src: LinkedIn Projects → SGCE ε-Sarcoglycan Explorer (c.108dup specified).
    { id: "1", body: "DYT-SGCE c.108dup p.Val37SerfsTer32" },
    // src: philosophical background — Quine methodological naturalism.
    { id: "2", body: "Quine, Word and Object" },
    // src: Arcivus Lab brand thesis line.
    { id: "3", body: "Arcivus thesis line" },
  ],
};

// ---------------------------------------------------------------------------
// work — 6 entries, Arcivus first
// ---------------------------------------------------------------------------

export const work: WorkEntry[] = [
  {
    // src: LinkedIn Experience — Arcivus Lab, Co-Founder, Mar 2026 – present.
    name: "Arcivus Lab",
    role: "Co-Founder",
    period: "Mar 2026 — present",
    blurb:
      "AAV gene-replacement therapy for DYT-SGCE myoclonus-dystonia.",
    tags: ["AAV", "AlphaFold", "Structural bio"],
    href: "https://arcivus.ca",
  },
  {
    // src: NorthProt brand history — solo R&D lab, carbon×silicon framing. Founded Nov 2025.
    name: "NorthProt",
    role: "Founder",
    period: "Nov 2025 — present",
    blurb:
      "Solo R&D lab. Carbon and Silicon. 100% upstream of Arcivus.",
    tags: ["Python", "Claude API", "MCP", "pgvector"],
    href: "https://northprot.com",
  },
  {
    // src: LinkedIn Projects → SGCE ε-Sarcoglycan Explorer (open-source).
    name: "SGCE \u03b5-Sarcoglycan Explorer",
    role: "Author",
    period: "Mar 2026 — present",
    blurb:
      "Open-source 3D visualization of the SGCE protein for understanding the DYT-SGCE c.108dup mutation.",
    tags: ["Next.js", "3Dmol.js"],
    href: "https://arcivus.ca/explorer",
  },
  {
    // src: LinkedIn Projects → Brightspace MCP Server (Mar 2026).
    name: "Brightspace MCP",
    role: "Author",
    period: "Mar 2026",
    blurb:
      "Open-source MCP server for Brightspace LMS — automated coursework retrieval via Playwright.",
    tags: ["Python", "MCP", "Playwright"],
    href: "https://github.com/NorthProt-Inc/brightspace-mcp",
  },
  {
    // src: NorthProt internal — model-agnostic agent harness on .pi, May 2026.
    name: "NorthProt Harness",
    role: "Author",
    period: "May 2026 — present",
    blurb:
      "Model-agnostic agent harness built on .pi — lightweight by design where Claude Code is heavy.",
    tags: [".pi", "Agent runtime", "Model-agnostic"],
    href: null,
  },
  {
    // src: cyan-assistant MCP — personal-assistant server, Apr 2026.
    name: "Cyan Assistant",
    role: "Author",
    period: "Apr 2026 — present",
    blurb:
      "Personal-assistant MCP server. Agentic execution across email, calendar, contacts, and writing style — not just memory.",
    tags: ["MCP", "Postgres", "pgvector"],
    href: null,
  },
];

// ---------------------------------------------------------------------------
// writing — 1 entry (D2 review)
// ---------------------------------------------------------------------------

export const writing: WritingEntry[] = [
  {
    // src: LinkedIn Publications — "Striatal D2 Receptor Upregulation in Myoclonus-Dystonia: A Review", Jan 12, 2025.
    title:
      "Striatal D2 Receptor Upregulation in Myoclonus-Dystonia: A Review",
    date: "Jan 12, 2025",
    // src: LinkedIn Publications abstract, condensed into two sentences in his voice.
    excerpt:
      "Myoclonus-dystonia is a SGCE-driven movement disorder with reduced striatal D2 receptor density and excessive dopamine release. Restoring D2 signaling — pharmacologically, genetically, or via lifestyle — is a plausible therapeutic axis, and the review surveys the evidence for each.",
    // src: Canonical record lives on Zenodo.
    href: "https://zenodo.org/records/19444397",
  },
];

// ---------------------------------------------------------------------------
// stack — seven technical groups
// ---------------------------------------------------------------------------

export const stack: Stack = {
  // src: LinkedIn Skills + personal context DB — day-to-day languages.
  LANGUAGES: ["Python", "TypeScript", "SQL"],
  // src: LinkedIn Skills — Structural Bioinformatics, AAV Gene Therapy cluster + Arcivus AAV construct work.
  BIO: ["BLAST", "AlphaFold", "Variant annotation", "AAV construct design"],
  // src: Anthropic credentials + NorthProt tooling + harness/assistant agent work.
  AI: ["Claude API", "OpenAI API", "MCP", "Agent runtimes"],
  // src: Axel + cyan-assistant retrieval stack.
  DATA: ["Postgres", "pgvector", "Retrieval pipelines"],
  // src: arcivus.ca + northprot.com tech stack.
  WEB: ["Next.js", "React", "Tailwind v4", "Vercel"],
  // src: persona DB — Linux daily-driver, Docker for services, CLI tooling.
  OS: ["Linux", "Docker", "CLI tooling"],
  // src: LinkedIn Licenses & Certifications — both issued by Anthropic, 2026.
  CERTS: [
    "MCP Advanced (Anthropic, 2026)",
    "Building with the Claude API (Anthropic, 2026)",
  ],
};

// ---------------------------------------------------------------------------
// elsewhere — 5 contact rails
// ---------------------------------------------------------------------------

export const elsewhere: ElsewhereEntry[] = [
  // src: LinkedIn About — Reach me at cyan@northprot.com.
  {
    label: "email",
    value: "cyan@northprot.com",
    href: "mailto:cyan@northprot.com",
  },
  // src: GitHub handle cyanprot (brightspace-mcp repo on LinkedIn).
  {
    label: "github",
    value: "cyanprot",
    href: "https://github.com/cyanprot",
  },
  // src: LinkedIn profile URL — slug "northprot" (canonical handle, user-confirmed 2026-04-15).
  {
    label: "linkedin",
    value: "in/northprot",
    href: "https://www.linkedin.com/in/northprot",
  },
  // src: X handles — personal first, lab second (user-confirmed 2026-04-15).
  {
    label: "x",
    value: "@cyanprot",
    href: "https://x.com/cyanprot",
    extras: [{ value: "@arcivuslab", href: "https://x.com/arcivuslab" }],
  },
  // src: Arcivus Lab domain.
  {
    label: "lab",
    value: "arcivus.ca",
    href: "https://arcivus.ca",
  },
];

// ---------------------------------------------------------------------------
// colophon — credits + typography + source + copyright
// ---------------------------------------------------------------------------

export const colophon: Colophon = {
  // src: internal plan §4 — model-built credit line; every Opus generation that
  // touched the page is named (4.6 built it, 4.7 / 4.8 / 5 kept building).
  built_by:
    "This page was designed and implemented end-to-end by Claude — Opus 4.6 built it, and 4.7, 4.8, and 5 kept building. Sourcing, copy decisions, layout, and code generation were all model-driven from a single brief. The human pipeline — review, deploy, infrastructure — is by Cyan.",
  // src: Sprint 1 foundation — Source Serif 4 + JetBrains Mono + paper/ink tokens.
  typography:
    "Set in Source Serif 4 and JetBrains Mono. Cream paper. Cool ink. \u03b5-sarcoglycan ribbon from AlphaFold prediction AF-O43556; 3Dmol.js on desktop.",
  // src: GitHub repo under the NorthProt-Inc org.
  source_link: {
    label: "Source on GitHub",
    href: "https://github.com/NorthProt-Inc/northprot.com",
  },
  // src: current year.
  copyright: "\u00a9 2026 NorthProt",
};
