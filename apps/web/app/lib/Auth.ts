import { prisma } from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { z } from "zod";


const loginUser = z.object({
  email : z.string().email(),
  password : z.string().min(8)
})

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "User@email.com" },
        password: { label: "Password", type: "password", placeholder: "PassWxxxx" },
      },
      async authorize(credentials: any){

        const parsed_input = loginUser.safeParse(credentials)

        if (!parsed_input) {
          throw new Error("Email and Password are required");
        }


         const {email , password } : any = parsed_input.data;

        const existingUser = await prisma.user.findFirst({
          where: { email: email },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            password,
            existingUser.password
          );

          console.log("Password Validated: ", passwordValidation);
          if (passwordValidation) {
          
            return { id: existingUser.id.toString(), email: existingUser.email };
          }

          return null;
        }

        try {
          const hashedPassword = await bcrypt.hash(password, 10);



          const user = await prisma.user.create({
            data: {
              email: email,
              password: hashedPassword,
              name: email,
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

    
  
 