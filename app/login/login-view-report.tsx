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
}

interface ReportIssue {
  field: string;
  label: string;
  checked: boolean;
}

export function LoginViewReport({ onNext }: LoginViewProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

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
    setSelectedIssues((prev) =>
      checked === true
        ? [...new Set([...prev, fieldName])]
        : prev.filter((item) => item !== fieldName)
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Validation
    if (selectedIssues.length === 0) {
      setError("لطفا حداقل یک مورد را انتخاب کنید");
      return;
    }

    if (!description.trim()) {
      setError("لطفا توضیحات مفصل بدهید");
      return;
    }

    if (description.trim().length < 10) {
      setError("توضیحات باید حداقل 10 کاراکتر باشد");
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Connect to backend API when ready
      // const result = await submitReport({
      //   userId: user?.id,
      //   phone: user?.phone,
      //   reportedFields: selectedIssues,
      //   description: description,
      //   timestamp: new Date().toISOString(),
      // });

      console.log("📋 Report submitted:", {
        userId: user?.id,
        phone: user?.phone,
        reportedFields: selectedIssues,
        description: description,
        timestamp: new Date().toISOString(),
      });

      setSuccessMessage("گزارش شما با موفقیت ثبت شد. تیم پشتیبانی به زودی با شما تماس می‌گیرند.");
      setShowSuccess(true);
      
      // Reset form
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
    router.push("/login");
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex h-full w-full flex-col">
      <LoginHeader imageSrc={headerImg} />

      {/* Header Content */}
      <div className="absolute top-0 left-0 right-0 mx-auto w-full max-w-[440px] px-10 pt-15 z-10 flex flex-col gap-8">
        <div className="flex flex-col gap-2 text-right">
          <h1 className="text-2xl font-bold text-[#393E46]">
            {showSuccess ? "گزارش ارسال شد" : "گزارش مشکل"}
          </h1>
          <p className="text-[#6C7278] text-sm">
            {showSuccess 
              ? "گزارش شما با موفقیت ثبت شد"
              : "لطفا اطلاعاتی که نادرست است را انتخاب کنید و توضیح دهید"
            }
          </p>
        </div>
      </div>

      {/* Form Content */}
      <div dir="rtl" className="flex flex-1 flex-col items-center justify-start bg-background rounded-t-3xl z-10 p-6 -mt-10 pt-8 gap-6 animate-in slide-in-from-bottom-10 fade-in duration-500 pb-56">
        {showSuccess ? (
          /* Success Page */
          <div className="w-full flex flex-col items-center justify-center gap-8 py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-[#393E46]">گزارش ارسال شد</h2>
              <p className="text-[#6C7278] text-base leading-relaxed">
                گزارش شما با موفقیت ثبت شد. تیم پشتیبانی دیجی کارا در کوتاه‌ترین زمان ممکن با شما تماس خواهد گرفت.
              </p>
              <p className="text-[#6C7278] text-sm">
                شماره تماس شما: {user?.phone}
              </p>
            </div>
          </div>
        ) : (
          /* Report Form */
          <form id="report-form" onSubmit={handleSubmit} className="w-full space-y-6 overflow-y-auto max-h-[60vh]">
          {/* Issues Selection */}
          <div className="space-y-3">
            <Label className="text-[#393E46] font-semibold text-base">
              کدام اطلاعات نادرست است؟
            </Label>
            <div className="bg-white rounded-xl border border-[#DCE4E8] p-4 space-y-3">
              {issues.map((issue) => (
                <label
                  key={issue.field}
                  htmlFor={issue.field}
                  className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={issue.field}
                      checked={selectedIssues.includes(issue.field)}
                      onCheckedChange={(checked) =>
                        handleIssueChange(issue.field, Boolean(checked))
                      }
                      className="cursor-pointer"
                    />
                    <span className="text-[#393E46] font-medium">{issue.label}</span>
                  </div>

                  {user && (
                    <span className="text-[#6C7278] text-sm text-left">
                      {String(user[issue.field as keyof typeof user] ?? "")}
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-[#393E46] font-semibold text-base">
              توضیحات تفصیلی
            </Label>
            <Textarea
              id="description"
              placeholder="لطفا توضیح دهید چه اطلاعاتی نادرست است و چه اطلاعات درست است..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
              className="resize-none rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-all min-h-[120px]"
              style={{ direction: "rtl", textAlign: "right" }}
            />
            <p className="text-[#6C7278] text-xs">
              {description.length} / 500 کاراکتر
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm text-right">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
              <div className="text-green-700 text-sm text-right">{successMessage}</div>
            </div>
          )}

          {/* Submit Button - Moved to bottom */}
          {/* <button
            type="submit"
            disabled={isLoading || selectedIssues.length === 0}
            className="w-full py-6 rounded-xl text-base font-semibold bg-[#FDD00A] hover:bg-[#e5bc09] text-[#1A1C1E]"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                در حال ارسال...
              </>
            ) : (
              "ارسال گزارش"
            )}
          </button> */}

          </form>
        )}
      </div>

      {/* Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 w-full max-w-[440px] mx-auto p-6 bg-transparent z-50 flex flex-col gap-3">
        {showSuccess ? (
          <>
            <button
              type="button"
              onClick={handleLoginAgain}
              className="w-full h-[57px] bg-[#FDD00A] rounded-xl flex items-center justify-center gap-2 hover:bg-[#e5bc09] transition-colors text-[#1A1C1E] text-lg font-semibold shadow-sm"
            >
              ورود مجدد
            </button>

            <button
              type="button"
              onClick={handleGoHome}
              className="w-full h-[57px] bg-white border-2 border-[#FDD00A] rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors text-[#FDD00A] text-lg font-semibold shadow-sm"
            >
              صفحه اصلی
            </button>
          </>
        ) : (
          <>
            <button
              type="submit"
              form="report-form"
              disabled={isLoading || selectedIssues.length === 0}
              className="w-full h-[57px] bg-[#FDD00A] rounded-xl flex items-center justify-center gap-2 hover:bg-[#e5bc09] transition-colors text-[#1A1C1E] text-lg font-semibold shadow-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  در حال ارسال...
                </>
              ) : (
                "ارسال گزارش"
              )}
            </button>

            <button
              type="button"
              onClick={handleBack}
              disabled={isLoading}
              className="w-full h-[57px] bg-white border-2 border-[#FDD00A] rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors text-[#FDD00A] text-lg font-semibold shadow-sm"
            >
              بازگشت
            </button>
          </>
        )}
      </div>
    </div>
  );
}
