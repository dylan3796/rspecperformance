import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { StatusBadge } from "@/components/StatusBadge";
import { requireAdmin } from "@/lib/guard";
import {
  dbConfigured,
  getRequestDetail,
  REQUEST_STATUSES,
  STATUS_LABELS,
} from "@/lib/db";
import { portalUrl } from "@/lib/auth";
import { emailConfigured } from "@/lib/emails";
import { fmtDate, fmtDateTime } from "@/lib/format";
import { saveStatus, postUpdate } from "../../actions";

export const metadata: Metadata = {
  title: "Request",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminRequestPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ e?: string }>;
}) {
  await requireAdmin();
  if (!dbConfigured) notFound();

  const { id } = await params;
  const { e } = await searchParams;
  const detail = await getRequestDetail(id).catch(() => null);
  if (!detail) notFound();
  const { request, customer, updates, otherRequests } = detail;
  const portal = await portalUrl(customer.id);

  return (
    <Container className="py-16">
      <Link
        href="/admin"
        className="text-sm text-[--color-muted] hover:text-[--color-accent] transition-colors"
      >
        ← Back to dashboard
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <h1 className="text-3xl font-semibold">{request.vehicle}</h1>
        <StatusBadge status={request.status} />
      </div>
      <p className="mt-1 text-sm text-[--color-muted]">
        Requested {fmtDateTime(request.created_at)} ·{" "}
        {request.service || "Not sure yet"}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Left: request + updates */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-[--color-muted]">
              What they said
            </h2>
            <p className="mt-3 whitespace-pre-wrap leading-relaxed">{request.message}</p>
            {request.service_history && (
              <>
                <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-[--color-muted]">
                  Prior service history
                </h3>
                <p className="mt-2 whitespace-pre-wrap leading-relaxed text-[--color-muted]">
                  {request.service_history}
                </p>
              </>
            )}
          </Card>

          <Card>
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-[--color-muted]">
              Updates
            </h2>
            {updates.length === 0 ? (
              <p className="mt-3 text-sm text-[--color-muted]">
                No updates yet. Post one below — the customer sees it in their
                portal.
              </p>
            ) : (
              <ol className="mt-4 space-y-4 border-l border-[--color-border] pl-5">
                {updates.map((u) => (
                  <li key={u.id}>
                    <p className="text-xs text-[--color-muted]">
                      {fmtDateTime(u.created_at)}
                    </p>
                    <p className="mt-1 whitespace-pre-wrap leading-relaxed">{u.body}</p>
                  </li>
                ))}
              </ol>
            )}

            <form action={postUpdate} className="mt-6 space-y-3">
              <input type="hidden" name="requestId" value={request.id} />
              <textarea
                name="body"
                rows={3}
                required
                placeholder="e.g. Parts arrived — car goes on the lift tomorrow morning."
                className="w-full rounded-md border border-[--color-border] bg-[--color-bg] px-4 py-3 text-base text-[--color-text] placeholder:text-[--color-muted] focus:outline-none focus:border-[--color-accent] transition-colors"
              />
              {e === "update" && (
                <p className="text-xs text-[--color-danger]">
                  Update couldn&rsquo;t be saved — write a short note first.
                </p>
              )}
              <div className="flex flex-wrap items-center gap-4">
                <label className="inline-flex items-center gap-2 text-sm text-[--color-muted]">
                  <input
                    type="checkbox"
                    name="notify"
                    defaultChecked={emailConfigured}
                    disabled={!emailConfigured}
                    className="h-4 w-4 accent-[--color-accent]"
                  />
                  Email the customer
                  {!emailConfigured && " (email not configured)"}
                </label>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-md bg-[--color-accent] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-[--color-bg] hover:bg-[--color-accent-600] transition-colors"
                >
                  Post update
                  <Icon name="arrow-right" className="h-4 w-4" />
                </button>
              </div>
            </form>
          </Card>
        </div>

        {/* Right: customer */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-[--color-muted]">
              Customer
            </h2>
            <p className="mt-3 font-semibold">{customer.name}</p>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <a
                  href={`tel:${customer.phone}`}
                  className="inline-flex items-center gap-2 hover:text-[--color-accent]"
                >
                  <Icon name="phone" className="h-4 w-4" />
                  {customer.phone || "—"}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${customer.email}`}
                  className="inline-flex items-center gap-2 hover:text-[--color-accent]"
                >
                  <Icon name="mail" className="h-4 w-4" />
                  {customer.email}
                </a>
              </li>
              <li className="text-[--color-muted]">
                Customer since {fmtDate(customer.created_at)}
              </li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-[--color-muted]">
              Status
            </h2>
            <form action={saveStatus} className="mt-3 flex items-center gap-2">
              <input type="hidden" name="id" value={request.id} />
              <select
                key={request.status}
                name="status"
                defaultValue={request.status}
                className="flex-1 rounded-md border border-[--color-border] bg-[--color-bg] px-3 py-2 text-sm text-[--color-text] focus:outline-none focus:border-[--color-accent]"
              >
                {REQUEST_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="rounded-md border border-[--color-border] px-3 py-2 text-sm text-[--color-muted] hover:text-[--color-text] hover:border-[--color-accent] transition-colors"
              >
                Save
              </button>
            </form>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-[--color-muted]">
              Their portal link
            </h2>
            <p className="mt-2 text-xs text-[--color-muted]">
              Sent automatically when they book. Copy it if they need it again
              — valid 60 days.
            </p>
            <input
              readOnly
              value={portal}
              className="mt-3 w-full rounded-md border border-[--color-border] bg-[--color-bg] px-3 py-2 text-xs text-[--color-muted] focus:outline-none focus:border-[--color-accent]"
            />
          </Card>

          {otherRequests.length > 0 && (
            <Card>
              <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-[--color-muted]">
                Also from {customer.name.split(/\s+/)[0]}
              </h2>
              <ul className="mt-3 space-y-3">
                {otherRequests.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={`/admin/requests/${r.id}`}
                      className="group block"
                    >
                      <span className="flex items-center gap-2 text-sm">
                        <StatusBadge status={r.status} />
                        <span className="text-[--color-muted]">
                          {fmtDate(r.created_at)}
                        </span>
                      </span>
                      <span className="mt-1 block truncate text-sm group-hover:text-[--color-accent] transition-colors">
                        {r.vehicle} · {r.service || "Not sure yet"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>
    </Container>
  );
}
