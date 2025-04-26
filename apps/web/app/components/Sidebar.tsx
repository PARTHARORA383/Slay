"use client"

import { useRouter  } from "next/navigation.js"
import { Logout } from "./Logout.tsx"
export const Sidebar = ()=>{

  const router = useRouter( )
return <div>
  <div className=" hidden lg:block lg:fixed bg-neutral-900 lg:h-screen  border-r-2 border-neutral-800 lg:w-[250px] ">

    <div className= "max-w-full mt-20 ml-6 mr-6 p-3  " 
    onClick={()=>{
      router.replace("/Dashboard")
    }}>
     <h1 className="text-neutral-200 text-md hover:text-purple-500 cursor-pointer">
      Dashboard
      </h1>
    </div>
    <div className= "max-w-full  ml-6 mr-6 p-3 " 
    onClick={()=>{
      router.replace("/transfer")
    }}>
     <h1 className="text-neutral-200 text-md hover:text-purple-500 cursor-pointer">
      Transfer Money
      </h1>
    </div>
    <div className= "max-w-full  ml-6 mr-6 p-3 " 
    onClick={()=>{
      router.replace("/P2P")
    }}>
     <h1 className="text-neutral-200 text-md hover:text-purple-500 cursor-pointer">
      P2P
      </h1>
    </div>
    <div className= "max-w-full  ml-6 mr-6 p-3 ">
    <Logout/>
    </div>

      
  </div>
</div>

}