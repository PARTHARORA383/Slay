


import { cookies } from 'next/headers';
import { Card } from '../components/Balance';
import { SendMoney } from '../components/Sendmoney';
import { getServerSession } from "next-auth";
import { authOptions } from '../lib/actions/auth';
import { redirect } from 'next/navigation';
import { AppbarClient } from '../Appclient';




export default async function TransferMoney() {
  
const session = await getServerSession(authOptions);

if(!session){
  redirect('/Auth/signin')
}
  


const cookieStore = cookies();
const txn = cookieStore.get('txn_session');


if (!txn || !txn.value) {
 alert("transaction token is invalid")
  redirect("/Auth/signin"); 
}


  const { userId, amount, transaction_token } = JSON.parse(txn.value);

  console.log(session?.user)

  return (

    <div className="">
      <AppbarClient/>
      <div className=" grid  grid-cols-2 lg:grid-cols-5  w-full ">
        <div className=" col-span-2 lg:col-span-3 ">
          <div className="flex flex-col ">
            <div className="flex items-center gap-4 lg:gap-7 pl-8 pr-3 lg:ml-3 mt-10 ">
              <Card label="Balance" value={"₹ " + session.user.balance} />
              <Card label="Account Number" value={session.user.Account_number} />
            </div>
            <div className=" pl-8 pr-3  p-5 lg:pt-10 lg:pl-10  ">
              <SendMoney
          amount={amount}
          userId={userId}
          token={transaction_token}
          account_number={session.user.Account_number}
          CustomerId = {session.user.id}
              />
            </div>
          </div>
        </div>
        <div className="hidden lg:block lg:col-span-2">
          We are working on it
        </div>
      </div>
    </div>
  );
}
