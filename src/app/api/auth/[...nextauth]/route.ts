import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { type AuthOptions } from "next-auth";
import { apiServices } from "@/apiServices/apiServices";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "your email.example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const response = await apiServices.login(
          credentials?.email ?? "",
          credentials?.password ?? "",
        );

        if (response.message == "success") {
          const user = {
            id: response.user.email,
            name: response.user.name,
            email: response.user.email,
            role: response.user.role,
            token: response.token,
          };
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role as string;
      session.token = token.token as string;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.token = (user as { token?: string }).token;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
  },
    secret:process.env.AUTH_SECRET,
    session: {
      strategy: "jwt" as const,
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
