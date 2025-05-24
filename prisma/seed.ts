import prisma from "../lib/db";

async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password",
      phone: "1234567890",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Fuad Abdurahman",
      email: "fuad@example.com",
      password: "12341234",
      phone: "910737199",
    },
  });

  // Create a post for direct chat
  const chatPost = await prisma.post.create({
    data: {
      title: "Direct Chat Post",
      content: "This is a post attached to a direct chat message.",
    },
  });

  // Create direct chat messages (with post attached)
  await prisma.chat.createMany({
    data: [
      {
        fromUserId: user1.id,
        toUserId: user2.id,
        msg: "Hello Fuad! 👋",
        postId: chatPost.id,
      },
      {
        fromUserId: user2.id,
        toUserId: user1.id,
        msg: "Hi John! How are you?",
        postId: chatPost.id,
      },
    ],
  });

  // Create a group
  const group = await prisma.groupChat.create({
    data: {
      name: "Awesome Group",
      image: "/ai.png",
      description: "A group for awesome people.",
      isPublic: true,
      createdBy: { connect: { id: user1.id } },
      members: { connect: [{ id: user1.id }, { id: user2.id }] },
    },
  });

  // Create a post for group chat message
  const groupPost = await prisma.post.create({
    data: {
      title: "Group Chat Post",
      content: "This is a post attached to a group chat message.",
    },
  });

  // Create a group chat message with post attached
  await prisma.groupChatMessage.create({
    data: {
      groupChat: { connect: { id: group.id } },
      sender: { connect: { id: user2.id } },
      msg: "Hello group! This is a group message with a post.",
      post: { connect: { id: groupPost.id } },
    },
  });
}

main()
  .then(() => {
    console.log("Seed Successfully 👌");
  })
  .catch((e) => {
    console.error("Failed to Seed 😞", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
