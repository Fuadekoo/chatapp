"use server";
import prisma from "@/lib/db";

export async function getUserList(search?: string) {
  const userList = await prisma.user.findMany({
    where: {
      id: {
        not: "001",
      },
      ...(search
        ? {
            OR: [{ name: { contains: search } }],
          }
        : {}),
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

// export async function getChat(senderId: string, receiverId: string) {
//   const chat = await prisma.chat.findMany({
//     where: {
//       toUserId: receiverId,
//       fromUserId: senderId,
//     },
//     select: {
//       id: true,
//       msg: true,
//       createdAt: true,
//       updatedAt: true,
//       post: {
//         select: {
//           content: true,
//           title: true,
//         },
//       },
//     },
//   });
//   return chat;
// }
