"use client"

import { useRouter  } from "next/navigation.js"
export const Sidebar = ()=>{

  const router = useRouter( )
return <div>
  <div className="bg-neutral-900  h-screen fixed border-r-2 border-neutral-800 lg:w-[250px] ">

    <div className= "max-w-full mt-6 ml-6 mr-6 p-3 " 
    onClick={()=>{
      router.replace("/")
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

  </div>
</div>

}