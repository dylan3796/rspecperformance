import Link from "next/link";

// The site is a holding page, so a 404 says as little as the homepage does.
export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100dvh-1px)] flex-col items-center justify-center gap-6 px-6 py-20 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-[--color-muted]">
        Work in progress
      </p>
      <Link href="/" className="text-sm text-[--color-accent] hover:underline">
        Back to home
      </Link>
    </div>
  );
}
