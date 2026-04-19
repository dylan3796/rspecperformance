import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export function FinalCTA() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-accent opacity-70" aria-hidden />
      <Container>
        <div className="relative rounded-2xl border border-[--color-border] bg-[--color-surface] p-10 sm:p-16 overflow-hidden">
          <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-[--color-accent]/10 blur-3xl" aria-hidden />
          <div className="relative max-w-3xl">
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">
              Ready to spec your build?
            </h2>
            <p className="mt-4 text-lg text-[--color-muted] leading-relaxed">
              Tell us about your car and what you&rsquo;re after. We reply within
              one business day — usually faster.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact" size="lg">
                Start a project
                <Icon name="arrow-right" className="h-4 w-4" />
              </Button>
              <Button href={site.phoneHref} size="lg" variant="outline">
                <Icon name="phone" className="h-4 w-4" />
                {site.phone}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
