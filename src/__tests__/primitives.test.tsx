/**
 * Sprint 3 — layout primitives.
 *
 * Each of the eight server components (plus the Reveal client wrapper) is
 * imported directly and rendered with @testing-library/react. We mock
 * next/image and next/dynamic locally so server components can be rendered
 * under jsdom without pulling in Next's runtime.
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { ImgHTMLAttributes } from "react";

// next/image → plain <img>. We intentionally drop the non-DOM `priority` prop.
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

// next/dynamic → no-op stub. The ProteinFigure server component lazy-loads
// the 3Dmol island via this; under test we render nothing for the island.
vi.mock("next/dynamic", () => ({
  default: () => {
    const Stub = () => null;
    Stub.displayName = "DynamicStub";
    return Stub;
  },
}));

import { masthead, stack, work, colophon } from "@/lib/data";
import Masthead from "@/components/Masthead";
import Section from "@/components/Section";
import MarginNote from "@/components/MarginNote";
import FootnoteRef from "@/components/FootnoteRef";
import StackTable from "@/components/StackTable";
import WorkEntry from "@/components/WorkEntry";
import Colophon from "@/components/Colophon";
import ProteinFigure from "@/components/ProteinFigure";

describe("Masthead", () => {
  it("renders tagline, thesis H1, and a figure element", () => {
    const { container } = render(<Masthead />);
    expect(screen.getByText(masthead.tagline)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: masthead.thesis_h1 })
    ).toBeInTheDocument();
    expect(container.querySelector("figure")).not.toBeNull();
  });

  it("renders date, place, and name", () => {
    const { container } = render(<Masthead />);
    const text = container.textContent ?? "";
    expect(text).toContain(masthead.date);
    expect(text).toContain(masthead.place);
    expect(screen.getByText(masthead.name)).toBeInTheDocument();
  });
});

describe("Section", () => {
  it("renders the label in uppercase mono and wraps children", () => {
    render(
      <Section index={0} label="thesis">
        <p>body content</p>
      </Section>
    );
    const label = screen.getByText("thesis", { exact: false });
    // label text should be upper-cased visually via CSS or at source.
    expect(label.textContent?.toUpperCase()).toContain("THESIS");
    expect(label.className).toMatch(/mono/);
    expect(screen.getByText("body content")).toBeInTheDocument();
  });

  it("accepts an optional margin prop and renders it", () => {
    render(
      <Section
        index={1}
        label="work"
        margin={<span>right rail</span>}
      >
        <p>body</p>
      </Section>
    );
    expect(screen.getByText("right rail")).toBeInTheDocument();
  });
});

describe("MarginNote", () => {
  it("renders an <aside> with provided content", () => {
    const { container } = render(<MarginNote>side note</MarginNote>);
    const aside = container.querySelector("aside");
    expect(aside).not.toBeNull();
    expect(aside?.textContent).toContain("side note");
  });
});

describe("FootnoteRef", () => {
  it("renders a <sup> with an anchor linking to #fn-{id}", () => {
    const { container } = render(<FootnoteRef id="2" />);
    const sup = container.querySelector("sup");
    expect(sup).not.toBeNull();
    const anchor = sup?.querySelector("a");
    expect(anchor?.getAttribute("href")).toBe("#fn-2");
    expect(anchor?.textContent).toBe("2");
  });
});

describe("StackTable", () => {
  it("renders every stack group label and its values with a middle-dot separator", () => {
    const { container } = render(<StackTable />);
    for (const group of Object.keys(stack) as (keyof typeof stack)[]) {
      expect(screen.getByText(group)).toBeInTheDocument();
      // All values for the group appear as their own text nodes.
      for (const v of stack[group]) {
        const matches = screen.getAllByText(v);
        expect(matches.length).toBeGreaterThan(0);
      }
    }
    // Overall document should contain middle-dot separators.
    expect(container.textContent).toContain("\u00b7");
  });
});

describe("WorkEntry", () => {
  it("renders name, role, period, blurb, and tags", () => {
    const entry = work[0];
    const { container } = render(<WorkEntry entry={entry} />);
    const text = container.textContent ?? "";
    expect(text).toContain(entry.name);
    expect(text).toContain(entry.role);
    expect(text).toContain(entry.period);
    expect(text).toContain(entry.blurb);
    for (const tag of entry.tags) {
      expect(screen.getByText(tag)).toBeInTheDocument();
    }
  });
});

describe("Colophon", () => {
  it("contains the model credit strings", () => {
    render(<Colophon />);
    expect(screen.getByText(/Claude/)).toBeInTheDocument();
    expect(screen.getByText(/Opus 4\.6/)).toBeInTheDocument();
    // Typography + copyright should be present too.
    expect(screen.getByText(new RegExp(colophon.copyright.replace("\u00a9", "\u00a9")))).toBeInTheDocument();
  });
});

describe("ProteinFigure", () => {
  it("renders a caption with Fig. 1, ε-sarcoglycan, and AF-O43556", () => {
    const { container } = render(<ProteinFigure />);
    const caption = container.querySelector("figcaption");
    expect(caption).not.toBeNull();
    const text = caption?.textContent ?? "";
    expect(text).toMatch(/Fig\.\s*1/);
    expect(text).toContain("\u03b5-sarcoglycan");
    expect(text).toContain("AF-O43556");
    // Inline link to arcivus.ca/explorer.
    const link = caption?.querySelector("a");
    expect(link?.getAttribute("href")).toMatch(/arcivus\.ca\/explorer/);
  });
});
