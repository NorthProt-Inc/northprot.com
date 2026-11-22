import Image from "next/image";
import ProteinFigureClient from "./ProteinFigure.client";

/**
 * ProteinFigure — critical-path visual for the masthead.
 *
 * Static PNG ribbon of ε-sarcoglycan (UniProt O43556) as the poster.
 * On desktop viewports (≥ 768px), the client island hydrates an
 * interactive 3Dmol ribbon on top of the poster; on mobile we keep
 * the static PNG only (iOS Safari + 3Dmol + aspect-ratio containers
 * do not cooperate reliably).
 */

const POSTER_SRC = "/fig-1-sgce.png";

export default function ProteinFigure() {
  return (
    <figure className="flex flex-col items-start gap-3">
      <div
        className="relative w-full max-w-[280px] aspect-[4/3] overflow-hidden"
        style={{
          backgroundColor: "var(--color-paper-edge)",
          borderRadius: "2px",
        }}
      >
        <Image
          src={POSTER_SRC}
          width={640}
          height={480}
          alt="ε-sarcoglycan (SGCE) ribbon, AlphaFold prediction AF-O43556"
          priority
          className="block w-full h-auto"
        />
        <ProteinFigureClient />
      </div>
      <figcaption
        className="font-mono text-[11px] leading-[1.55] max-w-[280px]"
        style={{
          letterSpacing: "0.04em",
          color: "var(--color-ink-soft)",
        }}
      >
        Fig. 1 — ε-sarcoglycan (SGCE), wild-type. AlphaFold prediction
        AF-O43556 (UniProt O43556). Interactive viewer at{" "}
        <a
          href="https://arcivus.ca/explorer"
          className="underline decoration-dotted underline-offset-2"
          style={{ color: "var(--color-cyan)" }}
        >
          arcivus.ca/explorer
        </a>
        .
      </figcaption>
    </figure>
  );
}
