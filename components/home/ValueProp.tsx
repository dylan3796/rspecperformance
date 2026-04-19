import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";

const items = [
  {
    icon: "cpu",
    title: "Dealer-grade diagnostics",
    body: "Nissan Consult-III+, factory scan tools, and the judgment to use them. Real answers, not parts cannons.",
  },
  {
    icon: "gauge",
    title: "Calibrated to your car",
    body: "Every tune built from your datalogs, your fuel, your sensors — on the dyno and validated on the street.",
  },
  {
    icon: "japan",
    title: "Built on JDM",
    body: "R35, Z, Silvia, Skyline. VR, VQ, SR, RB. If it came from Japan, we know its platform cold.",
  },
];

export function ValueProp() {
  return (
    <Section
      eyebrow="Why RSpec"
      title="Master-tech skill, tuner-shop range."
      description="Rav spent 7+ years as a Nissan master tech and 10+ years deep in JDM. RSpec brings that discipline to cars that deserve more than dealer service."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((it) => (
          <Card key={it.title} className="group">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[--color-border] bg-[--color-surface-2] text-[--color-accent] transition-colors group-hover:border-[--color-accent]/60">
              <Icon name={it.icon} className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-xl font-semibold">{it.title}</h3>
            <p className="mt-2 text-[--color-muted] leading-relaxed">{it.body}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
