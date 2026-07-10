import { site } from "./site";
import { services } from "./services";

const areaServed = [
  "Sacramento",
  "Elk Grove",
  "Roseville",
  "Rocklin",
  "Folsom",
  "Citrus Heights",
  "Rancho Cordova",
  "Davis",
  "Woodland",
  "Natomas",
  "West Sacramento",
  "Stockton",
];

export function autoRepairJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["AutoRepair", "LocalBusiness"],
    "@id": `${site.url}#business`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}/opengraph-image`,
    priceRange: site.priceRange,
    address: {
      "@type": "PostalAddress",
      ...site.address,
    },
    areaServed: areaServed.map((a) => ({ "@type": "City", name: a })),
    sameAs: [site.socials.instagram].filter(Boolean),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "16:00",
      },
    ],
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
      },
    })),
  };
}
