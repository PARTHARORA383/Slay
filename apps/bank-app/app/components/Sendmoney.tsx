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
  const [confirmed , setconfirmed] = useState(false)
  


  
  
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
      setconfirmed(true);
      setTimeout(()=>{
        window.location.href = "http://localhost:3000/B&H?refresh=true"
      },2000)
      
    }
    
  }catch(e){
    
    alert("Payment failed. Please try again.");
  }
  finally{
    setLoading(false)
  }
}




  return <div className="bg-white w-full h-full  shadow-lg p-5 rounded-lg  ">
  
{loading && (
     <div className=" z-20 fixed inset-0 h-screen w-screen bg-black  opacity-80  flex justify-center items-center">
     <div className="p-5 bg-neutral-100 flex justify-center items-center rounded-lg">
      <div className="flex flex-col justify-center items-center">

     <div className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
    <div className="text-lg text-neutral-800">Wait while we process your payment</div>
     </div>
     </div>
   </div>
)}
{confirmed && (
     <div className=" z-20 fixed inset-0 h-screen w-screen bg-black  opacity-90  flex justify-center items-center">
     <div className="p-5 bg-neutral-100 flex justify-center items-center rounded-lg">
      <div className="flex flex-col justify-center items-center">

     <div className="w-12 h-12 border-4 border-green-900 rounded-full flex justify-center items-center">
      <div className="font-bold text-2xl">
      ✓️
      </div>
     </div>
    <div className="text-lg text-neutral-800">Payment Confirmed</div>
    <div className="text-md text-neutral-600">You will be redirected shortly</div>
     </div>
     </div>
   </div>
)}

      <div className=" "> 
        <h1 className="text-2xl font-medium border-b border-gray-300 p-2 ">Pay Money</h1>

        
        <div className="flex justify-between items-center mt-6">
          <label className="text-lg text-neutral-800 font-normal">Amout :</label>
          <input
            type="number"
            readOnly
            className="h-10 shadow-lg rounded-md bg-neutral-50 w-2/3 outline-none mt-2 p-3 text-neutral-800 font-semibold"
            placeholder="Enter the amount"
            value={amount} 

          />
        </div>

        <div className="flex justify-between items-center mt-6">
          <label className="text-lg text-neutral-800 font-normal">Payment From :</label>
          <input
            type="text"
            readOnly
            className="h-10 shadow-lg rounded-md bg-neutral-50 w-2/3 outline-none mt-2 p-3 text-neutral-800 font-semibold"
            placeholder="Account number"
            value ={account_number}
          />

        </div>
        <div className="flex justify-between items-center mt-6">
          <label className="text-lg text-neutral-800 font-normal">Payment To :</label>
          <input
            type="text"
            readOnly
            className="h-10 shadow-lg rounded-md bg-neutral-50 w-2/3 outline-none mt-2 p-3 text-neutral-800 font-semibold"
            placeholder="Account number"
            value ={"Slay Wallet"} 
          />

        </div>
        <div className="flex justify-between items-center mt-6">
          <label className="text-lg text-neutral-800 font-normal">Branch :</label>
          <input
            type="text"
            readOnly
            className="h-10 shadow-lg rounded-md bg-neutral-50 w-2/3 outline-none mt-2 p-3 text-neutral-800 font-semibold"
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