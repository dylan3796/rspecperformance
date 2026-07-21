import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { StatusBadge } from "@/components/StatusBadge";
import { site } from "@/lib/site";
import { verifyPortalToken } from "@/lib/auth";
import { dbConfigured, getCustomerPortalData } from "@/lib/db";
import { fmtDate, fmtDateTime } from "@/lib/format";

export const metadata: Metadata = {
  title: "Your service",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function PortalTokenPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const customerId = await verifyPortalToken(token);
  const data =
    customerId && dbConfigured
      ? await getCustomerPortalData(customerId).catch(() => null)
      : null;

  if (!data) {
    return (
      <Container size="narrow" className="py-24">
        <h1 className="text-3xl font-semibold">That link has expired.</h1>
        <p className="mt-4 text-[--color-muted] leading-relaxed">
          Portal links stay good for 60 days. Grab a fresh one — it takes ten
          seconds.
        </p>
        <Link
          href="/portal"
          className="mt-6 inline-flex items-center gap-2 text-[--color-accent] hover:underline"
        >
          Get a new link
          <Icon name="arrow-right" className="h-4 w-4" />
        </Link>
      </Container>
    );
  }

  const { customer, requests } = data;
  const first = customer.name.split(/\s+/)[0];

  return (
    <Container className="py-16">
      <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[--color-accent]">
        <span className="h-px w-6 bg-[--color-accent]" />
        Customer portal
      </div>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        Hey {first}.
      </h1>
      <p className="mt-2 text-[--color-muted]">
        Everything we have on file for you, newest first. Questions? Call{" "}
        <a href={site.phoneHref} className="text-[--color-accent]">
          {site.phone}
        </a>{" "}
        or DM{" "}
        <a
          href={site.socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[--color-accent]"
        >
          {site.socials.instagramHandle}
        </a>
        .
      </p>

      <div className="mt-10 space-y-6 max-w-3xl">
        {requests.length === 0 && (
          <Card>
            <p className="text-[--color-muted]">
              No requests on file yet.{" "}
              <Link href="/#book" className="text-[--color-accent] hover:underline">
                Book one
              </Link>
              .
            </p>
          </Card>
        )}
        {requests.map((r) => (
          <Card key={r.id} as="article">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={r.status} />
              <span className="text-sm text-[--color-muted]">
                Requested {fmtDate(r.created_at)}
              </span>
            </div>
            <h2 className="mt-3 text-xl font-semibold">{r.vehicle}</h2>
            <p className="mt-1 text-sm text-[--color-muted]">
              {r.service || "Service TBD"}
            </p>
            <p className="mt-3 whitespace-pre-wrap leading-relaxed text-[--color-muted]">
              {r.message}
            </p>

            {r.updates.length > 0 && (
              <>
                <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-[--color-muted]">
                  Updates from the shop
                </h3>
                <ol className="mt-3 space-y-4 border-l border-[--color-accent]/40 pl-5">
                  {r.updates.map((u) => (
                    <li key={u.id}>
                      <p className="text-xs text-[--color-muted]">
                        {fmtDateTime(u.created_at)}
                      </p>
                      <p className="mt-1 whitespace-pre-wrap leading-relaxed">
                        {u.body}
                      </p>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </Card>
        ))}
      </div>
    </Container>
  );
}
