
import { prisma } from "@repo/db/client"; 
import { NextRequest, NextResponse } from "next/server.js";



export async function GET(req : NextRequest){
 const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

try{
  const users = await prisma.user.findMany({
    where : {
      id : {
        not : Number(userId)
      }
    }
  });
  
  return NextResponse.json({
    message : "user list"
    , users} , {status : 200})
  }catch(e){
    return NextResponse.json({message : "error fetching user"} , {status : 500})
  }

}