/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, ChevronRight, Heart, Brain, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface WelcomeProps {
  onStart: () => void;
  lang: Language;
}

export function Welcome({ onStart, lang }: WelcomeProps) {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 blur-[150px] rounded-full" />

      <div className="w-full max-w-md relative z-10 text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-32 h-32 rounded-[40px] bg-gradient-to-br from-blue-500 to-purple-600 p-[2px] mx-auto shadow-2xl shadow-blue-500/20"
        >
          <div className="w-full h-full rounded-[40px] bg-slate-950 flex items-center justify-center">
            <Sparkles className="w-16 h-16 text-blue-400" />
          </div>
        </motion.div>

        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white tracking-tight leading-tight"
          >
            Inner Balance <span className="text-blue-400">Pro</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-blue-200/50 max-w-xs mx-auto"
          >
            {t.tagline}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 text-left" dir={isRtl ? 'rtl' : 'ltr'}>
          {[
            { icon: Brain, title: isRtl ? 'ذكاء عاطفي' : 'Emotional Intelligence', desc: isRtl ? 'تحليل عميق لأنماط ارتباطك.' : 'Deep analysis of your attachment patterns.' },
            { icon: Heart, title: isRtl ? 'دعم مخصص' : 'Personalized Support', desc: isRtl ? 'خطط يومية مصممة خصيصاً لك.' : 'Daily plans tailored specifically for you.' },
            { icon: ShieldCheck, title: isRtl ? 'خصوصية تامة' : 'Total Privacy', desc: isRtl ? 'بياناتك آمنة ومحفوظة محلياً.' : 'Your data is secure and kept private.' },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-3xl bg-white/5 border border-white/10"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <feature.icon className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-bold">{feature.title}</h3>
                <p className="text-xs text-blue-200/50">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="w-full py-5 rounded-[32px] bg-blue-600 text-white font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-all"
        >
          {t.getStarted}
          <ChevronRight className={`w-6 h-6 ${isRtl ? 'rotate-180' : ''}`} />
        </motion.button>
      </div>
    </div>
  );
}
