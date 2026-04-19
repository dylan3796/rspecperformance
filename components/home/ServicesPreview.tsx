import { Section } from "@/components/ui/Section";
import { services } from "@/lib/services";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function ServicesPreview() {
  const featured = services.slice(0, 6);
  return (
    <Section
      eyebrow="What we do"
      title="Services built around the Nissan & JDM platforms you care about."
      description="From bolt-on tunes to built-motor packages, corner-balanced chassis work to dealer-grade diagnostics."
      className="bg-[--color-surface]/30 border-y border-[--color-border]"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((s) => (
          <ServiceCard key={s.slug} service={s} />
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Button href="/services" variant="outline" size="lg">
          View all services
          <Icon name="arrow-right" className="h-4 w-4" />
        </Button>
      </div>
    </Section>
  );
}
