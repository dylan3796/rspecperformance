import Image from "next/image";
import badge from "@/public/brand/rspec-badge.webp";
import { site } from "@/lib/site";

// Holding page: the badge and a status line, nothing else. The full homepage
// is parked in components/home/HomePage.tsx — see the note at its top.
export default function HomePage() {
  return (
    <div className="flex min-h-[calc(100dvh-1px)] flex-col items-center justify-center gap-10 px-6 py-20 text-center">
      <Image
        src={badge}
        alt={site.name}
        className="w-full max-w-[340px] sm:max-w-[420px] drop-shadow-[0_0_60px_rgba(25,120,220,0.25)]"
        priority
        sizes="(min-width: 640px) 420px, 340px"
      />
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-[--color-muted]">
        Work in progress
      </p>
    </div>
  );
}
