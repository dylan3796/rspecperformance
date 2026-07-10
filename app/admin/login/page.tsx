import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { login } from "../actions";
import { isAdmin } from "@/lib/guard";
import { authConfigured } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Shop login",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ e?: string }>;
}) {
  if (await isAdmin()) redirect("/admin");
  const { e } = await searchParams;

  return (
    <Container size="narrow" className="py-24">
      <h1 className="text-3xl font-semibold">Shop login</h1>
      <p className="mt-2 text-[--color-muted]">
        This area is for the shop. Looking for your service status?{" "}
        <Link href="/portal" className="text-[--color-accent] hover:underline">
          Go to the customer portal
        </Link>
        .
      </p>

      {!authConfigured && (
        <div className="mt-6 rounded-md border border-amber-400/40 bg-amber-400/10 p-4 text-sm text-amber-300">
          Login isn&rsquo;t configured yet — set <code>ADMIN_PASSCODE</code> and{" "}
          <code>AUTH_SECRET</code> in the environment.
        </div>
      )}

      <form action={login} className="mt-8 max-w-sm space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-[--color-muted] mb-2">
            Passcode
          </label>
          <input
            type="password"
            name="passcode"
            required
            autoComplete="current-password"
            className="w-full rounded-md border border-[--color-border] bg-[--color-bg] px-4 py-3 text-base text-[--color-text] focus:outline-none focus:border-[--color-accent] transition-colors"
          />
          {e && (
            <p className="mt-2 text-xs text-[--color-danger]">
              Wrong passcode. Try again.
            </p>
          )}
        </div>
        <Button size="lg" type="submit">
          Sign in
        </Button>
      </form>
    </Container>
  );
}
