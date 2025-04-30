

import { BalanceCard } from "@/app/components/Balance.tsx";
import { AddMoney } from "../../components/AddMoneyCard.tsx";
import { TransactionList } from "@/app/components/TransactionList.tsx";

export default  function() {

    return <div className="lg:ml-[270px] lg:mr-[20px] ">
        
        <div className=" lg:pt-10 pt-6 text-3xl lg:text-4xl text-neutral-100 text-bold ml-14 lg:ml-2">Transfer</div>
        <div className=" grid grid-cols-1 lg:grid-cols-3 lg:gap-4">
    
            <div className=" order-2 lg:order-1 col-span-3 lg:col-span-2">

            <AddMoney/>
            </div>
            <div className=" order-1 lg:order-2 col-span-3 lg:col-span-1 flex flex-col ">
                <div className="mt-10">

                <BalanceCard/>
                </div>
                <div className="hidden lg:block bg-neutral-950 bg-opacity-30  rounded-lg lg:mt-5 h-24 p-3 text-neutral-100 text-lg font-mono ">
                "𝒮𝓁𝒶𝓎 𝓂𝒶𝓀𝑒𝓈 𝓈𝑒𝓃𝒹𝒾𝓃𝑔 𝓂𝑜𝓃𝑒𝓎 𝒻𝑒𝑒𝓁 𝑒𝒻𝒻𝑜𝓇𝓉𝓁𝑒𝓈𝓈"
                </div>
            </div>
        </div>

        <div className="hidden md:block">
            <TransactionList/>
        </div>
  
    </div>
}