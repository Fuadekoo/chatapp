import { z } from "zod";

export const loginSchema = z.object({
  phone: z.string().min(9, "phone number is too short"),
  password: z.string().min(8),
});
export type LoginType = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  phone: z.string().min(9, "Phone number is too short"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z
    .string()
    .min(8, "Confirm password must be at least 8 characters long"),
});
export type SignupType = z.infer<typeof signupSchema>;

export const updateUserSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  photo: z.any().optional(), // Accept any file type, validation can be handled elsewhere
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .optional(),
  confirmPassword: z
    .string()
    .min(8, "Confirm password must be at least 8 characters long")
    .optional(),
});
export type UpdateUserType = z.infer<typeof updateUserSchema>;

export const createGroupSchema = z.object({
  groupName: z.string().min(1, "Group name is required"),
  isPublic: z.boolean(),
});
export type CreateGroupType = z.infer<typeof createGroupSchema>;
