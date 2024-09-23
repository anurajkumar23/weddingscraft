"use client";

import React, { useEffect, useState } from "react";
import PersonalInformation from "./PersonalInformation";
import ImportantInformation from "./ImportantInformation";
import GovernmentCertificate from "./GovernmentCertificate";
import { Button } from "../ui/button";
import Step from "./Step";
import { useAuth } from "@/app/authContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "lucide-react";
// import { useRouter } from "next/navigation";

const steps = [
  { stepNumber: 1, sectionTitle: "Personal Information" },
  { stepNumber: 2, sectionTitle: "Important Information" },
  { stepNumber: 3, sectionTitle: "Government Certificate" },
];

const SellerForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  // const router = useRouter()

  useEffect(() => {
    // Check if the user data is available
    if (user) {
      if (user.draft) {
        if (user.draft.governmentInfo) {
          setCompletedSteps([3, 2, 1]);
          setCurrentStep(3);
        } else if (user.draft.importantInfo) {
          setCompletedSteps([2, 1]);
          setCurrentStep(3);
        } else if (user.draft.personalInfo) {
          setCompletedSteps([1]);
          setCurrentStep(2);
        }
      }
      setLoading(false); // Set loading to false once user data is processed
    }
  }, [user]);

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
  if (loading) {
    return (
      <div className="py-6 w-full h-full bg-gray-100 flex items-center justify-center">
        Loading...
      </div>
    ); // Show loading indicator
  }

  // Check if the current step is completed
  const isCurrentStepCompleted = completedSteps.includes(currentStep);

  async function handleSubmit() {
    try {
      const token = localStorage.getItem("jwt_token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${user._id}/sellerRequest`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data, "Important info response");
      if (response.data.message === "success") {
        toast.success("Request submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting ", error);
      toast.error("Failed to submit, please try again later.");
    }
  }

  return (
    <>
      {user.sellerRequest === "accepted" ? (
        <>
          <p>
            Now you are a verified selller. you are now allowed to post under
            seller/post
          </p>
        
        </>
      ) : (
        <div className="py-6 w-full h-full bg-gray-100 flex items-center justify-center">
          <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full">
            <div className="grid md:grid-cols-10 gap-6">
              <div className="md:col-span-3 bg-slate-100 p-6 rounded-lg shadow-inner">
                <Step
                  stepsConfig={steps.map((step) => ({
                    ...step,
                    currentStep,
                    nextStep,
                    prevStep,
                    isComplete: completedSteps.includes(step.stepNumber),
                  }))}
                />
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
                      disabled={!isCurrentStepCompleted} // Disable button if current step is not completed
                      className={`px-6 py-2 rounded-md ml-auto transition ${
                        isCurrentStepCompleted
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-300 text-gray-700 cursor-not-allowed"
                      }`}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        alert("Form Submitted!");
                        handleSubmit();
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
      )}
    </>
  );
};

export default SellerForm;
