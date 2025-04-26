"use client"

import { Button } from "@repo/ui/button"
import axios from "axios"
import { useEffect, useState } from "react"


interface prop {

  id : number ,
  email : string,
  name : string

}

export const UserList = ()=>{

  const [users , setUsers ] = useState([])

  const handlefetchusers = async ()=>{

    try{

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users`)
      setUsers(response.data.users);
      console.log(response.data.users)
    }catch(e){
        console.log('error fetching data')
    }

  }

    useEffect(()=>{
      handlefetchusers()
    },[])

    const handleSendMoney = ()=>{
      
    }


  return <div className="">

    {users.map((user : {user : prop})=>(
      <div className="border-b-2 border-neutral-800 grid grid-cols-4 text-neutral-200 p-2.5 text-md" key={user.id}>

        <div className="truncate w-10 h-10 rounded-full  flex justify-center items-center bg-gradient-to-tr from-neutral-700 to-neutral-950">{user.email.split("")[0]}</div>
        <div className="truncate">{user.name}</div>
        <div className="truncate">{user.name}</div>
        <div className="truncate"><Button label="Send Money " handleclick={handleSendMoney}/></div>

          


      </div>

    ))}
  
  </div>
}