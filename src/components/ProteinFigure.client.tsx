"use client";

/**
 * ProteinFigure.client — lazy 3Dmol island.
 *
 * Static PNG is the critical-path visual (rendered by the sibling server
 * component). This island hydrates the interactive ribbon *only* when:
 *   1. the user's browser has not requested `prefers-reduced-motion`,
 *   2. the figure scrolls into view, and
 *   3. the 3dmol chunk + AlphaFold PDB both fetch successfully.
 *
 * Any failure (WebGL absent, fetch error, dynamic import error) is swallowed
 * silently — the PNG underneath stays visible and nothing is logged to the
 * user. This keeps first paint cheap and keeps us off the error-UI ladder.
 */

import { useEffect, useRef, useState } from "react";

const PDB_URL = "https://alphafold.ebi.ac.uk/files/AF-O43556-F1-model_v6.pdb";
const CYAN = "#0094B3";
const CREAM = "#FAF7F1";

type ThreeDmol = typeof import("3dmol");
type GLViewer = ReturnType<ThreeDmol["createViewer"]> & {
  resize?: () => void;
  clear?: () => void;
  spin?: (axis: string | boolean, speed?: number) => void;
};

export default function ProteinFigureClient() {
  const hostRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<GLViewer | null>(null);
  const [active, setActive] = useState(false);

  // Gate 1: prefers-reduced-motion + small-viewport skip + IntersectionObserver.
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // Skip 3Dmol on phone-sized viewports — iOS Safari fails to paint
    // the ribbon inside aspect-ratio containers even after resize-guards.
    // Mobile users keep the static SVG silhouette; the interactive viewer
    // lives at arcivus.ca/explorer (already linked in the caption).
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(max-width: 767px)").matches
    ) {
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Gate 2: lazy-load 3dmol + AF PDB, attach viewer.
  useEffect(() => {
    if (!active) return;
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let ro: ResizeObserver | null = null;
    let clickHandler: (() => void) | null = null;

    (async () => {
      try {
        const [{ default: $3Dmol }, pdbRes] = await Promise.all([
          import("3dmol"),
          fetch(PDB_URL, { cache: "force-cache" }),
        ]);
        if (cancelled) return;
        if (!pdbRes.ok) return;

        const pdb = await pdbRes.text();
        if (cancelled) return;

        // Some mobile browsers (notably iOS Safari) compute canvas
        // dimensions before the parent's aspect-ratio container has
        // settled. Wait one frame so getBoundingClientRect is non-zero
        // before 3Dmol reads it during createViewer.
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => resolve())
        );
        if (cancelled) return;

        const viewer = $3Dmol.createViewer(host, {
          backgroundColor: CREAM,
        }) as GLViewer;
        if (!viewer) return;
        viewerRef.current = viewer;

        viewer.addModel(pdb, "pdb");
        viewer.setStyle({}, { cartoon: { color: CYAN } });
        viewer.zoomTo();
        viewer.render();

        // Second-pass resize after the viewer has painted once — handles
        // the case where the first render happened against a zero-sized
        // canvas on mobile (iOS Safari aspect-ratio settle).
        requestAnimationFrame(() => {
          try {
            viewer.resize?.();
            viewer.render();
          } catch {
            /* noop */
          }
        });

        // Observe container size changes (rotation, dynamic viewport)
        // and keep the viewer in sync.
        if (typeof ResizeObserver !== "undefined") {
          ro = new ResizeObserver(() => {
            try {
              viewer.resize?.();
              viewer.render();
            } catch {
              /* noop */
            }
          });
          ro.observe(host);
        }

        // Click/tap-to-spin: first tap starts rotation, second stops.
        let spinning = false;
        clickHandler = () => {
          const v = viewerRef.current;
          if (!v?.spin) return;
          spinning = !spinning;
          v.spin(spinning ? "y" : false, 1);
        };
        host.addEventListener("click", clickHandler);
      } catch {
        // Silent fallback — PNG remains visible beneath.
      }
    })();

    return () => {
      cancelled = true;
      ro?.disconnect();
      if (clickHandler) host.removeEventListener("click", clickHandler);
      const v = viewerRef.current;
      if (v) {
        try {
          v.clear?.();
        } catch {
          /* noop */
        }
      }
      viewerRef.current = null;
      if (host) host.innerHTML = "";
    };
  }, [active]);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="absolute inset-0"
      style={{ cursor: active ? "grab" : "default" }}
    />
  );
}
