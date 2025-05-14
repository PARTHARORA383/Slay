"use client";

import { Card } from "@repo/ui/card";
import axios from "axios";
import { signIn, useSession ,getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { motion } from 'motion/react'
import { useRouter, useSearchParams } from "next/navigation.js";
import { Alertbox } from "@repo/ui/alert";
export const BalanceCard = () => {
  const { data: session, status } = useSession()
  const [userBalance, setUserBalance] = useState<{
    amount: number;
  } | null>(null);


  const router = useRouter();
  const searchParams = useSearchParams();
  const[sessionbug , setSessionbug] = useState(false);


  const fetchBalance = async (userId : string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/Balance`, {
        params: { userId: userId },
      });
      setUserBalance(response.data.balance);
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };


  useEffect(() => {
    console.log("session is" + session?.user?.email)
    if (status == "authenticated" && session?.user.id) {
      fetchBalance(session.user.id);
    }
  }, [status, session]);

  useEffect(() => {
    const shouldRefresh = searchParams.get("refresh") === "true";
    if(shouldRefresh){

      setSessionbug(true);
    }
  
    // console.log('USERID :' + session?.user.id )

    // const recheckSession = async () => {
    //   const freshSession = await getSession();
    //   console.log("Manually fetched session:", freshSession);
  
    //   if (freshSession?.user?.id) {
    //     fetchBalance(freshSession.user.id);
    //   }
    //   router.replace("/Dashboard"); 
    // };

    // if (shouldRefresh) {
    //   recheckSession();
    // }

  }, [searchParams]);


  if(sessionbug){
    return <div>
      <Alertbox label="Its a next-auth bug we are trying to fix. Please logout and login again 
      to check balance"/>
    </div>
  }

  return (
    <div className="p-5 lg:p-0 lg:max-w-lg lg:h-[180px] h-[220px]">
      <Card title="">
        {userBalance ? (
          <>
            <div className=" text-xl lg:text-2xl text-neutral-200 px-3 pt-3">
              Wallet
            </div>
            <div className=" flex justify-between items-center ">

              <div className="flex flex-col gap-3 px-3 ">
                <div className="text-neutral-400 text-md lg:text-lg  ">
                  Current Balance
                </div>
                <div className=" text-3xl lg:text-4xl"> ₹ {userBalance.amount}</div>
              </div>
              <div className=" w-28 h-28 lg:w-32 lg:h-32 p-5 mr-10 mb-4 bg-neutral-800 bg-opacity-50 rounded-full flex justify-center items-center ">
                <img src="/image/wallet_8528463.png " className="w-full h-full" />

              </div>
            </div>

          </>
        ) : (
          <motion.div className="text-neutral-400 text-xl p-4 italic">loading...</motion.div>
        )}
      </Card>
    </div>
  );
};
