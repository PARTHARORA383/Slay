

"use client"

import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { motion } from 'motion/react'
import { BalanceCard } from "./Balance.tsx"
import { P2PTransaction_infocard } from "./P2Ptransaction_infocard.tsx"


export const P2PTransactions = () => {

  const { data: session, status } = useSession()
  const [transactions, setTransactions] = useState([])
  const [search, setSearch] = useState('')
  const [showtransactioninfo, setShowtransactoininfo] = useState(false);
  const [selectedtransaction, setSelectedtransaction] = useState()



  const handlefetch = async () => {

    try {

      if (session?.user.id) {

        console.log("this is the session user" + session.user.id)
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
    return (transaction.reciverName.toLowerCase().includes(search.toLowerCase()) ||
      transaction.recieverEmail.toLowerCase().includes(search.toLowerCase())
    )
  })

  const handleshowbalance = (transaction: any) => {
    setShowtransactoininfo(true);
    setSelectedtransaction(transaction)

  }





  return <div>

    {showtransactioninfo && selectedtransaction && (<div className="fixed inset-0 z-50">


      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}

        transition={{ duration: 0.5, ease: "easeOut" }}
        className='w-8 h-8 bg-transparent text-neutral-200 absolute top-1/4   lg:right-[600px] font-semibold -right-px z-50 text-2xl cursor-pointer hover:text-red-400' onClick={() => {
          setShowtransactoininfo(false)
        }}> x</motion.div>


      <P2PTransaction_infocard amount={selectedtransaction.amount} senderName={selectedtransaction.senderName} senderEmail={selectedtransaction.senderEmail || ""} recieverEmail={selectedtransaction.recieverEmail || ""} recieverName={selectedtransaction.recieverName || ""} startTime={selectedtransaction.startTime} />
    </div>)
    }

  



    <div className=" ml-2 lg:ml-0 mr-5 mb-5 lg:pt-12 pt-4 ">
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

    <div className="text-lg font-semibold text-neutral-300  p-2.5 bg-gradient-to-br from-neutral-800 to-neutral-900 ">Payment history</div>

    <div >
      {filteredtransactions
        .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
        .map((transaction) => (
          <motion.div
            className="flex items-center p-1 gap-4" key={transaction.id} onClick={() => handleshowbalance(transaction)}
          >

            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neutral-600 to-neutral-900 text-neutral-100 flex justify-center items-center font-semibold ">
              {(session?.user.id == transaction.senderId) ? transaction.reciverName.toString().split("")[0] : transaction.senderName.toString().split("")[0]}
            </div>



            <div className="flex justify-between border-b-[1px] border-neutral-800 w-full mr-1 lg:mr-6 hover:bg-neutral-800 rounded-md p-2 cursor-pointer transition-transform duration-300">
              <div className="flex flex-col">

                <div className="text-neutral-100 lg:text-lg text-md">
                  {(session?.user.id == transaction.senderId) ? transaction.reciverName :
                    transaction.senderName}
                </div>
                <div className="text-neutral-400 text-sm">
                  {new Date(transaction.startTime).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  }).replace('at', ',')}
                </div>
              </div>
              <div className="flex flex-col items-end ">

                <div className="lg:text-lg text-md font-semibold text-neutral-200">
                  {(session?.user.id == transaction.senderId) ? "-" : "+"}   {transaction.amount}
                </div>

                <div className="text-neutral-400 text-sm">{(session?.user.id == transaction.senderId) ? "Sent" : "Recieved"}</div>
              </div>

            </div>

          </motion.div>


        ))}
    </div>

  </div>
}