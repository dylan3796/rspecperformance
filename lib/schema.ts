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
        url: `${site.url}/services/${s.slug}`,
      },
    })),
  };
}

export function serviceJsonLd(slug: string) {
  const s = services.find((x) => x.slug === slug);
  if (!s) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.tagline,
    provider: { "@id": `${site.url}#business` },
    areaServed: areaServed.map((a) => ({ "@type": "City", name: a })),
    serviceType: s.category,
    url: `${site.url}/services/${s.slug}`,
  };
}

export function breadcrumbJsonLd(trail: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: t.url,
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
