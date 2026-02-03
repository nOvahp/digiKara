"use client";

import React, { useState } from "react";
import { 
  ChevronLeft,
  ChevronRight,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { useAuth } from "@/app/providers/AuthProvider";
import { toast } from "sonner"; 
import { Button } from "@/components/ui/button";

interface LoginViewProps {
  onNext?: () => void;
  onBack?: () => void;
}

interface FormState {
  productionExperience: string | null;
  productionField: string[];
  salesExperience: string | null;
  salesField: string[];
  businessCourse: string | null;
}

export function LoginView7({ onNext, onBack }: LoginViewProps) {
  const { saveStudentData } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const [formState, setFormState] = useState<FormState>({
    productionExperience: null,
    productionField: [],
    salesExperience: null,
    salesField: [],
    businessCourse: null,
  });

  const fieldOptions = [
    "تولید محصولات هنری",
    "تولید صنایع دستی",
    "تولید محصولات کشاورزی",
    "تولید محصولات صنعتی",
    "تولید محصولات شیمیایی",
    "ارایه خدمات کامپیوتری ، وب ، اپلیکیشن، هوش مصنوعی",
  ];

  // --- Handlers ---
  const handleProductionExperience = (value: string) => {
    setFormState((prev) => ({ ...prev, productionExperience: value, productionField: [] }));
  };

  const handleProductionField = (field: string) => {
    setFormState((prev) => ({
      ...prev,
      productionField: prev.productionField.includes(field)
        ? prev.productionField.filter((f) => f !== field)
        : [...prev.productionField, field],
    }));
  };

  const handleSalesExperience = (value: string) => {
    setFormState((prev) => ({ ...prev, salesExperience: value, salesField: [] }));
  };

  const handleSalesField = (field: string) => {
    setFormState((prev) => ({
      ...prev,
      salesField: prev.salesField.includes(field)
        ? prev.salesField.filter((f) => f !== field)
        : [...prev.salesField, field],
    }));
  };

  const handleBusinessCourse = (value: string) => {
    setFormState((prev) => ({ ...prev, businessCourse: value }));
  };

  // --- Validation ---
  const isStep1Valid = formState.productionExperience && (formState.productionExperience === "نداشته ام" || formState.productionField.length > 0);
  const isStep2Valid = formState.salesExperience && (formState.salesExperience === "نداشته ام" || formState.salesField.length > 0);
  const isStep3Valid = !!formState.businessCourse;

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1: return isStep1Valid;
      case 2: return isStep2Valid;
      case 3: return isStep3Valid;
      default: return false;
    }
  };

  // --- Navigation ---
  const handleNext = async () => {
    if (!isCurrentStepValid()) return;

    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      await handleSubmit();
    }
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else if (onBack) {
      onBack();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const metaData = {
        production_experience: formState.productionExperience,
        production_fields: formState.productionField,
        sales_experience: formState.salesExperience,
        sales_fields: formState.salesField,
      };

      const payload = {
        meta: JSON.stringify(metaData),
        training_course: formState.businessCourse === "بلی"
      };

      const result = await saveStudentData(payload);

      if (result.success) {
        if (onNext) onNext();
      } else {
        toast.error(result.message || "خطا در ارسال اطلاعات");
      }
    } catch (error) {
       console.error("Submission error:", error);
       toast.error("خطای غیرمنتظره");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Render Steps (Refactored for new UI) ---
  const renderOptions = (
      title: string, 
      subtitle: string, 
      selectedValue: string | null, 
      onSelect: (val: string) => void,
      options = ["داشته ام", "نداشته ام"]
  ) => (
      <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 fade-in duration-300">
         <div className="text-right space-y-2">
            <h3 className="text-[#393E46] font-bold text-lg">{title}</h3>
            <p className="text-[#9CA3AF] text-sm leading-relaxed">{subtitle}</p>
         </div>

         <div className="flex flex-col gap-3">
            {options.map((option) => {
                const isSelected = selectedValue === option;
                return (
                    <div
                        key={option}
                        onClick={() => onSelect(option)}
                        className={`relative p-4 rounded-2xl cursor-pointer border-2 transition-all duration-200 flex items-center justify-between group ${
                            isSelected 
                            ? "border-[#FDD00A] bg-[#FFFBEB]" 
                            : "border-transparent bg-[#F9FAFB] hover:bg-[#F3F4F6]"
                        }`}
                    >
                        <span className={`font-bold ${isSelected ? "text-[#393E46]" : "text-[#6C7278]"}`}>
                            {option}
                        </span>
                        
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected ? "border-[#FDD00A] bg-[#FDD00A]" : "border-[#D1D5DB] bg-white group-hover:border-gray-400"
                        }`}>
                            {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                        </div>
                    </div>
                )
            })}
         </div>
      </div>
  );

  const renderMultiSelect = (
      selectedFields: string[], 
      onToggle: (field: string) => void
  ) => (
    <div className="mt-8 pt-8 border-t border-gray-100 animate-in slide-in-from-bottom-4 fade-in duration-500">
        <p className="text-[#393E46] text-sm font-bold mb-4 text-right">زمینه فعالیت خود را انتخاب کنید</p>
        <div className="flex flex-col gap-2">
            {fieldOptions.map((field) => {
                const isSelected = selectedFields.includes(field);
                return (
                    <div
                        key={field}
                        onClick={() => onToggle(field)}
                        className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                            isSelected ? "bg-[#F3F6FC]" : "hover:bg-[#F9FAFB]"
                        }`}
                    >
                         {/* Text (Right) */}
                        <span className={`text-sm text-right flex-1 ${isSelected ? "text-[#393E46] font-bold" : "text-[#6C7278]"}`}>
                            {field}
                        </span>

                        {/* Checkbox (Left) */}
                        <div className={`w-5 h-5 ml-3 rounded-md border-2 flex items-center justify-center transition-all ${
                            isSelected ? "bg-[#393E46] border-[#393E46]" : "border-[#D1D5DB]"
                        }`}>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
  );

  return (
    <div className="flex h-full w-full flex-col bg-white relative overflow-hidden">
      
      {/* Top Background Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[230px] bg-[linear-gradient(180deg,#F7C309_0%,white_100%)] z-0 pointer-events-none" />

      {/* Header Content */}
      <div className="relative z-10 w-full px-6 pt-6 pb-2">
         <div className="flex justify-between items-center mb-8">
            <button 
                onClick={handleBackStep}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-white/20 transition-all text-[#393E46]"
             >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="text-[#393E46] text-xl font-black">دیجی کارا</span>
         </div>

         <div className="text-right space-y-2 mb-8">
            <h1 className="text-[#393E46] text-3xl font-black">
                {currentStep === 1 && "تجربه تولید"}
                {currentStep === 2 && "تجربه فروش"}
                {currentStep === 3 && "آموزش کسب و کار"}
            </h1>
            
            {/* Progress Bar */}
            <div className="flex items-center justify-end gap-3 pt-2">
                <span className="text-[#393E46] text-xs font-bold opacity-70 dir-rtl">
                    مرحله {currentStep} از {totalSteps}
                </span>
                <div className="w-32 h-1.5 bg-white/30 rounded-full overflow-hidden flex justify-end">
                    <div 
                        className="h-full bg-[#393E46] rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    />
                </div>
            </div>
         </div>
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10 flex-1 w-full max-w-[440px] mx-auto overflow-y-auto px-6 pb-32 no-scrollbar"> 
         <div className=" p-1 min-h-[300px]">
            {currentStep === 1 && (
                <>
                    {renderOptions(
                        "تجربه تولید محصولات", 
                        "آیا سابقه تولید محصولی را دارید؟", 
                        formState.productionExperience, 
                        handleProductionExperience
                    )}
                    {formState.productionExperience === "داشته ام" && 
                        renderMultiSelect(formState.productionField, handleProductionField)
                    }
                </>
            )}

            {currentStep === 2 && (
                <>
                    {renderOptions(
                        "تجربه فروش محصولات", 
                        "آیا سابقه فروش محصولی را دارید؟", 
                        formState.salesExperience, 
                        handleSalesExperience
                    )}
                    {formState.salesExperience === "داشته ام" && 
                        renderMultiSelect(formState.salesField, handleSalesField)
                    }
                </>
            )}

            {currentStep === 3 && renderOptions(
                "دوره آموزشی", 
                "آیا دوره آموزشی در زمینه راه اندازی کسب و کار اینترنتی گذرانده اید؟", 
                formState.businessCourse, 
                handleBusinessCourse,
                ["بلی", "خیر"]
            )}
         </div>
      </div>

       {/* Fixed Bottom Button */}
       <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-sm z-50 w-full max-w-[440px] mx-auto border-t border-gray-100/50">
        <Button
          onClick={handleNext}
          disabled={!isCurrentStepValid() || isLoading}
          className={`w-full h-[57px] rounded-2xl text-lg font-bold shadow-lg transition-all ${
            isCurrentStepValid()
              ? "bg-[#FDD00A] hover:bg-[#e5bc09] text-[#1A1C1E] shadow-[#FDD00A]/20"
              : "bg-gray-100 text-gray-400 shadow-none hover:bg-gray-100"
          }`}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : (
              currentStep === totalSteps ? "ثبت اطلاعات" : "مرحله بعد"
          )}
        </Button>
      </div>

    </div>
  );
}
