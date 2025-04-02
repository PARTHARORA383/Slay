"use client"

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
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
      }
      else{
        alert("invalid email and password")
      }
    }catch(e){

    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full text-black p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border text-black rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button onClick={handleSignup}
          type="button"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
