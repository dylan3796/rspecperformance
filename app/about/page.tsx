import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Card } from "@/components/ui/Card";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Meet Rav, the master Nissan tech behind ${site.name}.`,
  alternates: { canonical: `${site.url}/about` },
};

const values = [
  {
    title: "Honest work",
    body: "If it doesn't need doing, we don't sell it. If it needs doing, we tell you now — not after a surprise bill.",
  },
  {
    title: "Dealer discipline",
    body: "Every job documented. Every torque value, every fluid. No shortcuts, no 'good enough.'",
  },
  {
    title: "Enthusiast-first",
    body: "We drive what you drive. The advice you get is the advice we'd give our own cars.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-20 pb-16 border-b border-[--color-border]">
        <div className="absolute inset-0 bg-grid opacity-40 mask-fade-b" aria-hidden />
        <div className="absolute inset-0 bg-radial-accent" aria-hidden />
        <Container className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-[--color-border] bg-[--color-surface]/50 px-3 py-1 text-xs font-medium text-[--color-muted] backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[--color-accent]" />
            About the shop
          </div>
          <h1 className="mt-6 max-w-3xl text-5xl sm:text-6xl font-semibold tracking-tight">
            Built by a <span className="text-gradient">Nissan master tech</span>.
            Run for enthusiasts.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[--color-muted] leading-relaxed">
            {site.name} was founded by Rav — a Nissan master technician with{" "}
            {site.techYears}+ years at the dealer and {site.wrenchYears}+ years
            wrenching on performance cars. After nearly a decade inside a
            Nissan service bay, he opened RSpec to do the work enthusiasts
            actually need, the way it should be done.
          </p>
        </Container>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="aspect-[4/5] rounded-xl border border-[--color-border] bg-[--color-surface] overflow-hidden relative">
              {/* TODO(Rav): replace with /public/images/headshot/rav.jpg */}
              <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full" aria-hidden>
                <defs>
                  <linearGradient id="abt" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="var(--color-accent)" stopOpacity="0.4" />
                    <stop offset="1" stopColor="#07090b" />
                  </linearGradient>
                </defs>
                <rect width="400" height="500" fill="url(#abt)" />
                <circle cx="200" cy="200" r="90" fill="none" stroke="var(--color-accent)" strokeOpacity="0.5" />
                <path d="M80 400 Q 200 320 320 400" fill="none" stroke="var(--color-accent)" strokeOpacity="0.3" />
                <text x="200" y="460" textAnchor="middle" fill="#e6edf3" fontSize="14" opacity="0.6" letterSpacing="4">
                  PHOTO OF RAV
                </text>
              </svg>
            </div>
          </div>
          <div className="lg:col-span-3 space-y-5">
            <h2 className="text-3xl font-semibold">Meet Rav</h2>
            <p className="text-lg text-[--color-text] leading-relaxed">
              Rav started wrenching on his own cars more than a decade ago —
              SRs, VQs, the usual suspects. The obsession turned into a
              career: he spent the last seven years inside a Nissan dealership,
              earning his Nissan master technician certification and becoming
              the go-to on difficult diagnostic jobs.
            </p>
            <p className="text-lg text-[--color-text] leading-relaxed">
              That experience is the foundation of RSpec. The diagnostic
              discipline of a dealer tech, combined with the tuning,
              fabrication, and build experience that enthusiasts expect from a
              specialty shop. Every calibration is dyno-verified and validated
              on the street. Every repair is documented.
            </p>
            <p className="text-lg text-[--color-text] leading-relaxed">
              The mission is simple: give enthusiasts a place they can trust
              with their car — whether that&rsquo;s a 1000hp R35 or a freshly
              imported S14.
            </p>

            <div className="pt-4 flex flex-wrap gap-3">
              <Button href="/contact" size="lg">
                Get in touch
                <Icon name="arrow-right" className="h-4 w-4" />
              </Button>
              <Button href="/builds" size="lg" variant="outline">
                See our builds
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="How we work"
        title="Three rules we never break."
        className="bg-[--color-surface]/30 border-y border-[--color-border]"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <Card key={v.title}>
              <h3 className="text-xl font-semibold">{v.title}</h3>
              <p className="mt-3 text-[--color-muted] leading-relaxed">{v.body}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
