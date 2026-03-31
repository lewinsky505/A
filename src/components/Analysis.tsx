/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Brain, Sparkles, TrendingUp, Shield, Heart, Zap } from 'lucide-react';
import { Language, EmotionalType } from '../types';
import { TRANSLATIONS } from '../constants';

interface AnalysisProps {
  type: EmotionalType;
  scores: { anxiety: number; jealousy: number; overthinking: number };
  lang: Language;
}

export function Analysis({ type, scores, lang }: AnalysisProps) {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const insights = [
    {
      icon: Heart,
      title: isRtl ? 'محفزات القلق' : 'Anxiety Triggers',
      desc: isRtl ? 'تميل إلى الشعور بعدم الأمان عندما يتأخر الرد.' : 'You tend to feel insecure when responses are delayed.',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10'
    },
    {
      icon: Shield,
      title: isRtl ? 'سلوك الغيرة' : 'Jealousy Patterns',
      desc: isRtl ? 'التحقق من النشاط هو وسيلة للبحث عن الأمان.' : 'Checking activity is a way to seek safety.',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10'
    },
    {
      icon: Zap,
      title: isRtl ? 'حلقات التفكير' : 'Overthinking Loops',
      desc: isRtl ? 'عقلك يبحث عن معانٍ خفية لتجنب المفاجآت.' : 'Your mind searches for hidden meanings to avoid surprises.',
      color: 'text-orange-400',
      bg: 'bg-orange-500/10'
    }
  ];

  return (
    <div className="space-y-8 text-center" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto border-4 border-green-400/30">
        <Brain className="w-10 h-10 text-green-400" />
      </div>
      
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-white">{t.onboarding.step4Title}</h2>
        <p className="text-blue-200/70">{t.onboarding.step4Desc}</p>
      </div>

      <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 space-y-8">
        <div className="space-y-2">
          <span className="text-xs text-blue-400 uppercase tracking-widest font-bold">{isRtl ? 'نمطك العاطفي' : 'Your Emotional Pattern'}</span>
          <h3 className="text-2xl font-bold text-white">{t.types[type]}</h3>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {Object.entries(scores).map(([key, val]) => (
            <div key={key} className="space-y-2">
              <div className="text-[10px] text-white/40 uppercase font-bold">{key}</div>
              <div className="text-xl font-bold text-white">{Math.round(val * 20)}%</div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${val * 20}%` }}
                  className="h-full bg-blue-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 text-left">
        <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest px-4">
          {isRtl ? 'رؤى مخصصة' : 'Personalized Insights'}
        </h3>
        <div className="space-y-4">
          {insights.map((insight, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-2xl ${insight.bg} flex items-center justify-center border border-white/5`}>
                <insight.icon className={`w-6 h-6 ${insight.color}`} />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-bold">{insight.title}</h4>
                <p className="text-xs text-blue-200/50">{insight.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
