"use client"

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation.js";
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
    <div className="flex min-h-screen items-center bg-gray-100">
      <AuthCard email={email} password={password} setEmail={setEmail} setPassword={setPassword} handleSubmit={handleSignup}  type="signup"/>
    </div>
  );
}
