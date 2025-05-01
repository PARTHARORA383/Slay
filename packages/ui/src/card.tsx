"use client"

import { JSX, useState } from "react";
import { motion } from "motion/react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {

  const [istyping , setIsTyping]  = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0  , boxShadow: "0px 4px 10px rgba(139, 92, 246, 0.2)"}}

      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative  bg-gradient-to-br from-neutral-800 to-neutral-900  rounded-2xl shadow-lg border border-neutral-800 border-[0.5px] min-h-full  " 
      onFocus={()=>setIsTyping(true)}
      onBlur={()=>setIsTyping(false)}>
        
    
      <div className="mt-3 text-neutral-300">{children}</div>
    </motion.div>
  );
}
