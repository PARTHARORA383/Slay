"use client";

import React, { useState } from 'react';


const NetbankingPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 grid grid-cols-2">
      <div className="col-span-1 bg-white rounded-2xl shadow-2xl p-8 w-full">
        
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
          <strong>Note:</strong> This is a mock NetBanking login page and not connected to any real bank. In real scenarios, you would use your official Customer ID and password provided by your bank. Also this userid and password is  <span className='font-bold'> unique</span> for every user so no other user can make payments from your account
          <br />
          For demo purposes, use:
          <ul className="list-disc ml-5 mt-2">
            <li>User ID: <code className='font-bold'>demoUser</code></li>
            <li>Password: <code className='font-bold'>password123</code></li>
          </ul>
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
            className="h-10 shadow-lg rounded-md bg-neutral-100 w-2/3 outline-none mt-2 p-2.5 text-neutral-800"
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
            className="h-10 shadow-lg rounded-md bg-neutral-100 w-2/3 outline-none mt-2 p-2.5 text-neutral-800"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Login Button */}
        <button
          className="bg-blue-700 rounded-md text-neutral-100 p-2.5 w-2/3 mt-8 hover:bg-blue-800 transition-transform duration-300"
        >
          Login
        </button>
    
      </div>
      <div className="bg-gradient-to-br from-blue-400 to-blue-800 col-span-1 rounded-lg flex flex-col items-center justify-center text-white p-10 space-y-6">
  {/* SVG Icon */}


  {/* Title */}
  <h2 className="text-4xl font-bold tracking-wide text-center">
    Welcome to DummyBank 🚀
  </h2>

  {/* Tagline */}
  <p className="text-xl text-center max-w-md font-medium tracking-wide text-blue-100">
    Your money. Your power.<br />
    Secure, fast, and trusted by thousands every day.
  </p>

  {/* Optional CTA or Statement */}
  <p className="text-md italic text-blue-200 text-center">
    "Experience modern banking with a human touch."
  </p>


</div>

    </div>
  );
};

export default NetbankingPage;
