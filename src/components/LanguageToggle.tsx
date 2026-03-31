/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from '../types';
import { Languages } from 'lucide-react';

interface LanguageToggleProps {
  current: Language;
  onChange: (lang: Language) => void;
}

export function LanguageToggle({ current, onChange }: LanguageToggleProps) {
  return (
    <button
      onClick={() => onChange(current === 'en' ? 'ar' : 'en')}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
    >
      <Languages className="w-4 h-4" />
      <span className="text-sm font-medium">
        {current === 'en' ? 'العربية' : 'English'}
      </span>
    </button>
  );
}
