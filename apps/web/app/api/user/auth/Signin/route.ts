

import { auth } from "@repo/firebase/config";
import { error } from "console";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server.js";
import { prisma } from "@repo/db/client";


export const POST = async ( req : NextRequest , res : NextResponse)=>{

const {email , password } = await req.json();

try{
  
  if(!email || !password ){
    return NextResponse.json({
      message : "Email and Password required"
    },
  {
    status : 401
  })
  }

  const user = await signInWithEmailAndPassword(auth , email , password)
  const token = await user.user.getIdToken(); 
  console.log(user.user.uid)


  

  return NextResponse.json({
    message : "User logged in" , token
  },{status : 200})

}catch(e){

  return NextResponse.json({

    message : "Error logging user"
  },{status : 500})
} 
}