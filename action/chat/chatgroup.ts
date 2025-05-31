"use server";
import prisma from "@/lib/db";
import { z } from "zod";
import { getLoginUserId } from "@/action/user/loginuser";

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

export async function createGroup(groupName: string, isPublic: boolean) {
  try {
    const loginuserId = await getLoginUserId();
    if (!loginuserId) {
      throw new Error("User not logged in");
    }
    const createdById = loginuserId.id;
    const newGroup = await prisma.groupChat.create({
      data: {
        name: groupName,
        isPublic: isPublic,
        createdById: createdById,
        createdAt: new Date(),
      },
    });
    return newGroup;
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
}
export async function updateGroup(
  groupId: string,
  name: string,
  photo: string,
  description: string
) {
  // check the login user is the creater of the group
  try {
    const loginuserId = await getLoginUserId();
    if (!loginuserId) {
      throw new Error("User not logged in");
    }
    const userId = loginuserId.id;

    const group = await prisma.groupChat.findUnique({
      where: { id: groupId, createdById: userId },
      select: {
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!group) {
      throw new Error("Group not found or user is not the creator");
    }

    // get the daysdifference between now and updateAt  if the deference betwent it is below 1 day then prevent the update
    const now = new Date();
    const updatedAt = group.updatedAt || group.createdAt;
    const timeDifference = now.getTime() - updatedAt.getTime();
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    if (timeDifference < oneDayInMilliseconds) {
      throw new Error("You can only update the group once every 24 hours");
    }
    // Proceed with the update
    const updatedGroup = await prisma.groupChat.update({
      where: { id: groupId, createdById: userId },
      data: {
        name: name,
        image: photo,
        description: description,
        updatedAt: new Date(),
      },
    });
    return updatedGroup;
  } catch (error) {
    console.error("Error updating group:", error);
    throw error;
  }
}

export async function joinGroup(groupId: string) {
  try {
    const loginuserId = await getLoginUserId();
    if (!loginuserId) {
      throw new Error("User not logged in");
    }
    const userId = loginuserId.id;
    const updatedGroup = await prisma.groupChat.update({
      where: { id: groupId },
      data: {
        members: {
          connect: { id: userId },
        },
      },
    });
    return updatedGroup;
  } catch (error) {
    console.error("Error joining group:", error);
    throw error;
  }
}

export async function leaveGroup(groupId: string) {
  try {
    const loginuserId = await getLoginUserId();
    if (!loginuserId) {
      throw new Error("User not logged in");
    }
    const userId = loginuserId.id;
    const updatedGroup = await prisma.groupChat.update({
      where: { id: groupId },
      data: {
        members: {
          disconnect: { id: userId },
        },
      },
    });
    return updatedGroup;
  } catch (error) {
    console.error("Error leaving group:", error);
    throw error;
  }
}
