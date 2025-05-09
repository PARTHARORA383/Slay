"use client";

import { Card } from "@repo/ui/card";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const BalanceCard = () => {
  const {data : session , status } = useSession()
  const [userBalance, setUserBalance] = useState<{
    amount: number;
    locked: number;
  } | null>(null);
  console.log(session?.user)
  const fetchBalance = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/Balance`, {
        params: { userId: session?.user.id},
      });
      setUserBalance(response.data.balance);
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };
  

    useEffect(() => {
      fetchBalance();
    }, [session]);


  return (
    <div className="p-5 lg:p-0 lg:max-w-lg">
      <Card title={"Balance"}>
        {userBalance ? (
          <>
            <div className="flex justify-between border-b border-slate-300 pb-2">
              <div>Unlocked balance</div>
              <div>{userBalance.amount} INR</div>
            </div>
            <div className="flex justify-between border-b border-slate-300 py-2">
              <div>Total Locked Balance</div>
              <div>{userBalance.locked / 100} INR</div>
            </div>
            <div className="flex justify-between border-b border-slate-300 py-2">
              <div>Total Balance</div>
              <div>{(userBalance.amount + userBalance.locked)} INR</div>
            </div>
          </>
        ) : (
          <div className="text-neutral-400 text-sm italic">Loading balance...</div>
        )}
      </Card>
    </div>
  );
};
