import NextAuth, { NextAuthOptions, } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { NextApiHandler } from "next";

export const authOptions: NextAuthOptions = {    // Configure one or more authentication providers
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
    },
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
    session: { strategy: "jwt" },
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            id: "credentials",
            name: "credentials",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "test@gmail.com",
                },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials: any, req) => {
                const user = await fetch(
                    `${process.env.NEXTAUTH_URL}/api/user/check-credentials`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            accept: "application/json",
                        },
                        body: Object.entries(credentials)
                            .map((e) => e.join("="))
                            .join("&"),
                    },
                )
                    .then((res) => res.json())
                    .catch((err) => {
                        return null;
                    });

                if (user) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ]
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);
export default authHandler;