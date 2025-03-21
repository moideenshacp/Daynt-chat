import { z } from "zod";

export const authSchema = z.object({
  name: z.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password is too long"),
});

export type AuthSchemaType = z.infer<typeof authSchema>;
