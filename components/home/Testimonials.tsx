import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

// TODO(Rav): replace with real customer quotes. Keep tone honest / specific.
const testimonials = [
  {
    quote:
      "Rav tuned my R35 after two other shops left it unsafe. Cleaner idle, safer knock behavior, and a dyno graph that actually makes sense.",
    name: "Marcus L.",
    car: "2017 R35 GT-R",
  },
  {
    quote:
      "He treated my 350Z like his own — explained every choice, pushed back when I wanted the wrong part, and the car is faster and more reliable than ever.",
    name: "Priya S.",
    car: "2006 350Z",
  },
  {
    quote:
      "Went from daily to HPDE in one season. Corner balance, brake upgrade, and a UpRev tune. The car talks to me now.",
    name: "Devon K.",
    car: "370Z Nismo",
  },
];

export function Testimonials() {
  return (
    <Section
      eyebrow="What customers say"
      title="Built on honest work and repeat clients."
      className="bg-[--color-surface]/30 border-y border-[--color-border]"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <Card key={t.name}>
            <svg
              className="h-6 w-6 text-[--color-accent]"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M9.5 7c-2.5 0-4.5 2-4.5 4.5S7 16 9.5 16H10v-2h-.5A2.5 2.5 0 1 1 12 11.5V18h-2v-7.5C10 8.6 8.9 7 9.5 7zm8 0c-2.5 0-4.5 2-4.5 4.5S15 16 17.5 16H18v-2h-.5A2.5 2.5 0 1 1 20 11.5V18h-2v-7.5C18 8.6 16.9 7 17.5 7z" />
            </svg>
            <p className="mt-4 text-[--color-text] leading-relaxed">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3 border-t border-[--color-border] pt-4">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[--color-accent] to-[--color-accent-700] flex items-center justify-center text-[--color-bg] font-semibold text-sm">
                {t.name
                  .split(" ")
                  .map((s) => s[0])
                  .join("")}
              </div>
              <div>
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-[--color-muted]">{t.car}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
