import { z } from "zod";

export const loginSchema = z.object({
  phone: z.string().min(9, "phone number is too short"),
  password: z.string().min(8),
});
export type LoginType = z.infer<typeof loginSchema>;
