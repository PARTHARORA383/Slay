import {  Card } from "../components/Balance";
import { SendMoney } from "../components/Sendmoney";

export default function (){

  return<div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen min-w-screen ">


    <div className="grid grid-cols-5  grid-rows-2 w-full h-full">
    
    <div className="col-span-3 ">
      <div className="flex flex-col">
        <div className=" flex items-center gap-7 ml-20 mt-10">


        <div>
       <Card label = "Balance" value = {1000}/>
        </div>
        <div>
       <Card label = "Balance" value = {1000}/>
        </div>
        </div>
    <div className=" ml-10  p-10">
            <SendMoney/>
      </div>
      </div>
    </div>

    <div className="col-span-2 ">
      hello
    </div>

    </div>



  


  </div>
}