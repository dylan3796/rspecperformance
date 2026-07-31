// PARKED — the full homepage, kept intact while the site shows the holding
// page in `app/page.tsx`. Nothing imports it, so it ships no bytes.
// To bring the site back: `export { default } from "@/components/home/HomePage";`
// in `app/page.tsx`, and restore <Nav /> + <Footer /> in `app/layout.tsx`.
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import badge from "@/public/brand/rspec-badge.webp";
import detail1 from "@/public/work/detail-1.jpg";
import detail2 from "@/public/work/detail-2.jpg";
import detail3 from "@/public/work/detail-3.jpg";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Work />
      <About />
      <Book />
    </>
  );
}

function Hero() {
  return (
    <section className="relative border-b border-[--color-border] overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40 mask-fade-b" aria-hidden />
      <div className="absolute inset-0 bg-radial-accent" aria-hidden />
      <Container className="relative py-16 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[--color-border] bg-[--color-surface]/50 px-3 py-1 text-xs font-medium text-[--color-muted] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[--color-accent]" />
              Appointment only · {site.serviceArea}
            </div>
            <h1 className="mt-6 text-5xl sm:text-6xl font-semibold tracking-tight">
              Sacramento&rsquo;s <span className="text-gradient">JDM specialist</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-[--color-muted] leading-relaxed">
              A full-service shop run by a Nissan master tech with{" "}
              {site.wrenchYears}+ years on the tools. Maintenance, performance,
              and detailing — you book direct and talk to the person who works
              on your car.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/#book" size="lg">
                Request an appointment
                <Icon name="arrow-right" className="h-4 w-4" />
              </Button>
              <Button href={site.phoneHref} size="lg" variant="outline">
                <Icon name="phone" className="h-4 w-4" />
                {site.phone}
              </Button>
            </div>
          </div>
          <div className="hidden lg:flex lg:col-span-2 justify-center">
            <Image
              src={badge}
              alt={`${site.name} badge`}
              className="w-full max-w-sm drop-shadow-[0_0_60px_rgba(25,120,220,0.25)]"
              priority
              sizes="384px"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function Services() {
  return (
    <Section
      id="services"
      className="scroll-mt-16"
      eyebrow="What we do"
      title="Three things, done properly."
      description="No upsell scripts, no service-counter runaround. Tell us what the car needs — or let us find out."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((s) => (
          <Card key={s.title} as="article" interactive>
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[--color-accent]/30 bg-[--color-accent]/10 text-[--color-accent]">
              <Icon name={s.icon} className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-[--color-muted] leading-relaxed">{s.blurb}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {s.points.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-[--color-accent]" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}

const workPhotos = [
  { src: detail1, alt: "Hand-washing a black Lexus GS in the R-Spec shop bay" },
  { src: detail2, alt: "Foam wash on a black Lexus GS, front grille and headlights" },
  { src: detail3, alt: "Black Lexus GS covered in foam under the two-post lift" },
];

function Work() {
  return (
    <Section
      id="work"
      className="scroll-mt-16 bg-[--color-surface]/30 border-y border-[--color-border]"
      eyebrow="From the bay"
      title="Real work, shot in our shop."
      description="No stock photos. This is the bay your car sits in and the hands that work on it."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-[--color-border] bg-[--color-surface]">
          <video
            className="h-full w-full object-cover"
            controls
            playsInline
            preload="none"
            poster="/work/detail-clip-poster.jpg"
          >
            <source src="/work/detail-clip.mp4" type="video/mp4" />
            Your browser can&rsquo;t play this video.
          </video>
        </div>
        {workPhotos.map((p) => (
          <div
            key={p.alt}
            className="relative aspect-[3/4] overflow-hidden rounded-xl border border-[--color-border]"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            />
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-[--color-muted]">
        More on Instagram —{" "}
        <a
          href={site.socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[--color-accent] hover:underline"
        >
          {site.socials.instagramHandle}
        </a>
      </p>
    </Section>
  );
}

const rules = [
  "If it doesn't need doing, we don't sell it.",
  "Every job documented — parts, fluids, torque values.",
  "We drive what you drive.",
];

function About() {
  return (
    <Section
      id="about"
      className="scroll-mt-16"
      eyebrow="About the shop"
      title="Built by a Nissan master tech."
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-5 text-lg leading-relaxed text-[--color-text]">
          <p>
            R-Spec is run by Rav — a Nissan master technician with{" "}
            {site.techYears} years inside a dealer service bay and{" "}
            {site.wrenchYears}+ years wrenching on JDM platforms. SRs, VQs,
            RBs, GT-Rs: this is the work he does every day.
          </p>
          <p>
            The shop is appointment-only on purpose. You get the diagnostic
            discipline of a dealer tech without the dealer counter — one
            person, start to finish, who knows your car and answers for the
            work.
          </p>
        </div>
        <ul className="space-y-4 self-center">
          {rules.map((r) => (
            <li key={r} className="flex items-start gap-3 text-lg">
              <Icon name="check" className="mt-1 h-5 w-5 shrink-0 text-[--color-accent]" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function Book() {
  return (
    <Section
      id="book"
      className="scroll-mt-16 bg-[--color-surface]/30 border-t border-[--color-border]"
      eyebrow="Book"
      title="Request an appointment."
      description="Tell us about the car and what it needs. We reply within one business day — or call and skip the form."
      size="narrow"
    >
      <ContactForm />
      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[--color-muted]">
        <a
          href={site.phoneHref}
          className="inline-flex items-center gap-2 text-[--color-text] hover:text-[--color-accent] transition-colors"
        >
          <Icon name="phone" className="h-4 w-4" />
          {site.phone}
        </a>
        <a
          href={site.socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[--color-text] hover:text-[--color-accent] transition-colors"
        >
          <Icon name="instagram" className="h-4 w-4" />
          DM {site.socials.instagramHandle}
        </a>
      </div>
    </Section>
  );
}
