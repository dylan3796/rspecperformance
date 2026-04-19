import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
  interactive?: boolean;
};

export function Card({ children, className = "", as: As = "div", interactive }: Props) {
  const hover = interactive
    ? "transition-all duration-200 hover:border-[--color-accent]/60 hover:-translate-y-0.5 hover:bg-[--color-surface-2]"
    : "";
  return (
    <As
      className={`rounded-xl border border-[--color-border] bg-[--color-surface] p-6 ${hover} ${className}`}
    >
      {children}
    </As>
  );
}
