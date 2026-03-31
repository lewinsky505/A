/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface EmergencyButtonProps {
  onClick: () => void;
}

export function EmergencyButton({ onClick }: EmergencyButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-red-500 text-white shadow-lg shadow-red-500/30 flex items-center justify-center border-4 border-white/20"
    >
      <AlertCircle className="w-8 h-8" />
    </motion.button>
  );
}
