import bcrypt from "bcryptjs";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

import { getUserByEmail } from "@/lib/queries/user";
import { SigninValidator } from "@/lib/validators/auth";

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // If you want to integrate other Google APIs in your app
            // authorization: {
            //     params: {
            //         scope: "openid https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
            //         prompt: "consent",
            //         access_type: "offline"
            //     }
            // }
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        Credentials({
            async authorize(credentials) {
                const validatedFields = SigninValidator.safeParse(credentials);
                if (!validatedFields.success) return null;
                const { email, password } = validatedFields.data;
                const user = await getUserByEmail(email);
                if (!user || !user.password) return null;
                if (user.emailVerified) return user;
                const passwordsMatch = await bcrypt.compare(password, user.password);
                if (!passwordsMatch) return null;
                return user;
            }
        })
    ]
} satisfies NextAuthConfig;