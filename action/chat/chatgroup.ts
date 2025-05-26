"use server";
import prisma from "@/lib/db";
import { z } from "zod";

export async function getGroupList(search?: string) {
  const groupList = await prisma.groupChat.findMany({
    where: {
      ...(search
        ? {
            OR: [{ name: { contains: search } }],
          }
        : {}),
    },
    select: {
      id: true,
      name: true,
      image: true,
      description: true,
      createdAt: true,
    },
  });
  return groupList;
}

