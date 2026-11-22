import type { WorkEntry as WorkEntryType } from "@/lib/data";

/**
 * WorkEntry — single row in the Work section. Header line prints
 * name · role · period above a hairline rule, followed by a serif
 * blurb in the main column and mono-uppercase tags in a right column.
 */
export default function WorkEntry({ entry }: { entry: WorkEntryType }) {
  const header = (
    <div
      className="flex flex-wrap items-baseline gap-x-2 gap-y-1 font-mono text-[12px] uppercase"
      style={{
        letterSpacing: "0.12em",
        color: "var(--color-ink)",
      }}
    >
      {entry.href ? (
        <a
          href={entry.href}
          className="underline decoration-dotted underline-offset-4"
        >
          {entry.name}
        </a>
      ) : (
        <span>{entry.name}</span>
      )}
      <span aria-hidden style={{ color: "var(--color-ink-soft)" }}>
        {"\u00b7"}
      </span>
      <span style={{ color: "var(--color-ink-soft)" }}>{entry.role}</span>
      <span aria-hidden style={{ color: "var(--color-ink-soft)" }}>
        {"\u00b7"}
      </span>
      <span style={{ color: "var(--color-ink-soft)" }}>{entry.period}</span>
    </div>
  );

  return (
    <article
      className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-x-8 gap-y-2 py-5 border-t first:border-t-0"
      style={{ borderColor: "var(--color-rule)" }}
    >
      <div className="space-y-2">
        {header}
        <p className="font-serif text-[15px] leading-[1.65]">{entry.blurb}</p>
      </div>
      <ul className="flex md:flex-col flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase md:text-right">
        {entry.tags.map((tag) => (
          <li
            key={tag}
            style={{
              letterSpacing: "0.18em",
              color: "var(--color-ink-soft)",
            }}
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
