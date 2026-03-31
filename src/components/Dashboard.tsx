/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Calendar, CheckCircle2, ChevronRight, Flame, Heart, MessageCircle, MoreHorizontal, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { Language, UserProfile, DayPlan } from '../types';
import { TRANSLATIONS } from '../constants';

interface DashboardProps {
  user: UserProfile;
  currentPlan: DayPlan;
  lang: Language;
  onTaskToggle: (taskId: string) => void;
  onOpenChat: () => void;
}

export function Dashboard({ user, currentPlan, lang, onTaskToggle, onOpenChat }: DashboardProps) {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const completedTasks = currentPlan.tasks.filter(t => t.completed).length;
  const totalTasks = currentPlan.tasks.length;
  const progress = (completedTasks / totalTasks) * 100;

  return (
    <div className="min-h-screen bg-slate-950 p-6 pb-32 overflow-x-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-[2px]">
            <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center overflow-hidden">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
              ) : (
                <Sparkles className="w-6 h-6 text-blue-400" />
              )}
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white leading-tight">
              {isRtl ? `أهلاً، ${user.displayName.split(' ')[0]}` : `Hello, ${user.displayName.split(' ')[0]}`}
            </h1>
            <p className="text-sm text-blue-300/60 font-medium">
              {isRtl ? 'جاهز لرحلة اليوم؟' : 'Ready for today\'s journey?'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400">
            <Flame className="w-4 h-4 fill-current" />
            <span className="text-sm font-bold">{user.streak}</span>
          </div>
        </div>
      </header>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Today's Focus Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-[40px] bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 relative overflow-hidden group shadow-2xl shadow-blue-500/10"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Zap className="w-24 h-24 text-blue-400" />
          </div>
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                {isRtl ? `اليوم ${currentPlan.dayNumber}` : `Day ${currentPlan.dayNumber}`}
              </span>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">
                {isRtl ? currentPlan.objectiveAr : currentPlan.objectiveEn}
              </h2>
              <p className="text-sm text-blue-100/70 leading-relaxed">
                {isRtl ? currentPlan.explanationAr : currentPlan.explanationEn}
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-white/40 uppercase tracking-widest">
                <span>{t.dashboard.progress}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Emotional Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-8 rounded-[40px] bg-white/5 border border-white/10 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-green-500/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-white">{t.dashboard.status}</h3>
            </div>
            <button className="p-2 rounded-full hover:bg-white/10 text-white/40">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-3xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <Heart className="w-8 h-8 text-blue-400 fill-current" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{t.types[user.emotionalType]}</p>
                <p className="text-xs text-blue-300/50 uppercase font-bold tracking-widest">
                  {isRtl ? 'النمط الحالي' : 'Current Pattern'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(user.scores).map(([key, val]) => (
                <div key={key} className="text-center p-3 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-[10px] text-white/30 uppercase font-bold mb-1">{key}</p>
                  <p className="text-lg font-bold text-white">{Math.round(val * 20)}%</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tasks Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-blue-400" />
            {isRtl ? 'مهام اليوم' : 'Today\'s Tasks'}
          </h3>
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
            {completedTasks}/{totalTasks} {isRtl ? 'مكتمل' : 'Completed'}
          </span>
        </div>
        <div className="space-y-4">
          {currentPlan.tasks.map((task, idx) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onTaskToggle(task.id)}
              className={`p-6 rounded-3xl border transition-all cursor-pointer flex items-center gap-6 ${
                task.completed
                  ? 'bg-blue-500/10 border-blue-500/30 opacity-70'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                task.completed ? 'bg-blue-500 border-blue-500 text-white' : 'border-white/20'
              }`}>
                {task.completed && <CheckCircle2 className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <h4 className={`font-bold text-lg ${task.completed ? 'text-blue-200 line-through' : 'text-white'}`}>
                  {isRtl ? task.titleAr : task.titleEn}
                </h4>
                <p className="text-sm text-blue-100/50">
                  {isRtl ? task.descriptionAr : task.descriptionEn}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                task.type === 'exercise' ? 'bg-purple-500/20 text-purple-400' :
                task.type === 'action' ? 'bg-orange-500/20 text-orange-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                {task.type}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Floating Chat Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onOpenChat}
        className="fixed bottom-24 left-6 z-40 px-6 py-4 rounded-full bg-blue-600 text-white shadow-xl shadow-blue-600/30 flex items-center gap-3 font-bold border border-white/20"
      >
        <MessageCircle className="w-5 h-5" />
        {t.dashboard.chat}
      </motion.button>
    </div>
  );
}
