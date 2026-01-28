"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import headerImg from "../../public/OtpHeader.png";
import { LoginHeader } from "./login-header";
import { useAuth } from "@/app/providers/AuthProvider";

import { Label } from "@/components/ui/label";

import { Loader2, AlertCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface LoginViewProps {
  onNext?: () => void;
  onLoginAgain?: () => void;
}

interface ReportIssue {
  field: string;
  label: string;
  checked: boolean;
}

export function LoginViewReport({ onNext, onLoginAgain }: LoginViewProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [checkboxError, setCheckboxError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const issues: ReportIssue[] = [
    { field: "name", label: "نام", checked: false },
    { field: "phone", label: "شماره تماس", checked: false },
    { field: "school", label: "مدرسه", checked: false },
    { field: "city", label: "شهر", checked: false },
    { field: "field", label: "رشته", checked: false },
    { field: "grade", label: "پایه", checked: false },
  ];

  const handleIssueToggle = (fieldName: string) => {
    setSelectedIssues((prev) =>
      prev.includes(fieldName)
        ? prev.filter((item) => item !== fieldName)
        : [...prev, fieldName]
    );
  };

  // Controlled change handler that accepts the checked state from Radix
  const handleIssueChange = (fieldName: string, checked: boolean | "indeterminate") => {
    const newSelected = checked === true
      ? [...new Set([...selectedIssues, fieldName])]
      : selectedIssues.filter((item) => item !== fieldName);
    setSelectedIssues(newSelected);
    if (newSelected.length > 0) {
      setCheckboxError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Validation
    if (selectedIssues.length === 0) {
      setCheckboxError("لطفا حداقل یک مورد را انتخاب کنید");
      return;
    }

    if (!description.trim()) {
      setDescriptionError("لطفا توضیحات مفصل بدهید");
      return;
    }

    if (description.trim().length < 10) {
      setDescriptionError("توضیحات باید حداقل 10 کاراکتر باشد");
      return;
    }

    if (description.trim().length > 500) {
      setDescriptionError("توضیحات نمی‌تواند بیشتر از 500 کاراکتر باشد");
      return;
    }

    setIsLoading(true);

    try {
      

      console.log("📋 Report submitted:", {
        userId: user?.id,
        phone: user?.phone,
        reportedFields: selectedIssues,
        description: description,
        timestamp: new Date().toISOString(),
      });

      setSuccessMessage("گزارش شما با موفقیت ثبت شد. تیم پشتیبانی به زودی با شما تماس می‌گیرند.");
      setShowSuccess(true);
      
      setSelectedIssues([]);
      setDescription("");
    } catch (err) {
      setIsLoading(false);
      setError("خطا در ارسال گزارش. لطفا دوباره تلاش کنید");
      console.error("Report submission error:", err);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleLoginAgain = () => {
    if (onLoginAgain) {
      onLoginAgain();
    } else {
      router.push("/login");
    }
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex h-full w-full flex-col bg-[#F8FAFC]">
      <LoginHeader imageSrc={headerImg} />

      {/* Header Text */}
      <div className="absolute top-[100px] left-0 right-0 px-8 z-10 text-right">
        <h1 className="text-3xl font-black text-[#393E46] mb-2">
            {showSuccess ? "درخواست ثبت شد" : "گزارش مغایرت"}
        </h1>
        <p className="text-[#393E46] text-sm font-bold opacity-80 leading-relaxed">
             {showSuccess 
                ? "کارشناسان ما به زودی بررسی خواهند کرد"
                : "لطفا موارد نادرست را انتخاب کنید"
             }
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 px-6 w-full max-w-[440px] mx-auto -mt-20 z-20 pb-56"> 
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-black/5 p-6 sm:p-8 animate-in slide-in-from-bottom-5 fade-in duration-500 relative pt-8">
            
            {showSuccess ? (
                <div className="w-full flex flex-col items-center justify-center gap-6 py-8">
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center border border-green-100">
                    <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    </div>
                    
                    <div className="text-center space-y-3">
                        <p className="text-[#393E46] text-sm font-medium leading-loose">
                            گزارش شما با موفقیت در سیستم ثبت شد.<br/>
                            نتیجه بررسی از طریق پیامک به شماره زیر ارسال خواهد شد
                        </p>
                        <div className="bg-[#F3F6FC] rounded-xl px-4 py-2 inline-block dir-ltr text-[#393E46] font-bold">
                            {user?.phone}
                        </div>
                    </div>
                </div>
            ) : (
                <form id="report-form" onSubmit={handleSubmit} className="w-full space-y-6">
                    <div className="space-y-4">
                        <Label className="text-[#393E46] font-bold text-sm block text-right">
                        اطلاعات نادرست را انتخاب کنید
                        </Label>
                        <div className="grid grid-cols-1 gap-2">
                            {issues.map((issue) => (
                                <label
                                key={issue.field}
                                htmlFor={issue.field}
                                className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                                    selectedIssues.includes(issue.field) 
                                    ? "bg-[#FFFCEB] border-[#FDD00A]" 
                                    : "bg-white border-[#EBEBEB] hover:bg-[#F9FAFB]"
                                }`}
                                >
                                <div className="flex items-center gap-3">
                                    <Checkbox
                                    id={issue.field}
                                    checked={selectedIssues.includes(issue.field)}
                                    onCheckedChange={(checked) =>
                                        handleIssueChange(issue.field, Boolean(checked))
                                    }
                                    className="data-[state=checked]:bg-[#FDD00A] data-[state=checked]:text-black border-gray-300 w-5 h-5 rounded-md"
                                    />
                                    <span className="text-[#393E46] text-sm font-bold">{issue.label}</span>
                                </div>

                                {user && (
                                    <span className="text-[#9CA3AF] text-xs truncate max-w-[120px] dir-rtl">
                                    {String(user[issue.field as keyof typeof user] ?? "")}
                                    </span>
                                )}
                                </label>
                            ))}
                        </div>
                        {checkboxError && (
                            <p className="text-red-500 text-xs font-medium text-right mr-1">{checkboxError}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                         <Label htmlFor="description" className="text-[#393E46] font-bold text-sm block text-right">
                            توضیحات تکمیلی
                        </Label>
                        <Textarea
                        id="description"
                        placeholder="لطفا توضیح دهید اطلاعات صحیح چیست..."
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                            if (descriptionError) setDescriptionError("");
                        }}
                        disabled={isLoading}
                        className="resize-none rounded-2xl border-[#EBEBEB] bg-[#F9FAFB] focus:bg-white focus:ring-[#FDD00A] min-h-[120px] p-4 text-sm"
                        style={{ direction: "rtl", textAlign: "right" }}
                        maxLength={500}
                        />
                         {descriptionError && (
                            <p className="text-red-500 text-xs font-medium text-right mr-1">{descriptionError}</p>
                        )}
                    </div>

                     {error && (
                        <div className="bg-red-50 border border-red-100 text-red-600 text-xs font-bold p-3 rounded-xl text-center">
                            {error}
                        </div>
                    )}
                </form>
            )}
        </div>
      </div>

      {/* Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 w-full max-w-[440px] mx-auto p-6 bg-transparent z-50 flex flex-col gap-3">
        {showSuccess ? (
          <>
            <button
              type="button"
              onClick={handleGoHome}
              className="w-full h-[57px] bg-[#FDD00A] rounded-2xl flex items-center justify-center gap-2 hover:bg-[#e5bc09] transition-all text-[#1A1C1E] text-lg font-bold shadow-lg shadow-[#FDD00A]/20"
            >
              بازگشت به صفحه اصلی
            </button>
          </>
        ) : (
          <>
            <button
              type="submit"
              form="report-form"
              disabled={isLoading}
              className="w-full h-[57px] bg-[#FDD00A] rounded-2xl flex items-center justify-center gap-2 hover:bg-[#e5bc09] transition-all text-[#1A1C1E] text-lg font-bold shadow-lg shadow-[#FDD00A]/20 disabled:opacity-50 disabled:shadow-none"
            >
              {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                "ثبت گزارش"
              )}
            </button>

            <button
              type="button"
              onClick={handleBack}
              disabled={isLoading}
              className="w-full h-[57px] bg-white border-2 border-[#E5E7EB] rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors text-[#6C7278] text-base font-bold"
            >
              انصراف
            </button>
          </>
        )}
      </div>
    </div>
  );
}
