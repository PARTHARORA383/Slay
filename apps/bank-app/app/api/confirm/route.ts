import { prisma } from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/actions/auth";


export async function POST(req : NextRequest , res : NextResponse){

const session = await getServerSession(authOptions)

if(!session){
return NextResponse.json({
  message : "Unauthorised User"
} , {status : 401})
}



const { CustomerId , amount , account_number} : any = await req.json()



try{

  if(session.user.Account_number != account_number){
    return NextResponse.json({
      message : "Invalid Account_number"
    } , {status : 400})
  }

  const finduser = await prisma.bank_Account.findUnique({
    where : {
      Account_number: Number(account_number)  

    }
  })

  if(!finduser){
    return NextResponse.json({
      message : "Invalid Bank account details"
    } , {status : 401})
  }

  if(finduser.bank_balance < amount){
    return NextResponse.json({
      message : "Low Balance"
    } ,{status : 400})
  }

   await prisma.bank_Account.update({
    where :{
      Account_number: Number(account_number)  
    },
    data: {
      bank_balance: {
        
          decrement: Number(amount)
      }
  }
  })

    return NextResponse.json({
      message : "Payment made"
    } ,{status : 200})
}catch(e){
console.log(e)
}
  
}