import { SignJWT, jwtVerify } from "jose";
import { timingSafeEqual } from "node:crypto";

// Owner login is a single passcode (ADMIN_PASSCODE) — no accounts, no SaaS.
// Customers never get passwords: they receive signed portal links by email.
export const ADMIN_COOKIE = "rspec_admin";

export const authConfigured = !!(
  process.env.AUTH_SECRET && process.env.ADMIN_PASSCODE
);

function secret(): Uint8Array {
  const s = process.env.AUTH_SECRET;
  if (!s) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("AUTH_SECRET is not set.");
    }
    return new TextEncoder().encode("rspec-dev-secret-not-for-production");
  }
  return new TextEncoder().encode(s);
}

export function passcodeMatches(input: string): boolean {
  const expected = process.env.ADMIN_PASSCODE;
  if (!expected) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function signAdminSession(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

export async function verifyAdminSession(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload.role === "admin";
  } catch {
    return false;
  }
}

// Portal links stay valid for 60 days; customers can request a fresh one
// from /portal at any time.
export async function signPortalToken(customerId: string): Promise<string> {
  return new SignJWT({ aud: "portal" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(customerId)
    .setIssuedAt()
    .setExpirationTime("60d")
    .sign(secret());
}

export async function verifyPortalToken(token: string): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, secret());
    if (payload.aud !== "portal" || !payload.sub) return null;
    return payload.sub;
  } catch {
    return null;
  }
}

export function baseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "http://localhost:3000"
  );
}

export async function portalUrl(customerId: string): Promise<string> {
  const token = await signPortalToken(customerId);
  return `${baseUrl()}/portal/${token}`;
}
