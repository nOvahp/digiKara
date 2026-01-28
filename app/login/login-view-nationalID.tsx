"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import headerImg from "../../public/OtpHeader.png";
import { LoginHeader } from "./login-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface LoginViewProps {
  onNext?: () => void;
}

export function LoginViewNationalID({ onNext }: LoginViewProps) {
  const router = useRouter();
  const [nationalId, setNationalId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!nationalId.trim()) {
      setError("لطفا شماره ملی خود را وارد کنید");
      return;
    }

    if (nationalId.length < 10 || nationalId.length > 10) {
      setError("شماره ملی باید 10 رقم باشد");
      return;
    }

    if (!/^\d+$/.test(nationalId)) {
      setError("شماره ملی تنها باید شامل اعداد باشد");
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Connect to backend API when ready
      // const result = await verifyNationalId(nationalId);
      // if (result.success) {
      //   if (onNext) {
      //     onNext();
      //   }
      // } else {
      //   setError(result.message || "خطا در تایید شماره ملی");
      // }

      // For now, simulate successful submission
      console.log("🆔 National ID submitted:", nationalId);
      setIsLoading(false);
      if (onNext) {
        onNext();
      }
    } catch (err) {
      setIsLoading(false);
      setError("خطای شبکه");
      console.error("National ID submit error:", err);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex min-h-full w-full flex-col bg-[#F8FAFC]">
      <LoginHeader imageSrc={headerImg} />

      {/* Header Text */}
      <div className="absolute top-[100px] left-0 right-0 px-8 z-10 text-right">
        <h1 className="text-3xl font-black text-[#393E46] mb-2">تایید شماره ملی</h1>
        <p className="text-[#393E46] text-sm font-bold opacity-80 leading-relaxed">
          برای تکمیل ثبت نام، لطفا کدملی خود را وارد کنید
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 px-6 w-full max-w-[440px] mx-auto -mt-20 z-20 pb-10">
        
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-black/5 p-6 sm:p-8 animate-in slide-in-from-bottom-5 fade-in duration-500 relative pt-10">
            
            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <div className="space-y-4">
                <Label htmlFor="national-id" className="text-right block text-[#393E46] font-bold">
                  شماره ملی
                </Label>
                <Input
                  id="national-id"
                  type="tel"
                  inputMode="numeric"
                  placeholder="1234567890"
                  value={nationalId}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setNationalId(value);
                  }}
                  maxLength={10}
                  className="text-center text-xl py-7 rounded-2xl bg-[#F3F6FC] border-none focus-visible:ring-1 focus-visible:ring-[#FDD00A]/50 placeholder:text-gray-400 font-semibold tracking-widest"
                  style={{ direction: "ltr" }}
                  disabled={isLoading}
                  autoFocus
                />
              </div>

              {error && (
                 <div className="bg-red-50 text-red-600 text-xs font-bold p-3 rounded-xl text-center border border-red-100">
                    {error}
                 </div>
              )}

              <div className="space-y-3 pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading || !nationalId}
                    className="w-full bg-[#FDD00A] hover:bg-[#e5bc09] text-[#1A1C1E] font-extrabold py-8 text-xl rounded-2xl shadow-lg shadow-[#FDD00A]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        درحال بررسی...
                      </>
                    ) : (
                      "تایید و ادامه"
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleBack}
                    disabled={isLoading}
                    className="w-full py-6 rounded-2xl text-[#6C7278] font-bold hover:bg-gray-50 hover:text-[#393E46]"
                  >
                    بازگشت
                  </Button>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
}
