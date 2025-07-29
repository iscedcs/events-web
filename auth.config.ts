import { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AUTH_API, URLS } from "./src/lib/const";
// import { signInFormSchema } from "./src/lib/schema";
import { IAuthResponse } from "@/lib/types/auth";
import { signInFormSchema } from "@/lib/schema/signIn";

export default {
  providers: [
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = signInFormSchema.safeParse(credentials);
        const url = `${AUTH_API}${URLS.auth.sign_in}`;

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          try {
            // const res = await axios.post<IAuthResponse>(url, {
            //   email,
            //   password,
            // });
            const res = await fetch(url, {
              headers: { "Content-Type": "application/json" },
              method: "POST",
              body: JSON.stringify({
                email,
                password,
              }),
            });
            if (!res.ok) {
              //console.log("Something went wrong", res.status);
              return null;
            }
            const data: IAuthResponse = await res.json();
            //console.log(data);
            const user = data.data;
            const accessToken = user.accessToken;
            //console.log(user);
            if (user) {
              return {
                id: user.id,
                email: user.email,
                userType: user.userType,
                accessToken: accessToken,
              };
            }
            return null;
          } catch (error: any) {
            console.error("Login error:", error.message);
            return null;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
