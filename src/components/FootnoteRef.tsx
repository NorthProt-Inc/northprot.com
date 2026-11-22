/**
 * FootnoteRef — superscript anchor linking to the corresponding footnote block.
 * Styled with the cyan accent so references register visually without shouting.
 */
export default function FootnoteRef({ id }: { id: string }) {
  return (
    <sup className="text-[0.7em]">
      <a
        href={`#fn-${id}`}
        className="text-cyan no-underline hover:underline"
        style={{ color: "var(--color-cyan)" }}
      >
        {id}
      </a>
    </sup>
  );
}
