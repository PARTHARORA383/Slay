"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation.js";
import { useEffect, useState } from "react";



export const Paymoney = ()=>{
  const { data: session, status } = useSession()
  const searchParams = useSearchParams(); // This hook gives access to the query params
  const [amount , setAmount] = useState()
  const router = useRouter()
  const p2p_userId = searchParams.get("p2p_userId"); //
 
  
  const handlePaymoney  = async ()=>{
    
    if(session?.user){
      console.log("User details fetched")
    }

      const requestbody = {
        user1 : session?.user.id,
        user2 : p2p_userId ,
        amount : amount
      }

    const response =  await axios.post(`${process.env.NEXTAUTH_URL}/api/P2P` , {
      requestbody
    }
    )

    if(response?.status == 200){

      alert("Payment successful")
      router.push('/Dashboard')
    }

    
  }

 
  return <div className=" w-full ">

  <div className="flex flex-col items-center justify-center">


    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-neutral-700 to-neutral-900 text-neutral-200 flex justify-center items-center text-2xl">
    {session?.user?.email?.toString().split("")[0]}
      

    </div>


    <div className="text-4xl text-neutral-200 mt-30">

      {"Paying money to : Parth"} 
      {
        // Access this from the user you are sending money to store it in local storage when you click the user and retrieve it 
      }

    </div>

    <div className="text-3xl text-neutral-200 mt-30">

    {session?.user?.email}

    </div>
    <div className="text-3xl text-neutral-200 mt-30">
    <input
        id="amount"
        type="number"
        value={amount}
        placeholder="₹ 0"
        className="outline-none bg-neutral-900"
        autoFocus
        style={{    
          MozAppearance: "none",
          WebkitAppearance : "none",
          appearance: "none",
          paddingRight: "10px", // to preve
        }}
      />

    </div>
  </div>

  </div>
}