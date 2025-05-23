import NextAuth from "next-auth";
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
        const user = {
          id: "1",
          name: "John Doe",
          email: "johndoe@example.com",
        };
        return user;
      },
    }),
  ],
});
