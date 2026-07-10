import { Resend } from "resend";
import { site } from "./site";

// All transactional email goes through Resend's free tier. Without a key
// (dev / preview) sends are logged and skipped so flows stay testable.
export const emailConfigured = !!process.env.RESEND_API_KEY;

export function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type Mail = { to: string; subject: string; text: string; html: string };

export async function sendEmail(mail: Mail): Promise<{ sent: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY missing; would have sent:", {
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
    });
    return { sent: false };
  }
  const resend = new Resend(apiKey);
  const from =
    process.env.CONTACT_FROM_EMAIL ||
    `R-Spec Auto & Performance <no-reply@rspecperformance.com>`;
  const { error } = await resend.emails.send({ from, ...mail });
  if (error) {
    console.error("[email] resend error", error);
    return { sent: false };
  }
  return { sent: true };
}

export function shell(title: string, bodyHtml: string) {
  return `
    <div style="font-family:Inter,system-ui,sans-serif;background:#0f1318;color:#e6edf3;padding:24px;border-radius:12px">
      <h2 style="margin:0 0 12px;color:#3b8dee;font-family:Rajdhani,sans-serif;letter-spacing:1px">${escapeHtml(title)}</h2>
      ${bodyHtml}
      <p style="margin:20px 0 0;color:#8a95a3;font-size:12px">${escapeHtml(site.name)} · ${escapeHtml(site.serviceArea)}</p>
    </div>
  `;
}

export function button(href: string, label: string) {
  return `<a href="${escapeHtml(href)}" style="display:inline-block;margin:16px 0 4px;padding:12px 22px;background:#1978dc;color:#ffffff;border-radius:8px;text-decoration:none;font-weight:600">${escapeHtml(label)}</a>`;
}

export function customerConfirmation(name: string, vehicle: string, portal: string) {
  const first = name.split(/\s+/)[0];
  return {
    subject: `We got your request — ${site.shortName}`,
    text: [
      `Hey ${first},`,
      ``,
      `We received your request for the ${vehicle}. We reply within one business day.`,
      ``,
      `Track your request and see updates from the shop here:`,
      portal,
      ``,
      `That link is your personal login — no password needed. Keep it handy.`,
      ``,
      `— ${site.name}`,
    ].join("\n"),
    html: shell(
      "We got your request",
      `
      <p style="line-height:1.6">Hey ${escapeHtml(first)},</p>
      <p style="line-height:1.6">We received your request for the <strong>${escapeHtml(vehicle)}</strong>. We reply within one business day.</p>
      ${button(portal, "Track your request")}
      <p style="line-height:1.6;color:#8a95a3;font-size:13px">That link is your personal login — no password needed. You can request a fresh one any time at ${escapeHtml(site.url)}/portal.</p>
      `,
    ),
  };
}

export function customerUpdate(
  name: string,
  vehicle: string,
  body: string,
  portal: string,
) {
  const first = name.split(/\s+/)[0];
  return {
    subject: `Update on your ${vehicle} — ${site.shortName}`,
    text: [
      `Hey ${first},`,
      ``,
      `Update from the shop on your ${vehicle}:`,
      ``,
      body,
      ``,
      `Full history: ${portal}`,
      ``,
      `— ${site.name}`,
    ].join("\n"),
    html: shell(
      `Update on your ${vehicle}`,
      `
      <p style="line-height:1.6">Hey ${escapeHtml(first)},</p>
      <div style="border-left:3px solid #1978dc;padding:2px 0 2px 14px;margin:14px 0;white-space:pre-wrap;line-height:1.6">${escapeHtml(body)}</div>
      ${button(portal, "See full history")}
      `,
    ),
  };
}

export function portalLinkEmail(name: string, portal: string) {
  const first = name.split(/\s+/)[0];
  return {
    subject: `Your service portal link — ${site.shortName}`,
    text: [
      `Hey ${first},`,
      ``,
      `Here's your personal link to the ${site.shortName} service portal:`,
      portal,
      ``,
      `— ${site.name}`,
    ].join("\n"),
    html: shell(
      "Your service portal link",
      `
      <p style="line-height:1.6">Hey ${escapeHtml(first)},</p>
      <p style="line-height:1.6">Here&rsquo;s your personal link to the ${escapeHtml(site.shortName)} service portal:</p>
      ${button(portal, "Open your portal")}
      `,
    ),
  };
}
