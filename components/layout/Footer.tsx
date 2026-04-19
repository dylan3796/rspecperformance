import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";

export function Footer() {
  const featured = services.slice(0, 5);
  return (
    <footer className="border-t border-[--color-border] bg-[--color-bg]">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo className="h-8 w-auto text-[--color-text]" />
          <p className="mt-4 text-sm leading-relaxed text-[--color-muted] max-w-xs">
            {site.description}
          </p>
          <div className="mt-6 flex items-center gap-3">
            {site.socials.instagram && (
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[--color-border] text-[--color-text] hover:text-[--color-accent] hover:border-[--color-accent] transition-colors"
                aria-label="Instagram"
              >
                <Icon name="instagram" className="h-4 w-4" />
              </a>
            )}
            <a
              href={site.phoneHref}
              className="inline-flex h-9 items-center gap-2 rounded-md border border-[--color-border] px-3 text-sm text-[--color-text] hover:text-[--color-accent] hover:border-[--color-accent] transition-colors"
            >
              <Icon name="phone" className="h-4 w-4" />
              {site.phone}
            </a>
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[--color-muted]">
            Services
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {featured.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-[--color-text] hover:text-[--color-accent] transition-colors"
                >
                  {s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/services"
                className="text-[--color-accent] hover:underline"
              >
                See all services →
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[--color-muted]">
            Shop
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[--color-text] hover:text-[--color-accent] transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[--color-muted]">
            Hours
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-[--color-muted]">
            {site.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className="text-[--color-text]">{h.value}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-[--color-muted]">
            {site.serviceArea}
          </p>
        </div>
      </div>

      <div className="border-t border-[--color-border]">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[--color-muted]">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="text-xs text-[--color-muted]">
            Built for enthusiasts. <span className="text-[--color-accent]">/</span>{" "}
            Not affiliated with Nissan Motor Co.
          </p>
        </div>
      </div>
    </footer>
  );
}
