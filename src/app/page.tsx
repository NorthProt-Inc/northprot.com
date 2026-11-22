import type { ReactNode } from "react";
import {
  masthead,
  now,
  thesis,
  work,
  writing,
  elsewhere,
} from "@/lib/data";
import Masthead from "@/components/Masthead";
import Section from "@/components/Section";
import MarginNote from "@/components/MarginNote";
import FootnoteRef from "@/components/FootnoteRef";
import Reveal from "@/components/Reveal";
import StackTable from "@/components/StackTable";
import WorkEntryComp from "@/components/WorkEntry";
import Colophon from "@/components/Colophon";

/**
 * Page assembly — six sections rendered in order from canonical data.
 *
 * Masthead → NOW → THESIS → WORK → WRITING → STACK → ELSEWHERE → Colophon.
 * Every child section is wrapped in <Reveal> with a staggered --i index so the
 * CSS-only fade-in cascades. THESIS paragraphs thread inline FootnoteRef
 * anchors to a bottom list (#fn-1, #fn-2, #fn-3).
 */

// Unicode superscript digits used as footnote markers in data.ts prose.
const SUPERSCRIPT_TO_ID: Record<string, string> = {
  "\u00b9": "1",
  "\u00b2": "2",
  "\u00b3": "3",
};

/**
 * Split a prose paragraph at every ¹/²/³ marker and substitute a live
 * FootnoteRef anchor. Returns an array of React nodes ready to drop into a <p>.
 */
function renderThesisParagraph(body: string): ReactNode[] {
  const markers = Object.keys(SUPERSCRIPT_TO_ID).join("");
  const pattern = new RegExp(`([${markers}])`, "g");
  const parts = body.split(pattern);
  return parts.map((part, i) => {
    const fnId = SUPERSCRIPT_TO_ID[part];
    if (fnId) return <FootnoteRef key={`fn-ref-${i}`} id={fnId} />;
    return <span key={`txt-${i}`}>{part}</span>;
  });
}

export default function Home() {
  return (
    <main
      className="min-h-screen mx-auto max-w-[1080px] px-6 md:px-12 py-16 md:py-24"
      style={{
        backgroundColor: "var(--color-paper)",
        color: "var(--color-ink)",
      }}
    >
      <Masthead />

      {/* ---- §1 NOW ----------------------------------------------------- */}
      <Section
        index={1}
        label="NOW"
        margin={<MarginNote>{masthead.date.replace(".", " / ")}</MarginNote>}
      >
        <div className="space-y-6">
          {now.map((item, i) => (
            <Reveal key={item.label} index={i}>
              <dl className="grid grid-cols-[7rem_1fr] items-baseline gap-x-6 gap-y-1">
                <dt
                  className="font-mono uppercase text-[11px]"
                  style={{
                    letterSpacing: "0.18em",
                    color: "var(--color-ink-soft)",
                  }}
                >
                  {item.label}
                </dt>
                <dd className="font-serif text-[17px] leading-[1.65]">
                  {item.body}
                </dd>
              </dl>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---- §2 THESIS -------------------------------------------------- */}
      <Section
        index={2}
        label="THESIS"
        margin={
          <>
            {thesis.footnotes.map((fn) => (
              <MarginNote key={`margin-fn-${fn.id}`}>
                <sup id={`fn-${fn.id}`}>{fn.id}</sup> {fn.body}
              </MarginNote>
            ))}
          </>
        }
      >
        <div className="space-y-5">
          <Reveal index={0}>
            <p
              className="font-serif italic text-[20px] leading-[1.5]"
              style={{ color: "var(--color-ink)" }}
            >
              {thesis.anchor}
            </p>
          </Reveal>
          {thesis.paragraphs.map((para, i) => (
            <Reveal key={`thesis-p-${i}`} index={i + 1}>
              <p className="font-serif text-[17px] leading-[1.7]">
                {renderThesisParagraph(para)}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---- §3 WORK ---------------------------------------------------- */}
      <Section index={3} label="WORK">
        <div>
          {work.map((w, i) => (
            <Reveal key={w.name} index={i}>
              <WorkEntryComp entry={w} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---- §4 WRITING ------------------------------------------------- */}
      <Section index={4} label="WRITING">
        <div className="space-y-8">
          {writing.map((piece, i) => (
            <Reveal key={piece.title} index={i}>
              <article className="space-y-2">
                <h3 className="font-serif italic text-[22px] leading-[1.25] font-normal">
                  {piece.href ? (
                    <a
                      href={piece.href}
                      className="underline decoration-dotted underline-offset-4"
                    >
                      {piece.title}
                    </a>
                  ) : (
                    piece.title
                  )}
                </h3>
                <p
                  className="font-mono uppercase text-[11px]"
                  style={{
                    letterSpacing: "0.18em",
                    color: "var(--color-ink-soft)",
                  }}
                >
                  {piece.date}
                </p>
                <p className="font-serif text-[17px] leading-[1.65]">
                  {piece.excerpt}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---- §5 STACK --------------------------------------------------- */}
      <Section index={5} label="STACK">
        <Reveal index={0}>
          <StackTable />
        </Reveal>
      </Section>

      {/* ---- §6 ELSEWHERE ---------------------------------------------- */}
      <Section index={6} label="ELSEWHERE">
        <Reveal index={0}>
          <dl className="space-y-3">
            {elsewhere.map((item) => (
              <div
                key={item.label}
                className="grid grid-cols-[7rem_1fr] items-baseline gap-x-6"
              >
                <dt
                  className="font-mono uppercase text-[11px]"
                  style={{
                    letterSpacing: "0.18em",
                    color: "var(--color-ink-soft)",
                  }}
                >
                  {item.label}
                </dt>
                <dd className="font-serif text-[17px]">
                  <a
                    href={item.href}
                    className="border-b"
                    style={{ borderColor: "var(--color-cyan)" }}
                  >
                    {item.value}
                  </a>
                  {item.extras?.map((ex) => (
                    <span key={ex.href}>
                      <span
                        aria-hidden
                        className="mx-2"
                        style={{ color: "var(--color-ink-soft)" }}
                      >
                        {"\u00b7"}
                      </span>
                      <a
                        href={ex.href}
                        className="border-b"
                        style={{ borderColor: "var(--color-cyan)" }}
                      >
                        {ex.value}
                      </a>
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      {/* ---- Colophon --------------------------------------------------- */}
      <div className="pt-16 mt-16 border-t" style={{ borderColor: "var(--color-rule)" }}>
        <Colophon />
      </div>
    </main>
  );
}
