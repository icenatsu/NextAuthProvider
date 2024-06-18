import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { NextApiRequest, NextApiResponse  } from "next";
import Cookie from "cookies";


const prisma = new PrismaClient();

const githubId = process.env.GITHUB_ID;
const githubSecret = process.env.GITHUB_SECRET;
const googleId = process.env.GOOGLE_ID;
const googleSecret = process.env.GOOGLE_SECRET;
const facebookId = process.env.FACEBOOK_ID;
const facebookSecret = process.env.FACEBOOK_SECRET;
const twitterId = process.env.TWITTER_ID;
const twitterSecret = process.env.TWITTER_SECRET;


if (
  !githubId ||
  !githubSecret ||
  !googleId ||
  !googleSecret ||
  !facebookId ||
  !facebookSecret ||
  !twitterId ||
  !twitterSecret
) {
  throw new Error("Missing GITHUB_ID or GITHUB_SECRET environment variables");
}

const tokenName =
  process.env.NODE_ENV === 'development'
    ? 'next-auth.session-token'
    : '__Secure-next-auth.session-token';

export const authOptions: (
      req?: NextApiRequest,
      res?: NextApiResponse
    ) => NextAuthOptions = (req, res) => ({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        await prisma.$disconnect();

        const comparePassword =
          credentials?.password && user?.hashedPassword
            ? await bcrypt.compare(credentials.password, user.hashedPassword)
            : false;

        if (!user || !comparePassword) {
          throw `Email ou mot de passe incorrect`;
        }

        return Promise.resolve(user);
      },
    }),
    GithubProvider({
      clientId: githubId,
      clientSecret: githubSecret,
    }),
    GoogleProvider({
      clientId: googleId,
      clientSecret: googleSecret,
    }),
    FacebookProvider({
      idToken: true,
      clientId: facebookId,
      clientSecret: facebookSecret,
      authorization: {
        url: 'https://www.facebook.com/v11.0/dialog/oauth',
        params: {
          client_id: facebookId,
          scope: 'openid email',
          response_type: 'code',
        },
      },
      token: {
        url: 'https://graph.facebook.com/oauth/access_token',
        async request(context) {
          const url =
            `https://graph.facebook.com/oauth/access_token` +
            `?code=${context.params.code}` +
            `&client_id=${context.provider.clientId}` +
            `&redirect_uri=${context.provider.callbackUrl}` +
            `&client_secret=${context.provider.clientSecret}`;
          const response = await fetch(url);
          const tokens = await response.json();
          console.log(tokens);
          
          return { tokens };
        },
      },
    }),
    TwitterProvider({
      clientId: twitterId,
      clientSecret: twitterSecret,
      version: "2.0",
    }),
  ],
  // session: {
  //   strategy: "jwt",
  // },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: async({ user, account, profile }) => {
      if (account?.provider === 'facebook' && profile?.picture?.data?.url) {
        user.image = profile.picture.data.url;
      }
      console.log(user.image);
      console.log(encodeURIComponent(user.image as string));

      return true;
    },
    jwt: async({token, user}) => {
      console.log(token, user); 
      
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      console.log("JWT token:", token); // Ajoutez ce log pour vérifier le jeton
      return token;
    },
    session: async ({ session, user, token }) => {

      if (user){

        console.log(session?.user);
        console.log(user);
      }
      
      if(!session?.user) return session;
      session.user.id = user.id;
      return session;
     },
      // // passe token.id à la session
      // return {
      //   ...session,
      //   user: {
      //     ...session.user,
      //     id: token.id,
      //   },
      // };
    // },
  },
  adapter: PrismaAdapter(prisma),

  pages: {
    signIn: "/Form",
  },

  debug: process.env.NODE_ENV === "development",
});
