"use server";
import prisma from "@/lib/db";
import { getLoginUserId } from "@/action/user/loginuser";

export async function getUserList(search?: string) {
  const loginUser = await getLoginUserId();
  const loginuserId = loginUser?.id;

  const userList = await prisma.user.findMany({
    where: {
      id: {
        not: loginuserId,
      },
      ...(search
        ? {
            OR: [{ name: { contains: search } }],
          }
        : {}),
      // only users with  atleast one chat to or from the current user
      OR: [
        {
          chatsFrom: {
            some: { toUserId: loginuserId },
          },
        },
        {
          chatsTo: {
            some: { fromUserId: loginuserId },
          },
        },
      ],
    },
    select: {
      id: true,
      name: true,
      phone: true,
      socket: true,
      createdAt: true,
    },
  });
  return userList;
}

// find the user by phone number and chat with it.
export async function FindUser(searchByPhone: string) {
  const loginUser = await getLoginUserId();
  const loginuserId = loginUser?.id;

  const userList = await prisma.user.findFirst({
    where: {
      id: {
        not: loginuserId,
      },
      ...(searchByPhone
        ? {
            OR: [{ phone: { contains: searchByPhone } }],
          }
        : {}),
    },
    select: {
      id: true,
      name: true,
      phone: true,
    },
  });
  return userList;
}

export async function blockUser(userId: string) {
  const loginUser = await getLoginUserId();
  const loginuserId = loginUser?.id;

  if (!loginuserId) {
    throw new Error("User not logged in");
  }

  // Check if the user is already blocked
  const existingBlock = await prisma.blockedUser.findFirst({
    where: {
      userId: loginuserId,
      blockedUserId: userId,
    },
  });

  if (existingBlock) {
    throw new Error("User is already blocked");
  }

  // Block the user
  const blockedUser = await prisma.blockedUser.create({
    data: {
      userId: loginuserId,
      blockedUserId: userId,
    },
  });

  return blockedUser;
}
