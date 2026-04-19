"use client";

import { useState, useEffect, useRef } from "react";
import { contactSchema } from "@/lib/validation";
import { services } from "@/lib/services";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

const fieldClass =
  "w-full rounded-md border border-[--color-border] bg-[--color-bg] px-4 py-3 text-base text-[--color-text] placeholder:text-[--color-muted] focus:outline-none focus:border-[--color-accent] transition-colors";

const labelClass =
  "block text-xs font-semibold uppercase tracking-[0.15em] text-[--color-muted] mb-2";

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const startedAtRef = useRef(0);
  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setStatus({ kind: "submitting" });

    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      vehicle: String(fd.get("vehicle") || ""),
      service: String(fd.get("service") || ""),
      message: String(fd.get("message") || ""),
      company: String(fd.get("company") || ""),
      startedAt: startedAtRef.current || Date.now() - 2000,
    };

    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const flat: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path.join(".");
        if (!flat[key]) flat[key] = issue.message;
      }
      setErrors(flat);
      setStatus({ kind: "idle" });
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || "Something went wrong.");
      }
      setStatus({ kind: "success" });
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus({
        kind: "error",
        message: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  }

  if (status.kind === "success") {
    return (
      <div className="rounded-xl border border-[--color-accent]/40 bg-[--color-accent]/5 p-8 text-center">
        <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[--color-accent]/20 text-[--color-accent]">
          <Icon name="check" className="h-6 w-6" />
        </div>
        <h3 className="text-2xl font-semibold">Message received.</h3>
        <p className="mt-2 text-[--color-muted]">
          We&rsquo;ll reply within one business day. For anything urgent, DM us
          on Instagram for the fastest response.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot — invisible to humans, irresistible to bots. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden"
      >
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          name="name"
          label="Your name"
          required
          autoComplete="name"
          error={errors.name}
        />
        <Field
          name="email"
          label="Email"
          type="email"
          required
          autoComplete="email"
          error={errors.email}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          name="phone"
          label="Phone (optional)"
          type="tel"
          autoComplete="tel"
          error={errors.phone}
        />
        <Field
          name="vehicle"
          label="Year / make / model"
          placeholder="e.g. 2017 Nissan GT-R"
          error={errors.vehicle}
        />
      </div>

      <div>
        <label className={labelClass}>What do you need?</label>
        <select name="service" defaultValue="" className={fieldClass}>
          <option value="">Not sure yet</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
        {errors.service && <ErrorText>{errors.service}</ErrorText>}
      </div>

      <div>
        <label className={labelClass}>Tell us about your car *</label>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Goals, current mods, issues you're chasing, timing…"
          className={fieldClass}
        />
        {errors.message && <ErrorText>{errors.message}</ErrorText>}
      </div>

      {status.kind === "error" && (
        <div className="rounded-md border border-[--color-danger]/40 bg-[--color-danger]/10 p-4 text-sm text-[--color-danger]">
          {status.message}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <Button size="lg" type="submit" disabled={status.kind === "submitting"}>
          {status.kind === "submitting" ? "Sending…" : "Send message"}
          <Icon name="arrow-right" className="h-4 w-4" />
        </Button>
        <p className="text-xs text-[--color-muted]">
          We reply within one business day. No newsletters, no spam.
        </p>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  autoComplete,
  placeholder,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label className={labelClass}>
        {label}
        {required ? " *" : ""}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={fieldClass}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-xs text-[--color-danger]">{children}</p>;
}
