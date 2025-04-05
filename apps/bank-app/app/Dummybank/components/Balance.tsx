export const Card = (label : string , value : Number )=>{

return <div className="bg-gradient-to-br from-indigo-700  to-indigo-900 h-[160px] w-[390px] rounded-lg pt-10 p-4 shadow-lg">
  <p className="text-xl text-neutral-200"> Balance</p>
  
  <div className="text-3xl text-neutral-100 mt-2">{ "Rs " + 100000}</div>

</div>

}