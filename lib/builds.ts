export type Build = {
  slug: string;
  title: string;
  subtitle: string;
  year: number;
  make: string;
  model: string;
  platform: string;
  hp?: string;
  tq?: string;
  heroImage: string;
  gallery: string[];
  specs: { label: string; value: string }[];
  story: string[];
  tags: string[];
};

// TODO(Rav): replace with real customer builds + photos.
// Placeholders reference /public/images/builds/<slug>/ — drop real photos in
// those folders and they'll show up automatically.
export const builds: Build[] = [
  {
    slug: "r35-gtr-stage-2",
    title: "R35 GT-R — Street-Build Stage 2",
    subtitle: "Turbo-back, E85, and a calibration that actually drives well.",
    year: 2017,
    make: "Nissan",
    model: "GT-R Premium",
    platform: "R35 / VR38DETT",
    hp: "720 whp",
    tq: "665 wtq",
    heroImage: "/images/builds/r35-gtr-stage-2/hero.svg",
    gallery: [],
    specs: [
      { label: "Platform", value: "R35 VR38DETT" },
      { label: "Turbos", value: "Stage 2 OEM-location" },
      { label: "Fuel", value: "ID1050x + E85" },
      { label: "Tune", value: "EcuTek — dyno + street validated" },
      { label: "Exhaust", value: "Titanium cat-back" },
      { label: "Suspension", value: "KW V3 coilovers, corner-balanced" },
    ],
    story: [
      "Customer daily with weekend canyon duty. Priority was reliability first, street manners second, peak numbers third — and the calibration reflects that.",
      "Ran 720 whp on a conservative E85 map with clean knock behavior and factory-like idle.",
    ],
    tags: ["GT-R", "EcuTek", "E85", "Street"],
  },
  {
    slug: "370z-nismo-track",
    title: "370Z Nismo — HPDE Weapon",
    subtitle: "Chassis-first build. Power came later.",
    year: 2015,
    make: "Nissan",
    model: "370Z Nismo",
    platform: "Z34 / VQ37VHR",
    hp: "355 whp",
    heroImage: "/images/builds/370z-nismo-track/hero.svg",
    gallery: [],
    specs: [
      { label: "Platform", value: "Z34 VQ37VHR" },
      { label: "Suspension", value: "KW Clubsport, corner-balanced" },
      { label: "Brakes", value: "AP Racing BBK, Pagid RSL29" },
      { label: "Tires", value: "Yokohama A052 275/35R19" },
      { label: "Safety", value: "Harness bar + Schroth harnesses" },
      { label: "Tune", value: "UpRev calibration" },
    ],
    story: [
      "Owner wanted a consistent HPDE car, not a dyno hero. We focused on chassis balance, brake fade resistance, and driver confidence before chasing peak power.",
    ],
    tags: ["370Z", "Track", "UpRev", "HPDE"],
  },
  {
    slug: "s14-sr20-resto",
    title: "S14 Silvia — SR20DET Resto-Mod",
    subtitle: "Imported chassis, factory-reliable tune, timeless build.",
    year: 1998,
    make: "Nissan",
    model: "Silvia K's",
    platform: "S14 / SR20DET",
    hp: "380 whp",
    heroImage: "/images/builds/s14-sr20-resto/hero.svg",
    gallery: [],
    specs: [
      { label: "Platform", value: "S14 SR20DET" },
      { label: "Turbo", value: "Garrett GTX2867R" },
      { label: "Fuel", value: "ID725 + Walbro 525" },
      { label: "ECU", value: "Nistune full standalone map" },
      { label: "Chassis", value: "New subframe bushings, reinforcement" },
    ],
    story: [
      "Imported S14 that came in rough. Chassis work first — rust, bushings, subframe — then a sensible SR20DET build focused on throttle response, not just peak.",
    ],
    tags: ["Silvia", "SR20DET", "JDM", "Resto"],
  },
];

export const buildsBySlug = Object.fromEntries(
  builds.map((b) => [b.slug, b]),
) as Record<string, Build>;
