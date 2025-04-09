import { prisma } from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req : NextRequest){

const { CustomerId , amount , account_number} : any = await req.json()

try{

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