import type { ReactNode } from "react";
import { Container } from "./Container";

type Props = {
  children: ReactNode;
  id?: string;
  className?: string;
  size?: "default" | "narrow" | "wide";
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function Section({
  children,
  id,
  className = "",
  size,
  eyebrow,
  title,
  description,
}: Props) {
  return (
    <section id={id} className={`py-20 sm:py-24 ${className}`}>
      <Container size={size}>
        {(eyebrow || title || description) && (
          <div className="mb-12 max-w-3xl">
            {eyebrow && (
              <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[--color-accent]">
                <span className="h-px w-6 bg-[--color-accent]" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-lg text-[--color-muted] leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
