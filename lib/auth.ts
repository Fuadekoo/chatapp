import NextAuth from "next-auth";
import prisma from "./db";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./zodSchema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const result = loginSchema.safeParse(credentials);
        if (!result.success) {
          throw new Error("Invalid credentials");
        }
        // Implement your own logic to find the user
        const user = await prisma.user.findUnique({
          where: {
            phone: result.data.phone,
            password: result.data.password,
          },
        });
        if (!user) {
          console.log("Invalid credentials");
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
  ],
});
