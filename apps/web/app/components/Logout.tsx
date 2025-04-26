
import { Loader } from "@repo/ui/loader"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation.js"
import { useState } from "react"

export const Logout = ()=>{

  const router = useRouter()
  const [loading , setLoading] = useState(false);

  const handleClick =async ()=>{

    try{
      setLoading(true)
      const res =  await signOut({redirect : false})
      router.push("/Auth/Signup"); 
    }catch(e){
      
    } 
    finally{
      setLoading(false)
    }
  }

  if(loading){
    return <Loader label=""/>
  }
  return <div>
    <button className="text-neutral-200 text-md hover:text-purple-500 cursor-pointer " onClick={handleClick}>Logout</button>
  </div>
}