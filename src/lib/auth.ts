
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db, client } from "./mongodb";

export const auth = betterAuth({
  // Production and local application URL
  baseURL: process.env.BETTER_AUTH_URL,

  // Allow requests from your deployed website and local development
  trustedOrigins: [
    "https://bazar-dor-inpt.vercel.app",
    "http://localhost:3000",
  ],

  // MongoDB database connection
  database: mongodbAdapter(db, { client }),

  // Email and password authentication
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },

  // Google and GitHub authentication
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
