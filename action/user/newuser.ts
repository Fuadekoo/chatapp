"use server";
import prisma from "@/lib/db";
import { signupSchema } from "@/lib/zodSchema";
import { z } from "zod";

export async function newUser(data: z.infer<typeof signupSchema>) {
  try {
    const parsed = signupSchema.safeParse(data);
    if (!parsed.success) {
     return {
        message: "Validation failed",}
    }

    //   check the password and confirm password is similar
    if (parsed.data.password !== parsed.data.confirmPassword) {
      return { message: "Password and confirm password do not match" };
    }

    await prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        password: parsed.data.password,
        phone: parsed.data.phone,
      },
    });
    return { message: "User created successfully" };
  } catch (error) {
    console.error(error);
    return {
      message: "Error creating user",
    //   error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
