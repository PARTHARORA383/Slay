"use client"
import {AnimatePresence, easeIn, motion } from 'motion/react';
import { useState } from 'react';
interface Props {
  amount : Number ,
  senderName : string,
  senderEmail : string,
  recieverEmail : string ,
  recieverName : string,
  startTime : Date
}

export const P2PTransaction_infocard = ({amount , senderName ,senderEmail , recieverName , recieverEmail , startTime}:Props)=>{

const [isSelected  , setIsSelected] = useState(true)


 
return<motion.div 


className=' relative w-screen h-screen  bg-neutral-900 bg-opacity-40  flex justify-center items-center ' >

<AnimatePresence>
{isSelected  && (

  <motion.div
  initial = {{scale : 0.8 , opacity : 0  , y : 20}}
  animate = {{scale :1 , opacity : 1 , y : 0}}
  exit = {{scale : 0.9 , opacity : 0 ,  y :20}}
  transition={{duration: 0.3,  
    ease : 'easeIn'
  }}
  className='  absolute  flex flex-col  bg-gradient-to-br from-neutral-700 to-neutral-800 w-[350px] h-[420px] rounded-md p-4 shadow-xl'>

<motion.div
className='flex flex-col '>

<div className='flex flex-col justify-start gap-1'>

<div className='text-neutral-300 text-xl'>
  Amount
</div>

<div className='text-neutral-100 text-2xl flex  items-center gap-3'>
<div className='font-medium'>₹  {amount}</div>
<div  className='w-4 h-4 text-sm font-bold p-3 bg-purple-700 rounded-full flex justify-center items-center shadow-xl'>
✓
</div>
</div>
</div>

<div className='w-full h-[2px] mt-2 bg-neutral-700'></div>


<div className='w-16 h-16 bg-purple-800 bg-opacity-20 absolute right-0 top-0 bottom-0 rounded-md shadow-lg' ></div>

<div className='w-16 h-16 bg-purple-800 bg-opacity-20 absolute left-0 bottom-0 rounded-md shadow-lg' ></div>
<div className='flex flex-col mt-4 gap-1'> 

<div className='text-neutral-100 text-md flex flex-col'> To :<span className='font-bold text-xl  flex  gap-2'>
   {recieverName}
  </span>
   </div>
<div className='text-neutral-300 text-md'>Email id : {recieverEmail} 
  <p> on Slay </p></div>

<div className='w-full h-[2px] mt-2 bg-neutral-700'></div>
<div className='text-neutral-100 text-md flex flex-col mt-4'> From :<span className='font-bold text-xl  flex  gap-2'>
   {senderName}
  </span>
   </div>
<div className='text-neutral-300 text-md'>Email id : {senderEmail} 
  <p> on Slay </p></div>
<div className='text-neutral-300 text-md mt-4 font-bold'> Paid on : {new Date(startTime).toLocaleString("en-GB", {
  day: "2-digit",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
})}  
</div>

</div>


</motion.div>



  </motion.div>
)
}

</AnimatePresence>
</motion.div>
}