import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "username",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials?.username || !credentials?.password) return null;
                const { username, password } = credentials;
                const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
                    method: "POST",
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (res.status == 401) {
                    console.log(res.statusText);

                    return null;
                }
                const user = await res.json();
                console.log(user.token);
                // localStorage.setItem("SavedToken", "Bearer" + user.token);
                return user;
            },
        }),
    ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };