

"use client"

import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { motion } from 'motion/react'
import { BalanceCard } from "./Balance.tsx"


export const P2PTransactions = () => {

  const { data: session, status } = useSession()
  const [transactions, setTransactions] = useState([])
  const[search , setSearch] = useState('')


  const handlefetch = async () => {

    try {

      if (session?.user.id) {


        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/P2P`, { params: { userId: session?.user.id } })
        console.log(response.data)
        setTransactions(response.data.Transaction)
      }

    } catch (e) {
      alert("error fetching transaction , server down")
    }
  }

  useEffect(() => {

    if (session?.user.id) {

      handlefetch()
    }

  }, [session?.user.id])


  const filteredtransactions = transactions.filter((transaction) => {
    return ( transaction.reciverName.toLowerCase().includes(search.toLowerCase()) ||
      transaction.recieverEmail.toLowerCase().includes(search.toLowerCase())
    )
  })

  return <div>
<div className="pt-8">

  <BalanceCard/>
</div>

<div className="mr-5 mb-5 pt-8">
        <div className="relative w-full max-w-xl">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-sm"
            onChange={(e) => {
              setSearch(e.target.value)
            }}
          />
        </div>

      </div>
      
      <div className="text-lg font-semibold text-neutral-300  p-2.5 mb-3 w-full bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-md">Payment history</div>

    <div >
      {filteredtransactions.map((transaction) => (
        <motion.div
          className="flex items-center p-1 gap-4" key={transaction.id}>

          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neutral-600 to-neutral-900 text-neutral-100 flex justify-center items-center font-semibold ">
            {transaction.reciverName.toString().split("")[0]}
          </div>



          <div className="flex justify-between border-b-[1px] border-neutral-800 w-full mr-3 lg:mr-6 hover:bg-neutral-800 rounded-md p-2 cursor-pointer transition-transform duration-300">
            <div className="flex flex-col">

            <div className="text-neutral-100 text-lg">
              {transaction.reciverName.slice(0 , 5)}
            </div>
            <div className="text-neutral-400 text-md ">
             Paid on : {new Date(transaction.startTime).toLocaleString("en-GB", {
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).replace('at' , ',')}  
            </div>
            </div>
            <div className="flex flex-col items-end ">

            <div className="text-lg font-semibold text-neutral-200">
             + {transaction.amount}
            </div>

            <div className="text-neutral-400 text-sm">Recieved</div>
            </div>

          </div>

        </motion.div>


      ))}
    </div>

  </div>
}