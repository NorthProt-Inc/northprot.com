import type { Metadata } from "next";
import { serif, mono, sans, BODY_CLASSNAME } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://northprot.com"),
  title: {
    default: "NorthProt",
    template: "%s — NorthProt",
  },
  description:
    "Jongmin Lee — bioinformatics, biology with root access. Solo R&D lab funding the wet-lab half of Arcivus (AAV gene therapy for DYT-SGCE myoclonus-dystonia).",
  openGraph: {
    title: "NorthProt — Jongmin Lee",
    description:
      "bioinformatics, biology with root access. Solo R&D lab; co-founder of Arcivus (AAV gene therapy).",
    url: "https://northprot.com",
    siteName: "NorthProt",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    type: "website",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "NorthProt — Jongmin Lee",
    description:
      "bioinformatics, biology with root access. Solo R&D lab; co-founder of Arcivus.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${mono.variable} ${sans.variable}`}
    >
      <body className={BODY_CLASSNAME}>{children}</body>
    </html>
  );
}
