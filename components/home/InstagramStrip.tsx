import { site } from "@/lib/site";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";

// Static curated strip. Replace the SVG placeholders with real IG thumbnails
// under /public/images/ig/ and swap to <Image /> when Rav delivers assets.
const tiles = Array.from({ length: 6 }, (_, i) => i);

export function InstagramStrip() {
  return (
    <Section
      eyebrow="Follow the work"
      title="Latest from the shop."
      description="Build logs, dyno pulls, and the occasional late-night wrench session."
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {tiles.map((i) => (
          <a
            key={i}
            href={site.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden rounded-lg border border-[--color-border] bg-[--color-surface]"
          >
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full"
              aria-hidden
            >
              <defs>
                <linearGradient id={`ig-${i}`} x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor={`hsl(${185 + i * 6} 90% ${40 - i * 2}%)`} />
                  <stop offset="1" stopColor="#07090b" />
                </linearGradient>
              </defs>
              <rect width="100" height="100" fill={`url(#ig-${i})`} />
              <circle
                cx={50}
                cy={50}
                r={18 + (i % 3) * 4}
                fill="none"
                stroke="var(--color-accent)"
                strokeOpacity="0.4"
                strokeWidth="0.5"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center bg-[--color-bg]/0 transition-colors group-hover:bg-[--color-bg]/60">
              <Icon
                name="instagram"
                className="h-6 w-6 text-[--color-text] opacity-0 transition-opacity group-hover:opacity-100"
              />
            </div>
          </a>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <a
          href={site.socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[--color-accent] hover:gap-3 transition-all"
        >
          <Icon name="instagram" className="h-4 w-4" />
          Follow {site.socials.instagramHandle}
        </a>
      </div>
    </Section>
  );
}
