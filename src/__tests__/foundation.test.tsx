/**
 * Foundation tests — Sprint 1 contract.
 *
 * These tests lock down the foundation-level promises of the rebuild:
 *   1. Body className wires Tailwind tokens (bg-paper / text-ink / font-serif).
 *   2. Three font CSS variables flow into <html> via next/font/google.
 *   3. globals.css exposes the paper/ink/cyan token set and reveal keyframes.
 *   4. RootLayout imports globals.css (so tokens are available at runtime).
 *
 * We deliberately do NOT render <RootLayout> with @testing-library/react —
 * it returns an <html> element which conflicts with jsdom's root document,
 * and next/font/google is unavailable in the vitest environment. Testing the
 * exported constants + reading source on disk is sufficient to gate the
 * contract.
 */

import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

import { BODY_CLASSNAME, FONT_VARIABLES } from "@/lib/fonts";

const ROOT = path.resolve(__dirname, "..", "..");
const read = (rel: string) => readFileSync(path.join(ROOT, rel), "utf8");

describe("foundation: body className", () => {
  it("applies bg-paper / text-ink / font-serif Tailwind utilities", () => {
    expect(BODY_CLASSNAME).toContain("bg-paper");
    expect(BODY_CLASSNAME).toContain("text-ink");
    expect(BODY_CLASSNAME).toContain("font-serif");
    expect(BODY_CLASSNAME).toContain("antialiased");
  });
});

describe("foundation: font CSS variable contract", () => {
  it("declares the three variables RootLayout must apply to <html>", () => {
    expect(FONT_VARIABLES).toEqual([
      "--font-serif-var",
      "--font-mono-var",
      "--font-sans-var",
    ]);
  });

  it("layout.tsx references all three font imports and spreads .variable on <html>", () => {
    const layout = read("src/app/layout.tsx");
    expect(layout).toMatch(/from ["']@\/lib\/fonts["']/);
    expect(layout).toContain("serif.variable");
    expect(layout).toContain("mono.variable");
    expect(layout).toContain("sans.variable");
    // variables must land on <html>, not <body>.
    expect(layout).toMatch(/<html[\s\S]*?serif\.variable/);
  });

  it("layout.tsx imports globals.css so tokens are available", () => {
    const layout = read("src/app/layout.tsx");
    expect(layout).toMatch(/import ["']\.\/globals\.css["']/);
  });

  it("layout.tsx body uses the BODY_CLASSNAME constant (single source of truth)", () => {
    const layout = read("src/app/layout.tsx");
    expect(layout).toContain("BODY_CLASSNAME");
    expect(layout).toMatch(/<body\s+className=\{BODY_CLASSNAME\}/);
  });
});

describe("foundation: globals.css tokens", () => {
  const css = read("src/app/globals.css");

  it("imports tailwind v4", () => {
    expect(css).toMatch(/@import ["']tailwindcss["']/);
  });

  it("defines paper / ink / rule / cyan OKLCH tokens inside @theme inline", () => {
    expect(css).toMatch(/@theme inline\s*\{/);
    expect(css).toMatch(/--color-paper:\s*oklch\(98% 0\.012 85\)/);
    expect(css).toMatch(/--color-paper-edge:\s*oklch\(95% 0\.012 85\)/);
    expect(css).toMatch(/--color-ink:\s*oklch\(20% 0\.02 270\)/);
    expect(css).toMatch(/--color-ink-soft:\s*oklch\(45% 0\.02 270\)/);
    expect(css).toMatch(/--color-rule:\s*oklch\(85% 0\.012 270\)/);
    // Sprint 5: cyan darkened 55% → 50% to clear WCAG AA (4.5:1) on paper
    expect(css).toMatch(/--color-cyan:\s*oklch\(50% 0\.13 215\)/);
    expect(css).toMatch(/--color-cyan-soft:\s*oklch\(70% 0\.10 215\)/);
  });

  it("wires next/font CSS vars into --font-serif / --font-mono / --font-sans", () => {
    expect(css).toMatch(/--font-serif:\s*var\(--font-serif-var\)/);
    expect(css).toMatch(/--font-mono:\s*var\(--font-mono-var\)/);
    expect(css).toMatch(/--font-sans:\s*var\(--font-sans-var\)/);
  });

  it("engages OpenType features on body", () => {
    expect(css).toMatch(
      /font-feature-settings:\s*["']liga["'],\s*["']kern["'],\s*["']calt["'],\s*["']onum["']/,
    );
  });

  it("defines .reveal / .revealed keyframe helpers and reduced-motion guard", () => {
    expect(css).toMatch(/\.reveal\s*\{[^}]*opacity:\s*0/);
    expect(css).toMatch(/\.revealed\s*\{[^}]*opacity:\s*1/);
    expect(css).toMatch(/prefers-reduced-motion:\s*reduce/);
  });

  it("defines a container-query notebook grid helper", () => {
    expect(css).toMatch(/\.notebook-grid\s*\{[^}]*container-type:\s*inline-size/);
    expect(css).toMatch(/@container \(min-width:\s*1024px\)/);
  });
});
