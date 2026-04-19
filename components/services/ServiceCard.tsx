import Link from "next/link";
import type { Service } from "@/lib/services";
import { Icon } from "@/components/ui/Icon";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex flex-col rounded-xl border border-[--color-border] bg-[--color-surface] p-6 transition-all duration-200 hover:border-[--color-accent]/60 hover:bg-[--color-surface-2] hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[--color-border] bg-[--color-bg] text-[--color-accent]">
          <Icon name={service.icon} className="h-5 w-5" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-[--color-muted]">
          {service.category}
        </span>
      </div>
      <h3 className="mt-5 text-lg font-semibold text-[--color-text] group-hover:text-[--color-accent] transition-colors">
        {service.title}
      </h3>
      <p className="mt-2 text-sm text-[--color-muted] leading-relaxed">
        {service.tagline}
      </p>
      <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[--color-accent]">
        Learn more
        <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
