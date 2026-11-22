import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// next/font/google — the real loader is a Next.js build-time plugin and cannot
// run under vitest. Stub each font export as a factory that returns the
// { variable, className, style } shape next/font normally produces.
const fontFactory = (opts: { variable?: string } = {}) => ({
  variable: opts.variable ?? "--font-mock",
  className: "font-mock",
  style: { fontFamily: "mock" },
});

vi.mock("next/font/google", () => ({
  Source_Serif_4: fontFactory,
  JetBrains_Mono: fontFactory,
  Geist: fontFactory,
  Geist_Mono: fontFactory,
  Inter: fontFactory,
  Plus_Jakarta_Sans: fontFactory,
}));

// jsdom shims -----------------------------------------------------------------

if (typeof globalThis.ResizeObserver === "undefined") {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
}

if (typeof globalThis.IntersectionObserver === "undefined") {
  globalThis.IntersectionObserver = class {
    readonly root: Element | null = null;
    readonly rootMargin: string = "0px";
    readonly thresholds: ReadonlyArray<number> = [0];
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  } as unknown as typeof IntersectionObserver;
}

if (typeof globalThis.matchMedia === "undefined") {
  globalThis.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}
