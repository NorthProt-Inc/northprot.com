import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://northprot.com/",
      lastModified: new Date("2026-04-14"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
