import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Enter a valid email."),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .max(40),
  vehicle: z
    .string()
    .trim()
    .min(3, "Tell us the year / make / model.")
    .max(120),
  service: z.string().trim().max(80).optional().or(z.literal("")),
  serviceHistory: z.string().trim().max(2000).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a bit more (at least 10 characters).")
    .max(4000),
  // Honeypot — must be empty.
  company: z.string().max(0).optional().or(z.literal("")),
  // Client-side timestamp (ms since epoch) when the form was first rendered.
  startedAt: z.coerce.number().int().positive(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const portalRequestSchema = z.object({
  email: z.string().trim().email("Enter a valid email."),
});

export const updateSchema = z.object({
  body: z
    .string()
    .trim()
    .min(2, "Write the update first.")
    .max(2000),
  notify: z.boolean(),
});
