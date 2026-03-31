/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Home, MessageCircle, Settings, User } from 'lucide-react';
import { Language } from '../types';

interface NavigationProps {
  activeTab: 'home' | 'chat' | 'settings' | 'profile';
  onTabChange: (tab: 'home' | 'chat' | 'settings' | 'profile') => void;
  lang: Language;
}

export function Navigation({ activeTab, onTabChange, lang }: NavigationProps) {
  const isRtl = lang === 'ar';

  const tabs = [
    { id: 'home', icon: Home, labelEn: 'Home', labelAr: 'الرئيسية' },
    { id: 'chat', icon: MessageCircle, labelEn: 'Chat', labelAr: 'المحادثة' },
    { id: 'profile', icon: User, labelEn: 'Profile', labelAr: 'الملف' },
    { id: 'settings', icon: Settings, labelEn: 'Settings', labelAr: 'الإعدادات' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 p-4 pb-8 bg-slate-950/80 backdrop-blur-xl border-t border-white/10">
      <div className="max-w-md mx-auto flex items-center justify-between px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as any)}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === tab.id ? 'text-blue-400' : 'text-white/40 hover:text-white/60'
            }`}
          >
            <tab.icon className={`w-6 h-6 ${activeTab === tab.id ? 'fill-current/10' : ''}`} />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              {isRtl ? tab.labelAr : tab.labelEn}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
