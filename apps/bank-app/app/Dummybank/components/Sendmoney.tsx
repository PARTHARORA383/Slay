"use client"
import axios from "axios"

interface prop {
  amount : Number,
  account_number : string ,
  userid : string ,
  token : string
}

export const SendMoney = ({amount , account_number , userid , token }:prop)=>{

  const handleclick = async ()=>{

    const response = await axios.post("http://localhost:5000/bankWebhook" ,{
      userid ,
      token ,
      amount
    })


    

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