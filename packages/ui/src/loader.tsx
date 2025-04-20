import React from 'react';
import { motion } from 'motion/react';

export function Loader({ label }: { label: string }) {
  return (
    <div className="fixed inset-0 z-50 bg-neutral-900 bg-opacity-70 flex items-center justify-center">
      <div className="relative w-20 h-12">
        <motion.span
          className="absolute top-0 text-xs text-purple-200"
          initial={{ letterSpacing: '1px', x: 0 }}
          animate={{
            letterSpacing: ['1px', '2px', '1px', '2px', '1px'],
            x: [0, 26, 32, 0, 0],
          }}
          transition={{
            duration: 3.5,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        >
          {label}
        </motion.span>

        <motion.div
          className="absolute bottom-0 h-4 rounded-full bg-purple-500"
          style={{ borderRadius: '9999px' }}
          initial={{ width: 16, x: 64 }}
          animate={{
            width: [16, '100%', 16, '100%', 16],
            x: [64, 0, 64, 0, 64],
          }}
          transition={{
            duration: 3.5,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        >
          <motion.div
            className="absolute h-full bg-purple-200 rounded-full"
            style={{ width: '100%' }}
            initial={{ width: 16, x: 0 }}
            animate={{
              width: [16, '80%', '100%', '80%', 16],
              x: [0, 0, 0, 15, 0],
            }}
            transition={{
              duration: 3.5,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
