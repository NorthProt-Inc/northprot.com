"use client";

import type { ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

/**
 * Reveal — thin client wrapper around the CSS-only `useReveal` IO hook.
 *
 * Mount-time state is `reveal` (opacity 0, translateY 8px). Once the element
 * crosses the IO threshold `revealed` gets added, the transition defined in
 * globals.css fires, and it stays put. Reduced-motion users skip the
 * transition entirely — see globals.css.
 *
 * An optional `index` writes `--i` so parents using `.reveal-stagger` can
 * offset the transition-delay per child.
 */
export default function Reveal({
  children,
  index,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  index?: number;
  as?: "div" | "section" | "li" | "article";
  className?: string;
}) {
  const ref = useReveal<HTMLElement>();
  const style =
    typeof index === "number"
      ? ({ ["--i" as string]: index } as React.CSSProperties)
      : undefined;

  // Tag is constrained to safe block-level elements; cast through unknown is
  // the cleanest way to satisfy React's per-tag ref typing without a full
  // generic component wrapper.
  const Component = Tag as unknown as React.ElementType;
  return (
    <Component
      ref={ref as unknown as React.Ref<HTMLElement>}
      className={`reveal ${className}`.trim()}
      style={style}
    >
      {children}
    </Component>
  );
}
