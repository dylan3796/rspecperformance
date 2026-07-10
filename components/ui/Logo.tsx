import Image from "next/image";
import badge from "@/public/brand/rspec-badge.webp";

type Props = {
  className?: string;
  badgeClassName?: string;
  withWordmark?: boolean;
};

// Brand lockup: the R-Spec badge next to a text wordmark. The badge artwork
// is a photo-sourced cutout on transparent background — display on dark
// surfaces only.
export function Logo({
  className = "",
  badgeClassName = "h-9 w-auto",
  withWordmark = true,
}: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src={badge}
        alt=""
        className={badgeClassName}
        priority
        sizes="48px"
      />
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className="font-semibold text-lg tracking-[0.08em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            R-SPEC
          </span>
          <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-[--color-muted]">
            Auto &amp; Performance
          </span>
        </span>
      )}
    </span>
  );
}
