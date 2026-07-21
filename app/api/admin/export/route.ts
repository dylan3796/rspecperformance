import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/guard";
import { dbConfigured, exportRows } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function csvCell(v: unknown): string {
  if (v == null) return "";
  const s = v instanceof Date ? v.toISOString() : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

// One-click data ownership: the whole CRM as a CSV Rav can open in Sheets.
export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  if (!dbConfigured) {
    return NextResponse.json({ error: "Database not configured." }, { status: 503 });
  }

  const rows = await exportRows();
  const headers = [
    "name",
    "email",
    "phone",
    "customer_since",
    "vehicle",
    "service",
    "status",
    "service_history",
    "message",
    "requested_at",
  ];
  const csv = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => csvCell(r[h])).join(",")),
  ].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="rspec-customers-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
