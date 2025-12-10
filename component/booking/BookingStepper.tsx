"use client";

type Step = "fleet" | "passengers";

interface BookingStepperProps {
  currentStep: Step;
}

export default function BookingStepper({ currentStep }: BookingStepperProps) {
  const steps = [
    { id: "fleet", label: "Fleets Details", number: 1 },
    { id: "passengers", label: "passengers Information", number: 2 },
  ];

  const getStepIndex = (step: Step) => {
    return steps.findIndex((s) => s.id === step);
  };

  const currentIndex = getStepIndex(currentStep);

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-4 w-full">
      {steps.map((step, index) => {
        const isActive = index === currentIndex;
        const isCompleted = index < currentIndex;

        return (
          <div key={step.id} className="flex items-center flex-shrink-0">
            <div className="flex items-center gap-1 sm:gap-2">
              <div
                className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-colors flex-shrink-0 ${
                  isActive || isCompleted
                    ? "bg-primary text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {isCompleted ? "✓" : step.number}
              </div>
              {/* Hide labels on mobile, show on tablet and up */}
              <span
                className={`text-xs sm:text-sm font-medium hidden sm:block ${
                  isActive ? "text-primary" : "text-gray-600"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-4 sm:w-6 md:w-12 h-0.5 mx-1 sm:mx-2 transition-colors flex-shrink-0 ${
                  isCompleted ? "bg-primary" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

