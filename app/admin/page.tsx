import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { StatusBadge } from "@/components/StatusBadge";
import { requireAdmin } from "@/lib/guard";
import {
  dbConfigured,
  listRequests,
  REQUEST_STATUSES,
  STATUS_LABELS,
  type RequestListRow,
} from "@/lib/db";
import { fmtDate } from "@/lib/format";
import { saveStatus, logout } from "./actions";

export const metadata: Metadata = {
  title: "Shop dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdmin();

  if (!dbConfigured) {
    return (
      <Container className="py-24">
        <h1 className="text-3xl font-semibold">Shop dashboard</h1>
        <div className="mt-6 rounded-md border border-amber-400/40 bg-amber-400/10 p-4 text-sm text-amber-300 max-w-xl">
          The database isn&rsquo;t connected yet. Set <code>DATABASE_URL</code>{" "}
          (free Postgres from the Neon integration on Vercel) and requests will
          start landing here automatically.
        </div>
      </Container>
    );
  }

  const requests = await listRequests();
  const open = requests.filter((r) => r.status !== "done");
  const done = requests.filter((r) => r.status === "done");

  return (
    <Container className="py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Shop dashboard</h1>
          <p className="mt-1 text-sm text-[--color-muted]">
            {open.length} open · {done.length} done · {requests.length} total
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/api/admin/export"
            className="inline-flex items-center gap-2 rounded-md border border-[--color-border] px-4 py-2 text-sm font-medium text-[--color-text] hover:border-[--color-accent] hover:text-[--color-accent] transition-colors"
          >
            Export CSV
          </a>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-md border border-[--color-border] px-4 py-2 text-sm font-medium text-[--color-muted] hover:text-[--color-text] transition-colors"
            >
              Log out
            </button>
          </form>
        </div>
      </div>

      {requests.length === 0 ? (
        <Card className="mt-10 text-center py-16">
          <p className="text-[--color-muted]">
            No requests yet. When someone books through the site, it lands here.
          </p>
        </Card>
      ) : (
        <div className="mt-10 space-y-4">
          {[...open, ...done].map((r) => (
            <RequestRow key={r.id} r={r} />
          ))}
        </div>
      )}
    </Container>
  );
}

function RequestRow({ r }: { r: RequestListRow }) {
  return (
    <Card className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={r.status} />
          <span className="text-sm text-[--color-muted]">{fmtDate(r.created_at)}</span>
          {r.update_count > 0 && (
            <span className="text-xs text-[--color-muted]">
              {r.update_count} update{r.update_count === 1 ? "" : "s"}
            </span>
          )}
        </div>
        <p className="mt-2 font-semibold truncate">
          {r.name} · {r.vehicle}
        </p>
        <p className="mt-1 text-sm text-[--color-muted] truncate">
          {r.service || "Not sure yet"} —{" "}
          <a href={`tel:${r.phone}`} className="hover:text-[--color-accent]">
            {r.phone}
          </a>{" "}
          ·{" "}
          <a href={`mailto:${r.email}`} className="hover:text-[--color-accent]">
            {r.email}
          </a>
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-3">
        <form action={saveStatus} className="flex items-center gap-2">
          <input type="hidden" name="id" value={r.id} />
          <select
            key={r.status}
            name="status"
            defaultValue={r.status}
            className="rounded-md border border-[--color-border] bg-[--color-bg] px-3 py-2 text-sm text-[--color-text] focus:outline-none focus:border-[--color-accent]"
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
        <Button href={`/admin/requests/${r.id}`} size="md" variant="outline">
          Open
          <Icon name="arrow-right" className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
