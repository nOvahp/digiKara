"use client";

import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
import headerImg from "../../public/OtpHeader.png";
import { LoginHeader } from "./login-header";
import { ChevronRight, ChevronLeft, Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "@/app/providers/AuthProvider";
import { toast } from "sonner"; 

interface LoginViewProps {
  onNext?: () => void;
}

interface FormState {
  productionExperience: string | null;
  productionField: string[];
  salesExperience: string | null;
  salesField: string[];
  businessCourse: string | null;
}

export function LoginView7({ onNext }: LoginViewProps) {
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

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
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

      console.log("🚀 [StudentData] Payload:", JSON.stringify(payload, null, 2));

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

  // --- Render Steps ---

  // --- Render Steps ---
  // Modified to remove the individual card wrapper since the parent will have it

  const renderStep1 = () => (
    <div className="flex flex-col gap-6 animate-in slide-in-from-right-8 fade-in duration-300">
      <div className="p-1">
        <h3 className="text-[#393E46] font-bold text-lg mb-4 text-right">تجربه تولید محصولات</h3>
        <p className="text-[#6C7278] text-sm mb-6 text-right">آیا سابقه تولید محصولی را دارید؟</p>
        
        <div className="flex flex-col gap-3">
          {["داشته ام", "نداشته ام"].map((option) => (
            <label
              key={option}
              className={`flex items-center gap-3 cursor-pointer p-4 rounded-2xl border transition-all ${
                formState.productionExperience === option 
                  ? "bg-[#FDD00A]/10 border-[#FDD00A]" 
                  : "bg-white border-[#F3F4F6] hover:bg-gray-50"
              }`}
            >
               <input
                type="radio"
                name="production-experience"
                value={option}
                checked={formState.productionExperience === option}
                onChange={(e) => handleProductionExperience(e.target.value)}
                className="w-5 h-5 accent-[#FDD00A]"
              />
              <span className="text-[#393E46] font-medium">{option}</span>
            </label>
          ))}
        </div>

        {formState.productionExperience === "داشته ام" && (
          <div className="mt-6 pt-6 border-t border-dashed border-gray-200 animate-in slide-in-from-top-2 fade-in">
             <p className="text-[#393E46] text-sm font-bold mb-4 text-right">زمینه فعالیت خود را انتخاب کنید</p>
             <div className="flex flex-col gap-2">
                {fieldOptions.map((field) => (
                  <label
                    key={field}
                    className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-[#F3F6FC] transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formState.productionField.includes(field)}
                      onChange={() => handleProductionField(field)}
                      className="w-5 h-5 accent-[#FDD00A] rounded-md"
                    />
                    <span className="text-[#393E46] text-sm">{field}</span>
                  </label>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="flex flex-col gap-6 animate-in slide-in-from-right-8 fade-in duration-300">
      <div className="p-1">
        <h3 className="text-[#393E46] font-bold text-lg mb-4 text-right">تجربه فروش محصولات</h3>
        <p className="text-[#6C7278] text-sm mb-6 text-right">آیا سابقه فروش محصولی را دارید؟</p>
        
        <div className="flex flex-col gap-3">
          {["داشته ام", "نداشته ام"].map((option) => (
            <label
              key={option}
              className={`flex items-center gap-3 cursor-pointer p-4 rounded-2xl border transition-all ${
                formState.salesExperience === option 
                  ? "bg-[#FDD00A]/10 border-[#FDD00A]" 
                  : "bg-white border-[#F3F4F6] hover:bg-gray-50"
              }`}
            >
               <input
                type="radio"
                name="sales-experience"
                value={option}
                checked={formState.salesExperience === option}
                onChange={(e) => handleSalesExperience(e.target.value)}
                className="w-5 h-5 accent-[#FDD00A]"
              />
              <span className="text-[#393E46] font-medium">{option}</span>
            </label>
          ))}
        </div>

        {formState.salesExperience === "داشته ام" && (
          <div className="mt-6 pt-6 border-t border-dashed border-gray-200 animate-in slide-in-from-top-2 fade-in">
             <p className="text-[#393E46] text-sm font-bold mb-4 text-right">زمینه فعالیت خود را انتخاب کنید</p>
             <div className="flex flex-col gap-2">
                {fieldOptions.map((field) => (
                  <label
                    key={field}
                    className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-[#F3F6FC] transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formState.salesField.includes(field)}
                      onChange={() => handleSalesField(field)}
                      className="w-5 h-5 accent-[#FDD00A] rounded-md"
                    />
                    <span className="text-[#393E46] text-sm">{field}</span>
                  </label>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="flex flex-col gap-6 animate-in slide-in-from-right-8 fade-in duration-300">
      <div className="p-1">
        <h3 className="text-[#393E46] font-bold text-lg mb-4 text-right">دوره آموزشی</h3>
        <p className="text-[#6C7278] text-sm mb-6 text-right leading-relaxed">
          آیا دوره آموزشی در زمینه راه اندازی کسب و کار اینترنتی گذرانده اید؟
        </p>
        
        <div className="flex flex-col gap-3">
          {["بلی", "خیر"].map((option) => (
            <label
              key={option}
              className={`flex items-center gap-3 cursor-pointer p-4 rounded-2xl border transition-all ${
                formState.businessCourse === option 
                  ? "bg-[#FDD00A]/10 border-[#FDD00A]" 
                  : "bg-white border-[#F3F4F6] hover:bg-gray-50"
              }`}
            >
               <input
                type="radio"
                name="business-course"
                value={option}
                checked={formState.businessCourse === option}
                onChange={(e) => handleBusinessCourse(e.target.value)}
                className="w-5 h-5 accent-[#FDD00A]"
              />
              <span className="text-[#393E46] font-medium">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-full w-full flex-col bg-[#F8FAFC]">
      <LoginHeader imageSrc={headerImg} />

      {/* Header Info */}
      <div className="absolute top-[80px] left-0 right-0 mx-auto w-full max-w-[440px] px-8 z-10 flex flex-col gap-4">
         {/* Top Bar with Back Button */}
         <div className="w-full flex justify-between items-center mb-1">
            {currentStep > 1 ? (
              <button 
                onClick={handleBack}
                className="rounded-full p-2 bg-[#FDD00A]/20 backdrop-blur-sm text-[#393E46] hover:bg-[#FDD00A]/40 transition-colors"
              >
                 <ArrowRight className="w-5 h-5" /> 
              </button>
            ) : (
                <div /> 
            )}
            <span className="text-[#393E46] text-lg font-black tracking-tight opacity-50"> </span>
         </div>

        <div className="flex flex-col gap-2 text-right">
          <h1 className="text-[#393E46] text-3xl font-black">
             {currentStep === 1 && "تجربه تولید"}
             {currentStep === 2 && "تجربه فروش"}
             {currentStep === 3 && "آموزش کسب و کار"}
          </h1>
          <div className="flex items-center justify-between">
              <div className="w-32 h-1.5 bg-black/5 rounded-full overflow-hidden" dir="rtl">
                <div 
                    className="h-full bg-[#393E46] rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
              <p className="text-[#393E46] text-xs font-bold opacity-70">
                 مرحله {currentStep} از {totalSteps}
              </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 px-6 w-full max-w-[440px] mx-auto -mt-16 z-20 pb-10">
         <div className="bg-white rounded-[2.5rem] shadow-xl shadow-black/5 p-6 sm:p-8 animate-in slide-in-from-bottom-5 fade-in duration-500 relative pt-8 min-h-[400px] flex flex-col justify-between">
            
            <div dir="rtl">
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
            </div>

            <button
            onClick={handleNext}
            disabled={!isCurrentStepValid() || isLoading}
            className={`w-full h-[60px] rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 text-lg font-bold shadow-lg shadow-[#FDD00A]/20 mt-8 ${
                isCurrentStepValid()
                ? "bg-[#FDD00A] hover:bg-[#e5bc09] hover:scale-[1.02] active:scale-[0.98] text-[#1A1C1E] cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
            >
            {isLoading ? (
                <Loader2 className="animate-spin w-6 h-6" />
            ) : (
                <>
                {currentStep === totalSteps ? "ثبت اطلاعات" : "مرحله بعد"}
                
                {currentStep < totalSteps && (
                    <ChevronLeft className="w-5 h-5 mr-1" />
                )}
                </>
            )}
            </button>

         </div>
      </div>
    </div>
  );
}
