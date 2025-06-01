
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { motion } from 'motion/react'
import axios from "axios"

export const DashboardTransaction = () => {
  const { data: session, status } = useSession()
  const [transactions, setTransactions] = useState([])


  const handlefetch = async () => {

    try {

      if (session?.user.id) {

        console.log("this is the session user" + session.user.id)
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/P2P`, { params: { userId: session?.user.id } })
        console.log(response.data)

        const sorted = response.data.Transaction
          .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
          .slice(0, 5);

        setTransactions(sorted);

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




  return <>

    <div >

      <div className=" flex justify-between items-center p-2.5 bg-gradient-to-br from-neutral-800 to-neutral-900 pl-5 pr-5">

        <div className="text-lg  text-neutral-300 "> Recent Transaction
        </div>
        <div className="text-lg  text-neutral-300 ">Pay More
        </div>
      </div>

      {transactions.map((transaction) => (
        <motion.div
          className="flex items-center p-1 gap-4 mt-2 pl-5 " key={transaction.id}
        >

          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neutral-600 to-neutral-900 text-neutral-100 flex justify-center items-center font-semibold ">
            {(session?.user.id == transaction.senderId) ? transaction.reciverName.toString().split("")[0] : transaction.senderName.toString().split("")[0]}
          </div>



          <div className="flex justify-between border-b-[1px] border-neutral-800 w-full mr-1 lg:mr-6 hover:bg-gradient-to-br hover:from-neutral-800 hover:to-neutral-900 rounded-md p-2 cursor-pointer transition-all duration-500">
            <div className="flex flex-col">

              <div className="text-neutral-100  text-md">
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

              <div className=" text-md font-semibold text-neutral-200">
                {(session?.user.id == transaction.senderId) ? "-" : "+"}   {transaction.amount}
              </div>

              <div className="text-neutral-400 text-sm">{(session?.user.id == transaction.senderId) ? "Sent" : "Recieved"}</div>
            </div>

          </div>

        </motion.div>


      ))}
    </div>
  </>
}