import { BalanceCard } from "@/app/components/Balance.tsx";
import { P2PTransactions } from "@/app/components/P2Ptransactions.tsx";
import { TransactionList } from "@/app/components/TransactionList.tsx";

export default function Balance_History (){

  return <div className="lg:ml-[270px]">

      <div className="pt-8">
      <BalanceCard />
    </div>
    <P2PTransactions/>

  </div>
}