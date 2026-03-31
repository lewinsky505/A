/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Language, QuizAnswer, EmotionalType, UserProfile } from '../types';
import { QUIZ_QUESTIONS } from '../constants';
import { calculateEmotionalType } from '../utils/scoring';
import { StepIndicator } from './StepIndicator';
import { StepContent } from './StepContent';
import { Welcome } from './Welcome';
import { LanguageSelector } from './LanguageSelector';
import { Quiz } from './Quiz';
import { Analysis } from './Analysis';
import { PlanView } from './PlanView';
import { ActionButtons } from './ActionButtons';
import { SEVEN_DAY_PLAN_TEMPLATE } from '../constants';

interface OnboardingFlowProps {
  onComplete: (profile: Partial<UserProfile>) => void;
  initialLang: Language;
}

export function OnboardingFlow({ onComplete, initialLang }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [lang, setLang] = useState<Language>(initialLang);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [emotionalProfile, setEmotionalProfile] = useState<{ type: EmotionalType; scores: any } | null>(null);

  const totalSteps = 5;

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

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full" />

      <div className="w-full max-w-lg relative z-10">
        <StepIndicator current={step} total={totalSteps} />

        <StepContent step={step}>
          {step === 1 && <Welcome onStart={handleNext} lang={lang} />}
          {step === 2 && <LanguageSelector current={lang} onChange={setLang} lang={lang} />}
          {step === 3 && <Quiz answers={answers} onAnswer={handleAnswer} lang={lang} />}
          {step === 4 && emotionalProfile && <Analysis type={emotionalProfile.type} scores={emotionalProfile.scores} lang={lang} />}
          {step === 5 && <PlanView plan={SEVEN_DAY_PLAN_TEMPLATE} lang={lang} />}
        </StepContent>

        {step > 1 && (
          <ActionButtons
            step={step}
            totalSteps={totalSteps}
            onNext={handleNext}
            onBack={handleBack}
            lang={lang}
            disabled={step === 3 && answers.length < QUIZ_QUESTIONS.length}
          />
        )}
      </div>
    </div>
  );
}
