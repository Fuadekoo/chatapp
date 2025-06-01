"use server";
import prisma from "@/lib/db";
import { signupSchema } from "@/lib/zodSchema";
import { z } from "zod";

export async function newUser(data: z.infer<typeof signupSchema>) {
  const parsed = signupSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid input");
  }

  //   check the password and confirm password is similar
  if (parsed.data.password !== parsed.data.confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      password: parsed.data.password,
      phone: parsed.data.phone,
    },
  });
  return user;
}
