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
    await signIn("credentials", { ...data, redirect: false });

    console.log("sign in successfully");
  } catch (error) {
    console.log("sign in failed", error);
    return "something was wrong";
  }

  redirect("/en/dashboard");
}
