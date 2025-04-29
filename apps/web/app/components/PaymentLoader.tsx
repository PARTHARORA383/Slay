"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle } from "lucide-react"

export default function PaymentLoader({ amount, receiver  }: { amount: number; receiver: string  ,}) {
 

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-neutral-900 text-white">
 <div className="flex flex-col items-center justify-center h-screen text-white bg-neutral-900">
  <div className="flex space-x-2">
    <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
    <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-150"></div>
    <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-300"></div>
  </div>
  <p className="mt-4 text-lg text-gray-300">Processing your payment...</p>
</div>

    </div>
  )
}
