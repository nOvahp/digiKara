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

export function LogInForm({ onNext, onExistingUser }: { onNext?: () => void; onExistingUser?: () => void }) {
  const router = useRouter();
  const { requestOtp, verifyOtp, role } = useAuth();
  
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
      // If we have user data, it means the user has completed onboarding/questions before.
      if (result.user) {
        if (onExistingUser) {
           onExistingUser();
        } else {
           router.push("/StudentDashboard");
        }
      } else {
        // First time user (user data is null), proceed to next onboarding step
        if (onNext) {
          onNext();
        } else {
          router.push("/StudentDashboard");
        }
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

  // Determine title based on role
  const getTitle = () => {
      if (stage === "OTP_ENTRY") return "کد تایید";
      return role === 'manager' ? "ورود مدیر مدرسه" : "ورود دانش آموز";
  };

  return (
    <div className="flex min-h-full w-full flex-col bg-[#F8FAFC]">
      <LoginHeader imageSrc={headerImg} />

      {/* Header Text - Floating on top of the yellow header */}
      <div className="absolute top-[100px] left-0 right-0 px-8 z-10 text-right">
         <h2 className="text-3xl font-black text-[#393E46] mb-2">
            {getTitle()}
         </h2>
         <p className="text-[#393E46] text-sm font-bold opacity-80 leading-relaxed">
            {stage === "PHONE_ENTRY" 
              ? "برای استفاده از امکانات، وارد شوید" 
              : `کد ارسال شده به ${phoneForm.getValues("phoneNumber")} را وارد کنید`
            }
         </p>
      </div>

      <div className="flex flex-col flex-1 px-6 w-full max-w-[440px] mx-auto -mt-20 z-20 pb-10">
        
        {/* Main Card Container */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-black/5 p-6 sm:p-8 animate-in slide-in-from-bottom-5 fade-in duration-500 relative">
          
          {stage === "PHONE_ENTRY" ? (
            <form onSubmit={phoneForm.handleSubmit(onSubmitPhone)} className="flex flex-col gap-6 pt-2">
              
              <div className="space-y-4">
                <Label htmlFor="phone" className="text-right block text-[#393E46] font-bold">شماره موبایل</Label>
                <div className="relative">
                    <Input 
                        {...phoneForm.register("phoneNumber")}
                        id="phone"
                        type="tel" 
                        inputMode="numeric"
                        placeholder="09123456789"
                        className={`text-left text-xl py-7 rounded-2xl bg-[#F3F6FC] border-none focus-visible:ring-1 focus-visible:ring-[#FDD00A]/50 placeholder:text-gray-400 font-semibold tracking-wide ${phoneForm.formState.errors.phoneNumber ? "ring-1 ring-red-500 bg-red-50" : ""}`}
                        autoFocus
                    />
                </div>
                {phoneForm.formState.errors.phoneNumber && (
                  <p className="text-red-500 text-xs font-medium text-right mt-1">{phoneForm.formState.errors.phoneNumber.message}</p>
                )}
              </div>

              {serverError && (
                 <div className="bg-red-50 text-red-600 text-xs font-bold p-3 rounded-xl text-center border border-red-100">
                    {serverError}
                 </div>
              )}

              <Button 
                  type="submit" 
                  className="w-full bg-[#FDD00A] hover:bg-[#e5bc09] text-[#1A1C1E] font-extrabold py-8 text-xl rounded-2xl mt-4 shadow-lg shadow-[#FDD00A]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  disabled={isLoading}
              >
                {isLoading ? <Loader2 className="animate-spin w-6 h-6 text-[#1A1C1E]" /> : "دریافت کد تایید"}
              </Button>

              <div className="text-center">
                  <p className="text-[#9CA3AF] text-xs mt-2">
                    ورود شما به معنای پذیرش <span className="text-[#393E46] underline cursor-pointer">قوانین و مقررات</span> است
                  </p>
              </div>

            </form>
          ) : (
            <form onSubmit={otpForm.handleSubmit(onSubmitOtp)} className="flex flex-col gap-6 pt-2 animate-in fade-in slide-in-from-right-8 duration-300">
               
               <div className="flex items-center justify-between mb-2">
                   <button 
                    type="button" 
                    onClick={handleEditPhone}
                    className="text-blue-500 text-xs font-bold bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    ویرایش شماره
                  </button>
                  <p className="text-[#6C7278] text-sm font-medium dir-ltr">{phoneForm.getValues("phoneNumber")}</p>
              </div>

              <div className="flex justify-center dir-ltr py-2">
                  <Input 
                    {...otpForm.register("otp")}
                    maxLength={6}
                    className="text-center text-4xl tracking-[0.5em] py-8 rounded-2xl font-black bg-[#F3F6FC] border-none focus-visible:ring-1 focus-visible:ring-[#FDD00A]/50 text-[#393E46]"
                    placeholder="— — — — — —"
                    autoComplete="one-time-code"
                    inputMode="numeric"
                  />
              </div>
               {otpForm.formState.errors.otp && (
                  <p className="text-red-500 text-xs font-medium text-center -mt-2">{otpForm.formState.errors.otp.message}</p>
                )}

              {serverError && (
                 <div className="bg-red-50 text-red-600 text-xs font-bold p-3 rounded-xl text-center border border-red-100">
                    {serverError}
                 </div>
              )}

               <div className="flex items-center justify-center text-sm">
                  {timeLeft > 0 ? (
                      <div className="flex items-center gap-2 text-[#6C7278] font-medium bg-gray-50 px-4 py-2 rounded-full">
                          <Loader2 className="w-4 h-4 animate-spin opacity-50" />
                          <span>{formatTime(timeLeft)} تا ارسال مجدد</span>
                      </div>
                  ) : (
                      <button type="button" onClick={handleResend} className="text-blue-500 font-bold hover:underline bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors">
                          ارسال مجدد کد پیامک
                      </button>
                  )}
              </div>

               <Button 
                  type="submit" 
                  className="w-full bg-[#FDD00A] hover:bg-[#e5bc09] text-[#1A1C1E] font-extrabold py-8 text-xl rounded-2xl mt-4 shadow-lg shadow-[#FDD00A]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  disabled={isLoading}
              >
                 {isLoading ? <Loader2 className="animate-spin w-6 h-6 text-[#1A1C1E]" /> : "تایید و ورود"}
              </Button>
            </form>
          )}

        </div>
        
      </div>
    </div>
  );
}
