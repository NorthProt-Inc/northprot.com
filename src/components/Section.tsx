import type { ReactNode } from "react";

/**
 * Section — asymmetric three-column notebook grid driven by container queries.
 *
 *   [ label (mono) 160px ] [ body max 640px ] [ margin 1fr ]
 *
 * On containers below 1024px the layout collapses to a single column and the
 * margin rail appears inline beneath the body. The container-query CSS itself
 * lives in globals.css under `.notebook-grid`; this component just arranges
 * the three slots.
 */
export default function Section({
  index,
  label,
  margin,
  children,
  id,
}: {
  index: number;
  label: string;
  margin?: ReactNode;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      data-section-index={index}
      className="notebook-grid py-16 border-t"
      style={{ borderColor: "var(--color-rule)" }}
    >
      <header
        data-section-label={label.toUpperCase()}
        className="font-mono text-[11px] tracking-[0.22em] uppercase"
        style={{ color: "var(--color-ink-soft)" }}
      >
        {label.toUpperCase()}
      </header>
      <div className="font-serif text-[17px] leading-[1.7]">{children}</div>
      <div className="space-y-4">{margin}</div>
    </section>
  );
}
