/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { CheckCircle2, Sparkles, Calendar, Zap, Heart, Brain } from 'lucide-react';
import { Language, DayPlan } from '../types';
import { TRANSLATIONS } from '../constants';

interface PlanViewProps {
  plan: DayPlan[];
  lang: Language;
}

export function PlanView({ plan, lang }: PlanViewProps) {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  return (
    <div className="space-y-8 text-center" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto border-4 border-blue-400/30">
        <CheckCircle2 className="w-10 h-10 text-blue-400" />
      </div>
      
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-white">{t.onboarding.step5Title}</h2>
        <p className="text-blue-200/70">{t.onboarding.step5Desc}</p>
      </div>

      <div className="p-8 rounded-[40px] bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 text-left" dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 shadow-xl shadow-blue-500/10">
            <Sparkles className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h4 className="text-white font-bold text-lg">{isRtl ? 'رحلة الـ 7 أيام' : '7-Day Transformation'}</h4>
            <p className="text-xs text-blue-200/50 uppercase tracking-widest font-bold">{isRtl ? 'تم التخصيص لنمطك' : 'Personalized for your pattern'}</p>
          </div>
        </div>

        <div className="space-y-6">
          {plan.map((day, idx) => (
            <motion.div
              key={day.dayNumber}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="flex items-start gap-4 p-4 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all"
            >
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-sm font-bold text-blue-400 border border-blue-500/20">
                {day.dayNumber}
              </div>
              <div className="flex-1">
                <h5 className="text-white font-bold">{isRtl ? day.objectiveAr : day.objectiveEn}</h5>
                <p className="text-xs text-blue-200/50 line-clamp-1">
                  {isRtl ? day.explanationAr : day.explanationEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Zap, label: isRtl ? 'تمارين' : 'Exercises' },
          { icon: Heart, label: isRtl ? 'تأملات' : 'Reflections' },
          { icon: Brain, label: isRtl ? 'أفعال' : 'Actions' },
        ].map((item, idx) => (
          <div key={idx} className="p-4 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center gap-2">
            <item.icon className="w-5 h-5 text-blue-400" />
            <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
