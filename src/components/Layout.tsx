/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from 'react';
import { Language } from '../types';
import { getDirection } from '../utils/i18n';

interface LayoutProps {
  children: ReactNode;
  lang: Language;
  theme: 'light' | 'dark';
}

export function Layout({ children, lang, theme }: LayoutProps) {
  const isRtl = lang === 'ar';
  const isDark = theme === 'dark';

  return (
    <div 
      className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}
      dir={getDirection(lang)}
    >
      <div className="max-w-2xl mx-auto min-h-screen relative">
        {children}
      </div>
    </div>
  );
}
