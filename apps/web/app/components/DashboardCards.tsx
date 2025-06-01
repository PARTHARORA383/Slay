"use client"

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react"




export const DashboardCard = ()=>{

  const [loading , setLoading] = useState(false);
  const [Balance , setBalance] = useState(0);
  const [TotalTransaction , setTotalTransaction] = useState(0);
  const[TransactionAmount , setTransactionsAmount] = useState(0);
  const {data : session  , status} = useSession()

  const fetchTransactions = async ()=>{
    let sum  = 0;
    let total = 0 ;
      try{
        setLoading(true);

          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/P2P` ,  { params: { userId: session?.user.id }})
        

          response.data.Transaction.map((transaction:any)=>{
            sum += transaction.amount
            total++
          })
          setTransactionsAmount(sum);
          setTotalTransaction(total);
       
          
     
      } catch(e){
        console.log("error fetching transactions")
      }
      finally{
        setLoading(false);
      }
  }

  const fetchBalance = async ()=>{
      try{
        setLoading(true);

            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/Balance`, {
            params: { userId: session?.user.id },
          });
        
          console.log("hello testing")
      
          setBalance(response.data.balance.amount)
          console.log("this is balance" + Balance)
      } catch(e){
        console.log("error fetching balance")
      }
      finally{
        setLoading(false);
      }
  }

  function formatRupees(amount : number):string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(Number(amount));
}

  useEffect(()=>{
    if(session?.user.id){
      fetchTransactions();
      fetchBalance();
    }

  },[session?.user.id])

  return <div >

  <div className="grid grid-cols-2 pt-8 gap-5">

    <div className="col-span-1 pt-5 pl-2 pb-5 rounded-md bg-gradient-to-br from-neutral-800 to-neutral-900 ">
      <div className="text-neutral-400 text-lg" >  Transaction amount</div>
      <div className="text-2xl text-neutral-100 mt-2 font-semibold"> {formatRupees(TransactionAmount)}</div>
      <div className="text-neutral-500 mt-3">Last month</div>
    </div>
   <div className="col-span-1 bg-neutral-700 pt-5 pl-2 pb-5 rounded-md bg-gradient-to-br from-neutral-800 to-neutral-900 ">
      <div className="text-neutral-400 text-lg" > Total Balance</div>
      <div className="text-2xl text-neutral-100 mt-2 font-semibold"> {formatRupees(Balance)}</div>
       <div className="text-neutral-500 mt-3">Current</div>
    </div>
      {/* <div className="col-span-1 bg-neutral-700 pt-5 pl-2 pb-5 rounded-md bg-gradient-to-br from-neutral-600 to-neutral-900 ">
      <div className="text-neutral-400 text-lg" > Total Transactions</div>
      <div className="text-2xl text-neutral-100 mt-2 font-semibold"> {TotalTransaction}</div>
      <div className="text-neutral-500 mt-3">Last month</div>
    </div> */}



  </div>


  </div>
}