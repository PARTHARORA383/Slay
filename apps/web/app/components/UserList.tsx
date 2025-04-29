"use client"

import { Button } from "@repo/ui/button"
import axios from "axios"
import { useRouter } from "next/navigation.js"
import { useEffect, useState } from "react"


interface prop {

  id : number ,
  email : string,
  name : string

}

export const UserList = ()=>{

  const [users , setUsers ] = useState([])
  const [search , setSearch ] = useState("")
  const router = useRouter()

  const handlefetchusers = async ()=>{

    try{

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users`)
      setUsers(response.data.users);
     
    }catch(e){
        console.log('error fetching data')
    }

  }

    useEffect(()=>{
      handlefetchusers()
    },[])
    console.log(users)
    const handleSendMoney = ()=>{
      
    }

    const filteredusers = users.filter(user =>{
      return (

        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.name.toLowerCase().includes(search.toLowerCase())
      )
    }
  )

  return <div  className="p-3">
<div className="flex flex-col gap-2 mb-8">
  <h1 className="text-2xl font-semibold text-white">Send Money Instantly</h1>
  <p className="text-sm text-neutral-400">Select a user or search by name, email, or just scroll</p>
</div>
<div className="mr-5 mb-5">
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
      
      <div className="text-lg font-semibold text-neutral-300  p-2.5 mb-3 w-full bg-neutral-800 rounded-md">Contacts</div>
    
    {filteredusers.map((user)=>(
      <div className=" border-b-[1px] border-neutral-800 flex justify-between text-neutral-200 p-2.5 text-mde hover:bg-neutral-800 hover:bg-opacity-40 rounded-lg font-sans font-semibold bg-clip-border b-1 "  key={user.id } onClick={()=>{
        router.push(`/Sendmoney/?userId=${user.id}`) 
     }}>
        <div className="flex gap-6">

        <div className=" w-10 h-10 rounded-full  flex justify-center items-center bg-gradient-to-tr from-neutral-700 to-neutral-950">{user.email.split("")[0]}</div>  
        
        <div className="">

        <div className="">{'XYZABC'}</div>
        <div className="">{user.name}</div>
        </div>
        </div>
        <div className="hidden lg:block pr-5 ">

          <button className="px-6 py-1.5 rounded-md hover:bg-gradient-to-b hover:opacity-80 bg-gradient-to-r from-neutral-800 to-neutral-900 " onClick={()=>{
            router.push(`/Sendmoney/?userId=${user.id}`) 
         }}>Send Money</button>
        </div>

          

 
      </div>

    ))}
  
  </div>
}