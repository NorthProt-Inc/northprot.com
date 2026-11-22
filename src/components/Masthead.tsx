import { masthead } from "@/lib/data";
import ProteinFigure from "./ProteinFigure";

/**
 * Masthead — the front matter of the page.
 *
 *   [ dateline · place ]           (mono uppercase)
 *
 *   Jongmin Lee                    (serif large)
 *   bioinformatics, biology…       (serif italic)
 *
 *   H1 — thesis line                (serif, fluid clamp)
 *
 *   Fig. 1 — ε-sarcoglycan          (right column on ≥ md, stacks on mobile)
 *
 * Layout is intentionally plain CSS grid. The section below the masthead uses
 * the container-query `notebook-grid`; the masthead has its own simpler
 * two-column frame.
 */
export default function Masthead() {
  return (
    <header className="w-full pt-16 pb-12 md:pt-24 md:pb-16">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] gap-10 md:gap-16 items-start">
        <div className="space-y-6 max-w-[680px]">
          <div
            className="font-mono text-[11px] uppercase"
            style={{
              letterSpacing: "0.22em",
              color: "var(--color-ink-soft)",
            }}
          >
            {masthead.date}
            <span aria-hidden className="mx-2">
              {"\u00b7"}
            </span>
            {masthead.place}
          </div>

          <div className="space-y-2">
            <div className="font-serif text-[28px] md:text-[32px] leading-[1.15]">
              {masthead.name}
            </div>
            <div
              className="font-serif italic text-[17px] md:text-[18px] leading-[1.4]"
              style={{ color: "var(--color-ink-soft)" }}
            >
              {masthead.tagline}
            </div>
          </div>

          <h1
            className="font-serif font-normal"
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
            }}
          >
            {masthead.thesis_h1}
          </h1>
        </div>

        <div className="md:pt-6">
          <ProteinFigure />
        </div>
      </div>
    </header>
  );
}
