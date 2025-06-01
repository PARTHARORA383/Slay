"use client"

import { BalanceCard } from "@/app/components/Balance.tsx"
import { DashboardCard } from "@/app/components/DashboardCards.tsx"
import { DashboardSkeleton } from "@/app/components/DashboardSkeleton.tsx"
import { DashboardTransaction } from "@/app/components/DashboardTransaction.tsx"
import { TransactionChart } from "@/app/components/LineChart.tsx"
import { P2PTransactions } from "@/app/components/P2Ptransactions.tsx"
import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react"

export default function Dashboard(){
  const {data : session , status} = useSession()
  useEffect(() => {
    if (status === "unauthenticated") {
      signIn()
      console.log("sesssion is not valid")
    }
      console.log("sesssion is  valid")
  }, [status])


if(status === "loading"){
  return <DashboardSkeleton/>
}

return<>


<div className="text-neutral-300 text-2xl ml-4 mr-4 lg:ml-72 pt-5 font-semibold">Welcome Back</div>
  <div className="grid  grid-cols-1 lg:grid-cols-6 lg:max-h-screen">

<div className=" ml-4 mr-4 lg:ml-72 lg:col-span-4 flex flex-col">
  <DashboardCard/>
  <div className=" border-[3px]  border-neutral-800 mt-6 rounded-md shadow-xl ">

    <DashboardTransaction/>
  </div>
</div>


<div className="lg:col-span-2 pt-2 mr-5 lg:ml-0 ml-4 mb-10 lg:mb-0 ">

<div className=" border-[3px] border-neutral-800 mt-6 rounded-md shadow-xl "> 

<TransactionChart/>
</div>



</div>
  </div>
 </> 
}