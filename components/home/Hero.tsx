import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 sm:pt-28 pb-24 sm:pb-32">
      <div className="absolute inset-0 bg-grid opacity-40 mask-fade-b" aria-hidden />
      <div className="absolute inset-0 bg-radial-accent" aria-hidden />
      <div className="absolute left-1/2 top-0 -z-10 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-[--color-accent]/10 blur-3xl" aria-hidden />

      <Container className="relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-[--color-border] bg-[--color-surface]/50 px-3 py-1 text-xs font-medium text-[--color-muted] backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[--color-accent] animate-pulse" />
          Nissan Master Tech · {site.wrenchYears}+ yrs on JDM
        </div>

        <h1 className="mt-6 max-w-4xl text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.02] tracking-tight">
          <span className="block">Dealer-level precision.</span>
          <span className="block text-gradient">Tuner-level ambition.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-[--color-muted]">
          RSpec Performance is a Nissan and JDM specialty shop building,
          tuning, and servicing the cars enthusiasts actually want to drive.
          Honest diagnostics, calibrated to your goals, delivered on time.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button href="/contact" size="lg">
            Book a consult
            <Icon name="arrow-right" className="h-4 w-4" />
          </Button>
          <Button href="/builds" size="lg" variant="outline">
            See the builds
          </Button>
          <a
            href={site.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 text-sm text-[--color-muted] hover:text-[--color-accent] transition-colors"
          >
            <Icon name="instagram" className="h-4 w-4" />
            {site.socials.instagramHandle}
          </a>
        </div>

        <dl className="mt-16 grid grid-cols-3 gap-6 border-t border-[--color-border] pt-8 max-w-2xl">
          <div>
            <dt className="text-xs uppercase tracking-[0.2em] text-[--color-muted]">
              Dealer years
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-[--color-text]">
              {site.techYears}+
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.2em] text-[--color-muted]">
              Wrench years
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-[--color-text]">
              {site.wrenchYears}+
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.2em] text-[--color-muted]">
              Platforms
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-[--color-accent]">
              JDM
            </dd>
          </div>
        </dl>
      </Container>
    </section>
  );
}
