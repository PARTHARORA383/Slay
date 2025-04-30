"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation.js";

export const PaymentComplete = ({
  amount,
  reciever, 
  userid
}: {
  amount: number;
  reciever: string 
  userid : string;
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter()

  return (
    <div className="flex justify-center items-center h-[700px] lg:h-screen bg-neutral-900">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-gradient-to-br from-neutral-700 to-neutral-800 rounded-2xl shadow-2xl  py-8 w-[360px] flex flex-col items-center gap-6"
          >
            {/* Circle with check animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 10 }}
              exit={{scale : 0}}
              className="bg-green-500 rounded-full w-20 h-20 flex items-center justify-center text-white shadow-lg"
            >
              <CheckCircle size={40} />
            </motion.div>

            {/* Payment Amount */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              exit={{opacity : 0 }}
              className="text-white text-3xl font-semibold"
            >
              ₹{amount}
            </motion.div>

            {/* Receiver Info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              exit={{opacity : 0 }}
              className="text-neutral-300 text-lg"
            >
              Payment To : <span className="text-white font-medium">{reciever}</span>
            </motion.div>
            <div className="flex items-center justify-between gap-8 ">

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              exit={{opacity : 0 }}
              className="text-neutral-300 text-lg  hover:bg-neutral-900 bg-neutral-800 rounded-md px-4 py-1.5 border-neutral-800 transition-transform duration-300" onClick={()=>{
                setIsVisible(false)
                window.location.reload()
              }}
              >
               <span className="text-white font-medium">Pay again</span>
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              exit={{opacity : 0 }}
              className="text-neutral-300 text-lg  hover:bg-neutral-900 bg-neutral-800 rounded-md  px-6 py-1.5 border-neutral-800 transition-transform duration-300"
              >
               <span className="text-white font-medium" 
                onClick={()=>{
                  setIsVisible(false)
                  router.push('/transfer')
                }}>Check Balance</span>
            </motion.button>
              </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
