"use client"
import axios from "axios"
import { useState } from "react"

interface prop {
  amount : Number,
  account_number : string ,
  userId : Number ,
  token : string,
  CustomerId : string
}





 export const SendMoney = ({amount , account_number  , userId , token ,CustomerId }:prop)=>{

  const [loading , setLoading] = useState(false)


  
  
  const handleclick = async ()=>{


    try{
      setLoading(true)
      const bank_confirm = await axios.post("http://localhost:3001/api/confirm" ,{
        amount      ,
        account_number
      }
    )
    
    if(bank_confirm.status == 200){
      
      
      const response = await axios.post("http://localhost:5000/bankWebhook" ,{
        userId ,
        token ,
        amount
      })
      setLoading(false)
      alert("payment made")
      window.location.href = "http://localhost:3000" 
      
    }
    
  }catch(e){
    
    alert("Payment failed. Please try again.");
  }
  finally{
    setLoading(false)
  }
}

if(loading){
  return <div className=" z-20 fixed inset-0 h-screen w-screen bg-black  opacity-30  flex justify-center items-center">
    <div className="w-[70px] h-[50px] bg-neutral-100 flex justify-center items-center rounded-lg">
     
    <div className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>

    </div>
  </div>
}


  return <div className="bg-white w-full h-full  shadow-lg p-5 rounded-lg  ">
  
      <div className=" "> 
        <h1 className="text-2xl font-medium border-b border-gray-300 p-2 ">Pay Money</h1>

        
        <div className="flex justify-between items-center mt-6">
          <label className="text-lg text-neutral-800 font-normal">Amout</label>
          <input
            type="number"
            readOnly
            className="h-10 shadow-lg rounded-md bg-neutral-50 w-2/3 outline-none mt-2 p-3 text-neutral-800 font-normal"
            placeholder="Enter the amount"
            value={amount} 

          />
        </div>

        <div className="flex justify-between items-center mt-6">
          <label className="text-lg text-neutral-800 font-normal">Payment From</label>
          <input
            type="text"
            readOnly
            className="h-10 shadow-lg rounded-md bg-neutral-50 w-2/3 outline-none mt-2 p-3 text-neutral-800 font-normal"
            placeholder="Account number"
            value ={account_number}
          />

        </div>
        <div className="flex justify-between items-center mt-6">
          <label className="text-lg text-neutral-800 font-normal">Payment To</label>
          <input
            type="text"
            readOnly
            className="h-10 shadow-lg rounded-md bg-neutral-50 w-2/3 outline-none mt-2 p-3 text-neutral-800 font-normal"
            placeholder="Account number"
            value ={"Slay Wallet"} 
          />

        </div>
        <div className="flex justify-between items-center mt-6">
          <label className="text-lg text-neutral-800 font-normal">Branch</label>
          <input
            type="text"
            readOnly
            className="h-10 shadow-lg rounded-md bg-neutral-50 w-2/3 outline-none mt-2 p-3 text-neutral-800 font-normal"
            placeholder="Branch Name"
            value ={"Delhi"} 
          />


        </div>
          <div className= "flex justify-end mt-8">

        <button onClick= {handleclick}className="bg-gradient-to-br from-blue-500 to-blue-700 w-44 h-9 rounded-md text-neutral-100 cursor-pointer text-md ">Send Money</button>
          </div>
      </div>



  </div>
}