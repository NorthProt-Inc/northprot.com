import type { ReactNode } from "react";

/**
 * MarginNote — right-rail annotation in mono uppercase.
 * Rendered inside Section's third column on ≥ md, inline beneath body on mobile.
 */
export default function MarginNote({ children }: { children: ReactNode }) {
  return (
    <aside
      className="font-mono text-[11px] leading-relaxed uppercase"
      style={{
        letterSpacing: "0.18em",
        color: "var(--color-ink-soft)",
      }}
    >
      {children}
    </aside>
  );
}
