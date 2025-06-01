"use client";

import { BalanceCard } from "@/app/components/Balance.tsx";
import { AddMoney } from "../../components/AddMoneyCard.tsx";
import { TransactionList } from "@/app/components/TransactionList.tsx";
import { NetbankingSkeleton } from "@/app/components/NetbankingSkeleton.tsx";
// import the skeleton
import { useSession } from "next-auth/react"; // or however you manage loading state

export default function AddMoneyPage() {
  const { status } = useSession(); // or any loading flag you're using

  if (status === "loading") {
    return <NetbankingSkeleton />;
  }

  return (
    <div className="lg:ml-[270px] lg:mr-[20px]">
      <div className="flex flex-col gap-1">
        <div className="lg:pt-10 pt-6 text-2xl lg:text-3xl text-neutral-100 font-semibold ml-14 lg:ml-2">
          Add Money
        </div>
        <div className="text-md lg:text-lg text-neutral-400 font-medium ml-14 lg:ml-2">
          Add Money to your slay wallet
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-4">
        <div className="order-2 lg:order-1 col-span-3 lg:col-span-3">
          <AddMoney />
        </div>

        <div className="order-1 lg:order-2 col-span-3 lg:col-span-2 flex flex-col">
          <div className="lg:mt-10">
            <BalanceCard />
          </div>
          <div className="hidden lg:block bg-neutral-950 bg-opacity-30 rounded-lg lg:mt-5 h-24 p-3 text-neutral-100 text-lg font-mono">
            "𝒮𝓁𝒶𝓎 𝓂𝒶𝓀𝑒𝓈 𝓈𝑒𝓃𝒹𝒾𝓃𝑔 𝓂𝑜𝓃𝑒𝓎 𝒻𝑒𝑒𝓁 𝑒𝒻𝒻𝑜𝓇𝓉𝓁𝑒𝓈𝓈"
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <TransactionList />
      </div>
    </div>
  );
}
