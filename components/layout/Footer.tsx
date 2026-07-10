import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";

export function Footer() {
  return (
    <footer className="border-t border-[--color-border] bg-[--color-bg]">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-[--color-muted] max-w-xs">
            {site.description}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[--color-muted]">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 text-[--color-text] hover:text-[--color-accent] transition-colors"
              >
                <Icon name="phone" className="h-4 w-4" />
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 text-[--color-text] hover:text-[--color-accent] transition-colors"
              >
                <Icon name="mail" className="h-4 w-4" />
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[--color-text] hover:text-[--color-accent] transition-colors"
              >
                <Icon name="instagram" className="h-4 w-4" />
                {site.socials.instagramHandle}
              </a>
            </li>
            <li>
              <Link
                href="/portal"
                className="inline-flex items-center gap-2 text-[--color-text] hover:text-[--color-accent] transition-colors"
              >
                <Icon name="check" className="h-4 w-4" />
                Track your service
              </Link>
            </li>
            <li className="text-[--color-muted]">{site.serviceArea}</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[--color-muted]">
            Hours
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-[--color-muted]">
            {site.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4 max-w-xs">
                <span>{h.day}</span>
                <span className="text-[--color-text]">{h.value}</span>
              </li>
            ))}
          </ul>
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
