import { prisma } from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import Email from "next-auth/providers/email";

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
            console.log(credentials.email)
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
                        UserId : existingUser.UserId,
                        Account_number : existingUser.Account_number,
                        balance : existingUser.bank_balance
                    }
                }
                return null;
            }

            try {

                const random = Math.floor(Math.random() * 100000).toString().padStart(7 , "0");
                console.log(random , "this is the random num")

                const user = await prisma.bank_Account.create({
                    data: {
                        UserId: credentials.email,
                        password: hashedPassword,
                        bank_balance : 100000,
                        Account_number : parseInt(`001${random}`)
                    }
                });
            
                return {
                    id: user.id.toString(),
                  UserId : user.UserId,
                        account_number : user.Account_number,
                        balance : user.bank_balance
                }
            } catch(e) {
                console.error(e.message);
            }

            return null
          },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/Auth/signin" 
      },
    callbacks: {
        async jwt({ token, user }:any) {
        

            if (user) {
              token.UserId = user.UserId;
              token.Account_number = user.Account_number;
              token.balance = user.balance;
            }
            return token;
          },
          async session({ token, session }:any) {
            session.user.id = token.UserId;
            session.user.Account_number = token.Account_number;
            session.user.balance = token.balance;
            return session;
          }
    }
  }
 