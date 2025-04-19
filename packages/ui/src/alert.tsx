
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
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed top-6 left-1/2 transition-transform duration-300 ease-in -translate-x-1/2 z-50"
        >
          <div className="p-4 text-sm text-red-800 rounded-lg bg-neutral-800 text-red-400 shadow-lg">
            <span className="font-medium">Alert!</span> {label}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
