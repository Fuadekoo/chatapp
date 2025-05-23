import prisma from "../lib/db";

(async () => {
  await prisma.user.createMany({
    data: [
      {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "password",
        phone: 1234567890,
      },
      {
        name: "fuad Abdurahman",
        email: "fuad@example.com",
        password: "12341234",
        phone: 910737199,
      },
    ],
  });
})()
  .then(() => {
    console.log("Seed Successfully 👌");
  })
  .catch(() => {
    console.log("Failed to Seed 😞");
  });
