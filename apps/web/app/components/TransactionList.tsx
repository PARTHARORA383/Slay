"use client"

import { Loader } from "@repo/ui/loader"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"


export function TransactionList() {
  const {data : session  , status } = useSession()
  const [transactions, setTransactions] = useState([])
  const [filterTransactions, setFilterTransactions] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false);
  const [selected , setSelected] = useState('')
  


  const filterCallback = (transaction: any) => {
    return (

      transaction.amount.toString().includes(search) ||
      transaction.status.toLowerCase().includes(search.toLowerCase())
    )

  }


  const fetchtransactions = async () => {
    try {

      if(session?.user){

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions`, {
          params: { userId: session?.user.id },
        })
        setTransactions(response.data.transactions)
        console.log(response.data.transactions)
      }
    } catch (e) {
      alert("Server down please try agaain")
    }

  }

  useEffect(() => {
    fetchtransactions()
  }, [])


  useEffect(() => {
    setLoading(true)
    const filterdata = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const result = transactions.filter(filterCallback);
        setFilterTransactions(result);
      } catch (error) {
        console.error("Error while filtering transactions:", error);
      } finally {
        setLoading(false);
      }
    }

    filterdata();

  }, [transactions, search])



  return <div className=" ">

    <div className="flex justify-between items-center mt-10">

      <div className=" flex items-center">

        <div className="text-neutral-200 text-xl font-medium">
          Recent Transactions
        </div>

        <div className="flex items-center bg-neutral-800 rounded-md  py-0.5 ml-5">

        <div
  className={`text-neutral-100 text-md px-5 py-1 hover:bg-neutral-600 rounded-lg transition-transform duration-300 cursor-pointer border-r-2 border-opacity-30 border-neutral-600 ${
    selected === "All" ? "bg-neutral-700 " : ""
  }`}
  onClick={() => {
    setSelected("All");
    setSearch("");
  }}
>
  All
</div>
          <div className={`text-neutral-100 text-md px-5 py-1 hover:bg-neutral-600 rounded-lg transition-transform duration-300 cursor-pointer border-r-2 border-opacity-30 border-neutral-600 ${selected === 'Recieved' ? "bg-neutral-700" : ""} `} onClick={()=>{
            setSelected("Recieved")
            setSearch('Recieved')
          }}>
            Recieved
          </div>
          <div
  className={`text-neutral-100 text-md px-5 py-1 hover:bg-neutral-600 rounded-lg transition-transform duration-300 cursor-pointer border-r-2 border-opacity-30 border-neutral-600 ${
    selected === "Success" ? "bg-neutral-700 font-semibold" : ""
  }`}
  onClick={() => {
    setSelected("Success");
    setSearch("Success");
  }}
>
  Success
</div>

<div
  className={`text-neutral-100 text-md px-5 py-1 hover:bg-neutral-600 rounded-lg transition-transform duration-300 cursor-pointer border-r-2 border-opacity-30 border-neutral-600 ${
    selected === "Processing" ? "bg-neutral-700 font-semibold" : ""
  }`}
  onClick={() => {
    setSelected("Processing");
    setSearch("Processing");
  }}
>
  Processing
</div>

        </div>
      </div>

      <div className="mr-5">
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
    </div>


    {
      //List of Transactions
    }

    <div className="bg-neutral-800 rounded-lg mt-8">

      <div
        className="grid grid-cols-5 gap-4 py-2 px-3 text-neutral-100"
      >
        <div className="truncate"></div>
        <div className="truncate">Amount</div>
        <div className="truncate"> Provider</div>
        <div className="truncate"> Payment Method</div>
        <div className="truncate">Status</div>
      
      </div>


    </div>

    {loading ? (
      <div className="flex justify-center items-center py-6">
        <div className="w-8 h-8 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
      </div>

    ) : (
      <div className="text-sm w-full max-w-screen">
        {filterTransactions.map((transaction) => (
          <div
            className="grid grid-cols-5 gap-4 border-b border-neutral-700 p-3 text-neutral-100 hover:bg-neutral-800 bg-opacity-70 transition-transform duration-300 cursor-pointer"
            key={transaction.id}
          >   
            
            <div className="truncate w-10 h-10 rounded-full flex justify-center items-center bg-gradient-to-r from-purple-900 to-purple-950">S</div>
            <div className="truncate">{transaction.amount}</div>
            <div className="truncate">{transaction.provider}</div>
            <div className="truncate">Netbanking</div>
            <div className="truncate">{transaction.status}</div>
            {/* <div className="truncate"> {new Date(transaction.startTime).toISOString().split("T")[0]}</div> */}
          </div>
        ))}
      </div>
    )}




  </div>

}