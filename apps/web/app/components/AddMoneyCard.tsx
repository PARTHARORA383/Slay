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
import { useSession } from "next-auth/react"





export  const AddMoney  = ({handleclick}:any)=> {
    const { data: session, status } = useSession()
    const [amount, setAmount] = useState("");
    const [provider, setProvider] = useState("");
    const[ details , setDetails] = useState(false);
    const[showalert , setShowAlert] = useState(false);
    const[showloader , setShowLoader] = useState(false);
    const [id , setId] = useState("")
    const router = useRouter();

        useEffect(()=>{
            if(amount != "" && provider != ""){
                console.log(amount , provider)
                setShowAlert(false)
                setDetails(true)
            }
        } , [amount , provider])


        useEffect(()=>{
            if(session?.user){

                setId(session?.user.id);
                console.log(" This is the user id "+session.user)
            }

        },[session?.user])
        

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
                
            
            const form = document.createElement('form');
            const url = process.env.NEXT_PUBLIC_BANK_URL

            console.log(url)
            setTimeout(() => {
                
                form.method = 'POST';
                    form.action = `${url}/api/transfer`;    
                    
                    const inputs = [
                    { name: 'userId', value: id },
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
            console.log("hello")
            
            createOnRampTransaction(provider  , Number(amount) , transaction_token , Number(id))
  
        }

    } catch(e){

    }
    }
    
      
    return<div className=" max-w-screen p-5 lg:p-0 lg:max-w-4xl  lg:mt-10 z-10">
    <Card title=" ">

    {showloader && (
        <Loader label="Loading"/>
    )}
    {showalert && (
        <Alertbox label="Please Enter the amount and select bank provider"/>
    )}
    <div className="w-full px-6 py-6 lg lg:p-6">
        <TextInput label={"Amount"} placeholder={"Enter the amount"} type={"number"} onChange={(value) => {
            setAmount(value)
        }} />
    
    <div className="mt-5 text-md ">
        Bank Provider
    </div>
        <select className="w-full h-10 rounded-md text-gray-900 p-2.5 "
        onChange={(e)=>{
            setProvider(e.target.value)
        }} >
        
        <option value="" disabled selected hidden>
        Choose a payment method
        </option>

      
            <option value = "DummybankHook">Dummy Bank Server </option>
          
        </select>


        <div className="flex justify-center pt-8">
        <Button label="Add Money" handleclick={handleonclick} />
        </div>
    </div>
</Card>
            </div> 
}