/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, Loader2 } from 'lucide-react';

export function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-8">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-24 h-24 rounded-[40px] bg-gradient-to-br from-blue-500 to-purple-600 p-[2px] mx-auto shadow-2xl shadow-blue-500/20"
      >
        <div className="w-full h-full rounded-[40px] bg-slate-950 flex items-center justify-center">
          <Sparkles className="w-12 h-12 text-blue-400" />
        </div>
      </motion.div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Inner Balance <span className="text-blue-400">Pro</span>
        </h2>
        <div className="flex items-center justify-center gap-2 text-blue-300/50 uppercase tracking-[0.2em] text-[10px] font-bold">
          <Loader2 className="w-3 h-3 animate-spin" />
          <span>Calibrating your coach...</span>
        </div>
      </div>
    </div>
  );
}
