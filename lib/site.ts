export const site = {
  name: "R-Spec Auto & Performance",
  shortName: "R-Spec",
  tagline: "Sacramento's JDM specialist",
  description:
    "Full-service, appointment-only auto shop in Sacramento run by a Nissan master tech. Maintenance, JDM & performance work, and detailing — book direct with the person who works on your car.",
  url: "https://rspecperformance.com",
  ogImageAlt: "R-Spec Auto & Performance — Sacramento JDM specialists",

  // TODO(Rav): replace with real contact info before launch.
  phone: "(555) 555-0199",
  phoneHref: "tel:+15555550199",
  email: "info@rspecperformance.com",
  bookingEmail: "info@rspecperformance.com",

  // TODO(Rav): confirm exact street address / service area.
  address: {
    streetAddress: "Service area — appointment only",
    addressLocality: "Sacramento",
    addressRegion: "CA",
    postalCode: "",
    addressCountry: "US",
  },
  serviceArea: "Sacramento & Greater Sacramento Valley",

  hours: [
    { day: "Mon – Fri", value: "9:00 AM – 7:00 PM" },
    { day: "Saturday", value: "10:00 AM – 4:00 PM" },
    { day: "Sunday", value: "By appointment" },
  ],

  socials: {
    instagram: "https://www.instagram.com/r.specperformance/",
    instagramHandle: "@r.specperformance",
  },

  nav: [
    { href: "/#services", label: "Services" },
    { href: "/#work", label: "Work" },
    { href: "/#about", label: "About" },
  ],

  priceRange: "$$",
  foundingYear: 2024,
  techYears: 7,
  wrenchYears: 10,
} as const;

export type Site = typeof site;
