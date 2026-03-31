/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { TrendingUp, Calendar, CheckCircle2, Award } from 'lucide-react';
import { Language, DayPlan } from '../types';

interface ProgressTrackerProps {
  history: DayPlan[];
  lang: Language;
}

export function ProgressTracker({ history, lang }: ProgressTrackerProps) {
  const isRtl = lang === 'ar';

  const totalDays = 7;
  const completedDays = history.filter(d => d.completed).length;
  const progress = (completedDays / totalDays) * 100;

  return (
    <div className="min-h-screen bg-slate-950 p-6 pb-32" dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="flex items-center gap-4 mb-12 pt-8">
        <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-green-400" />
        </div>
        <h1 className="text-3xl font-bold text-white">{isRtl ? 'التقدم' : 'Progress'}</h1>
      </header>

      <div className="space-y-8">
        {/* Overall Progress Card */}
        <div className="p-8 rounded-[40px] bg-gradient-to-br from-green-600/20 to-blue-600/20 border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-green-400 uppercase tracking-widest">{isRtl ? 'الإجمالي' : 'Overall'}</p>
              <h3 className="text-2xl font-bold text-white">{completedDays}/{totalDays} {isRtl ? 'أيام مكتملة' : 'Days Completed'}</h3>
            </div>
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-xl font-bold text-white">
              {Math.round(progress)}%
            </div>
          </div>
          <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-green-500 to-blue-500"
            />
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest px-4">
            {isRtl ? 'رحلة الـ 7 أيام' : '7-Day Journey'}
          </h3>
          <div className="space-y-4">
            {Array.from({ length: 7 }).map((_, i) => {
              const dayNum = i + 1;
              const dayData = history.find(d => d.dayNumber === dayNum);
              const isCompleted = dayData?.completed;
              const isCurrent = dayNum === (completedDays + 1);

              return (
                <div 
                  key={dayNum}
                  className={`p-6 rounded-[32px] border flex items-center gap-6 transition-all ${
                    isCompleted ? 'bg-green-500/10 border-green-500/30' :
                    isCurrent ? 'bg-blue-500/10 border-blue-500/30' :
                    'bg-white/5 border-white/10 opacity-40'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold ${
                    isCompleted ? 'bg-green-500 text-white' :
                    isCurrent ? 'bg-blue-500 text-white' :
                    'bg-white/10 text-white/40'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : dayNum}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold text-lg ${isCompleted ? 'text-green-200' : 'text-white'}`}>
                      {isRtl ? `اليوم ${dayNum}` : `Day ${dayNum}`}
                    </h4>
                    <p className="text-xs text-white/40 font-bold uppercase tracking-widest">
                      {isCompleted ? (isRtl ? 'مكتمل' : 'Completed') : 
                       isCurrent ? (isRtl ? 'قيد التقدم' : 'In Progress') : 
                       (isRtl ? 'مغلق' : 'Locked')}
                    </p>
                  </div>
                  {isCompleted && (
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Award className="w-5 h-5 text-green-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
