import { Hero } from "@/components/home/Hero";
import { ValueProp } from "@/components/home/ValueProp";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { FeaturedBuild } from "@/components/home/FeaturedBuild";
import { Testimonials } from "@/components/home/Testimonials";
import { InstagramStrip } from "@/components/home/InstagramStrip";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProp />
      <ServicesPreview />
      <FeaturedBuild />
      <Testimonials />
      <InstagramStrip />
      <FinalCTA />
    </>
  );
}
