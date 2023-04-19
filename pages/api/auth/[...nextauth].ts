import NextAuth, { NextAuthOptions, } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { NextApiHandler } from "next";

export const authOptions: NextAuthOptions = {    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "test@gmail.com",
                },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials, req) => {
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
                ).then((res) => res.json()).catch((err) => {
                    return null;
                });
                if (user) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
    },
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
              token.email = user.email;
              token.username = user.name;
            }
      
            return token;
        },
        session: async ({ session, token, user }) => {
            session.user = token.user;  // Setting token in session
            return session;
        },
    }
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);
export default authHandler;