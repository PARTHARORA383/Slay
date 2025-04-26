import { prisma } from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/Auth.ts";

export async function POST(req: NextRequest) {
  
  
  
  const session =  await getServerSession(authOptions)

  if(!session){
    return NextResponse.json({message : "user not authenticated to make the payment"} , {status : 404})
  }
  
  const { amount, user1, user2 } = await req.json();

  if (!amount || !user1 || !user2) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }


  try {

    const userbalance = await prisma.balance.findUnique({
      where:{userId : parseInt(user1)},
      select : {amount : true}
    })


     if (!userbalance) {
      return NextResponse.json({ message: "Balance not found for the user" }, { status: 404 });
    }

    if(userbalance.amount < amount){
      return NextResponse.json({message : "Insufficient funds"} , {status : 400})
    }

    await prisma.$transaction([
      prisma.balance.update({
        where: { userId: parseInt(user1) },
        data: {
          amount: {
            decrement: parseInt(amount),
          },
        },
      }),
      prisma.balance.update({
        where: { userId: parseInt(user2) },
        data: {
          amount: {
            increment: parseInt(amount), 
          },
        },
      }),
    ]);

    return NextResponse.json({ message: "Transaction Successful!" }, { status: 200 });

  } catch (error) {
    console.error("Transaction error:", error);

    return NextResponse.json({ message: "Transaction Failed", error: String(error) }, { status: 500 });
  }
}
