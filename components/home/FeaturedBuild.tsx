import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { builds } from "@/lib/builds";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { BuildArt } from "@/components/builds/BuildArt";

export function FeaturedBuild() {
  const b = builds[0];
  return (
    <Section eyebrow="Featured build" title={b.title} description={b.subtitle}>
      <div className="grid gap-10 lg:grid-cols-5 items-start">
        <div className="lg:col-span-3 order-2 lg:order-1">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[--color-border] bg-[--color-surface]">
            <BuildArt slug={b.slug} label={`${b.year} ${b.make} ${b.model}`} />
          </div>
        </div>
        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="flex flex-wrap gap-2 mb-4">
            {b.tags.map((t) => (
              <Badge key={t} tone="accent">
                {t}
              </Badge>
            ))}
          </div>
          {(b.hp || b.tq) && (
            <div className="grid grid-cols-2 gap-4 rounded-xl border border-[--color-border] bg-[--color-surface] p-5 mb-6">
              {b.hp && (
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[--color-muted]">
                    Horsepower
                  </div>
                  <div className="mt-1 text-2xl font-semibold text-[--color-accent]">
                    {b.hp}
                  </div>
                </div>
              )}
              {b.tq && (
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[--color-muted]">
                    Torque
                  </div>
                  <div className="mt-1 text-2xl font-semibold text-[--color-text]">
                    {b.tq}
                  </div>
                </div>
              )}
            </div>
          )}
          <dl className="space-y-2 text-sm">
            {b.specs.slice(0, 5).map((s) => (
              <div key={s.label} className="flex justify-between gap-4 border-b border-[--color-border] pb-2">
                <dt className="text-[--color-muted]">{s.label}</dt>
                <dd className="text-[--color-text] text-right">{s.value}</dd>
              </div>
            ))}
          </dl>
          <Link
            href={`/builds/${b.slug}`}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[--color-accent] hover:gap-3 transition-all"
          >
            Read the full build
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
