import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Enter a valid email."),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .max(40)
    .optional()
    .or(z.literal("")),
  vehicle: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.string().trim().max(80).optional().or(z.literal("")),
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
