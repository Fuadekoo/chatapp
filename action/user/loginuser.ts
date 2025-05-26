"use server";
import prisma from "@/lib/db";
import { z } from "zod";
import { auth } from "@/lib/auth";

export async function getLoginUserId() {
  const session = await auth();
  const loginUser = await prisma.user.findFirst({
    where: {
      id: session?.user?.id,
    },
    select: {
      id: true,
      name: true,
      phone: true,
      socket: true,
      createdAt: true,
    },
  });

  return loginUser;
}
