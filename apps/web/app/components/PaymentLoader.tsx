"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PaymentLoader({
  amount,
  receiver,
}: {
  amount: number;
  receiver: string;
}) {
  const [isVisible, setIsVisible] = useState(true);

  

  return (
    <div className="flex flex-col items-center justify-center h-[700px] lg:h-screen  bg-neutral-900 text-white">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key="payment-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col items-center gap-6"
          >
            <motion.div className="flex gap-3 lg:gap-6 items-center">
              {/* Left circle */}
              <motion.div
                className="rounded-full border-4 border-neutral-800 w-20 h-20"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 0.95, 0.9, 0.85, 0.8, 0.75] }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 15, ease: "easeInOut" }}
              >
                <motion.div
                  className="h-full w-full bg-neutral-600 p-3 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.7, ease: "linear" }}
                >
                  <img
                    src="/image/cell-phone.png"
                    className="max-w-full max-h-full"
                  />
                </motion.div>
              </motion.div>

              {/* Dotted line with rupee animation */}
              <div className="relative w-[200px] h-2 overflow-hidden flex flex-col justify-center">
                {/* Moving dotted line */}
                <motion.div
                  className="absolute w-full h-full"
                  initial={{
                    scale: 0,
                    opacity: 0,
                    backgroundPositionX: "0%",
                  }}
                  animate={{
                    scale: 50,
                    opacity: 1,
                    backgroundPositionX: "50%",
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "linear",
                  }}
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, transparent 30%, #3f3f46 50%)",
                    backgroundSize: "40px 100%",
                  }}
                />

                {/* Rupee moving */}
                <motion.div
                  className="text-5xl text-purple-600 z-10"
                  initial={{ x: 0 }}
                  animate={{ x: "100%" }}
                  exit={{ opacity: 0 }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    ease: "linear",
                  }}
                >
                  ₹
                </motion.div>
              </div>

              {/* Right circle */}
              <motion.div
                className="rounded-full border-4 border-neutral-800 w-20 h-20"
                initial={{ scale: 0 }}
                animate={{
                  scale: [1, 1.05, 1.1, 1.15, 1.2, 1.25],
                  opacity: 1,
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 15 }}
              >
                <motion.div
                  className="h-full w-full bg-neutral-600 p-3 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "linear" }}
                >
                  <img
                    src="/image/cell-phone.png"
                    className="max-w-full max-h-full"
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Breathing gradient text */}
            <motion.div
              className="text-xl font-semibold bg-gradient-to-br from-neutral-400 to-neutral-600 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.3, ease: "easeIn" },
                backgroundPosition: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Paying  : ₹ {amount}  to {receiver}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
