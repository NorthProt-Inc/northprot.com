# NorthProt.com

Editorial single-page digital twin of Cyan (Jongmin Lee).
Live at **https://northprot.com** (Vercel).

100% Claude-built (Opus 4.6 → 4.7 → 4.8 → 5) per Colophon — Cyan owns the pipeline (review, deploy, infra).

## Commands

```bash
npm install        # install dependencies
npm run dev        # dev server on localhost:3000
npm test           # vitest (unit/component, 4 files / 55 tests, plus local guards)
npm run build      # production build
npm run lint       # eslint
```

## Tech Stack

- Next.js 16 (App Router) + React 19 + TypeScript 5
- Tailwind v4 — CSS-only `@theme inline` in `src/app/globals.css` (NO `tailwind.config.ts`)
- OKLCH design tokens — `paper / paper-edge / ink / ink-soft / rule / cyan / cyan-soft`
- Fonts via `next/font/google`: **Source Serif 4** (body), **JetBrains Mono** (display + labels), Geist Sans (sans fallback)
- 3Dmol.js — lazy-imported in `ProteinFigure.client.tsx` (`'use client'`), gated on viewport entry + `prefers-reduced-motion`
- Vitest + @testing-library/react

## Single Route

`/` only. Sitemap + robots at `/sitemap.xml`, `/robots.txt`. OG card at `/opengraph-image` (edge runtime).

## Architecture

- `src/lib/data.ts` — single source of truth for ALL public copy (masthead, now, thesis, work, writing, stack, elsewhere, colophon). Source-tagged comments per entry.
- `src/app/page.tsx` — server component, assembles 6 sections in order: Masthead → NOW → THESIS → WORK → WRITING → STACK → ELSEWHERE → Colophon.
- `src/components/` — 9 primitives (Masthead, Section, MarginNote, FootnoteRef, StackTable, WorkEntry, Colophon, Reveal, ProteinFigure[+ .client]).
- `src/lib/fonts.ts` — `next/font/google` loaders (Source Serif 4, JetBrains Mono, Geist) + the `BODY_CLASSNAME` / `FONT_VARIABLES` contract shared with `layout.tsx` and `foundation.test.tsx`.
- `src/hooks/useReveal.ts` — IntersectionObserver hook driving CSS-only `.reveal`/`.revealed` fade-in. Stagger via `--i` index, ~60ms per child.
- `src/__tests__/` — foundation (tokens, fonts), data (exclusion list, exact tagline, Claude credit), primitives, page assembly.

## Conventions

- TDD: write/update tests before implementation; gate on `npm test` + `npm run build` + `npm run lint` before commit.
- All page copy lives in `data.ts` — never inline string literals in `page.tsx` beyond layout-only fragments.
- `'use client'` only on `Reveal.tsx` and `ProteinFigure.client.tsx`. Everything else is a server component.
- `@/*` path alias.
- Conventional commits.
- Deploy: `npx vercel --prod`, then promote `northprot.com` + `www.northprot.com` aliases manually if Vercel doesn't auto-promote.

## Hard Constraints (enforced by `data.test.ts`)

- No future-tense roadmap copy: "coming soon", "will launch", "planning to", "Q1/2/3/4 2026", "roadmap".
- DYT-SGCE appears only as Arcivus's research target.
- No PII: phone numbers, home address.
- More content guards run from an untracked local test file (`*.local.test.*`, gitignored).
- Colophon must credit Claude and name every Opus generation that built the page: 4.6, 4.7, 4.8, 5. Append the next generation when it ships work here.

## Voice

- Em-dash to set up. Period to land. Lowercase the bio. Capitalize technical specifics (DYT-SGCE, AAV, SGCE).
- Two-word sentences land — use sparingly.
- Italics reserved for publication titles only.
- First person, present tense. No "we", no "leveraging", no "passionate about", no LinkedIn-ese CTAs.

## Design System — MUST consult before UI changes

Token source of truth:
- Colors / spacing: `src/app/globals.css` (`@theme inline` block).
- Fonts: `src/lib/fonts.ts` (`next/font/google` loaders + `BODY_CLASSNAME` + `FONT_VARIABLES`); `globals.css` only aliases the `--font-*-var` CSS vars they emit.
- All public copy: `src/lib/data.ts` — never inline literals in `page.tsx` beyond layout fragments.

Before editing a component, token, or animation: read `globals.css` and the relevant section of `data.ts`. Do not guess token names, motion durations, or spacing.

After any UI change, before commit (two-pass QC — `## Conventions` already gates `npm test + npm run build + npm run lint`; this adds the visual pass):
1. Visual pass at 375px (mobile) and 1280px (desktop); confirm `ProteinFigure.client.tsx` respects `prefers-reduced-motion` and viewport gating.
2. If motion values changed, confirm they match the existing `Reveal` stagger: `--i` CSS var written in `src/components/Reveal.tsx:31`, multiplied by 60ms in `src/app/globals.css:85`.

## Assets

- `public/favicon.svg` — single-n wordmark glyph on cream (from brand asset package)
- `public/brand/wordmark.svg` — ink-on-transparent wordmark
- `public/brand/wordmark-inverse.svg` — paper-on-dark wordmark
- `public/fig-1-sgce.png` — ε frontispiece; used as `POSTER_SRC` in `ProteinFigure.tsx` (editorial figure, not brand)
- `public/favicon-{16,32}x{16,32}.png` + `apple-touch-icon.png` — sourced directly from brand asset package (zip ships exact target sizes; no rsvg-convert regen needed)

## Sibling

Design siblings — not clones — with `arcivus.ca`. Arcivus is all-cool sans-serif clinical; NorthProt is warm cream + cool ink + serif body + mono display (lab-notebook editorial).
