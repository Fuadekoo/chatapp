"use server";

import { signIn, signOut } from "../../lib/auth";
import { z } from "zod";
import { loginSchema } from "@/lib/zodSchema";
import { redirect } from "next/navigation";

export async function authenticate(
  data?: z.infer<typeof loginSchema> | undefined
): Promise<string | undefined> {
  if (!data) return undefined;
  try {
    const result = await signIn("credentials", { ...data, redirect: false });
    if (result && result.error) {
      // Invalid credentials or other error
      console.log("sign in failed", result.error);
      return "Invalid email or password";
    }
    console.log("sign in successfully");
  } catch (error) {
    console.log("sign in failed", error);
    return "something was wrong";
  }

  redirect("/en/chat");
}

export async function logout() {
  try {
    await signOut({ redirect: false });
    redirect("/en/guest/login");
    return { message: "Logout successful" };
  } catch (error) {
    console.error("Logout failed:", error);
    return { message: "Logout failed" };
  }
}
