export type Service = {
  title: string;
  icon: string;
  blurb: string;
  points: string[];
};

export const services: Service[] = [
  {
    title: "Maintenance & Repair",
    icon: "wrench",
    blurb:
      "The factory schedule done right — enthusiast-grade fluids, dealer-grade diagnostics, and every job documented.",
    points: [
      "Oil, trans, diff, brake & coolant service",
      "Brakes, clutches, timing service",
      "Real diagnostics — no parts cannon",
    ],
  },
  {
    title: "JDM & Performance",
    icon: "turbo",
    blurb:
      "GT-R, Z, Silvia, Skyline — platform knowledge from a Nissan master tech with 10+ years on the tools.",
    points: [
      "Tuning, bolt-ons & turbo work",
      "Suspension, brakes & track prep",
      "Pre-purchase inspections",
    ],
  },
  {
    title: "Detailing",
    icon: "droplet",
    blurb:
      "Hand wash and detail in our own bay — the same care your car gets on the lift, inside and out.",
    points: [
      "Hand wash & foam decontamination",
      "Interior & exterior detail",
      "Add it to any service visit",
    ],
  },
];
