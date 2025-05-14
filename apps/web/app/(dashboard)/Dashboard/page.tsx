"use client"

import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react"

export default function Dashboard(){

  const {data : session , status} = useSession()


  useEffect(() => {
    if (status === "unauthenticated") {
      signIn()
      console.log("sesssion is not valid")
    }
      console.log("sesssion is  valid")

  }, [status])

return <div>
  Dashboard
</div>
}