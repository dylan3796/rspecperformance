import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
};

export function Container({ children, className = "", size = "default" }: Props) {
  const max =
    size === "narrow" ? "max-w-3xl" : size === "wide" ? "max-w-7xl" : "max-w-6xl";
  return (
    <div className={`mx-auto w-full ${max} px-5 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
