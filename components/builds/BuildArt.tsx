// Stylized placeholder art for builds until real photos are dropped in
// /public/images/builds/<slug>/hero.jpg. Safe to delete when Rav uploads real
// photography — swap BuildArt usage for next/image.

type Props = {
  slug: string;
  label: string;
};

function hashSlug(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function BuildArt({ slug, label }: Props) {
  const h = hashSlug(slug);
  const hue = 180 + (h % 50); // cyan range
  const a = `hsl(${hue} 90% 60%)`;
  const b = `hsl(${(hue + 30) % 360} 80% 25%)`;

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 600 380"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={label}
      role="img"
    >
      <defs>
        <linearGradient id={`g-${slug}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor={b} />
          <stop offset="1" stopColor="#07090b" />
        </linearGradient>
        <pattern id={`p-${slug}`} width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" fill="none" stroke={a} strokeOpacity="0.08" />
        </pattern>
      </defs>
      <rect width="600" height="380" fill={`url(#g-${slug})`} />
      <rect width="600" height="380" fill={`url(#p-${slug})`} />
      <g opacity="0.9">
        <path
          d="M60 260 Q 120 200 240 210 T 520 220 L 540 260 L 60 260 Z"
          fill={a}
          opacity="0.12"
        />
        <path
          d="M60 260 Q 120 220 240 230 T 520 240"
          fill="none"
          stroke={a}
          strokeWidth="1.5"
          opacity="0.6"
        />
        <circle cx="160" cy="258" r="26" fill="#0b0d10" stroke={a} strokeWidth="1.5" />
        <circle cx="440" cy="258" r="26" fill="#0b0d10" stroke={a} strokeWidth="1.5" />
        <circle cx="160" cy="258" r="10" fill={a} opacity="0.8" />
        <circle cx="440" cy="258" r="10" fill={a} opacity="0.8" />
      </g>
      <text
        x="32"
        y="350"
        fontFamily="var(--font-display), ui-sans-serif, sans-serif"
        fontSize="14"
        fill="#e6edf3"
        opacity="0.7"
        letterSpacing="2"
      >
        {label.toUpperCase()}
      </text>
    </svg>
  );
}
