import { prisma } from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: "Email", type: "text", placeholder: "User@email.com" },
            password: { label: "Password", type: "password" , placeholder: "PassWxxxx" }
          },
          // TODO: User credentials type from next-aut
          async authorize(credentials: any) {
            // Do zod validation, OTP validation here
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await prisma.bank_Account.findFirst({
                where: {
                    UserId: credentials.email
                }
            });

            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),

                        email: existingUser.UserId
                    }
                }
                return null;
            }

            try {
                const user = await prisma.bank_Account.create({
                    data: {
                        UserId: credentials.email,
                        password: hashedPassword,
                        bank_balance : 100000,
                        Account_number :2467854
                    }
                });
            
                return {
                    id: user.id.toString(),
                    email: user.UserId
                }
            } catch(e) {
                console.error(e);
            }

            return null
          },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/Auth/signin" 
      },
    // callbacks: {
    //     TODO: can u fix the type here? Using any is bad
    //     async session({ token, session }: any) {
    //         session.user.id = token.sub

    //         return session
    //     }
    // }
  }
 