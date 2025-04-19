

import { AddMoney } from "../../components/AddMoneyCard.tsx";

export default  function() {
   


    return <div className="w-screen">
        <div className="text-4xl text-neutral-100 text-bold mt-14">Transfer</div>
        <div className="mt-10 grid grid-cols-3">
            <div className=" col-span-3 lg:col-span-2">

            <AddMoney/>
            </div>
            <div className="col-span-1">
                hello
            </div>
        </div>
  
    </div>
}