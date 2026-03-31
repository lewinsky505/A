/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'ar';

export type EmotionalType = 'Anxious-High' | 'Anxious-Moderate' | 'Secure' | 'Mixed' | 'Unknown';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  language: Language;
  theme: 'light' | 'dark';
  onboardingCompleted: boolean;
  emotionalType: EmotionalType;
  scores: {
    anxiety: number;
    jealousy: number;
    overthinking: number;
  };
  streak: number;
  lastCheckIn?: string; // ISO date
  createdAt: string;
}

export interface QuizAnswer {
  questionId: string;
  value: number; // 1-5
}

export interface DailyTask {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  completed: boolean;
  type: 'exercise' | 'reflection' | 'action';
}

export interface DayPlan {
  dayNumber: number;
  objectiveEn: string;
  objectiveAr: string;
  explanationEn: string;
  explanationAr: string;
  tasks: DailyTask[];
  reflectionEn: string;
  reflectionAr: string;
  reflectionAnswer?: string;
  completed: boolean;
}

export interface AppState {
  user: UserProfile | null;
  loading: boolean;
  language: Language;
  currentDayPlan: DayPlan | null;
  history: DayPlan[];
}
