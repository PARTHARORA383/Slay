"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const NetbankingPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleclick = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email: username,
      password,
    });

    if (res?.ok) {
      router.push("/TransferMoney");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-50 to-blue-100 lg:p-4 p-6 grid grid-cols-2">
      <div className="col-span-2 lg:col-span-1 bg-white rounded-2xl shadow-2xl p-8 ml-2 w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-blue-700">DummyBank</h1>
          <img
            src="https://img.icons8.com/ios-filled/50/4a90e2/bank-building.png"
            alt="Bank Logo"
            className="w-10 h-10"
          />
        </div>

        {/* 🟡 Notice */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 text-sm rounded-md mb-6">
          <strong>Note:</strong> This is a mock NetBanking login page and not connected to any real bank. In real scenarios, you would use your official Customer ID and Password.
          <p className="font-bold mt-2">
            Here please login using the same Email and Password you used on the
            Slay app.
          </p>
        </div>

        {/* Login Title */}
        <div className="text-xl text-neutral-900 font-medium mt-2">
          Login to Dummy Bank NetBanking
        </div>

        {/* User ID */}
        <div className="flex flex-col mt-6">
          <label className="text-md text-neutral-800">Customer ID / User ID</label>
          <input
            type="text"
            className="h-10 shadow-lg rounded-md bg-neutral-100 lg:w-2/3 outline-none mt-2 p-2.5 text-neutral-800"
            placeholder="Enter your User ID"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col mt-6">
          <label className="text-md text-neutral-800">Password</label>
          <input
            type="password"
            className="h-10 shadow-lg rounded-md bg-neutral-100 lg:w-2/3 outline-none mt-2 p-2.5 text-neutral-800"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleclick}
          className="bg-blue-700 rounded-md text-neutral-100 p-2.5 lg:w-2/3 mt-8 hover:bg-blue-800 transition-transform duration-300 w-full"
        >
          Login
        </button>
      </div>

      <div className="hidden bg-gradient-to-br from-blue-400 to-blue-800 col-span-1 rounded-lg lg:flex flex-col items-center justify-center text-white p-10 space-y-6">
        {/* Title */}
        <h2 className="text-4xl font-bold tracking-wide text-center">
          Welcome to DummyBank 🚀
        </h2>

        {/* Tagline */}
        <p className="text-xl text-center max-w-md font-medium tracking-wide text-blue-100">
          Your money. Your power.
          <br />
          Secure, fast, and trusted by thousands every day.
        </p>

        {/* Optional CTA or Statement */}
        <p className="text-md italic text-blue-200 text-center">
          Experience modern banking with a human touch.
        </p>
      </div>
    </div>
  );
};

export default NetbankingPage;
