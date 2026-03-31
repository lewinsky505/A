/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { User, Mail, Shield, LogOut, Trash2, Globe, Moon, Sun } from 'lucide-react';
import { Language, UserProfile } from '../types';
import { TRANSLATIONS } from '../constants';

interface ProfileProps {
  user: UserProfile;
  lang: Language;
  onLogout: () => void;
  onDeleteAccount: () => void;
  onLanguageToggle: () => void;
  onThemeToggle: () => void;
}

export function Profile({ user, lang, onLogout, onDeleteAccount, onLanguageToggle, onThemeToggle }: ProfileProps) {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const sections = [
    {
      title: isRtl ? 'الحساب' : 'Account',
      items: [
        { icon: User, label: isRtl ? 'الاسم' : 'Name', value: user.displayName },
        { icon: Mail, label: isRtl ? 'البريد الإلكتروني' : 'Email', value: user.email },
      ]
    },
    {
      title: isRtl ? 'التفضيلات' : 'Preferences',
      items: [
        { 
          icon: Globe, 
          label: isRtl ? 'اللغة' : 'Language', 
          value: lang === 'en' ? 'English' : 'العربية',
          action: onLanguageToggle
        },
        { 
          icon: user.theme === 'light' ? Moon : Sun, 
          label: isRtl ? 'المظهر' : 'Theme', 
          value: user.theme === 'light' ? (isRtl ? 'فاتح' : 'Light') : (isRtl ? 'داكن' : 'Dark'),
          action: onThemeToggle
        },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 p-6 pb-32" dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="text-center mb-12 pt-8">
        <div className="w-24 h-24 rounded-[40px] bg-gradient-to-br from-blue-500 to-purple-600 p-[2px] mx-auto mb-6 shadow-2xl shadow-blue-500/20">
          <div className="w-full h-full rounded-[40px] bg-slate-950 flex items-center justify-center overflow-hidden">
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-blue-400" />
            )}
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">{user.displayName}</h1>
        <p className="text-blue-300/50 font-medium uppercase tracking-widest text-xs">
          {t.types[user.emotionalType]}
        </p>
      </header>

      <div className="space-y-8">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest px-4">
              {section.title}
            </h3>
            <div className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden">
              {section.items.map((item, i) => (
                <div 
                  key={i} 
                  onClick={item.action}
                  className={`p-6 flex items-center justify-between transition-all ${
                    item.action ? 'cursor-pointer hover:bg-white/10' : ''
                  } ${i !== section.items.length - 1 ? 'border-b border-white/5' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 font-bold uppercase tracking-widest">{item.label}</p>
                      <p className="text-white font-medium">{item.value}</p>
                    </div>
                  </div>
                  {item.action && (
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                      <Globe className={`w-4 h-4 text-white/20 ${isRtl ? 'rotate-180' : ''}`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="space-y-4 pt-8">
          <button
            onClick={onLogout}
            className="w-full py-5 rounded-[32px] bg-white/5 border border-white/10 text-white font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
          >
            <LogOut className="w-5 h-5 text-blue-400" />
            {isRtl ? 'تسجيل الخروج' : 'Log Out'}
          </button>
          <button
            onClick={onDeleteAccount}
            className="w-full py-5 rounded-[32px] bg-red-500/10 border border-red-500/20 text-red-500 font-bold flex items-center justify-center gap-3 hover:bg-red-500/20 transition-all"
          >
            <Trash2 className="w-5 h-5" />
            {isRtl ? 'حذف الحساب' : 'Delete Account'}
          </button>
        </div>
      </div>
    </div>
  );
}
