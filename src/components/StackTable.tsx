import { stack } from "@/lib/data";

/**
 * StackTable — one row per stack group. Mono uppercase label on the left,
 * dot-separated serif values on the right, with a hairline leader in between.
 *
 *   LANGUAGES ········· Python · TypeScript · R · SQL
 */
export default function StackTable() {
  const groups = Object.keys(stack) as (keyof typeof stack)[];
  return (
    <dl className="w-full">
      {groups.map((group) => (
        <div
          key={group}
          className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 py-2 border-b last:border-b-0"
          style={{ borderColor: "var(--color-rule)" }}
        >
          <dt
            className="font-mono text-[11px] uppercase"
            style={{
              letterSpacing: "0.18em",
              color: "var(--color-ink-soft)",
            }}
          >
            {group}
          </dt>
          <dd
            className="font-serif text-[15px] leading-snug min-w-0 overflow-x-auto whitespace-nowrap md:whitespace-normal md:overflow-visible no-scrollbar"
          >
            {stack[group].map((value, i) => (
              <span key={value}>
                {i > 0 && (
                  <span
                    aria-hidden
                    className="mx-2"
                    style={{ color: "var(--color-ink-soft)" }}
                  >
                    {"\u00b7"}
                  </span>
                )}
                <span>{value}</span>
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}
