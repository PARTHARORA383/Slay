
import { prisma } from "@repo/db/client"; 
import { NextResponse } from "next/server.js";



export async function GET(){
try{
  const users = await prisma.user.findMany();
  
  return NextResponse.json({
    message : "user list"
    , users} , {status : 200})
  }catch(e){
    return NextResponse.json({message : "error fetching user"} , {status : 500})
  }

}