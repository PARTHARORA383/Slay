
export const dynamic = 'force-dynamic';



import { cookies } from 'next/headers';
import { Card } from '../components/Balance';
import { SendMoney } from '../components/Sendmoney';
import { getServerSession } from "next-auth";
import { authOptions } from '../lib/actions/auth';
import { redirect } from 'next/navigation'; 
export default async function TransferMoney() {
  
const session = await getServerSession(authOptions);

if(!session){
  redirect('/Auth/signin')
}
  

const cookieStore = cookies();
const txn = cookieStore.get('txn_session');
console.log("Raw txn cookie:", txn?.value);

  if (!txn) {
    return <div className="text-red-500">Session expired. Please retry.</div>;
  }

  const { userId, amount, transaction_token } = JSON.parse(txn.value);

  console.log(session?.user)

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen min-w-screen ">
      <div className="grid grid-cols-5 grid-rows-2 w-full h-full">
        <div className="col-span-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-7 ml-20 mt-10">
              <Card label="Balance" value={session.user.balance} />
              <Card label="Account Number" value={session.user.Account_number} />
            </div>
            <div className="ml-10 p-10">
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
        <div className="col-span-2">hello</div>
      </div>
    </div>
  );
}
