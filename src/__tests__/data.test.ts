/**
 * Canonical content tests — Sprint 2 contract.
 *
 * `src/lib/data.ts` is the single source of truth for every public-facing
 * string on northprot.com. These tests gate:
 *   - exact tagline + thesis_h1 wording
 *   - Arcivus-first work ordering + entry shape
 *   - Claude (Opus 4.6) credit in colophon
 *   - banned future-tense / roadmap markers
 *   - no phone numbers
 * Further content guards live in an untracked local test file.
 */

import { describe, it, expect } from "vitest";
import * as data from "../lib/data";

describe("canonical data — tagline + identity", () => {
  it("tagline is the exact bio sentence, lowercase, with terminal period", () => {
    expect(data.masthead.tagline).toBe(
      "bioinformatics, biology with root access.",
    );
  });

  it("thesis_h1 is the methodology sentence verbatim", () => {
    expect(data.masthead.thesis_h1).toBe(
      "I build gene therapies the way I build software: from first principles, source open, no ceremony.",
    );
  });

  it("masthead carries date, place, name", () => {
    expect(data.masthead.date).toBe("2026.07");
    expect(data.masthead.place).toBe("MILKY WAY");
    expect(data.masthead.name).toBe("Jongmin Lee");
  });
});

describe("canonical data — now block", () => {
  it("has exactly three entries", () => {
    expect(data.now).toHaveLength(3);
  });
  it("uses BUILDING / STUDYING / OPEN TO labels", () => {
    expect(data.now.map((n) => n.label)).toEqual([
      "BUILDING",
      "STUDYING",
      "OPEN TO",
    ]);
  });
});

describe("canonical data — thesis block", () => {
  it("anchor is the patient-specific-identity line", () => {
    expect(data.thesis.anchor).toBe(
      "Patient-specific molecular identity should drive therapy design, not population averages.",
    );
  });
  it("has three paragraphs", () => {
    expect(data.thesis.paragraphs).toHaveLength(3);
  });
  it("has three footnotes, ids 1/2/3", () => {
    expect(data.thesis.footnotes).toHaveLength(3);
    expect(data.thesis.footnotes.map((f) => f.id)).toEqual(["1", "2", "3"]);
  });
});

describe("canonical data — work order + shape", () => {
  it("Arcivus Lab is the first work entry", () => {
    expect(data.work[0].name).toBe("Arcivus Lab");
  });
  it("has exactly six work entries", () => {
    expect(data.work).toHaveLength(6);
  });
  it("every work entry has name / role / period / blurb / tags", () => {
    for (const w of data.work) {
      expect(w.name).toBeTruthy();
      expect(w.role).toBeTruthy();
      expect(w.period).toBeTruthy();
      expect(w.blurb).toBeTruthy();
      expect(Array.isArray(w.tags)).toBe(true);
    }
  });
  it("Arcivus Lab entry links to arcivus.ca", () => {
    expect(data.work[0].href).toBe("https://arcivus.ca");
  });
});

describe("canonical data — writing", () => {
  it("has the D2 review paper as first entry", () => {
    expect(data.writing[0].title).toBe(
      "Striatal D2 Receptor Upregulation in Myoclonus-Dystonia: A Review",
    );
    expect(data.writing[0].date).toBe("Jan 12, 2025");
  });
  it("D2 review links to the canonical Zenodo record", () => {
    expect(data.writing[0].href).toBe("https://zenodo.org/records/19444397");
  });
});

describe("canonical data — stack groups", () => {
  it("exposes the seven technical groups", () => {
    expect(Object.keys(data.stack).sort()).toEqual(
      ["AI", "BIO", "CERTS", "DATA", "LANGUAGES", "OS", "WEB"].sort(),
    );
  });
  it("CERTS lists both Anthropic 2026 credentials", () => {
    const blob = data.stack.CERTS.join(" | ");
    expect(blob).toMatch(/MCP Advanced/);
    expect(blob).toMatch(/Claude API/);
  });
});

describe("canonical data — elsewhere", () => {
  it("has five contact rails", () => {
    expect(data.elsewhere).toHaveLength(5);
  });
  it("email rail uses cyan@northprot.com", () => {
    const email = data.elsewhere.find((e) => e.label === "email");
    expect(email?.href).toBe("mailto:cyan@northprot.com");
  });
});

describe("canonical data — colophon", () => {
  it("credits Claude by name and every Opus generation that built it", () => {
    expect(data.colophon.built_by).toMatch(/Claude/);
    for (const version of ["4.6", "4.7", "4.8", "5"]) {
      expect(data.colophon.built_by).toMatch(
        new RegExp(version.replace(".", "\\.")),
      );
    }
  });
  it("source_link points at the northprot.com repo", () => {
    expect(data.colophon.source_link.href).toBe(
      "https://github.com/NorthProt-Inc/northprot.com",
    );
  });
  it("copyright line is 2026", () => {
    expect(data.colophon.copyright).toMatch(/2026/);
  });
});

describe("canonical data — no future-tense roadmap copy", () => {
  const blob = JSON.stringify(data).toLowerCase();
  const banned = [
    "coming soon",
    "will launch",
    "planning to",
    "roadmap",
    "q1 2026",
    "q2 2026",
    "q3 2026",
    "q4 2026",
  ];
  for (const term of banned) {
    it(`does not contain future-tense marker: "${term}"`, () => {
      expect(blob).not.toContain(term);
    });
  }
});

describe("canonical data — no phone numbers", () => {
  it("no phone numbers", () => {
    const blob = JSON.stringify(data);
    expect(blob).not.toMatch(/\b\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/);
  });
});
