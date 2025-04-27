import { prisma } from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "User@email.com" },
        password: { label: "Password", type: "password", placeholder: "PassWxxxx" },
      },
      async authorize(credentials: any){
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and Password are required");
        }

        const existingUser = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );

          console.log("Password Validated: ", passwordValidation);
          if (passwordValidation) {
          
            return { id: existingUser.id.toString(), email: existingUser.email };
          }

          return null;
        }

        try {
          const hashedPassword = await bcrypt.hash(credentials.password, 10);

          const user = await prisma.user.create({
            data: {
              email: credentials.email,
              password: hashedPassword,
              name: credentials.email,
            },
          });
   
    

          const balance = await prisma.balance.create({
            data: {
              amount : 0 ,
              userId : user.id ,
              locked : 0
            },
          });

          return { id: user.id.toString(), email: user.email };
        } catch (e) {
          console.error("Error authorizing user", e);
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/Auth/Signup",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
  },
};

    
  
 