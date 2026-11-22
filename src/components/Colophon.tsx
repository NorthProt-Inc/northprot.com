import { colophon } from "@/lib/data";

/**
 * Colophon — three short paragraphs that close the page:
 *   1. model credit (Claude Opus 4.6 built this end-to-end),
 *   2. typography + the ε-sarcoglycan figure source,
 *   3. GitHub source link and copyright line.
 */
export default function Colophon() {
  return (
    <div
      className="space-y-4 font-serif text-[14px] leading-[1.7]"
      style={{ color: "var(--color-ink-soft)" }}
    >
      <p>{colophon.built_by}</p>
      <p>{colophon.typography}</p>
      <p>
        <a
          href={colophon.source_link.href}
          className="underline decoration-dotted underline-offset-4"
          style={{ color: "var(--color-ink)" }}
        >
          {colophon.source_link.label}
        </a>
        <span aria-hidden className="mx-2">
          {"\u00b7"}
        </span>
        <span>{colophon.copyright}</span>
      </p>
    </div>
  );
}
