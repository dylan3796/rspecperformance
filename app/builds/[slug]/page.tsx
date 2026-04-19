import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { builds, buildsBySlug } from "@/lib/builds";
import { site } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/schema";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { BuildArt } from "@/components/builds/BuildArt";

export function generateStaticParams() {
  return builds.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const build = buildsBySlug[slug];
  if (!build) return {};
  return {
    title: build.title,
    description: build.subtitle,
    alternates: { canonical: `${site.url}/builds/${build.slug}` },
  };
}

export default async function BuildDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const b = buildsBySlug[slug];
  if (!b) notFound();

  const crumbs = breadcrumbJsonLd([
    { name: "Home", url: site.url },
    { name: "Builds", url: `${site.url}/builds` },
    { name: b.title, url: `${site.url}/builds/${b.slug}` },
  ]);

  return (
    <>
      <section className="relative pt-12 pb-0">
        <Container>
          <div className="mb-6 flex items-center gap-2 text-sm">
            <Link href="/builds" className="text-[--color-muted] hover:text-[--color-accent]">
              Builds
            </Link>
            <span className="text-[--color-muted]">/</span>
            <span className="text-[--color-text]">{b.title}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {b.tags.map((t) => (
              <Badge key={t} tone="accent">
                {t}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight max-w-4xl">
            {b.title}
          </h1>
          <p className="mt-4 text-lg text-[--color-muted] max-w-3xl leading-relaxed">
            {b.subtitle}
          </p>
        </Container>
        <Container className="mt-10">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[--color-border] bg-[--color-surface]">
            <BuildArt slug={b.slug} label={`${b.year} ${b.make} ${b.model}`} />
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-5">
            {b.story.map((p, i) => (
              <p key={i} className="text-lg text-[--color-text] leading-relaxed">
                {p}
              </p>
            ))}
            <div className="pt-4">
              <Button href="/contact" size="lg">
                Start a build like this
                <Icon name="arrow-right" className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <aside>
            <div className="sticky top-24 space-y-4">
              {(b.hp || b.tq) && (
                <div className="grid grid-cols-2 gap-4 rounded-xl border border-[--color-border] bg-[--color-surface] p-5">
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
              <div className="rounded-xl border border-[--color-border] bg-[--color-surface] p-5">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[--color-muted] mb-4">
                  Specs
                </h3>
                <dl className="space-y-3 text-sm">
                  {b.specs.map((s) => (
                    <div key={s.label} className="flex justify-between gap-4 border-b border-[--color-border] pb-2 last:border-0">
                      <dt className="text-[--color-muted]">{s.label}</dt>
                      <dd className="text-[--color-text] text-right">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </aside>
        </div>
      </Section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
    </>
  );
}
