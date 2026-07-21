import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { site } from "@/lib/site";
import { dbConfigured, upsertCustomer, createRequest } from "@/lib/db";
import { portalUrl, baseUrl } from "@/lib/auth";
import {
  emailConfigured,
  sendEmail,
  shell,
  escapeHtml,
  customerConfirmation,
} from "@/lib/emails";

// Runtime: Node (pg + Resend need Node APIs).
export const runtime = "nodejs";

// Simple in-memory rate limiter. Fine for a single-region deploy; upgrade to
// Upstash / Vercel KV if the site is scaled to multi-region or high traffic.
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const bucket = new Map<string, { count: number; windowStart: number }>();

function getIp(req: Request): string {
  const h = req.headers;
  const xff = h.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return h.get("x-real-ip") || h.get("cf-connecting-ip") || "unknown";
}

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

export async function POST(req: Request) {
  const ip = getIp(req);
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot + min-submit-time check.
  if (data.company && data.company.length > 0) {
    return NextResponse.json({ ok: true }); // silently accept, drop on floor
  }
  const elapsed = Date.now() - data.startedAt;
  if (elapsed < 1500) {
    return NextResponse.json({ ok: true });
  }

  if (!dbConfigured && !emailConfigured && process.env.NODE_ENV === "production") {
    // Fail loud in production so misconfig is obvious.
    return NextResponse.json(
      { error: "Booking is not configured. Please call us instead." },
      { status: 500 },
    );
  }

  // 1. Store the request — this is the shop's own CRM record.
  let portal: string | null = null;
  if (dbConfigured) {
    try {
      const customer = await upsertCustomer(data.name, data.email, data.phone);
      await createRequest(customer.id, {
        vehicle: data.vehicle,
        service: data.service || "",
        serviceHistory: data.serviceHistory || "",
        message: data.message,
      });
      portal = await portalUrl(customer.id);
    } catch (err) {
      console.error("[contact] db error", err);
      if (!emailConfigured) {
        return NextResponse.json(
          { error: "Could not save your request. Please call us instead." },
          { status: 502 },
        );
      }
    }
  }

  // 2. Notify the shop.
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const subject = `New inquiry · ${data.name} · ${data.vehicle}`;
  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Vehicle", data.vehicle],
    data.service ? ["Interested in", data.service] : null,
    data.serviceHistory ? ["Service history", data.serviceHistory] : null,
  ].filter(Boolean) as [string, string][];
  const ownerText = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    data.message,
    "",
    dbConfigured ? `Manage it: ${baseUrl()}/admin` : null,
  ]
    .filter((l) => l !== null)
    .join("\n");
  const ownerHtml = shell(
    `New inquiry — ${site.name}`,
    `
    <table style="border-collapse:collapse;font-size:14px;margin-bottom:16px">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 12px 4px 0;color:#8a95a3;vertical-align:top">${escapeHtml(k)}</td><td style="white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
        )
        .join("")}
    </table>
    <div style="border-top:1px solid #1c232b;padding-top:16px;white-space:pre-wrap;line-height:1.6">${escapeHtml(data.message)}</div>
    ${dbConfigured ? `<p style="margin:16px 0 0"><a href="${escapeHtml(baseUrl())}/admin" style="color:#3b8dee">Open it in your dashboard →</a></p>` : ""}
    `,
  );
  const owner = await sendEmail({ to, subject, text: ownerText, html: ownerHtml });

  // 3. Confirm to the customer with their portal link.
  let tracked = false;
  if (portal) {
    const confirmation = customerConfirmation(data.name, data.vehicle, portal);
    const res = await sendEmail({ to: data.email, ...confirmation });
    tracked = res.sent;
  }

  if (!owner.sent && !dbConfigured) {
    return NextResponse.json(
      { error: "Could not send message. Please call us instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, tracked });
}
