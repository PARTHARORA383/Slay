"use client"

import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import { useState , useEffect, use } from "react";
import { TextInput } from "@repo/ui/textinput";
import { Button } from "@repo/ui/button";
import {Alertbox} from "@repo/ui/alert"
import { createOnRampTransaction } from "../lib/actions/createOnRamptransaction.ts";
import { useRouter } from "next/navigation.js";
import {Loader} from "@repo/ui/loader"





export  const AddMoney  = ({handleclick}:any)=> {
    const [amount, setAmount] = useState("");
    const [provider, setProvider] = useState("");
    const[ details , setDetails] = useState(false);
    const[showalert , setShowAlert] = useState(false);
    const[showloader , setShowLoader] = useState(false);

    const router = useRouter();

        useEffect(()=>{
            if(amount != "" && provider != ""){
                console.log(amount , provider)
                setShowAlert(false)
                setDetails(true)
            }
        } , [amount , provider])
    

    const handleonclick = ()=>{

        try{
    
            if(details == false){
                setShowAlert(true);
            }
            else{
                setShowLoader(true);
                const transaction_token = (Math.random() * 1000).toString();
                localStorage.setItem("transaction_token" , transaction_token)

                setTimeout(() => {
                router.push('/redirecting')
                setShowLoader(false);   
            }, 2000);
                
                
                const userId = '5';
                
                
                
                const form = document.createElement('form');
                
                setTimeout(() => {
                    
                    form.method = 'POST';
                    form.action = 'http://localhost:3001/api/transfer';    
                    
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
                
                document.body.appendChild(form);
                form.submit();
                
            }, 4000);
            createOnRampTransaction(provider  , Number(amount) , transaction_token)

        }

    } catch(e){

    }
    finally{

    }
    }
    
      
    return<div className="max-w-4xl pr-7 ">

    <Card title="Add Money">
    {showloader && (
        <Loader label="Loading"/>
    )}
    {showalert && (
        <Alertbox label="Please Enter the amount and select bank provider"/>
    )}
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
            </div> 
}