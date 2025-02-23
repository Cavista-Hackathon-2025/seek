import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    idToken?: string;
  }
}
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the Google ID token (JWT) in the JWT object
      if (account?.id_token) {
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: any }) {
      // Attach the ID token to the session object
      session.idToken = token.idToken;
      return session;
    },
  },
});
