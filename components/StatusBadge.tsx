import { STATUS_LABELS, type RequestStatus } from "@/lib/db";

const tones: Record<RequestStatus, string> = {
  new: "border-[--color-accent]/40 bg-[--color-accent]/10 text-[--color-accent]",
  scheduled: "border-amber-400/40 bg-amber-400/10 text-amber-300",
  in_progress: "border-violet-400/40 bg-violet-400/10 text-violet-300",
  done: "border-[--color-success]/40 bg-[--color-success]/10 text-[--color-success]",
};

export function StatusBadge({ status }: { status: RequestStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider ${tones[status] ?? tones.new}`}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}
