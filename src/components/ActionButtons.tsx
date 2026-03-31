/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface ActionButtonsProps {
  step: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  lang: Language;
  disabled?: boolean;
}

export function ActionButtons({ step, totalSteps, onNext, onBack, lang, disabled }: ActionButtonsProps) {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  return (
    <div className="mt-12 flex items-center justify-between gap-4">
      {step > 1 && (
        <button
          onClick={onBack}
          className="flex-1 py-5 rounded-[32px] bg-white/5 border border-white/10 text-white font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
        >
          <ChevronLeft className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
          {t.back}
        </button>
      )}
      <button
        onClick={onNext}
        disabled={disabled}
        className={`flex-[2] py-5 rounded-[32px] bg-blue-600 text-white font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {step === totalSteps ? t.finish : t.next}
        <ChevronRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
}
