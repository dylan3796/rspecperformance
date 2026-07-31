// Holding page: one line, nothing else. The full homepage is parked in
// components/home/HomePage.tsx — see the note at its top.
export default function HomePage() {
  return (
    <div className="flex min-h-[calc(100dvh-1px)] flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-[--color-muted]">
        Work in progress
      </p>
    </div>
  );
}
