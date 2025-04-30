"use client"

import { useRouter  } from "next/navigation.js"
import { Logout } from "./Logout.tsx"
import { useState } from "react"
import { Menu } from "lucide-react"
import { easeIn, motion } from "motion/react"
export const Sidebar = ()=>{

  const router = useRouter( )
  const [isVisible , setIsVisible] = useState(false)
return <div>

    <div className=" fixed top-6 left-2  block lg:hidden z-50 cursor-pointer " onClick={()=>{
      setIsVisible(!isVisible)
    }}>
      <Menu className="w-8 h-10 text-neutral-200"/>
    </div>

  <motion.div
  initial = {{opacity : 0  , x : -100}}
  animate = {{opacity : 1 , x : 0}}
  transition={{ ease : 'easeIn',
    duration : 0.3
  }}
  className= {`lg:block lg:fixed bg-neutral-900 lg:h-screen  border-r-2 border-neutral-800 w-[250px] lg:w-[250px] ${isVisible ? 
  ` transition-transform duration-300  fixed block z-20 h-screen` : "hidden"}`} >

    <div className= "max-w-full mt-20 ml-6 mr-6 p-3  " 
    onClick={()=>{
      router.replace("/Dashboard")
      setIsVisible(false)
    }}>
     <h1 className="text-neutral-200 text-md hover:text-purple-500 cursor-pointer">
      Dashboard
      </h1>
    </div>
    <div className= "max-w-full  ml-6 mr-6 p-3 " 
    onClick={()=>{
      router.replace("/transfer")
      setIsVisible(false)
    }}>
     <h1 className="text-neutral-200 text-md hover:text-purple-500 cursor-pointer">
      Transfer Money
      </h1>
    </div>
    <div className= "max-w-full  ml-6 mr-6 p-3 " 
    onClick={()=>{
      router.replace("/P2P")
      setIsVisible(false)
    }}>
     <h1 className="text-neutral-200 text-md hover:text-purple-500 cursor-pointer">
      P2P
      </h1>
    </div>
    <div className= "max-w-full  ml-6 mr-6 p-3 ">
    <Logout/>
    </div>

      
  </motion.div>
</div>

}