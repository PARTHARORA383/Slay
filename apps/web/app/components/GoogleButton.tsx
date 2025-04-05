"use Client"
import { motion } from "motion/react"

export default function GoogleButton() {
  return (
    <motion.button
    initial ={{
      scale : 0.98
    }} 
  
    className="flex items-center gap-2 px-14 py-2  border rounded-lg shadow-md hover:bg-neutral-300 text-center transition-transform duration-300">
      <svg
        className="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
      >
        <path
          fill="#4285F4"
          d="M46.04 24.62c0-1.46-.13-2.86-.37-4.2H24v8.1h12.6c-.6 3.02-2.27 5.55-4.8 7.26v6.04h7.74c4.54-4.18 7.2-10.32 7.2-17.2z"
        />
        <path
          fill="#34A853"
          d="M24 48c6.48 0 11.92-2.14 15.9-5.8l-7.74-6.04c-2.14 1.44-4.84 2.3-8.16 2.3-6.26 0-11.54-4.22-13.42-9.9H2.54v6.18C6.52 42.04 14.56 48 24 48z"
        />
        <path
          fill="#FBBC05"
          d="M10.58 28.56C9.96 26.9 9.6 25.1 9.6 23.2s.36-3.7.98-5.36V11.64H2.54C.92 15.02 0 18.94 0 23.2c0 4.26.92 8.18 2.54 11.56l8.04-6.2z"
        />
        <path
          fill="#EA4335"
          d="M24 9.52c3.54 0 6.72 1.22 9.24 3.6l6.84-6.84C35.92 2.12 30.48 0 24 0 14.56 0 6.52 5.96 2.54 11.64l8.04 6.2c1.88-5.68 7.16-9.9 13.42-9.9z"
        />
      </svg>
      <span className="text-neutral-600 font-medium "> Google</span>
    </motion.button>
  );
}
