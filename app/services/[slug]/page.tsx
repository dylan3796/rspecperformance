import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, servicesBySlug } from "@/lib/services";
import { site } from "@/lib/site";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/schema";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { ServiceCard } from "@/components/services/ServiceCard";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesBySlug[slug];
  if (!service) return {};
  return {
    title: service.title,
    description: service.tagline,
    alternates: { canonical: `${site.url}/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesBySlug[slug];
  if (!service) notFound();

  const related = (service.relatedSlugs || [])
    .map((s) => servicesBySlug[s])
    .filter(Boolean)
    .slice(0, 3);

  const sJsonLd = serviceJsonLd(service.slug);
  const crumbs = breadcrumbJsonLd([
    { name: "Home", url: site.url },
    { name: "Services", url: `${site.url}/services` },
    { name: service.title, url: `${site.url}/services/${service.slug}` },
  ]);

  return (
    <>
      <section className="relative pt-16 pb-12 border-b border-[--color-border]">
        <div className="absolute inset-0 bg-grid opacity-30 mask-fade-b" aria-hidden />
        <Container className="relative">
          <div className="mb-6 flex items-center gap-2 text-sm">
            <Link href="/services" className="text-[--color-muted] hover:text-[--color-accent]">
              Services
            </Link>
            <span className="text-[--color-muted]">/</span>
            <span className="text-[--color-text]">{service.title}</span>
          </div>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="max-w-2xl">
              <Badge tone="accent">{service.category}</Badge>
              <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight">
                {service.title}
              </h1>
              <p className="mt-4 text-lg text-[--color-muted] leading-relaxed">
                {service.tagline}
              </p>
            </div>
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-[--color-border] bg-[--color-surface] text-[--color-accent]">
              <Icon name={service.icon} className="h-7 w-7" />
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-5">
            {service.body.map((p, i) => (
              <p key={i} className="text-lg text-[--color-text] leading-relaxed">
                {p}
              </p>
            ))}
            <div className="pt-4">
              <Button href="/contact" size="lg">
                Ask about {service.title.toLowerCase()}
                <Icon name="arrow-right" className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <aside>
            <div className="sticky top-24 rounded-xl border border-[--color-border] bg-[--color-surface] p-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[--color-muted]">
                What&rsquo;s included
              </h3>
              <ul className="mt-4 space-y-3">
                {service.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm">
                    <Icon name="check" className="h-5 w-5 text-[--color-accent] flex-shrink-0 mt-0.5" />
                    <span className="text-[--color-text]">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      {related.length > 0 && (
        <Section
          eyebrow="Related services"
          title="Often paired with this"
          className="bg-[--color-surface]/30 border-t border-[--color-border]"
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </Section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
    </>
  );
}
