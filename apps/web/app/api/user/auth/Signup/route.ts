
import {auth} from "@repo/firebase/config"
import { prisma } from "@repo/db/client";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { NextRequest , NextResponse } from "next/server.js";

import { nanoid } from 'nanoid';


export const POST = async ( req : NextRequest , res : NextResponse)=>{


  try{
    const {email , password} = await req.json() ;
    console.log(email , password)

      const Bank_userid =  `DummyBank${nanoid(8).toUpperCase()}`;
      const bank_password = `DummyBank@${email}`
      const Account_number =  Math.floor(1000 + Math.random() * 9000);

    

    if(!email || !password ){
      return NextResponse.json({ error: "Missing fields" }, { status: 401 });
    }

    const user = await createUserWithEmailAndPassword(auth,
      email ,
      password
    )
    
    if(user){
      const create_user_in_localdb = await prisma.user.create({
        data: {
           email : email ,
           password : password ,
           name : email
        }

        
    })

    console.log(create_user_in_localdb + "this is the user")
    
    if(create_user_in_localdb){

      const create_a_bankaccount = await prisma.bank_Account.create({

        data :{
          UserId : Bank_userid  ,
          password : bank_password,
          bank_balance  : 100001,
          Account_number 
        }
      })
      console.log("bank-account is" + create_a_bankaccount)

      const create_a_0_balance = await prisma.balance.create({
        data : {
          userId : create_user_in_localdb.id ,
          amount : 0,
          locked: 0
        }
      })
      console.log(create_a_0_balance + "this is the balance of a user")
    }
    

    }

  
   
  
    return NextResponse.json({ message: "User created", user ,}, { status: 201 });

  }catch(e){
      return NextResponse.json({
        error : e.message,
        message : "Error creating a user" 
      } , {
        status : 500
      })
  }
}