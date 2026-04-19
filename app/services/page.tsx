import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { ServiceCard } from "@/components/services/ServiceCard";
import { categoryOrder, servicesByCategory } from "@/lib/services";
import { site } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Services",
  description:
    "ECU tuning, turbo builds, suspension, brakes, diagnostics, and Nissan/JDM specialty work.",
  alternates: { canonical: `${site.url}/services` },
};

export default function ServicesIndexPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", url: site.url },
    { name: "Services", url: `${site.url}/services` },
  ]);

  return (
    <>
      <Section
        eyebrow="Services"
        title="Every service, built around the way we actually work."
        description="Tunes are calibrated to your car. Builds are scoped to a reliability target first. Maintenance gets the same attention as a stage-3 package."
      >
        <div className="space-y-16">
          {categoryOrder.map((cat) => {
            const items = servicesByCategory[cat];
            if (!items?.length) return null;
            return (
              <div key={cat}>
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[--color-accent] mb-6">
                  {cat}
                </h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((s) => (
                    <ServiceCard key={s.slug} service={s} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
    </>
  );
}
