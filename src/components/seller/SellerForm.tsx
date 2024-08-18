"use client";

import React, { useState } from "react";
import PersonalInformation from "./PersonalInformation";
import ImportantInformation from "./ImportantInformation";
import GovernmentCertificate from "./GovernmentCertificate";
import { Button } from "../ui/button";
import Step from "./Step";

const steps = [
  { stepNumber: 1, sectionTitle: "Personal Information" },
  { stepNumber: 2, sectionTitle: "Important Information" },
  { stepNumber: 3, sectionTitle: "Government Certificate" },
];

const SellerForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const markStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps((prev) => [...prev, step]);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInformation onComplete={() => markStepComplete(1)} />;
      case 2:
        return <ImportantInformation onComplete={() => markStepComplete(2)} />;
      case 3:
        return <GovernmentCertificate onComplete={() => markStepComplete(3)} />;
      default:
        return <PersonalInformation onComplete={() => markStepComplete(1)} />;
    }
  };

  return (
    <div className="py-6 w-full h-full bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full">
        <div className="grid md:grid-cols-10 gap-6">
          <div className="md:col-span-3 bg-slate-100 p-6 rounded-lg shadow-inner">
            <Step stepsConfig={steps.map((step) => ({
              ...step,
              currentStep,
              nextStep,
              prevStep,
              isComplete: completedSteps.includes(step.stepNumber),
            }))} />
          </div>
          <div className="md:col-span-7 p-6 flex flex-col justify-center items-center">
            <div className="w-full">{renderStep()}</div>
            <div className="flex justify-between mt-6 w-full">
              {currentStep > 1 && (
                <Button
                  onClick={prevStep}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Back
                </Button>
              )}
              {currentStep < 3 ? (
                <Button
                  onClick={nextStep}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md ml-auto hover:bg-blue-700"
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    markStepComplete(currentStep);
                    alert("Form Submitted!");
                  }}
                  className="px-6 py-3 bg-green-600 text-white rounded-md ml-auto hover:bg-green-700"
                >
                  Submit
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerForm;
