import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  number: number;
  title: string;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
}

export default function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  return (
    <div className="relative">
      <div className="absolute top-5 w-full h-0.5 bg-gray-200">
        <div
          className="h-full bg-green-600 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>

      <div className="relative flex justify-between">
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex flex-col items-center"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                step.number < currentStep
                  ? 'bg-green-600 border-green-600 text-white'
                  : step.number === currentStep
                  ? 'border-green-600 text-green-600 bg-white'
                  : 'border-gray-300 text-gray-300 bg-white'
              }`}
            >
              {step.number < currentStep ? (
                <Check className="w-6 h-6" />
              ) : (
                step.number
              )}
            </div>
            <span
              className={`mt-2 text-sm ${
                step.number <= currentStep ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}