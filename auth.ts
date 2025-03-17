import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const auth = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.picture = profile?.picture;
      }
      return token;
    },
  },
});

export const { handlers, signIn, signOut } = auth;
