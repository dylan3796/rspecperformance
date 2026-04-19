import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validation";
import { site } from "@/lib/site";

// Runtime: Node (Resend SDK uses Node APIs).
export const runtime = "nodejs";

// Simple in-memory rate limiter. Fine for a single-region deploy; upgrade to
// Upstash / Vercel KV if the site is scaled to multi-region or high traffic.
// See CLAUDE.md for the upgrade path.
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

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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

  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // In dev / preview without a key, log and no-op-succeed so the UI works.
    // Production: fail loud so misconfig is obvious.
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "Email service not configured." },
        { status: 500 },
      );
    }
    console.warn(
      "[contact] RESEND_API_KEY missing; would have sent to",
      to,
      "— payload:",
      data,
    );
    return NextResponse.json({ ok: true, dev: true });
  }

  const resend = new Resend(apiKey);
  const subject = `New inquiry · ${data.name}${data.vehicle ? ` · ${data.vehicle}` : ""}`;
  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    data.vehicle ? `Vehicle: ${data.vehicle}` : null,
    data.service ? `Interested in: ${data.service}` : null,
    "",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family:Inter,system-ui,sans-serif;background:#0f1318;color:#e6edf3;padding:24px;border-radius:12px">
      <h2 style="margin:0 0 12px;color:#00e5ff;font-family:Rajdhani,sans-serif;letter-spacing:1px">New inquiry — RSpec Performance</h2>
      <table style="border-collapse:collapse;font-size:14px;margin-bottom:16px">
        <tr><td style="padding:4px 12px 4px 0;color:#8a95a3">Name</td><td>${escape(data.name)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#8a95a3">Email</td><td><a href="mailto:${escape(data.email)}" style="color:#00e5ff">${escape(data.email)}</a></td></tr>
        ${data.phone ? `<tr><td style="padding:4px 12px 4px 0;color:#8a95a3">Phone</td><td><a href="tel:${escape(data.phone)}" style="color:#00e5ff">${escape(data.phone)}</a></td></tr>` : ""}
        ${data.vehicle ? `<tr><td style="padding:4px 12px 4px 0;color:#8a95a3">Vehicle</td><td>${escape(data.vehicle)}</td></tr>` : ""}
        ${data.service ? `<tr><td style="padding:4px 12px 4px 0;color:#8a95a3">Interested in</td><td>${escape(data.service)}</td></tr>` : ""}
      </table>
      <div style="border-top:1px solid #1c232b;padding-top:16px;white-space:pre-wrap;line-height:1.6">${escape(data.message)}</div>
    </div>
  `;

  try {
    const from =
      process.env.CONTACT_FROM_EMAIL ||
      `RSpec Performance <no-reply@rspecperformance.com>`;
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      text,
      html,
      replyTo: data.email,
    });
    if (error) {
      console.error("[contact] resend error", error);
      return NextResponse.json(
        { error: "Could not send message. Please call us instead." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[contact] send exception", err);
    return NextResponse.json(
      { error: "Could not send message. Please call us instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
