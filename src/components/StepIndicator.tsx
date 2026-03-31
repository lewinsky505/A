/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface StepIndicatorProps {
  current: number;
  total: number;
}

export function StepIndicator({ current, total }: StepIndicatorProps) {
  return (
    <div className="flex gap-2 mb-12">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
            i + 1 <= current ? 'bg-blue-500 shadow-lg shadow-blue-500/20' : 'bg-white/10'
          }`}
        />
      ))}
    </div>
  );
}
