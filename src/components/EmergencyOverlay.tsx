/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, Wind, Eye, Brain, ListChecks } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface EmergencyOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export function EmergencyOverlay({ isOpen, onClose, lang }: EmergencyOverlayProps) {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const steps = [
    {
      icon: Wind,
      title: t.emergency.breathing,
      content: (
        <div className="flex flex-col items-center justify-center gap-8 py-12">
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-32 h-32 rounded-full bg-blue-500/30 border-4 border-blue-400 flex items-center justify-center"
          >
            <div className="w-16 h-16 rounded-full bg-blue-400/50" />
          </motion.div>
          <p className="text-xl font-medium text-blue-100">{isRtl ? 'شهيق... زفير...' : 'Inhale... Exhale...'}</p>
        </div>
      )
    },
    {
      icon: Eye,
      title: t.emergency.grounding,
      content: (
        <div className="space-y-4 py-6">
          <p className="text-lg text-blue-100">{isRtl ? 'حدد 5 أشياء يمكنك رؤيتها، 4 أشياء يمكنك لمسها، 3 أشياء يمكنك سماعها، 2 شيء يمكنك شمه، و1 شيء يمكنك تذوقه.' : 'Identify 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.'}</p>
        </div>
      )
    },
    {
      icon: Brain,
      title: t.emergency.reframe,
      content: (
        <div className="space-y-4 py-6">
          <p className="text-lg text-blue-100 italic">"{isRtl ? 'هذا مجرد شعور، وليس حقيقة. أنا آمن في هذه اللحظة.' : 'This is just a feeling, not a fact. I am safe in this moment.'}"</p>
          <p className="text-sm text-blue-200">{isRtl ? 'تذكر: مشاعرك هي ردود فعل قديمة، وليست تنبؤات بالمستقبل.' : 'Remember: Your feelings are old reactions, not predictions of the future.'}</p>
        </div>
      )
    },
    {
      icon: ListChecks,
      title: t.emergency.interrupt,
      content: (
        <div className="space-y-2 py-6">
          <ul className="list-disc list-inside text-blue-100 space-y-2">
            <li>{isRtl ? 'اشرب كوباً من الماء البارد' : 'Drink a glass of cold water'}</li>
            <li>{isRtl ? 'قم بالمشي لمدة 5 دقائق' : 'Take a 5-minute walk'}</li>
            <li>{isRtl ? 'اتصل بصديق (ليس شريكك)' : 'Call a friend (not your partner)'}</li>
            <li>{isRtl ? 'قم بمهارة يدوية سريعة' : 'Do a quick manual task'}</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl p-6 overflow-y-auto"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <Wind className="w-8 h-8 text-blue-400" />
                {t.emergency.title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-8 pb-12">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-3xl bg-white/5 border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <step.icon className="w-6 h-6 text-blue-400" />
                    <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  </div>
                  {step.content}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
