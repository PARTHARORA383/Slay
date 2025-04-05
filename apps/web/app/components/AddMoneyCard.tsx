"use client"

import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { Button } from "@repo/ui/button";
import { createOnRampTransaction } from "../lib/actions/createOnRamptransaction.ts";





export  const AddMoney  = ({handleclick}:any)=> {
    const [amount, setAmount] = useState("");
    const [provider, setProvider] = useState("");
    const handleonclick = ()=>{
        
        const transaction_token = (Math.random() * 1000).toString();
        localStorage.setItem("transaction_token" , transaction_token)

            const userId = '5';
          
            // Create a form element
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = 'https://example-bank.com/netbanking/auth'; // Replace with the bank's actual URL
          
            // Create input elements for each parameter
            const inputs = [
              { name: 'userId', value: userId },
              { name: 'transaction_token', value: transaction_token },
              { name: 'amount', value: amount }
            ];
          
            inputs.forEach(({ name, value }) => {
              const input = document.createElement('input');
              input.type = 'hidden';
              input.name = name;
              input.value = value;
              form.appendChild(input);
            });
          
            // Append the form to the body and submit it
            document.body.appendChild(form);
            form.submit();
        




        createOnRampTransaction(provider  , Number(amount) , transaction_token)
        window.location.href = "http://localhost:3001/Dummybank/Auth";

        
    }
    
      
    return <Card title="Add Money">
    <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Enter the amount"} type={"number"} onChange={(value) => {
            setAmount(value)
        }} />
    
    <div className="mt-5 text-md">
        Bank Provider
    </div>
        <select className=" w-full h-10 rounded-md text-gray-900 p-2.5"
        onChange={(e)=>{
            setProvider(e.target.value)
        }} >
        
  <option value="" disabled selected hidden>
    Choose a payment method
  </option>

      
            <option value = "DummybankHook">Dummy Bank Server </option>
          
        </select>


        <div className="flex justify-center pt-4">
        <Button label="Add Money" handleclick={handleonclick} />
        </div>
    </div>
</Card>
}