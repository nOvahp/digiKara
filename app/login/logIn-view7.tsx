"use client";

import React, { useState } from "react";
// import { useRouter } from "next/navigation";
import headerImg from "../../public/OtpHeader.png";
import { LoginHeader } from "./login-header";
import { ChevronDown } from "lucide-react";

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
  // const router = useRouter();
  const [formState, setFormState] = useState<FormState>({
    productionExperience: null,
    productionField: [],
    salesExperience: null,
    salesField: [],
    businessCourse: null,
  });

  const [expandedSections, setExpandedSections] = useState<string[]>([
    "production-exp",
  ]);

  const fieldOptions = [
    "تولید محصولات هنری",
    "تولید صنایع دستی",
    "تولید محصولات کشاورزی",
    "تولید محصولات صنعتی",
    "تولید محصولات شیمیایی",
    "ارایه خدمات کامپیوتری ، وب ، اپلیکیشن، هوش مصنوعی",
  ];

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section],
    );
  };

  const handleProductionExperience = (value: string) => {
    setFormState((prev) => ({
      ...prev,
      productionExperience: value,
      productionField: [],
    }));
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
    setFormState((prev) => ({
      ...prev,
      salesExperience: value,
      salesField: [],
    }));
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
    setFormState((prev) => ({
      ...prev,
      businessCourse: value,
    }));
  };

  const isFormValid =
    formState.productionExperience &&
    (formState.productionExperience === "نداشته ام" ||
      formState.productionField.length > 0) &&
    formState.salesExperience &&
    (formState.salesExperience === "نداشته ام" ||
      formState.salesField.length > 0) &&
    formState.businessCourse;

  const handleContinue = () => {
    if (isFormValid) {
      console.log("Experience Form Data:", formState);
      if (onNext) {
        onNext();
      }
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      <LoginHeader imageSrc={headerImg} />

      {/* Header Content */}
      <div className="absolute top-0 left-0 right-0 mx-auto w-full max-w-[440px] px-10 pt-15 z-10 flex flex-col gap-8">
        <div className="w-full flex justify-end items-center">
          <span className="text-[#393E46] text-lg font-black">دیجی کارا</span>
        </div>

        {/* Title Section */}
        <div className="flex flex-col gap-4 text-right">
          <h1 className="text-[#393E46] text-4xl font-black leading-tight">
            تجربیات شما
          </h1>
          <p className="text-[#393E46] text-sm font-semibold">
            درباره تجربیات خود اطلاعات بدهید
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[440px] mx-auto px-6 mt-12 z-10 flex flex-col gap-4 flex-1 pb-24 overflow-y-auto">
        {/* Section 1: Production Experience */}
        <div className="border border-[#DCE4E8] rounded-2xl overflow-hidden">
          <button
            onClick={() => toggleSection("production-exp")}
            className="w-full p-4 flex items-center justify-between bg-[#F3F6FC] hover:bg-[#E8EEF3] transition-colors"
          >
            <ChevronDown
              className={`w-5 h-5 text-[#393E46] transition-transform ${
                expandedSections.includes("production-exp") ? "rotate-180" : ""
              }`}
            />
            <span className="text-[#393E46] text-base font-bold">
              تجربه تولید محصولات
            </span>
          </button>

          {expandedSections.includes("production-exp") && (
            <div className="p-4 border-t border-[#DCE4E8] bg-white">
              <div className="flex flex-col gap-3">
                {["داشته ام", "نداشته ام"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-[#F3F6FC] transition-colors"
                  >
                    <input
                      type="radio"
                      name="production-experience"
                      value={option}
                      checked={formState.productionExperience === option}
                      onChange={(e) =>
                        handleProductionExperience(e.target.value)
                      }
                      className="w-5 h-5 accent-[#FDD00A]"
                    />
                    <span className="text-[#393E46] text-base font-semibold">
                      {option}
                    </span>
                  </label>
                ))}
              </div>

              {/* Production Fields */}
              {formState.productionExperience === "داشته ام" && (
                <div className="mt-4 pt-4 border-t border-[#DCE4E8]">
                  <p className="text-[#393E46] text-sm font-bold mb-3">
                    در چه زمینه ای تولید داشته اید
                  </p>
                  <div className="flex flex-col gap-2">
                    {fieldOptions.map((field) => (
                      <label
                        key={field}
                        className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-[#F3F6FC] transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formState.productionField.includes(field)}
                          onChange={() => handleProductionField(field)}
                          className="w-5 h-5 accent-[#FDD00A]"
                        />
                        <span className="text-[#393E46] text-sm font-medium">
                          {field}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Section 2: Sales Experience */}
        <div className="border border-[#DCE4E8] rounded-2xl overflow-hidden">
          <button
            onClick={() => toggleSection("sales-exp")}
            className="w-full p-4 flex items-center justify-between bg-[#F3F6FC] hover:bg-[#E8EEF3] transition-colors"
          >
            <ChevronDown
              className={`w-5 h-5 text-[#393E46] transition-transform ${
                expandedSections.includes("sales-exp") ? "rotate-180" : ""
              }`}
            />
            <span className="text-[#393E46] text-base font-bold">
              تجربه فروش محصولات
            </span>
          </button>

          {expandedSections.includes("sales-exp") && (
            <div className="p-4 border-t border-[#DCE4E8] bg-white">
              <div className="flex flex-col gap-3">
                {["داشته ام", "نداشته ام"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-[#F3F6FC] transition-colors"
                  >
                    <input
                      type="radio"
                      name="sales-experience"
                      value={option}
                      checked={formState.salesExperience === option}
                      onChange={(e) => handleSalesExperience(e.target.value)}
                      className="w-5 h-5 accent-[#FDD00A]"
                    />
                    <span className="text-[#393E46] text-base font-semibold">
                      {option}
                    </span>
                  </label>
                ))}
              </div>

             
              {formState.salesExperience === "داشته ام" && (
                <div className="mt-4 pt-4 border-t border-[#DCE4E8]">
                  <p className="text-[#393E46] text-sm font-bold mb-3">
                    فرم تجربه فروش زمینه فعالیت
                  </p>
                  <div className="flex flex-col gap-2">
                    {fieldOptions.map((field) => (
                      <label
                        key={field}
                        className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-[#F3F6FC] transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formState.salesField.includes(field)}
                          onChange={() => handleSalesField(field)}
                          className="w-5 h-5 accent-[#FDD00A]"
                        />
                        <span className="text-[#393E46] text-sm font-medium">
                          {field}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Section 3: Business Course */}
        <div className="border border-[#DCE4E8] rounded-2xl overflow-hidden">
          <button
            onClick={() => toggleSection("business-course")}
            className="w-full p-4 flex items-center justify-between bg-[#F3F6FC] hover:bg-[#E8EEF3] transition-colors"
          >
            <ChevronDown
              className={`w-5 h-5 text-[#393E46] transition-transform ${
                expandedSections.includes("business-course") ? "rotate-180" : ""
              }`}
            />
            <span className="text-[#393E46] text-base font-bold">
              دوره آموزشی راه اندازی کسب و کار
            </span>
          </button>

          {expandedSections.includes("business-course") && (
            <div className="p-4 border-t border-[#DCE4E8] bg-white">
              <p className="text-[#6C7278] text-xs font-medium mb-3">
                دوره آموزشی در زمینه راه اندازی کسب و کار اینترنتی گذرانده اید؟
              </p>
              <div className="flex flex-col gap-3">
                {["بلی", "خیر"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-[#F3F6FC] transition-colors"
                  >
                    <input
                      type="radio"
                      name="business-course"
                      value={option}
                      checked={formState.businessCourse === option}
                      onChange={(e) => handleBusinessCourse(e.target.value)}
                      className="w-5 h-5 accent-[#FDD00A]"
                    />
                    <span className="text-[#393E46] text-base font-semibold">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Validation Message */}
        {!isFormValid && (
          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
            <p className="text-red-600 text-xs font-medium text-center">
              لطفا تمام فرم‌ها را تکمیل کنید
            </p>
          </div>
        )}
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 w-full max-w-[440px] mx-auto p-6 bg-transparent z-50">
        <button
          onClick={handleContinue}
          disabled={!isFormValid}
          className={`w-full h-[57px] rounded-xl flex items-center justify-center gap-2 transition-colors text-lg font-semibold shadow-sm ${
            isFormValid
              ? "bg-[#FDD00A] hover:bg-[#e5bc09] text-[#1A1C1E] cursor-pointer"
              : "bg-[#E0E0E0] text-[#999999] cursor-not-allowed"
          }`}
        >
          ادامه
        </button>
      </div>
    </div>
  );
}
