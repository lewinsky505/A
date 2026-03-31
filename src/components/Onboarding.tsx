/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, CheckCircle2, Languages, Brain, Sparkles, UserCircle } from 'lucide-react';
import { Language, QuizAnswer, EmotionalType, UserProfile } from '../types';
import { QUIZ_QUESTIONS, TRANSLATIONS } from '../constants';
import { calculateEmotionalType } from '../utils/scoring';

interface OnboardingProps {
  onComplete: (profile: Partial<UserProfile>) => void;
  initialLang: Language;
}

export function Onboarding({ onComplete, initialLang }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [lang, setLang] = useState<Language>(initialLang);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [emotionalProfile, setEmotionalProfile] = useState<{ type: EmotionalType; scores: any } | null>(null);

  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const handleNext = () => {
    if (step === 3) {
      const profile = calculateEmotionalType(answers);
      setEmotionalProfile(profile);
      setStep(4);
    } else if (step === 5) {
      onComplete({
        language: lang,
        emotionalType: emotionalProfile?.type || 'Unknown',
        scores: emotionalProfile?.scores || { anxiety: 0, jealousy: 0, overthinking: 0 },
        onboardingCompleted: true,
      });
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => {
      const filtered = prev.filter((a) => a.questionId !== questionId);
      return [...filtered, { questionId, value }];
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-8"
          >
            <div className="w-24 h-24 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto border-4 border-blue-400/30">
              <Sparkles className="w-12 h-12 text-blue-400" />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-white leading-tight">{t.welcome}</h1>
              <p className="text-xl text-blue-200/70 max-w-md mx-auto">{t.tagline}</p>
            </div>
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 text-left" dir={isRtl ? 'rtl' : 'ltr'}>
              <h3 className="text-lg font-semibold text-white mb-2">{t.onboarding.step1Title}</h3>
              <p className="text-sm text-blue-100/70">{t.onboarding.step1Desc}</p>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto border-4 border-purple-400/30">
              <Languages className="w-10 h-10 text-purple-400" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">{t.onboarding.step2Title}</h2>
              <p className="text-blue-200/70">{t.onboarding.step2Desc}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setLang('en')}
                className={`p-6 rounded-3xl border-2 transition-all ${
                  lang === 'en' ? 'bg-blue-500/20 border-blue-400 text-white' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
                }`}
              >
                <span className="text-xl font-bold">English</span>
              </button>
              <button
                onClick={() => setLang('ar')}
                className={`p-6 rounded-3xl border-2 transition-all ${
                  lang === 'ar' ? 'bg-blue-500/20 border-blue-400 text-white' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
                }`}
              >
                <span className="text-xl font-bold">العربية</span>
              </button>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-white">{t.onboarding.step3Title}</h2>
              <p className="text-blue-200/70">{t.onboarding.step3Desc}</p>
            </div>
            <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
              {QUIZ_QUESTIONS.map((q) => (
                <div key={q.id} className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4" dir={isRtl ? 'rtl' : 'ltr'}>
                  <p className="text-white font-medium">{lang === 'en' ? q.textEn : q.textAr}</p>
                  <div className="flex justify-between items-center gap-2">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        onClick={() => handleAnswer(q.id, val)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          answers.find((a) => a.questionId === q.id)?.value === val
                            ? 'bg-blue-500 text-white scale-110 shadow-lg shadow-blue-500/30'
                            : 'bg-white/10 text-white/50 hover:bg-white/20'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] text-white/30 uppercase tracking-widest">
                    <span>{isRtl ? 'أبداً' : 'Never'}</span>
                    <span>{isRtl ? 'دائماً' : 'Always'}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto border-4 border-green-400/30">
              <Brain className="w-10 h-10 text-green-400" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">{t.onboarding.step4Title}</h2>
              <p className="text-blue-200/70">{t.onboarding.step4Desc}</p>
            </div>
            <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 space-y-6">
              <div className="space-y-2">
                <span className="text-xs text-blue-400 uppercase tracking-widest font-bold">{isRtl ? 'نمطك العاطفي' : 'Your Emotional Pattern'}</span>
                <h3 className="text-2xl font-bold text-white">{t.types[emotionalProfile?.type || 'Secure']}</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(emotionalProfile?.scores || {}).map(([key, val]: [string, any]) => (
                  <div key={key} className="space-y-2">
                    <div className="text-[10px] text-white/40 uppercase font-bold">{key}</div>
                    <div className="text-xl font-bold text-white">{Math.round(val * 20)}%</div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${val * 20}%` }}
                        className="h-full bg-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto border-4 border-blue-400/30">
              <CheckCircle2 className="w-10 h-10 text-blue-400" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">{t.onboarding.step5Title}</h2>
              <p className="text-blue-200/70">{t.onboarding.step5Desc}</p>
            </div>
            <div className="p-8 rounded-[40px] bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 text-left" dir={isRtl ? 'rtl' : 'ltr'}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold">{isRtl ? 'رحلة الـ 7 أيام' : '7-Day Transformation'}</h4>
                  <p className="text-xs text-blue-200/50">{isRtl ? 'تم التخصيص لنمطك' : 'Personalized for your pattern'}</p>
                </div>
              </div>
              <ul className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-blue-100/80">
                    <div className="w-5 h-5 rounded-full bg-blue-500/30 flex items-center justify-center text-[10px] font-bold text-blue-400">
                      {i}
                    </div>
                    {isRtl ? `المرحلة ${i}: بناء الوعي والتحكم` : `Phase ${i}: Building Awareness & Control`}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full" />

      <div className="w-full max-w-lg relative z-10">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-12">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                i <= step ? 'bg-blue-500' : 'bg-white/10'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-between gap-4">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="flex-1 py-4 rounded-3xl bg-white/5 border border-white/10 text-white font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
            >
              <ChevronLeft className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
              {t.back}
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={step === 3 && answers.length < QUIZ_QUESTIONS.length}
            className={`flex-[2] py-4 rounded-3xl bg-blue-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {step === 5 ? t.finish : t.next}
            <ChevronRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
