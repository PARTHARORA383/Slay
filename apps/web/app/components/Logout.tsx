
import { ok } from "assert"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation.js"

export const Logout = ()=>{

  const router = useRouter()


  const handleClick =async ()=>{
    const res =  await signOut({redirect : false})
    router.push("/Auth/Signup"); 
  }

  return <div>
    <button className="text-neutral-200 text-md hover:text-purple-500 cursor-pointer " onClick={handleClick}>Logout</button>
  </div>
}