/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, X, Send, Sparkles } from 'lucide-react';
import { Language, DayPlan } from '../types';

interface ReflectionOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (answer: string) => void;
  currentPlan: DayPlan;
  lang: Language;
}

export function ReflectionOverlay({ isOpen, onClose, onComplete, currentPlan, lang }: ReflectionOverlayProps) {
  const [answer, setAnswer] = useState('');
  const isRtl = lang === 'ar';

  const handleSubmit = () => {
    if (!answer.trim()) return;
    onComplete(answer);
    setAnswer('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-6"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-md p-8 rounded-[40px] bg-white/5 border border-white/10 text-center space-y-8 relative"
          >
            <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-white/40">
              <X className="w-6 h-6" />
            </button>

            <div className="w-20 h-20 rounded-3xl bg-purple-500/20 flex items-center justify-center mx-auto border border-purple-500/30">
              <Brain className="w-10 h-10 text-purple-400" />
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">
                {isRtl ? 'تأمل اليوم' : 'Daily Reflection'}
              </h2>
              <p className="text-xl text-blue-100 font-medium leading-relaxed">
                {isRtl ? currentPlan.reflectionAr : currentPlan.reflectionEn}
              </p>
            </div>

            <div className="relative">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder={isRtl ? 'اكتب أفكارك هنا...' : 'Write your thoughts here...'}
                className="w-full h-40 bg-white/5 border border-white/10 rounded-3xl p-6 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
              />
              <div className="absolute bottom-4 right-4 flex items-center gap-2 text-[10px] text-white/20 font-bold uppercase tracking-widest">
                <Sparkles className="w-3 h-3" />
                {isRtl ? 'مساحة خاصة' : 'Private Space'}
              </div>
            </div>

            <button
              disabled={!answer.trim()}
              onClick={handleSubmit}
              className="w-full py-5 rounded-[32px] bg-purple-600 text-white font-bold text-lg hover:bg-purple-700 transition-all shadow-xl shadow-purple-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <Send className="w-5 h-5" />
              {isRtl ? 'إرسال التأمل' : 'Submit Reflection'}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
