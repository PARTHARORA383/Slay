"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation.js";
import { useEffect, useState } from "react";
import PaymentLoader from "./PaymentLoader.tsx";
import { PaymentComplete } from "./PaymentComplete.tsx";
import { Alertbox } from "@repo/ui/alert";
import {motion} from 'motion/react'


export const Paymoney = () => {
  const { data: session, status } = useSession()
  const searchParams = useSearchParams(); // This hook gives access to the query params
  const [amount, setAmount] = useState()
  const router = useRouter()

  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alertbox, setAlertbox] = useState(false);
  const [alertboxservererror, setAlertboxservererror] = useState(false);
  const [alertboxselftransfer, setAlertboxselftransfer] = useState(false);
  
  const p2p_userId = searchParams.get("userId"); //

  const user_name = localStorage.getItem("user_name")

  const handlePaymoney = async () => {

    if(!amount ){
      setAlertbox(true);
      return ;
    }


    setLoading(true);

    setTimeout(async () => {

      try {

        if (session?.user) {
          console.log("User details fetched")
        }

        const requestbody = {
          user1: session?.user.id,
          user2: p2p_userId,
          amount: amount
        }

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/P2P`,
          requestbody

        )

        if (response?.status == 200) {
          setConfirmation(true)
          setLoading(false)
        }
        if (response?.status == 500) {
          setLoading(false)
          setAlertboxservererror(true)
        }
        if (response?.status == 404) {
          setLoading(false)
          setAlertboxselftransfer(true)
        }

     
      } catch (e) {
        setLoading(false)
        setConfirmation(false)

        
      }
    }, 5000);
  }



  if (loading) {
    return <PaymentLoader amount={amount || 0} receiver={user_name || ""} />
  }
 


  if (confirmation) {
    return <PaymentComplete amount={amount || 0} reciever={user_name || ""} userid={p2p_userId || ""} />
  }


  return <div className=" w-full pl-5 pr-5">

    {alertbox && <Alertbox label="Please enter an amount"/>}

    {alertboxservererror && <Alertbox label="Sorry We are facing server issues please try again later"/>}

    {alertboxselftransfer && <Alertbox label="Please Login to send money"/>}



    <div className="w-full border-b-2 border-neutral-800 h-40 flex flex-col ">

      <div className="flex gap-3 items-center mt-6 ml-10 lg:ml-2">

        <motion.div 
          initial = {{opacity  : 0 }}
          animate = {{opacity : 1 }}
          transition={{duration : 0.6 , delay :0.2}}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-neutral-700 to-neutral-900 text-neutral-200 flex justify-center items-center text-2xl">
          {session?.user?.email?.toString().split("")[0]}


        </motion.div>


        <motion.div
          initial = {{opacity  : 0 }}
          animate = {{opacity : 1 }}
          transition={{duration : 0.6 , delay :0.2}}
        className="text-2xl text-neutral-200  p-2 ">

          {`To : ${user_name} Slay Wallet`}
          {
            // Access this from the user you are sending money to store it in local storage when you click the user and retrieve it 
          }

        </motion.div>
      </div>

      <motion.div   initial = {{opacity  : 0 }}
      animate = {{opacity : 1 }}
      transition={{duration : 0.6 , delay :0.2}}className="mt-5">

        <div className="text-lg lg:text-xl text-neutral-200 opacity-80 mt-30 pb-2  ml-10 lg:ml-2  ">
          <span className=""> From : </span>
          <span className="font-semibold">

            {session?.user?.email}
          </span>

        </div>
      </motion.div>
    </div>

    <div className="h-full w-full flex justify-center items-center mt-10 lg:mt-20 ">

    
    <motion.div initial = {{scale : 0.9 , opacity : 0 , y : 10}} 
    animate = {{scale : 1 , opacity : 100 , y : 0}}
    transition={{
      duration : 0.3,
      ease : 'easeIn'
    }}
    className=" bg-gradient-to-br from-neutral-700 to-neutral-900 h-[450px] lg:h-[400px]  lg:w-[500px] p-10 rounded-md  ">

    <div className="text-center">

      <motion.h1 
      initial = {{opacity  : 0 }}
      animate = {{opacity : 1 }}
      transition={{duration : 0.6 , delay :0.2}}

      className="text-xl lg:text-2xl mt-5 font-semibold text-white">How much would you like to send?</motion.h1>
      <motion.p 
        initial = {{opacity  : 0 }}
        animate = {{opacity : 1 }}
        transition={{duration : 0.6 , delay :0.2}}
      className="text-sm text-neutral-400">Enter the amount and proceed to pay</motion.p>

    </div>


    <div className="text-3xl text-neutral-200 mt-30 flex  items-center justify-center flex-col mt-8">
      <motion.input
        initial = {{opacity  : 0 }}
        animate = {{opacity : 1 }}
        transition={{duration : 0.6 , delay :0.2}}
        id="amount"
        type="number"
        value={amount}
        onChange={(e) => {
          setAmount(parseInt(e.target.value))
          setAlertbox(false)  
        }}
        placeholder="₹ 0"
        
        className="outline-none bg-neutral-900 w-[300px] text-center text-4xl bg-transparent"
        autoFocus
        style={{
          MozAppearance: "none",
          WebkitAppearance: "none",
          appearance: "none",
          paddingRight: "10px", // to preve
        }}
        />





      <motion.button
        initial = {{opacity  : 0 }}
        animate = {{opacity : 1 }}
        transition={{duration : 0.6 , delay :0.2}}
      className="max-w-xl bg-gradient-to-br from-purple-800 to-purple-950 hover:bg-gradient-to-r hover:opacity-80 transition-transform duration-1000 h-10 flex items-center justify-center  text-xl py-6 px-20 lg:px-32  text-neutral-200 rounded-md mt-10" onClick={handlePaymoney}
      > Pay securely</motion.button>
    </div>
      </motion.div>
      </div>
  </div>
}