import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { builds } from "@/lib/builds";
import { Badge } from "@/components/ui/Badge";
import { site } from "@/lib/site";
import { BuildArt } from "@/components/builds/BuildArt";

export const metadata: Metadata = {
  title: "Builds",
  description:
    "Featured customer builds — GT-R, 370Z, Silvia. Specs, notes, and the reasoning behind each decision.",
  alternates: { canonical: `${site.url}/builds` },
};

export default function BuildsIndexPage() {
  return (
    <Section
      eyebrow="Builds"
      title="Customer builds, done honestly."
      description="Every build starts with a reliability target and a use case. Peak numbers matter — but a car you actually enjoy driving matters more."
    >
      <div className="grid gap-8 md:grid-cols-2">
        {builds.map((b) => (
          <Link
            key={b.slug}
            href={`/builds/${b.slug}`}
            className="group block overflow-hidden rounded-xl border border-[--color-border] bg-[--color-surface] transition-all duration-200 hover:border-[--color-accent]/60 hover:-translate-y-0.5"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <BuildArt slug={b.slug} label={`${b.year} ${b.make} ${b.model}`} />
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2">
                {b.tags.slice(0, 3).map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
              <h2 className="mt-4 text-2xl font-semibold group-hover:text-[--color-accent] transition-colors">
                {b.title}
              </h2>
              <p className="mt-2 text-[--color-muted] leading-relaxed">
                {b.subtitle}
              </p>
              {(b.hp || b.tq) && (
                <div className="mt-4 flex gap-6 text-sm">
                  {b.hp && (
                    <div>
                      <span className="text-[--color-muted]">Power:</span>{" "}
                      <span className="text-[--color-accent] font-semibold">{b.hp}</span>
                    </div>
                  )}
                  {b.tq && (
                    <div>
                      <span className="text-[--color-muted]">Torque:</span>{" "}
                      <span className="text-[--color-text] font-semibold">{b.tq}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
