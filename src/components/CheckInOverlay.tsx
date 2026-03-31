/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Smile, Frown, Meh, Angry, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface CheckInOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (status: string) => void;
  lang: Language;
}

export function CheckInOverlay({ isOpen, onClose, onComplete, lang }: CheckInOverlayProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const isRtl = lang === 'ar';

  const moods = [
    { id: 'great', icon: Smile, labelEn: 'Great', labelAr: 'رائع', color: 'text-green-400', bg: 'bg-green-500/10' },
    { id: 'good', icon: Heart, labelEn: 'Good', labelAr: 'جيد', color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { id: 'okay', icon: Meh, labelEn: 'Okay', labelAr: 'عادي', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { id: 'anxious', icon: Frown, labelEn: 'Anxious', labelAr: 'قلق', color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { id: 'bad', icon: Angry, labelEn: 'Bad', labelAr: 'سيء', color: 'text-red-400', bg: 'bg-red-500/10' },
  ];

  const handleConfirm = () => {
    if (!selected) return;
    setIsSuccess(true);
    setTimeout(() => {
      onComplete(selected);
      onClose();
      setIsSuccess(false);
      setSelected(null);
    }, 1500);
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
            className="w-full max-w-md p-8 rounded-[40px] bg-white/5 border border-white/10 text-center space-y-8 relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <button onClick={onClose} className="absolute top-0 right-0 p-2 rounded-full hover:bg-white/10 text-white/40">
                    <X className="w-6 h-6" />
                  </button>

                  <div className="w-20 h-20 rounded-3xl bg-blue-500/20 flex items-center justify-center mx-auto border border-blue-500/30">
                    <Sparkles className="w-10 h-10 text-blue-400" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-white">
                      {isRtl ? 'كيف تشعر الآن؟' : 'How are you feeling?'}
                    </h2>
                    <p className="text-blue-200/50">
                      {isRtl ? 'صدقك مع نفسك هو أول خطوة للتحسن.' : 'Being honest with yourself is the first step to healing.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {moods.map((mood) => (
                      <button
                        key={mood.id}
                        onClick={() => setSelected(mood.id)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all ${
                          selected === mood.id ? `${mood.bg} scale-110` : 'hover:bg-white/5'
                        }`}
                      >
                        <mood.icon className={`w-8 h-8 ${selected === mood.id ? mood.color : 'text-white/20'}`} />
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${selected === mood.id ? 'text-white' : 'text-white/20'}`}>
                          {isRtl ? mood.labelAr : mood.labelEn}
                        </span>
                      </button>
                    ))}
                  </div>

                  <button
                    disabled={!selected}
                    onClick={handleConfirm}
                    className="w-full py-5 rounded-[32px] bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isRtl ? 'تأكيد' : 'Confirm'}
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 space-y-6"
                >
                  <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto border-4 border-green-400/30">
                    <CheckCircle2 className="w-12 h-12 text-green-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">
                      {isRtl ? 'تم التسجيل بنجاح' : 'Check-in Complete'}
                    </h3>
                    <p className="text-blue-200/50">
                      {isRtl ? 'فخور بك لاتخاذك هذه الخطوة.' : 'Proud of you for taking this step.'}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
