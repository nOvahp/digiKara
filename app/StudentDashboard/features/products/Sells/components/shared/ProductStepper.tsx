import React, { useEffect, useRef } from 'react';

interface ProductStepperProps {
  currentStep: string; // 'step1' | 'step2' | ...
  onStepClick: (step: string) => void;
  maxStep?: number;
}

const STEPS = [
  { id: 'step1', label: 'اطلاعات پایه', number: '1' },
  { id: 'step2', label: 'ویژگی ها', number: '2' },
  { id: 'step3', label: 'قیمت گذاری', number: '3' },
  { id: 'step4', label: 'موجودی', number: '4' },
  { id: 'step5', label: 'دسته بندی و برچسب ها', number: '5' },
  { id: 'step6', label: 'تائید نهایی', number: '6' },
];

export function ProductStepper({ currentStep, onStepClick, maxStep = 6 }: ProductStepperProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeStepRef = useRef<HTMLDivElement>(null);

  // Auto-scroll active step to center
  useEffect(() => {
    // Small timeout to ensure layout is ready
    const timer = setTimeout(() => {
      if (activeStepRef.current) {
        activeStepRef.current.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div
      ref={scrollContainerRef}
      className="w-full px-5 py-5 border-b border-[#DFE1E7] flex items-center gap-3 overflow-x-auto no-scrollbar sticky top-0 bg-white z-40 transition-all"
      dir="rtl"
    >
      {STEPS.map((step, index) => {
        const isActive = step.id === currentStep;
        const stepNum = parseInt(step.number);
        const isDisabled = stepNum > maxStep;

        return (
          <React.Fragment key={step.id}>
            <StepItem
              ref={isActive ? activeStepRef : null}
              step={step.number}
              label={step.label}
              isActive={isActive}
              isDisabled={isDisabled}
              onClick={() => !isDisabled && onStepClick(step.id)}
            />
            {index < STEPS.length - 1 && (
              <div
                className={`w-8 border-t-2 border-dashed mx-1 shrink-0 ${
                  parseInt(STEPS[index + 1].number) > maxStep ? 'border-gray-200' : 'border-[#DFE1E7]'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

const StepItem = React.forwardRef<
  HTMLDivElement,
  {
    step: string;
    label: string;
    isActive: boolean;
    isDisabled: boolean;
    onClick?: () => void;
  }
>(({ step, label, isActive, isDisabled, onClick }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex items-center gap-2.5 flex-shrink-0 transition-all duration-200 ${
        isDisabled ? 'cursor-not-allowed opacity-50 grayscale' : 'cursor-pointer group'
      }`}
      onClick={onClick}
    >
      <span
        className={`text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide whitespace-nowrap transition-colors ${
          isActive
            ? 'text-[#0D0D12]'
            : isDisabled
              ? 'text-gray-300'
              : 'text-[#818898] group-hover:text-gray-600'
        }`}
      >
        {label}
      </span>
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold font-['PeydaFaNum'] leading-[21px] tracking-wide transition-colors ${
          isActive
            ? 'bg-[#FFD369] text-white'
            : isDisabled
              ? 'bg-gray-100 text-gray-300'
              : 'bg-[#DFE1E7] text-white group-hover:bg-gray-300'
        }`}
      >
        {step}
      </div>
    </div>
  );
});

StepItem.displayName = 'StepItem';
