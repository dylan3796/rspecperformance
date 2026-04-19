type IconProps = {
  name: string;
  className?: string;
};

// Minimal inline SVG icon set. Stroke inherits currentColor so icons re-color
// with text color / accent classes.
export function Icon({ name, className = "h-6 w-6" }: IconProps) {
  const common = {
    className,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "cpu":
      return (
        <svg {...common}>
          <rect x="5" y="5" width="14" height="14" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
        </svg>
      );
    case "gauge":
      return (
        <svg {...common}>
          <path d="M12 14l5-5" />
          <path d="M3 14a9 9 0 1 1 18 0" />
          <circle cx="12" cy="14" r="1.3" fill="currentColor" stroke="none" />
        </svg>
      );
    case "turbo":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 4c2 2 2 4 0 5M20 12c-2 2-4 2-5 0M12 20c-2-2-2-4 0-5M4 12c2-2 4-2 5 0" />
        </svg>
      );
    case "suspension":
      return (
        <svg {...common}>
          <path d="M6 3v18M18 3v18" />
          <path d="M6 7c3 1 9 1 12 0M6 12c3 1 9 1 12 0M6 17c3 1 9 1 12 0" />
        </svg>
      );
    case "brake":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 4v3M12 17v3M4 12h3M17 12h3" />
        </svg>
      );
    case "exhaust":
      return (
        <svg {...common}>
          <rect x="3" y="10" width="13" height="4" rx="2" />
          <circle cx="19" cy="12" r="2" />
          <path d="M6 10V7M10 10V5M14 10V7" />
        </svg>
      );
    case "diagnostic":
      return (
        <svg {...common}>
          <path d="M3 12h3l2-5 4 10 2-5h7" />
        </svg>
      );
    case "wrench":
      return (
        <svg {...common}>
          <path d="M15 6a4 4 0 1 1 3 6.7L6 22l-4-4L11.3 8.1A4 4 0 0 1 15 6z" />
          <circle cx="15" cy="9" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "flag":
      return (
        <svg {...common}>
          <path d="M5 3v18" />
          <path d="M5 4h13l-2 4 2 4H5" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M5 12l5 5 9-11" />
        </svg>
      );
    case "japan":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l4 4M14 14l4 4M6 18l4-4M14 10l4-4" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case "close":
      return (
        <svg {...common}>
          <path d="M6 6l12 12M18 6l-12 12" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}
