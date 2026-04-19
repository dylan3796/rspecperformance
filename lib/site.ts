export const site = {
  name: "RSpec Performance",
  shortName: "RSpec",
  tagline: "Dealer-level precision. Tuner-level ambition.",
  description:
    "JDM and Nissan performance specialists. Master-tech tuning, builds, and honest service for enthusiasts who demand more than dealer work.",
  url: "https://rspecperformance.com",
  ogImageAlt: "RSpec Performance — JDM and Nissan specialists",

  // TODO(Rav): replace with real contact info before launch.
  phone: "(555) 555-0199",
  phoneHref: "tel:+15555550199",
  email: "info@rspecperformance.com",
  bookingEmail: "info@rspecperformance.com",

  // TODO(Rav): confirm address / service area.
  address: {
    streetAddress: "Service area — appointment only",
    addressLocality: "Greater Toronto Area",
    addressRegion: "ON",
    postalCode: "",
    addressCountry: "CA",
  },
  serviceArea: "Greater Toronto Area & surrounding regions",

  hours: [
    { day: "Mon – Fri", value: "9:00 AM – 7:00 PM" },
    { day: "Saturday", value: "10:00 AM – 4:00 PM" },
    { day: "Sunday", value: "By appointment" },
  ],

  socials: {
    instagram: "https://www.instagram.com/r.specperformance/",
    instagramHandle: "@r.specperformance",
    // TODO(Rav): add if/when live.
    tiktok: "",
    youtube: "",
    facebook: "",
  },

  nav: [
    { href: "/services", label: "Services" },
    { href: "/builds", label: "Builds" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ],

  priceRange: "$$",
  foundingYear: 2024,
  techYears: 7,
  wrenchYears: 10,
} as const;

export type Site = typeof site;
