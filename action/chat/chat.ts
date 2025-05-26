"use server";
import prisma from "@/lib/db";
import { z } from "zod";
import { getLoginUserId } from "../user/loginuser";

export async function getUserChat(userAId: string) {
  const mydata = await getLoginUserId();
  const userBId = mydata?.id;
  const chat = await prisma.chat.findMany({
    where: {
      OR: [
        { fromUserId: userAId, toUserId: userBId },
        { fromUserId: userBId, toUserId: userAId },
      ],
    },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      msg: true,
      createdAt: true,
      updatedAt: true,
      post: {
        select: {
          content: true,
          title: true,
        },
      },
    },
  });
  return chat;
}

export async function getGroupChat(groupId: string) {
  const messages = await prisma.groupChatMessage.findMany({
    where: { groupChatId: groupId },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      msg: true,
      createdAt: true,
      updatedAt: true,
      sender: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      post: {
        select: {
          content: true,
          title: true,
        },
      },
      groupChat: {
        select: {
          id: true,
          name: true,
          image: true,
          description: true,
        },
      },
    },
  });
  return messages;
}
