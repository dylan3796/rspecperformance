import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { builds } from "@/lib/builds";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, priority: 1 },
    { url: `${site.url}/services`, lastModified: now, priority: 0.9 },
    { url: `${site.url}/builds`, lastModified: now, priority: 0.8 },
    { url: `${site.url}/about`, lastModified: now, priority: 0.7 },
    { url: `${site.url}/faq`, lastModified: now, priority: 0.6 },
    { url: `${site.url}/contact`, lastModified: now, priority: 0.9 },
  ];
  for (const s of services) {
    base.push({
      url: `${site.url}/services/${s.slug}`,
      lastModified: now,
      priority: 0.7,
    });
  }
  for (const b of builds) {
    base.push({
      url: `${site.url}/builds/${b.slug}`,
      lastModified: now,
      priority: 0.6,
    });
  }
  return base;
}
