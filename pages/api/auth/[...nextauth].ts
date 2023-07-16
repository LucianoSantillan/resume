import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { User } from "next-auth";

interface CustomUser extends User {
    token: string
}

export const CONNECTION_ERROR_MESSAGE = "CONNECTION_ERROR_MESSAGE"

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        // ...add more providers here
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "jsmith",
                },
                addEventListener: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials, req): Promise<CustomUser | null> {
                const { username, password } = credentials as any;
                try {
                    const res = await fetch("http://localhost:3001/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username,
                            password,
                        }),
                    });
                    const user = await res.json();

                    if (res.ok && user.token) {
                        console.log("logged successfully")
                        return user;
                    } else {
                        return null
                    }

                } catch {
                    throw new Error(CONNECTION_ERROR_MESSAGE);
                }



            }
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.user = token;

            return session;
        },
    },

    session: { strategy: "jwt" },

    pages: {
        signIn: "/login",
    },
};

export default NextAuth(authOptions);