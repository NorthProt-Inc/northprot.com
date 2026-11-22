import { Source_Serif_4, JetBrains_Mono, Geist } from "next/font/google";

/**
 * Source Serif 4 — body copy (editorial serif).
 * Variable axis: weight 200–900.
 */
export const serif = Source_Serif_4({
  variable: "--font-serif-var",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

/**
 * JetBrains Mono — display headings, labels, numerics.
 * Variable axis: weight 100–800.
 */
export const mono = JetBrains_Mono({
  variable: "--font-mono-var",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Geist Sans — UI / fallback sans.
 */
export const sans = Geist({
  variable: "--font-sans-var",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Body className constant consumed by both RootLayout and its tests so the
 * contract stays in one place.
 */
export const BODY_CLASSNAME = "bg-paper text-ink antialiased font-serif";

/**
 * Font CSS variables applied to <html> in RootLayout. Tests assert each of
 * these is present so the foundation contract is machine-checked.
 */
export const FONT_VARIABLES = [
  "--font-serif-var",
  "--font-mono-var",
  "--font-sans-var",
] as const;
