/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { QuizAnswer, Language } from '../types';
import { QUIZ_QUESTIONS } from '../constants';

interface QuizProps {
  answers: QuizAnswer[];
  onAnswer: (questionId: string, value: number) => void;
  lang: Language;
}

export function Quiz({ answers, onAnswer, lang }: QuizProps) {
  const isRtl = lang === 'ar';

  return (
    <div className="space-y-8" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
        {QUIZ_QUESTIONS.map((q, idx) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4"
          >
            <p className="text-white font-medium">{lang === 'en' ? q.textEn : q.textAr}</p>
            <div className="flex justify-between items-center gap-2">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => onAnswer(q.id, val)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    answers.find((a) => a.questionId === q.id)?.value === val
                      ? 'bg-blue-500 text-white scale-110 shadow-lg shadow-blue-500/30'
                      : 'bg-white/10 text-white/50 hover:bg-white/20'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-white/30 uppercase tracking-widest font-bold">
              <span>{isRtl ? 'أبداً' : 'Never'}</span>
              <span>{isRtl ? 'دائماً' : 'Always'}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
