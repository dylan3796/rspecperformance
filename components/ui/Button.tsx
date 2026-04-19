import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold tracking-wide uppercase transition-all duration-150 ease-out focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed rounded-md";

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-sm",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-[--color-accent] text-[--color-bg] hover:bg-[--color-accent-600] hover:shadow-[var(--shadow-glow)]",
  ghost:
    "text-[--color-text] hover:text-[--color-accent] border border-transparent hover:border-[--color-border]",
  outline:
    "border border-[--color-border] text-[--color-text] hover:border-[--color-accent] hover:text-[--color-accent]",
};

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type LinkBtn = Common &
  Omit<ComponentProps<typeof Link>, "className" | "children"> & { href: string };
type NativeBtn = Common &
  Omit<ComponentProps<"button">, "className" | "children"> & { href?: undefined };

const OUR_KEYS = ["variant", "size", "className", "children", "href"] as const;

function stripOurProps<T extends Record<string, unknown>>(
  props: T,
): Omit<T, (typeof OUR_KEYS)[number]> {
  const out = { ...props } as Record<string, unknown>;
  for (const k of OUR_KEYS) delete out[k];
  return out as Omit<T, (typeof OUR_KEYS)[number]>;
}

export function Button(props: LinkBtn | NativeBtn) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${props.className ?? ""}`;

  if ("href" in props && props.href) {
    const rest = stripOurProps(props as unknown as Record<string, unknown>);
    return (
      <Link href={props.href} className={cls} {...(rest as object)}>
        {props.children}
      </Link>
    );
  }
  const rest = stripOurProps(props as unknown as Record<string, unknown>);
  return (
    <button className={cls} {...(rest as ComponentProps<"button">)}>
      {props.children}
    </button>
  );
}
