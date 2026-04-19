import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { faqs } from "@/lib/faqs";
import { faqJsonLd, breadcrumbJsonLd } from "@/lib/schema";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about tuning, builds, scheduling, and working with RSpec Performance.",
  alternates: { canonical: `${site.url}/faq` },
};

export default function FAQPage() {
  const jsonLd = faqJsonLd(faqs);
  const crumbs = breadcrumbJsonLd([
    { name: "Home", url: site.url },
    { name: "FAQ", url: `${site.url}/faq` },
  ]);
  return (
    <>
      <Section
        eyebrow="FAQ"
        title="Answers before you ask."
        description="Don't see your question here? Reach out — we'll answer honestly and give you a real scope."
        size="narrow"
      >
        <div className="divide-y divide-[--color-border] border-y border-[--color-border]">
          {faqs.map((f) => (
            <details key={f.q} className="group py-6">
              <summary className="flex items-center justify-between gap-6 cursor-pointer list-none">
                <span className="text-lg sm:text-xl font-semibold text-[--color-text] group-hover:text-[--color-accent] transition-colors">
                  {f.q}
                </span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[--color-border] text-[--color-muted] group-open:bg-[--color-accent] group-open:text-[--color-bg] group-open:border-transparent transition-colors">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path className="group-open:hidden" d="M6 9l6 6 6-6" />
                    <path className="hidden group-open:inline" d="M18 15l-6-6-6 6" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 text-[--color-muted] leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Button href="/contact" size="lg">
            Ask your question
            <Icon name="arrow-right" className="h-4 w-4" />
          </Button>
        </div>
      </Section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
    </>
  );
}
