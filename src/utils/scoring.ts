/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EmotionalType, QuizAnswer } from '../types';

export function calculateEmotionalType(answers: QuizAnswer[]): {
  type: EmotionalType;
  scores: { anxiety: number; jealousy: number; overthinking: number };
} {
  const scores = {
    anxiety: 0,
    jealousy: 0,
    overthinking: 0,
  };

  const counts = {
    anxiety: 0,
    jealousy: 0,
    overthinking: 0,
  };

  // Map of question IDs to categories (based on constants.ts)
  const categoryMap: Record<string, 'anxiety' | 'jealousy' | 'overthinking'> = {
    q1: 'anxiety',
    q2: 'jealousy',
    q3: 'overthinking',
    q4: 'jealousy',
    q5: 'anxiety',
    q6: 'overthinking',
    q7: 'anxiety',
    q8: 'jealousy',
  };

  answers.forEach((ans) => {
    const category = categoryMap[ans.questionId];
    if (category) {
      scores[category] += ans.value;
      counts[category]++;
    }
  });

  // Calculate averages (1-5 scale)
  const avgAnxiety = counts.anxiety > 0 ? scores.anxiety / counts.anxiety : 0;
  const avgJealousy = counts.jealousy > 0 ? scores.jealousy / counts.jealousy : 0;
  const avgOverthinking = counts.overthinking > 0 ? scores.overthinking / counts.overthinking : 0;

  const overallAvg = (avgAnxiety + avgJealousy + avgOverthinking) / 3;

  let type: EmotionalType = 'Secure';

  if (overallAvg >= 4) {
    type = 'Anxious-High';
  } else if (overallAvg >= 2.5) {
    type = 'Anxious-Moderate';
  } else if (overallAvg >= 1.5) {
    type = 'Mixed';
  } else {
    type = 'Secure';
  }

  return {
    type,
    scores: {
      anxiety: avgAnxiety,
      jealousy: avgJealousy,
      overthinking: avgOverthinking,
    },
  };
}
