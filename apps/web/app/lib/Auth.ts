import { prisma } from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import Email from "next-auth/providers/email";
import { emit } from "process";

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: "Email", type: "text", placeholder: "User@email.com" },
            password: { label: "Password", type: "password" , placeholder: "PassWxxxx" }
          },
         

          async authorize(credentials: any) {

          
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await prisma.user.findFirst({
                where: {
                    email: credentials.email
                }
            });

            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);

              
                if (passwordValidation) {
       
                    console.log(existingUser.id)
                    return {
                        id: existingUser.id.toString(),
                        email : existingUser.email
                    }
                }
                return null;
            }

            try {
              

                const user = await prisma.user.create({
                    data: {
                          email : credentials.email,
                        password: hashedPassword,
                        name : credentials.email
                    }
                });
            
                return {
                        id: user.id.toString(),
                        email : user.email

                }
            } catch(e) {
                console.error("Error authorizing user");
            }

            return null
          },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/Auth/Signup" 
      },
    // callbacks: {
    //     async jwt({ token, user }:any) {
        

    //         if (user) {
    //           token.UserId = user.UserId;
    //           token.Account_number = user.Account_number;
    //           token.balance = user.balance;
    //         }
    //         return token;
    //       },
          
    //       async session({ token, session }:any) {
    //         session.user.id = token.UserId;
    //         session.user.Account_number = token.Account_number;
    //         session.user.balance = token.balance;
    //         return session;
    //       }
    // }
  }
 