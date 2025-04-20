

import { BalanceCard } from "@/app/components/Balance.tsx";
import { AddMoney } from "../../components/AddMoneyCard.tsx";
import { TransactionList } from "@/app/components/TransactionList.tsx";

export default  function() {
   


    return <div className="">
        <div className="text-4xl text-neutral-100 text-bold mt-14">Transfer</div>
        <div className="mt-10 grid grid-cols-3">
            <div className="col-span-2">

            <AddMoney/>
            </div>
            <div className="col-span-1 flex flex-col">
                <div>

                <BalanceCard amount={10000} locked={2000}/>
                </div>
                <div className="bg-neutral-950 bg-opacity-30  rounded-lg mt-5 h-24 p-3 text-neutral-100 text-lg font-mono">
                "𝒮𝓁𝒶𝓎 𝓂𝒶𝓀𝑒𝓈 𝓈𝑒𝓃𝒹𝒾𝓃𝑔 𝓂𝑜𝓃𝑒𝓎 𝒻𝑒𝑒𝓁 𝑒𝒻𝒻𝑜𝓇𝓉𝓁𝑒𝓈𝓈"
                </div>
            </div>
        </div>

        <div className="">
            <TransactionList/>
        </div>
  
    </div>
}