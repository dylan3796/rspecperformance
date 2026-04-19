import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <div className="text-8xl font-semibold text-gradient">404</div>
      <h1 className="mt-4 text-3xl sm:text-4xl font-semibold">Off the map.</h1>
      <p className="mt-4 text-[--color-muted] max-w-md mx-auto">
        That page doesn&rsquo;t exist. Head back to the shop and let&rsquo;s
        get you where you were going.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button href="/">Back to home</Button>
        <Button href="/services" variant="outline">
          See services
        </Button>
      </div>
    </Container>
  );
}
