"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginHeader } from "./login-header";
import headerImg from "../../public/OtpHeader.png";

import { useAuth } from "@/app/providers/AuthProvider";
import { phoneNumberSchema, otpSchema, PhoneNumberFormValues, OtpFormValues } from "./utils/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

// You should import your specific InputOTP components here if using a library like input-otp
// For now, I will use a standard input for OTP or a placeholder for the OTP component if you have one.
// If you have `input-otp` installed as per package.json, we can use it.
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../components/ui/input-otp"; 

const RESEND_DELAY = 120; // 2 minutes

export function LogInForm({ onNext }: { onNext?: () => void }) {
  const router = useRouter();
  const { requestOtp, verifyOtp } = useAuth();
  
  // Stages: PHONE_ENTRY -> WAITING (sending) -> OTP_ENTRY
  const [stage, setStage] = useState<"PHONE_ENTRY" | "OTP_ENTRY">("PHONE_ENTRY");
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Timer Logic
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleResend = () => {
    if (timeLeft === 0 && phoneForm.getValues("phoneNumber")) {
        onSubmitPhone({ phoneNumber: phoneForm.getValues("phoneNumber") });
    }
  };

  // --- Phone Form ---
  const phoneForm = useForm<PhoneNumberFormValues>({
    resolver: zodResolver(phoneNumberSchema),
    defaultValues: { phoneNumber: "" },
  });

  const onSubmitPhone: SubmitHandler<PhoneNumberFormValues> = async (data) => {
    setIsLoading(true);
    setServerError("");
    const result = await requestOtp(data.phoneNumber);
    setIsLoading(false);

    if (result.success) {
      setStage("OTP_ENTRY");
      setTimeLeft(RESEND_DELAY);
    } else {
      setServerError(result.message || "خطا در ارسال کد");
    }
  };

  // --- OTP Form ---
  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const onSubmitOtp: SubmitHandler<OtpFormValues> = async (data) => {
    setIsLoading(true);
    setServerError("");
    const phone = phoneForm.getValues("phoneNumber");
    const result = await verifyOtp(phone, data.otp);
    
    setIsLoading(false);

    if (result.success) {
      if (onNext) {
        onNext();
      } else {
        router.push("/StudentDashboard");
      }
    } else {
      setServerError(result.message || "کد تایید نادرست است");
    }
  };

  const handleEditPhone = () => {
    setStage("PHONE_ENTRY");
    setServerError("");
    otpForm.reset();
  };

  // Format timer
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex h-full w-full flex-col relative bg-background">
      <LoginHeader imageSrc={headerImg} />

      <div className="flex flex-col flex-1 px-8 py-6 w-full max-w-md mx-auto">
        
        {stage === "PHONE_ENTRY" ? (
          <form onSubmit={phoneForm.handleSubmit(onSubmitPhone)} className="flex flex-col gap-6">
            <div className="text-right space-y-2">
              <h2 className="text-xl font-bold text-[#393E46]">شماره موبایل خود را وارد کنید</h2>
              <p className="text-sm text-gray-500">برای ورود یا ثبت نام، شماره موبایل خود را وارد نمایید</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-right block">شماره موبایل</Label>
              <Input 
                {...phoneForm.register("phoneNumber")}
                id="phone"
                type="tel" 
                placeholder="09123456789"
                className={`text-left text-lg py-6 rounded-xl ${phoneForm.formState.errors.phoneNumber ? "border-red-500" : ""}`}
                autoFocus
              />
              {phoneForm.formState.errors.phoneNumber && (
                <p className="text-red-500 text-sm text-right">{phoneForm.formState.errors.phoneNumber.message}</p>
              )}
            </div>

            {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}

            <Button 
                type="submit" 
                className="w-full bg-[#393E46] hover:bg-zinc-800 text-white font-bold py-6 text-lg rounded-xl mt-4"
                disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "دریافت کد تایید"}
            </Button>
          </form>
        ) : (
          <form onSubmit={otpForm.handleSubmit(onSubmitOtp)} className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
             <div className="text-right space-y-2">
              <h2 className="text-xl font-bold text-[#393E46]">کد تایید را وارد کنید</h2>
              <div className="flex items-center justify-end gap-2">
                 <button 
                  type="button" 
                  onClick={handleEditPhone}
                  className="text-blue-500 text-sm font-medium hover:underline"
                >
                  ویرایش
                </button>
                <p className="text-sm text-gray-500">کد ارسال شده به {phoneForm.getValues("phoneNumber")}</p>
              </div>
            </div>

            <div className="flex justify-center dir-ltr">
                {/* OTP Input - Fallback if Shadcn component is not perfect, but assuming generic Input for now if component is complex */}
                <Input 
                  {...otpForm.register("otp")}
                  maxLength={6}
                  className="text-center text-3xl tracking-[1em] py-6 rounded-xl font-mono"
                  placeholder="____"
                  autoComplete="one-time-code"
                />
            </div>
             {otpForm.formState.errors.otp && (
                <p className="text-red-500 text-sm text-center">{otpForm.formState.errors.otp.message}</p>
              )}

            {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}


             <div className="flex items-center justify-between text-sm">
                {timeLeft > 0 ? (
                    <span className="text-gray-500">{formatTime(timeLeft)} تا ارسال مجدد</span>
                ) : (
                    <button type="button" onClick={handleResend} className="text-blue-500 font-medium hover:underline">
                        ارسال مجدد کد
                    </button>
                )}
            </div>

             <Button 
                type="submit" 
                className="w-full bg-[#393E46] hover:bg-zinc-800 text-white font-bold py-6 text-lg rounded-xl mt-4"
                disabled={isLoading}
            >
               {isLoading ? <Loader2 className="animate-spin" /> : "تایید و ورود"}
            </Button>
          </form>
        )}
        
      </div>
    </div>
  );
}
