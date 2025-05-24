import prisma from "@/lib/db";
import { image } from "@heroui/react";

export async function getUserList() {
  const userlist = await prisma.user.findMany({
    where: {
      id: {
        not: "001",
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });
  return userlist;
}

export async function getChat(id: string) {
  const chat = await prisma.chat.findUnique({
    where: {
      id,
    },
  });
  return chat;
}
