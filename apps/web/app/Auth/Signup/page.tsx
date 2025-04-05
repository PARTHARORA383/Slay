"use client"

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation.js";
import {AuthCard} from "../../components/AuthCard.tsx";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const handleSignup  = async ()=>{

    try{

      const response = await axios.post(`${API_URL}/api/user/auth/Signup`,{

        email ,
        password
      }
      )



      if(response.status == 201){
        router.push("/");
        console.log(response.data)
        localStorage.setItem("uid" , response.data.user.uid)
      }
      else{
        alert("invalid email and password")
      }
    }catch(e){

    }
  }

  return (
    <div className="flex min-h-screen items-center bg-gray-100">
      <AuthCard email={email} password={password} setEmail={setEmail} setPassword={setPassword} handleSubmit={handleSignup}  type="signup"/>
    </div>
  );
}
