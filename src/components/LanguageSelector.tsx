/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Languages } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface LanguageSelectorProps {
  current: Language;
  onChange: (lang: Language) => void;
  lang: Language;
}

export function LanguageSelector({ current, onChange, lang }: LanguageSelectorProps) {
  const t = TRANSLATIONS[lang];

  return (
    <div className="space-y-8 text-center">
      <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto border-4 border-purple-400/30">
        <Languages className="w-10 h-10 text-purple-400" />
      </div>
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-white">{t.onboarding.step2Title}</h2>
        <p className="text-blue-200/70">{t.onboarding.step2Desc}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onChange('en')}
          className={`p-8 rounded-[40px] border-2 transition-all ${
            current === 'en' ? 'bg-blue-500/20 border-blue-400 text-white' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
          }`}
        >
          <span className="text-2xl font-bold">English</span>
        </button>
        <button
          onClick={() => onChange('ar')}
          className={`p-8 rounded-[40px] border-2 transition-all ${
            current === 'ar' ? 'bg-blue-500/20 border-blue-400 text-white' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
          }`}
        >
          <span className="text-2xl font-bold">العربية</span>
        </button>
      </div>
    </div>
  );
}
