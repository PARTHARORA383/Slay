
"use client"
import { useEffect, useState } from "react";
import {motion , AnimatePresence } from 'motion/react'

export function Alertbox({ label }: { label: string }) {
  const [show, setShow] = useState(true);

 

  return (
    <>
      <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x : 100, y: 100, opacity: 0 }}
          animate={{ x: 0 , y: 0, opacity: 1 }}
          exit={{ x : 100 , y: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6  left-1/2 transition-transform duration-300 ease-in -translate-x-1/2 z-20"
        >
          <div className="p-4 text-sm rounded-lg bg-neutral-800 text-red-500 shadow-lg">
            <span className="font-medium">Alert!</span> {label}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
