/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { LogIn, Sparkles, ShieldCheck, Heart } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface LoginProps {
  onLogin: () => void;
  lang: Language;
}

export function Login({ onLogin, lang }: LoginProps) {
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
          <h1 className="text-5xl font-bold text-white tracking-tight leading-tight">
            Inner Balance <span className="text-blue-400">Pro</span>
          </h1>
          <p className="text-xl text-blue-200/50 max-w-xs mx-auto">
            {t.tagline}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLogin}
            className="w-full py-5 rounded-[32px] bg-white text-slate-950 font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-white/10 hover:bg-blue-50 transition-all"
          >
            <LogIn className="w-6 h-6" />
            {isRtl ? 'تسجيل الدخول باستخدام جوجل' : 'Sign in with Google'}
          </motion.button>
        </div>

        <div className="flex items-center justify-center gap-8 pt-8 border-t border-white/5">
          <div className="flex flex-col items-center gap-2 opacity-40">
            <ShieldCheck className="w-6 h-6 text-white" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-white">{isRtl ? 'آمن' : 'Secure'}</span>
          </div>
          <div className="flex flex-col items-center gap-2 opacity-40">
            <Heart className="w-6 h-6 text-white" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-white">{isRtl ? 'خاص' : 'Private'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
