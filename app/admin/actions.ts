"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ADMIN_COOKIE,
  passcodeMatches,
  signAdminSession,
  portalUrl,
} from "@/lib/auth";
import { isAdmin } from "@/lib/guard";
import {
  REQUEST_STATUSES,
  type RequestStatus,
  setRequestStatus,
  addUpdate,
  getRequestDetail,
} from "@/lib/db";
import { updateSchema } from "@/lib/validation";
import { sendEmail, customerUpdate } from "@/lib/emails";

export async function login(formData: FormData) {
  const passcode = String(formData.get("passcode") || "");
  if (!passcodeMatches(passcode)) {
    redirect("/admin/login?e=1");
  }
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, await signAdminSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/admin");
}

export async function logout() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

export async function saveStatus(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin/login");
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "") as RequestStatus;
  if (!id || !REQUEST_STATUSES.includes(status)) return;
  await setRequestStatus(id, status);
  revalidatePath("/admin");
  revalidatePath(`/admin/requests/${id}`);
}

export async function postUpdate(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin/login");
  const requestId = String(formData.get("requestId") || "");
  const parsed = updateSchema.safeParse({
    body: String(formData.get("body") || ""),
    notify: formData.get("notify") === "on",
  });
  if (!requestId || !parsed.success) {
    redirect(`/admin/requests/${requestId}?e=update`);
  }

  const detail = await getRequestDetail(requestId);
  if (!detail) redirect("/admin");

  await addUpdate(requestId, parsed.data.body);

  if (parsed.data.notify) {
    const portal = await portalUrl(detail.customer.id);
    const mail = customerUpdate(
      detail.customer.name,
      detail.request.vehicle,
      parsed.data.body,
      portal,
    );
    await sendEmail({ to: detail.customer.email, ...mail });
  }

  revalidatePath(`/admin/requests/${requestId}`);
  redirect(`/admin/requests/${requestId}`);
}
