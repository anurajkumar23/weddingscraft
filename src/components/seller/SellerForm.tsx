"use client";

import React, { useState } from "react";
import PersonalInformation from "./PersonalInformation";
import ImportantInformation from "./ImportantInformation";
import GovernmentCertificate from "./GovernmentCertificate";
import { Button } from "../ui/button";

const SellerForm = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <PersonalInformation />;
      case 2:
        return <ImportantInformation />;
      case 3:
        return <GovernmentCertificate />;
      default:
        return <PersonalInformation />;
    }
  };

  return (
    <div className="py-6 w-full h-full bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full">
        <div className="grid md:grid-cols-10 gap-6">
          <div className="md:col-span-3 bg-slate-100 p-6 rounded-lg shadow-inner">
            <div className="flex flex-col space-y-4">
              <div className={`py-2 px-4 rounded-md ${step === 1 ? 'bg-blue-100 text-blue-700 font-semibold' : 'bg-gray-200 text-gray-700'}`}>
                Step 1: Personal Information
              </div>
              <div className={`py-2 px-4 rounded-md ${step === 2 ? 'bg-blue-100 text-blue-700 font-semibold' : 'bg-gray-200 text-gray-700'}`}>
                Step 2: Important Information
              </div>
              <div className={`py-2 px-4 rounded-md ${step === 3 ? 'bg-blue-100 text-blue-700 font-semibold' : 'bg-gray-200 text-gray-700'}`}>
                Step 3: Government Certificate
              </div>
            </div>
          </div>
          <div className="md:col-span-7 p-6 flex flex-col justify-center items-center">
            <div className="w-full">{renderStep()}</div>
            <div className="flex justify-between mt- w-full">
              {step > 1 && (
                <Button
                  onClick={prevStep}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:text-white"
                >
                  Back
                </Button>
              )}
              {step < 3 ? (
                <Button
                  onClick={nextStep}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md ml-auto"
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={() => alert("Form Submitted!")}
                  className="px-6 py-3 bg-green-600 text-white rounded-md ml-auto"
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
