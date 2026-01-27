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
    <div className="flex h-full w-full flex-col">
      <LoginHeader imageSrc={headerImg} />

      {/* Header Content */}
      <div className="absolute top-0 left-0 right-0 mx-auto w-full max-w-[440px] px-10 pt-15 z-10 flex flex-col gap-8">
        <div className="flex flex-col gap-2 text-right">
          <h1 className="text-2xl font-bold text-[#393E46]">تایید شماره ملی</h1>
          <p className="text-[#6C7278] text-sm">
            لطفا شماره ملی خود را برای تکمیل ثبت نام وارد کنید
          </p>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex flex-1 flex-col items-center justify-center bg-background rounded-t-3xl z-10 p-6 -mt-10 pt-8 gap-6 animate-in slide-in-from-bottom-10 fade-in duration-500">
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="space-y-2">
            <Label htmlFor="national-id" className="sr-only">
              شماره ملی
            </Label>
            <Input
              id="national-id"
              type="tel"
              inputMode="numeric"
              placeholder="1234567890"
              value={nationalId}
              onChange={(e) => {
                // Only allow digits
                const value = e.target.value.replace(/\D/g, "");
                setNationalId(value);
              }}
              maxLength={10}
              className="text-center text-lg py-6 rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-all"
              style={{ direction: "ltr" }}
              disabled={isLoading}
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm text-right">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading || !nationalId}
            className="w-full py-6 rounded-xl text-base font-semibold"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
            className="w-full py-6 rounded-xl text-base font-semibold"
          >
            بازگشت
          </Button>
        </form>
      </div>
    </div>
  );
}
