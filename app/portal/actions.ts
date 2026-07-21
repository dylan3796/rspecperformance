"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { portalRequestSchema } from "@/lib/validation";
import { dbConfigured, findCustomerByEmail } from "@/lib/db";
import { portalUrl } from "@/lib/auth";
import { sendEmail, portalLinkEmail } from "@/lib/emails";

// Rate-limit link requests per IP: this endpoint can be probed for emails,
// so it always answers the same and stays slow to enumerate.
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const bucket = new Map<string, { count: number; windowStart: number }>();

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = bucket.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    bucket.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function requestPortalLink(formData: FormData) {
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown";

  const parsed = portalRequestSchema.safeParse({
    email: String(formData.get("email") || ""),
  });

  // Same destination no matter what — never reveal whether an email exists.
  if (!parsed.success || rateLimited(ip) || !dbConfigured) {
    redirect("/portal?sent=1");
  }

  const customer = await findCustomerByEmail(parsed.data.email);
  if (customer) {
    const link = await portalUrl(customer.id);
    await sendEmail({ to: customer.email, ...portalLinkEmail(customer.name, link) });
  }

  redirect("/portal?sent=1");
}
