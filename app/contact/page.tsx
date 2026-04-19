import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}. We reply within one business day.`,
  alternates: { canonical: `${site.url}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative pt-20 pb-10 border-b border-[--color-border]">
        <div className="absolute inset-0 bg-grid opacity-30 mask-fade-b" aria-hidden />
        <Container className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-[--color-border] bg-[--color-surface]/50 px-3 py-1 text-xs font-medium text-[--color-muted] backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[--color-accent]" />
            Get in touch
          </div>
          <h1 className="mt-6 max-w-3xl text-5xl sm:text-6xl font-semibold tracking-tight">
            Let&rsquo;s <span className="text-gradient">spec your build</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[--color-muted] leading-relaxed">
            Tell us about your car, your goals, and your timeline. Rav reviews
            every inquiry personally and replies within one business day.
          </p>
        </Container>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
          <aside className="lg:col-span-2 space-y-6">
            <InfoBlock
              icon="phone"
              label="Call the shop"
              value={site.phone}
              href={site.phoneHref}
            />
            <InfoBlock
              icon="mail"
              label="Email"
              value={site.email}
              href={`mailto:${site.email}`}
            />
            <InfoBlock
              icon="instagram"
              label="Instagram"
              value={site.socials.instagramHandle}
              href={site.socials.instagram}
              external
            />
            <div className="rounded-xl border border-[--color-border] bg-[--color-surface] p-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[--color-muted] mb-4">
                Hours
              </h3>
              <dl className="space-y-2 text-sm">
                {site.hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-4">
                    <dt className="text-[--color-muted]">{h.day}</dt>
                    <dd className="text-[--color-text]">{h.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm text-[--color-muted]">
                {site.serviceArea}
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

function InfoBlock({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: string;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-4 rounded-xl border border-[--color-border] bg-[--color-surface] p-5 hover:border-[--color-accent]/60 transition-colors"
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[--color-border] bg-[--color-bg] text-[--color-accent]">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-[10px] uppercase tracking-[0.2em] text-[--color-muted]">
          {label}
        </span>
        <span className="block text-base text-[--color-text] group-hover:text-[--color-accent] transition-colors">
          {value}
        </span>
      </span>
    </a>
  );
}
