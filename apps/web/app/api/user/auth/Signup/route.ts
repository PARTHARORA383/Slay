
import {auth} from "@repo/firebase/config"
import { error } from "console";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { NextRequest , NextResponse } from "next/server.js";


export const POST = async ( req : NextRequest , res : NextResponse)=>{


  try{
    const {email , password} = await req.json() ;
    console.log(email , password)

    // if(!email || !password ){
    //   return NextResponse.json({ error: "Missing fields" }, { status: 401 });
    // }

    const user = await createUserWithEmailAndPassword(auth,
      email ,
      password
    )

   
   
    
    return NextResponse.json({ message: "User created", user}, { status: 201 }

    
    );

  }catch(e){
      return NextResponse.json({
   
        message : "Error creating a user" 
      } , {
        status : 500
      })
  }
}