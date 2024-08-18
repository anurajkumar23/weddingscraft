import React from "react";
import { cn } from "@/lib/utils";

type StepProps = {
  stepsConfig: {
    stepNumber: number;
    currentStep: number;
    sectionTitle: string;
    isComplete: boolean;
    nextStep: () => void
    prevStep: () => void
  }[];
};

export default function Step({ stepsConfig }: StepProps) {
  return (
    <div className="relative flex flex-col items-start space-y-8">
      {stepsConfig.map((step, index) => (
        <div key={step.stepNumber} className="relative flex items-center">
          {/* Step circle */}
          <div
            className={cn(
              "text-sm font-bold border rounded-full z-10 w-10 h-10 flex justify-center items-center transition-colors duration-200",
              {
                "bg-green-600 text-white font-semibold": step.isComplete,
                "bg-blue-600 text-white font-semibold":
                  step.stepNumber === step.currentStep && !step.isComplete,
                "bg-[#ccc] text-black":
                  step.stepNumber !== step.currentStep && !step.isComplete,
              }
            )}
          >
            {step.isComplete ? <span>&#10003;</span> : step.stepNumber}
          </div>

          {/* Connecting line */}
          {index < stepsConfig.length - 1 && (
            <div className="absolute left-[1.125rem] bg-slate-300 top-full w-[2px] h-full z-0">
              <div
                className={cn(
                  "h-full bg-green-600 transition-all duration-500 ease-in-out",
                  {
                    "scale-y-100 origin-top": 
                      stepsConfig[index + 1].stepNumber <= step.currentStep ||
                      stepsConfig[index + 1].isComplete,
                    "scale-y-0 origin-top": 
                      stepsConfig[index + 1].stepNumber > step.currentStep &&
                      !stepsConfig[index + 1].isComplete,
                  }
                )}
              ></div>
            </div>
          )}

          {/* Section title */}
          <div className="ml-4 text-xs">{step.sectionTitle}</div>
        </div>
      ))}
    </div>
  );
}
