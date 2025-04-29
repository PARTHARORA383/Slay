"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation.js";
import { useEffect, useState } from "react";
import PaymentLoader from "./PaymentLoader.tsx";



export const Paymoney = ()=>{
  const { data: session, status } = useSession()
  const searchParams = useSearchParams(); // This hook gives access to the query params
  const [amount , setAmount] = useState()
  const router = useRouter()

  const [loading , setLoading] = useState(false);
  const p2p_userId = searchParams.get("userId"); //
 
  
  const handlePaymoney  = async ()=>{
      try{
        setLoading(true);

        
  
        if(session?.user){
          console.log("User details fetched")
        }
        
        const requestbody = {
          user1 : "5",
          user2 : p2p_userId ,
          amount : amount
        }
          
        const response =  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/P2P` , 
      requestbody
    
    )
    
    if(response?.status == 200){
  
          
        alert("Payment successful")
      
     
    }
  }catch(e){

  }
  finally{
    setLoading(false);
  }
    
    
  }

  if(loading){
    return <PaymentLoader amount={amount || 0} receiver= "Parth"/>
  }

 
  return <div className=" w-full pl-5 pr-5">



  <div className="w-full border-b-2 border-neutral-800 h-40 flex flex-col ">

    <div className="flex gap-3 items-center mt-6">

  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-neutral-700 to-neutral-900 text-neutral-200 flex justify-center items-center text-2xl">
    {session?.user?.email?.toString().split("")[0]}
      

    </div>

    
    <div className="text-2xl text-neutral-200  p-2 ">

      {"To : Parth's Slay Wallet"} 
      {
        // Access this from the user you are sending money to store it in local storage when you click the user and retrieve it 
      }

    </div>
      </div>

      <div className="mt-5">
        
    <div className="text-lg lg:text-xl text-neutral-200 opacity-80 mt-30 pb-2  ">
        <span className=""> From : </span>
        <span  className="font-semibold">
          
          {session?.user?.email}
          </span>

</div>
      </div>
  </div>
      <div className=" mt-8 text-center">

  <h1 className="text-xl lg:text-2xl mt-5 font-semibold text-white">How much would you like to send?</h1>
  <p className="text-sm text-neutral-400">Enter the amount and proceed to pay</p>

      </div>


    <div className="text-3xl text-neutral-200 mt-30 flex  items-center justify-center flex-col mt-8">
    <input
        id="amount"
        type="number"
        value={amount}
        onChange = {(e)=>{
          setAmount(parseInt(e.target.value))
        }}
        placeholder="₹ 0"
        
        className="outline-none bg-neutral-900 w-[300px] text-center text-4xl" 
        autoFocus
        style={{    
          MozAppearance: "none",
          WebkitAppearance : "none",
          appearance: "none",
          paddingRight: "10px", // to preve
        }}
      />





    <button className="max-w-xl bg-gradient-to-br from-purple-800 to-purple-950 hover:bg-gradient-to-r hover:opacity-80 transition-transform duration-1000 h-10 flex items-center justify-center  text-xl py-6 px-32  text-neutral-200 rounded-md mt-5" onClick={handlePaymoney} 
  > Pay securely</button>
  </div>

  </div>
}