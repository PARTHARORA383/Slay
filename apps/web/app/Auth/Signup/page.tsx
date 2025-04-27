"use client"

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation.js";
import Image from "next/image.js";

import {AuthCard} from "../../components/AuthCard.tsx";
import { signIn } from 'next-auth/react';

import { NextResponse } from "next/server.js";



export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter()
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  
  const handleSignup = async () => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      console.log("this is the response " , res);
  
      if (res?.ok) {
       
        router.push("/Dashboard");
      } else {
        console.error("Login failed", res?.error);
        alert("Login failed: " + res?.error || "Unknown error");
      }
    } catch (e) {
      console.error("Sign-in error", e);
      alert("Unexpected sign-in error");
    }
  };
  

  return (
    <div className="  grid grid-cols-2 bg-gray-100">
    
       
      <div className="col-span-2 lg:col-span-1">

      <AuthCard email={email} password={password} setEmail={setEmail} setPassword={setPassword} handleSubmit={handleSignup}  type="signup"/>
      </div>
   
           
      <div className="col-span-1 hidden lg:block bg-neutral-900">
      <img   src="/image/mythical-dragon-beast-anime-style.jpg"
  alt="Mythical Dragon" className="max-h-screen min-h-screen "/>
      </div>
    
    </div>
  );
}
