import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(100),
  email: z.email("Enter a valid email address.").max(180),
  company: z.string().trim().max(140).optional().default(""),
  phone: z.string().trim().max(40).optional().default(""),
  projectType: z.string().trim().min(2, "Select a project type.").max(100),
  budget: z.string().trim().min(2, "Select an investment range.").max(100),
  timeline: z.string().trim().max(100).optional().default(""),
  message: z
    .string()
    .trim()
    .min(
      20,
      "Describe the business problem and desired result in at least 20 characters."
    )
    .max(4000)
});

export const leadSubmissionSchema = leadSchema.extend({
  formStartedAt: z.coerce.number().int().positive(),
  turnstileToken: z.string().trim().max(4096).optional().default("")
});

export type LeadInput = z.input<typeof leadSchema>;
export type LeadField = keyof z.infer<typeof leadSchema>;
