import type { ReactNode } from "react";

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent";
}) {
  const tones = {
    neutral:
      "border-[--color-border] bg-[--color-surface-2] text-[--color-muted]",
    accent:
      "border-[--color-accent]/30 bg-[--color-accent]/10 text-[--color-accent]",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
