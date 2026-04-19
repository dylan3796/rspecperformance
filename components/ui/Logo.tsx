type Props = {
  className?: string;
  mono?: boolean;
};

export function Logo({ className = "h-8 w-auto", mono = false }: Props) {
  // Wordmark logo — "R/SPEC" with a cyan slash accent. Rav can swap with a
  // real SVG logo by dropping /public/logo.svg and updating this component.
  return (
    <svg
      className={className}
      viewBox="0 0 180 40"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="RSpec Performance"
    >
      <g fontFamily="var(--font-display), ui-sans-serif, sans-serif" fontWeight={700}>
        <text x="0" y="28" fontSize="26" fill="currentColor" letterSpacing="1">
          R
        </text>
        <text
          x="18"
          y="28"
          fontSize="26"
          fill={mono ? "currentColor" : "var(--color-accent)"}
          letterSpacing="1"
        >
          /
        </text>
        <text x="32" y="28" fontSize="26" fill="currentColor" letterSpacing="1">
          SPEC
        </text>
        <text
          x="98"
          y="28"
          fontSize="12"
          fill="currentColor"
          opacity="0.7"
          letterSpacing="3"
        >
          PERFORMANCE
        </text>
      </g>
    </svg>
  );
}
