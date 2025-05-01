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

  if(session?.user.id != user1){
    return NextResponse.json({
      message : "User not authorised"
    } , {status : 404})
  }

  try {
    if(user1 == user2){
      return NextResponse.json({
        message : "You cannot send money to yourself"
      } , {status : 404})
    }

      const userbalance = await prisma.balance.findUnique({
      where:{userId : parseInt(user1)},
      select : {amount : true}
    })

    const senderinfo = await prisma.user.findFirst({
      where : {id : parseInt(user1)}
    })
    const receiverinfo = await prisma.user.findFirst({
      where : {id : parseInt(user2)}
    })
    

     if (!userbalance) {
      return NextResponse.json({ message: "Balance not found for the user" }, { status: 404 });
    }

    if(userbalance.amount < amount){
      return NextResponse.json({message : "Insufficient funds"} , {status : 400})
    }

   const Transaction =  await prisma.$transaction([
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

    if(Transaction){
        
    const response =  await prisma.p2PTransaction.create({
        data : {
          amount : parseInt(amount),
          senderId : parseInt(user1) ,
          senderName : senderinfo?.name,
          senderEmail : senderinfo?.email,
          receiverId : parseInt(user2) ,
          reciverName : receiverinfo?.name,
          recieverEmail : receiverinfo?.email,
          status : "Success"
        }
      })
      
      
      
      return NextResponse.json({ message: "Transaction Successful!" , response }, { status: 200 });
    }

  } catch (error) {
    console.error("Transaction error:", error);

    return NextResponse.json({ message: "Transaction Failed", error: String(error) }, { status: 500 });
  }
}


export async function GET(req : NextRequest){
     
  
  const session =  await getServerSession(authOptions)

  if(!session){
    return NextResponse.json({message : "user not authenticated to fetch transactions"} , {status : 404})
  }
  try{
    const userId = req.nextUrl.searchParams.get('userId');

if(session?.user.id != userId){
  return NextResponse.json({
    message : "You cannot fetch someone else's transactions"
  } , {status : 404})
}
    

  const Transaction = await prisma.p2PTransaction.findMany({
    where : {
      OR : [
        {senderId : parseInt(userId)} ,
        {receiverId : parseInt(userId)}
      ]
    }
  })

  return NextResponse.json({
    message : "Transaction list " , Transaction
  } , {status : 200})

  }catch(e){
    return NextResponse.json({message : "Error fetching user" ,
    } ,  {status : 500})
  }

}