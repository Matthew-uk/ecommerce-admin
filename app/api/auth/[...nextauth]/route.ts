import User from "@/models/user";
import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: any = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }: any) {
      console.log(user);
      console.log(account);
      if (account.provider === "google") {
        const { email, name }: any = user;
        console.log({ email, name });
        try {
          const res = await axios.post("http://localhost:3000/api/user", {
            email,
            name,
          });
          console.log(res);
          if (res.status < 300) {
            return user;
          }
        } catch (error) {
          console.error(error);
        }
      }
      return user;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
