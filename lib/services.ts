export type Service = {
  slug: string;
  title: string;
  tagline: string;
  category: "Performance" | "Chassis" | "Maintenance" | "Diagnostics" | "Specialty";
  icon: string;
  highlights: string[];
  body: string[];
  relatedSlugs?: string[];
};

export const services: Service[] = [
  {
    slug: "ecu-tuning",
    title: "ECU Tuning & Remaps",
    tagline:
      "Custom, dyno-verified calibrations on EcuTek, Cobb, UpRev, and factory Nissan platforms.",
    category: "Performance",
    icon: "cpu",
    highlights: [
      "Street, race, and track maps",
      "Per-gear, per-gear boost, launch control",
      "E85 / flex-fuel calibration",
      "Full datalogging review",
    ],
    body: [
      "Every car leaves with a calibration built from datalogs on your fuel, your weather, your sensors — not a one-size-fits-all canned file. We run EcuTek for Nissan GT-R and Z, Cobb for Nissan/Subaru/Ford, UpRev for 350Z/370Z/Infiniti, and factory-level Nissan Consult-III+ for OE diagnostics.",
      "Expect honest numbers, documented gains, and a drivability calibration you'll actually enjoy in traffic.",
    ],
    relatedSlugs: ["dyno-tuning", "forced-induction", "diagnostics"],
  },
  {
    slug: "dyno-tuning",
    title: "Dyno Tuning",
    tagline: "Load-cell dyno tuning with before-and-after graphs and a calibration you can trust.",
    category: "Performance",
    icon: "gauge",
    highlights: [
      "Baseline, tuning, and validation runs",
      "Detailed AFR / knock / timing reports",
      "Street tune included for real-world refinement",
    ],
    body: [
      "Numbers are only useful if they're repeatable. We tune to a consistent target on the dyno, then validate the calibration on the street under the conditions you'll actually drive.",
    ],
    relatedSlugs: ["ecu-tuning", "forced-induction"],
  },
  {
    slug: "forced-induction",
    title: "Turbo & Supercharger Builds",
    tagline:
      "Bolt-on upgrades to full built-motor forced-induction packages. GT-R, VR30, VQ, SR, RB.",
    category: "Performance",
    icon: "turbo",
    highlights: [
      "Factory-reliable turbo upgrades",
      "Fuel system, intercoolers, and charge-pipe fabrication",
      "Built-motor consulting for high-HP targets",
    ],
    body: [
      "Whether you're adding a stage-2 turbo kit to a 370Z or targeting 1000+ wheel on an R35, we plan the build around a reliability target first, then we chase the number.",
    ],
    relatedSlugs: ["ecu-tuning", "dyno-tuning", "nissan-specialist"],
  },
  {
    slug: "suspension-chassis",
    title: "Suspension & Chassis",
    tagline: "Coilovers, bushings, alignment, and corner balancing for street, canyon, and track.",
    category: "Chassis",
    icon: "suspension",
    highlights: [
      "Coilover install and setup",
      "Corner balance & alignment",
      "Bushings, swaybars, and geometry correction",
    ],
    body: [
      "A chassis that communicates is faster than a chassis with more power. We set spring rates, damping, and alignment to your actual use — daily, canyon, HPDE, or time-attack.",
    ],
    relatedSlugs: ["track-prep", "brakes"],
  },
  {
    slug: "brakes",
    title: "Brake Upgrades",
    tagline: "Big-brake kits, pad & rotor upgrades, stainless lines, and proper fluid flushes.",
    category: "Chassis",
    icon: "brake",
    highlights: [
      "BBK installs (Brembo, AP, Endless)",
      "Track-pad swaps and proper bedding",
      "SS lines + Motul RBF660 / Castrol SRF flush",
    ],
    body: [
      "Brakes aren't just bigger rotors. Pad compound, fluid, cooling, and bias all matter. We spec the setup for your weight, wheels, and driving.",
    ],
    relatedSlugs: ["suspension-chassis", "track-prep"],
  },
  {
    slug: "exhaust-intake",
    title: "Exhaust, Intake & Bolt-ons",
    tagline: "Tasteful, tuned bolt-on packages — not just noise.",
    category: "Performance",
    icon: "exhaust",
    highlights: [
      "Full turbo-back and cat-back systems",
      "Intake and intercooler upgrades",
      "All bolt-ons tuned on our dyno",
    ],
    body: [
      "Bolt-ons without a tune leave power on the table and can hurt reliability. We bundle bolt-on packages with a calibration so you get the full gain.",
    ],
    relatedSlugs: ["ecu-tuning", "forced-induction"],
  },
  {
    slug: "diagnostics",
    title: "Diagnostics & Electrical",
    tagline:
      "Dealer-grade Nissan Consult-III+ and modern OBD scan tools for real answers — not parts cannons.",
    category: "Diagnostics",
    icon: "diagnostic",
    highlights: [
      "Consult-III+ bi-directional testing",
      "CEL, misfire, and drivability diagnosis",
      "Wiring, sensor, and harness repair",
    ],
    body: [
      "Most shops guess. We connect to the car the way Nissan does and read what the ECU actually sees. You get a written diagnosis and a real repair plan.",
    ],
    relatedSlugs: ["maintenance", "pre-purchase"],
  },
  {
    slug: "maintenance",
    title: "Maintenance & Scheduled Service",
    tagline: "Factory-schedule service done right, with enthusiast-grade fluids and parts.",
    category: "Maintenance",
    icon: "wrench",
    highlights: [
      "Oil, trans, diff, brake, and coolant service",
      "Timing chain and guide service",
      "Clutch replacement and flywheel refresh",
    ],
    body: [
      "Keep your car factory-reliable without dealer-counter nonsense. We use Nissan-spec or better fluids and document every service.",
    ],
    relatedSlugs: ["diagnostics", "pre-purchase"],
  },
  {
    slug: "track-prep",
    title: "Track-Day & HPDE Prep",
    tagline: "Inspection, fluid, brake, and safety prep so you trust the car at speed.",
    category: "Specialty",
    icon: "flag",
    highlights: [
      "Pre-event tech inspection",
      "Track fluid flush and pad swap",
      "Harness, cage, and safety consultation",
    ],
    body: [
      "Track days punish neglected cars. We prep the car the way we'd prep our own before a lapping day or TT event.",
    ],
    relatedSlugs: ["brakes", "suspension-chassis"],
  },
  {
    slug: "pre-purchase",
    title: "Pre-Purchase Inspections",
    tagline: "Buying an R-chassis, Z, or Silvia? Get a real inspection before you wire funds.",
    category: "Specialty",
    icon: "check",
    highlights: [
      "Compression and leak-down testing",
      "Consult-III+ DTC / history pull",
      "Chassis, rust, and accident screening",
    ],
    body: [
      "One bad purchase costs more than a hundred inspections. We give you a written report with photos so you can negotiate — or walk away.",
    ],
    relatedSlugs: ["diagnostics"],
  },
  {
    slug: "nissan-specialist",
    title: "Nissan & JDM Specialist Work",
    tagline:
      "R32 / R33 / R34 / R35 GT-R, 350Z, 370Z, Z, Silvia / 240SX, Skyline imports. VR, VQ, SR, RB.",
    category: "Specialty",
    icon: "japan",
    highlights: [
      "Seven years as a Nissan master technician",
      "OEM and aftermarket expertise",
      "Import and registration consulting",
    ],
    body: [
      "This is what we do every day. If it wears a Nissan badge or came out of Japan, we know the platform, the common failures, and the right upgrades.",
    ],
    relatedSlugs: ["forced-induction", "ecu-tuning", "pre-purchase"],
  },
  {
    slug: "fabrication",
    title: "Fabrication & Custom Install",
    tagline: "Clean charge pipes, catch cans, mounts, and one-off solutions.",
    category: "Specialty",
    icon: "spark",
    highlights: [
      "TIG welding — aluminum and stainless",
      "Custom brackets, mounts, and heat shielding",
      "OEM-quality install standards",
    ],
    body: [
      "If it doesn't look like it came from the factory, we aren't done. Clean routing, proper clamps, and finished welds — every time.",
    ],
    relatedSlugs: ["forced-induction"],
  },
];

export const servicesBySlug = Object.fromEntries(
  services.map((s) => [s.slug, s]),
) as Record<string, Service>;

export const servicesByCategory = services.reduce<Record<string, Service[]>>(
  (acc, s) => {
    (acc[s.category] ||= []).push(s);
    return acc;
  },
  {},
);

export const categoryOrder: Service["category"][] = [
  "Performance",
  "Chassis",
  "Diagnostics",
  "Maintenance",
  "Specialty",
];
