/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Settings as SettingsIcon, Bell, Shield, Info, HelpCircle, ChevronRight } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface SettingsProps {
  lang: Language;
}

export function Settings({ lang }: SettingsProps) {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const sections = [
    {
      title: isRtl ? 'الإشعارات' : 'Notifications',
      items: [
        { icon: Bell, label: isRtl ? 'تذكيرات يومية' : 'Daily Reminders', value: isRtl ? 'مفعل' : 'Enabled' },
        { icon: Zap, label: isRtl ? 'تنبيهات التقدم' : 'Progress Alerts', value: isRtl ? 'مفعل' : 'Enabled' },
      ]
    },
    {
      title: isRtl ? 'الخصوصية والأمان' : 'Privacy & Security',
      items: [
        { icon: Shield, label: isRtl ? 'تشفير البيانات' : 'Data Encryption', value: isRtl ? 'نشط' : 'Active' },
        { icon: Info, label: isRtl ? 'سياسة الخصوصية' : 'Privacy Policy', value: '' },
      ]
    },
    {
      title: isRtl ? 'الدعم' : 'Support',
      items: [
        { icon: HelpCircle, label: isRtl ? 'مركز المساعدة' : 'Help Center', value: '' },
        { icon: MessageCircle, label: isRtl ? 'تواصل معنا' : 'Contact Us', value: '' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 p-6 pb-32" dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="flex items-center gap-4 mb-12 pt-8">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
          <SettingsIcon className="w-6 h-6 text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold text-white">{isRtl ? 'الإعدادات' : 'Settings'}</h1>
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
                  className={`p-6 flex items-center justify-between transition-all hover:bg-white/10 cursor-pointer ${
                    i !== section.items.length - 1 ? 'border-b border-white/5' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{item.label}</p>
                      {item.value && <p className="text-xs text-blue-300/50 font-bold uppercase tracking-widest">{item.value}</p>}
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-white/20 ${isRtl ? 'rotate-180' : ''}`} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Zap, MessageCircle } from 'lucide-react';
