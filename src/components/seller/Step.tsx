import React from "react";
import { cn } from "@/lib/utils";

type StepProps = {
  stepsConfig: {
    stepNumber: number;
    currentStep: number;
    sectionTitle: string;
    isComplete: boolean;
  }[];
};

export default function Step({ stepsConfig }: StepProps) {
  const totalSteps = stepsConfig.length;
  const completedSteps = stepsConfig.filter((step) => step.isComplete).length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  return (
    <div className="flex flex-col space-y-4">
      <div className="relative w-full h-2 bg-gray-300 rounded-full overflow-hidden mb-4">
        <div
          className="absolute left-0 top-0 h-full bg-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      {stepsConfig.map((step) => (
        <div
          key={step.stepNumber}
          className="py-2 px-2 rounded-md flex justify-start items-center"
        >
          <div
            className={cn(
              "text-sm font-bold border m-2 rounded-full z-10 w-10 h-10 flex justify-center items-center transition-colors duration-200",
              {
                "bg-green-600 text-white font-semibold": step.isComplete,
                "bg-blue-600 text-white font-semibold":
                  step.stepNumber === step.currentStep && !step.isComplete,
                "bg-[#ccc] text-black":
                  step.stepNumber !== step.currentStep && !step.isComplete,
              }
            )}
          >
            {step.isComplete ? (
              <span>&#10003;</span>
            ) : (
              step.stepNumber
            )}
          </div>
          <div className="text-xs ml-2">{step.sectionTitle}</div>
        </div>
      ))}
    </div>
  );
}
