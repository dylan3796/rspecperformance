import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";
import { requestPortalLink } from "./actions";

export const metadata: Metadata = {
  title: "Customer portal",
  description: "Track your service request and see updates from the shop.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function PortalPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const { sent } = await searchParams;

  return (
    <Container size="narrow" className="py-24">
      <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[--color-accent]">
        <span className="h-px w-6 bg-[--color-accent]" />
        Customer portal
      </div>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        Check on your car.
      </h1>
      <p className="mt-4 text-lg text-[--color-muted] leading-relaxed">
        When you book with us you get a personal link by email — no password,
        no account setup. Lost it? Enter your email and we&rsquo;ll send a
        fresh one.
      </p>

      {sent ? (
        <div className="mt-8 rounded-xl border border-[--color-accent]/40 bg-[--color-accent]/5 p-6">
          <p className="font-semibold">Check your inbox.</p>
          <p className="mt-1 text-sm text-[--color-muted]">
            If we have your email on file, your portal link is on its way.
            Nothing arriving? Call us at{" "}
            <a href={site.phoneHref} className="text-[--color-accent]">
              {site.phone}
            </a>
            .
          </p>
        </div>
      ) : (
        <form action={requestPortalLink} className="mt-8 flex max-w-md gap-3">
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            autoComplete="email"
            className="flex-1 rounded-md border border-[--color-border] bg-[--color-bg] px-4 py-3 text-base text-[--color-text] placeholder:text-[--color-muted] focus:outline-none focus:border-[--color-accent] transition-colors"
          />
          <Button size="lg" type="submit">
            Send link
            <Icon name="arrow-right" className="h-4 w-4" />
          </Button>
        </form>
      )}
    </Container>
  );
}
