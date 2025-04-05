"use client"

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation.js"; 
import { AuthCard } from "@/app/components/AuthCard.tsx";
export default function Signin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()
 
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const handleSignin  = async ()=>{

    try{

      const response = await axios.post(`${API_URL}/api/user/auth/Signin`,{

        email ,
        password
      }
      )

      if(response.status == 200){
        localStorage.setItem("token" , response.data.token)
        router.push("/");
        console.log(response.data)
      }
      else{
        alert("invalid email and password")
      }
    }catch(e){
      alert("invalid email and password")
    }
  }


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <AuthCard email= {email} password= {password} setEmail={setEmail } setPassword={setPassword} handleSubmit={handleSignin} type="signin"/>
    </div>
  );
}
