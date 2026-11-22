/**
 * Sprint 4 — page assembly.
 *
 * Asserts that the page wires the six-section IA in document order, the
 * masthead tagline renders and the Claude / Opus 4.6 colophon credit is present.
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { ImgHTMLAttributes } from "react";

// next/image → plain <img>; drop Next-only props.
vi.mock("next/image", () => ({
  default: (
    props: ImgHTMLAttributes<HTMLImageElement> & {
      priority?: boolean;
      src: string;
      alt: string;
    }
  ) => {
    const { priority: _priority, ...rest } = props;
    void _priority;
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...rest} />;
  },
}));

// next/dynamic → no-op stub (ProteinFigure's 3Dmol island).
vi.mock("next/dynamic", () => ({
  default: () => {
    const Stub = () => null;
    Stub.displayName = "DynamicStub";
    return Stub;
  },
}));

import Page from "@/app/page";
import * as data from "@/lib/data";

describe("page assembly", () => {
  it("renders all 6 section labels in document order", () => {
    const { container } = render(<Page />);
    const labels = Array.from(
      container.querySelectorAll("[data-section-label]")
    ).map((n) => (n.getAttribute("data-section-label") ?? "").trim());
    expect(labels).toEqual([
      "NOW",
      "THESIS",
      "WORK",
      "WRITING",
      "STACK",
      "ELSEWHERE",
    ]);
  });

  it("renders the masthead tagline", () => {
    render(<Page />);
    expect(screen.getByText(data.masthead.tagline)).toBeInTheDocument();
  });

  it("renders the colophon credit to Claude", () => {
    render(<Page />);
    const html = document.body.innerHTML;
    expect(html).toMatch(/Claude/);
    expect(html).toMatch(/Opus 4\.6/);
  });

  it("renders footnote anchors that point to fn-{id} targets inside THESIS", () => {
    const { container } = render(<Page />);
    // Each footnote body gets an id="fn-{n}" on its <li>.
    for (const fn of data.thesis.footnotes) {
      expect(container.querySelector(`#fn-${fn.id}`)).not.toBeNull();
    }
    // At least one inline FootnoteRef anchor pointing at #fn-1 should exist.
    const refs = container.querySelectorAll('a[href^="#fn-"]');
    expect(refs.length).toBeGreaterThanOrEqual(data.thesis.footnotes.length);
  });
});
